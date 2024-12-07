import type { HealingStrategy } from '../types';

export class MemoryHealingStrategy implements HealingStrategy {
  private readonly MEMORY_THRESHOLD = 0.9; // 90% of heap limit
  private readonly CACHE_CLEANUP_INTERVAL = 60000; // 1 minute

  async heal(): Promise<boolean> {
    try {
      // Clear memory caches
      if (typeof window !== 'undefined') {
        // Clear browser caches
        if (window.caches) {
          const keys = await window.caches.keys();
          await Promise.all(keys.map(key => window.caches.delete(key)));
        }

        // Clear local storage items older than 1 day
        this.cleanupLocalStorage();

        // Force garbage collection if available
        if (window.gc) {
          window.gc();
        }
      }

      // Check if memory usage is now below threshold
      if (typeof performance !== 'undefined') {
        const memory = performance?.memory;
        if (memory) {
          return memory.usedJSHeapSize < memory.jsHeapSizeLimit * this.MEMORY_THRESHOLD;
        }
      }

      return true;
    } catch (error) {
      console.error('Memory healing failed:', error);
      return false;
    }
  }

  private cleanupLocalStorage(): void {
    try {
      const now = Date.now();
      const oneDayAgo = now - (24 * 60 * 60 * 1000);

      Object.keys(localStorage).forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const { timestamp } = JSON.parse(item);
            if (timestamp && timestamp < oneDayAgo) {
              localStorage.removeItem(key);
            }
          } catch {
            // Skip items that don't have timestamp
          }
        }
      });
    } catch (error) {
      console.error('Local storage cleanup failed:', error);
    }
  }

  startPeriodicCleanup(): void {
    setInterval(() => this.heal(), this.CACHE_CLEANUP_INTERVAL);
  }
}