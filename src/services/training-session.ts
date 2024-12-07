import { io, Socket } from 'socket.io-client';
import { ENV } from '../config/env';

interface TrainingSession {
  id: string;
  courseId: string;
  userId: string;
  startTime: Date;
  status: 'active' | 'paused' | 'completed';
}

class TrainingSessionManager {
  private socket: Socket | null = null;
  private activeSessions: Map<string, TrainingSession> = new Map();
  private maxConcurrentSessions = 20;

  constructor() {
    this.initializeSocket();
  }

  private initializeSocket() {
    this.socket = io(ENV.SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to training session server');
    });

    this.socket.on('sessionUpdate', (session: TrainingSession) => {
      this.activeSessions.set(session.id, session);
    });
  }

  async startSession(courseId: string, userId: string): Promise<TrainingSession | null> {
    if (this.activeSessions.size >= this.maxConcurrentSessions) {
      throw new Error('Maximum concurrent sessions reached. Please try again later.');
    }

    const session: TrainingSession = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      courseId,
      userId,
      startTime: new Date(),
      status: 'active',
    };

    this.activeSessions.set(session.id, session);
    this.socket?.emit('startSession', session);

    return session;
  }

  async endSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      session.status = 'completed';
      this.socket?.emit('endSession', session);
      this.activeSessions.delete(sessionId);
    }
  }

  getActiveSessionCount(): number {
    return this.activeSessions.size;
  }

  isSessionAvailable(): boolean {
    return this.activeSessions.size < this.maxConcurrentSessions;
  }
}

export const trainingSessionManager = new TrainingSessionManager();