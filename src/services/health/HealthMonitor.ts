import { EventEmitter } from 'events';
import { SessionHealingStrategy } from './strategies/SessionHealingStrategy';
import { DatabaseHealingStrategy } from './strategies/DatabaseHealingStrategy';
import { MemoryHealingStrategy } from './strategies/MemoryHealingStrategy';
import type { HealthCheck, HealthStatus } from './types';

export class HealthMonitor extends EventEmitter {
  private static instance: HealthMonitor;
  private readonly checkInterval = 250; // 0.25 seconds
  private isRunning = false;
  private healthChecks: Map<string, HealthCheck> = new Map();
  private healthStatus: Map<string, HealthStatus> = new Map();
  
  private constructor() {
    super();
    this.initializeHealthChecks();
  }

  static getInstance(): HealthMonitor {
    if (!HealthMonitor.instance) {
      HealthMonitor.instance = new HealthMonitor();
    }
    return HealthMonitor.instance;
  }

  private initializeHealthChecks() {
    // Initialize healing strategies
    const sessionStrategy = new SessionHealingStrategy();
    const databaseStrategy = new DatabaseHealingStrategy();
    const memoryStrategy = new MemoryHealingStrategy();

    // Add health checks with their healing strategies
    this.addHealthCheck({
      name: 'sessions',
      check: async () => {
        const sessionManager = SessionManager.getInstance();
        return sessionManager.getActiveSessionCount() <= 20;
      },
      healingStrategy: sessionStrategy,
      criticalError: true
    });

    this.addHealthCheck({
      name: 'database',
      check: async () => {
        try {
          const { data, error } = await supabase.from('health_checks').select('count').single();
          return !error;
        } catch {
          return false;
        }
      },
      healingStrategy: databaseStrategy,
      criticalError: true
    });

    this.addHealthCheck({
      name: 'memory',
      check: async () => {
        if (typeof performance !== 'undefined') {
          const memory = performance?.memory;
          if (memory) {
            return memory.usedJSHeapSize < memory.jsHeapSizeLimit * 0.9;
          }
        }
        return true;
      },
      healingStrategy: memoryStrategy
    });

    // Start periodic memory cleanup
    memoryStrategy.startPeriodicCleanup();
  }

  addHealthCheck(check: HealthCheck) {
    this.healthChecks.set(check.name, check);
    this.healthStatus.set(check.name, {
      name: check.name,
      healthy: true,
      lastCheck: new Date(),
      errorCount: 0
    });
  }

  async runHealthCheck(name: string): Promise<boolean> {
    const check = this.healthChecks.get(name);
    if (!check) return true;

    try {
      const isHealthy = await check.check();
      const status = this.healthStatus.get(name)!;
      
      status.healthy = isHealthy;
      status.lastCheck = new Date();
      
      if (!isHealthy) {
        status.errorCount++;
        if (check.criticalError && status.errorCount >= 3) {
          this.emit('criticalError', { name, status });
        }
      } else {
        status.errorCount = 0;
      }

      this.healthStatus.set(name, status);
      return isHealthy;
    } catch (error) {
      console.error(`Health check failed for ${name}:`, error);
      return false;
    }
  }

  async heal(name: string): Promise<boolean> {
    const check = this.healthChecks.get(name);
    if (!check) return false;

    try {
      const healed = await check.healingStrategy.heal();
      const status = this.healthStatus.get(name)!;
      
      if (healed) {
        status.lastHealing = new Date();
        status.errorCount = 0;
        this.healthStatus.set(name, status);
      }

      return healed;
    } catch (error) {
      console.error(`Healing failed for ${name}:`, error);
      return false;
    }
  }

  async start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.runMonitoring();
  }

  stop() {
    this.isRunning = false;
  }

  getStatus(name: string): HealthStatus | undefined {
    return this.healthStatus.get(name);
  }

  getAllStatuses(): HealthStatus[] {
    return Array.from(this.healthStatus.values());
  }

  private async runMonitoring() {
    const runChecks = async () => {
      if (!this.isRunning) return;

      for (const [name] of this.healthChecks) {
        const isHealthy = await this.runHealthCheck(name);
        
        if (!isHealthy) {
          console.warn(`Health check failed for ${name}, attempting to heal...`);
          const healed = await this.heal(name);
          
          if (!healed) {
            this.emit('healthCheckFailed', { name, timestamp: new Date() });
          } else {
            this.emit('healed', { name, timestamp: new Date() });
          }
        }
      }

      if (this.isRunning) {
        setTimeout(() => runChecks(), this.checkInterval);
      }
    };

    runChecks();
  }
}