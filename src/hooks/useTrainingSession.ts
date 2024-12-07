import { useState, useEffect } from 'react';
import { SessionManager } from '../services/sessionManager';
import { useAuthStore } from '../store/authStore';

export function useTrainingSession(courseId: string) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const sessionManager = SessionManager.getInstance();

  useEffect(() => {
    let intervalId: number;

    const startSession = async () => {
      if (!user?.id) return;

      const { success, error } = await sessionManager.startSession(user.id, courseId);
      if (success) {
        const newSessionId = crypto.randomUUID();
        setSessionId(newSessionId);
        
        // Keep session alive
        intervalId = window.setInterval(() => {
          sessionManager.updateSession(newSessionId);
        }, 60000); // Update every minute
      } else {
        setError(error || 'Failed to start session');
      }
    };

    startSession();

    return () => {
      if (sessionId) {
        sessionManager.endSession(sessionId);
        if (intervalId) clearInterval(intervalId);
      }
    };
  }, [user?.id, courseId]);

  return { sessionId, error };
}