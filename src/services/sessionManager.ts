import { supabase } from '../lib/supabase';

interface SessionData {
  userId: string;
  courseId: string;
  startTime: string;
  lastActive: string;
}

const MAX_CONCURRENT_SESSIONS = 20;
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export class SessionManager {
  private static instance: SessionManager;
  private activeSessions: Map<string, SessionData>;

  private constructor() {
    this.activeSessions = new Map();
    this.startCleanupInterval();
  }

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  private startCleanupInterval() {
    setInterval(() => this.cleanupInactiveSessions(), 60000); // Check every minute
  }

  private cleanupInactiveSessions() {
    const now = Date.now();
    for (const [sessionId, session] of this.activeSessions.entries()) {
      const lastActive = new Date(session.lastActive).getTime();
      if (now - lastActive > SESSION_TIMEOUT) {
        this.activeSessions.delete(sessionId);
      }
    }
  }

  async startSession(userId: string, courseId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if user already has an active session
      for (const session of this.activeSessions.values()) {
        if (session.userId === userId) {
          return { success: true }; // User can continue their existing session
        }
      }

      // Check concurrent session limit
      if (this.activeSessions.size >= MAX_CONCURRENT_SESSIONS) {
        return { success: false, error: 'Maximum concurrent sessions reached. Please try again later.' };
      }

      const sessionId = crypto.randomUUID();
      const sessionData: SessionData = {
        userId,
        courseId,
        startTime: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };

      this.activeSessions.set(sessionId, sessionData);

      // Log session start in database
      await supabase.from('session_logs').insert({
        session_id: sessionId,
        user_id: userId,
        course_id: courseId,
        start_time: sessionData.startTime
      });

      return { success: true };
    } catch (error) {
      console.error('Error starting session:', error);
      return { success: false, error: 'Failed to start session' };
    }
  }

  async updateSession(sessionId: string): Promise<boolean> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return false;

    session.lastActive = new Date().toISOString();
    this.activeSessions.set(sessionId, session);
    return true;
  }

  async endSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    this.activeSessions.delete(sessionId);

    // Log session end in database
    await supabase.from('session_logs').update({
      end_time: new Date().toISOString()
    }).match({ session_id: sessionId });
  }

  getActiveSessionCount(): number {
    return this.activeSessions.size;
  }

  isSessionActive(sessionId: string): boolean {
    return this.activeSessions.has(sessionId);
  }
}