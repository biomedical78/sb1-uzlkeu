import { SessionManager } from '../../sessionManager';
import type { HealingStrategy } from '../types';

export class SessionHealingStrategy implements HealingStrategy {
  private sessionManager: SessionManager;
  private readonly MAX_RETRY_ATTEMPTS = 3;
  private retryAttempts: Map<string, number> = new Map();

  constructor() {
    this.sessionManager = SessionManager.getInstance();
  }

  async heal(sessionId: string): Promise<boolean> {
    const attempts = this.retryAttempts.get(sessionId) || 0;
    
    if (attempts >= this.MAX_RETRY_ATTEMPTS) {
      console.error(`Max retry attempts reached for session ${sessionId}`);
      return false;
    }

    try {
      // Attempt to recover the session
      await this.sessionManager.cleanupInactiveSessions();
      const isActive = this.sessionManager.isSessionActive(sessionId);
      
      if (!isActive) {
        // Try to restart the session
        await this.sessionManager.endSession(sessionId);
        // Record the retry attempt
        this.retryAttempts.set(sessionId, attempts + 1);
      } else {
        // Session recovered, reset retry counter
        this.retryAttempts.delete(sessionId);
      }

      return isActive;
    } catch (error) {
      console.error('Session healing failed:', error);
      return false;
    }
  }

  reset(sessionId: string): void {
    this.retryAttempts.delete(sessionId);
  }
}