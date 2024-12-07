import { supabase } from '../../../lib/supabase';
import type { HealingStrategy } from '../types';

export class DatabaseHealingStrategy implements HealingStrategy {
  private readonly RECONNECT_DELAY = 1000; // 1 second
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private reconnectAttempts = 0;

  async heal(): Promise<boolean> {
    if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
      console.error('Max database reconnection attempts reached');
      return false;
    }

    try {
      // Attempt to refresh the session
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        this.reconnectAttempts++;
        await new Promise(resolve => setTimeout(resolve, this.RECONNECT_DELAY));
        return this.heal();
      }

      if (session) {
        this.reconnectAttempts = 0;
        return true;
      }

      return false;
    } catch (error) {
      console.error('Database healing failed:', error);
      return false;
    }
  }

  reset(): void {
    this.reconnectAttempts = 0;
  }
}