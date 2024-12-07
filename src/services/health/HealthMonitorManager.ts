import { HealthMonitor } from './HealthMonitor';

class HealthMonitorManager {
  private static instance: HealthMonitorManager;
  private monitor: HealthMonitor;
  private errorCounts: Map<string, number> = new Map();
  private readonly MAX_ERRORS = 3;

  private constructor() {
    this.monitor = HealthMonitor.getInstance();
    this.initializeEventListeners();
  }

  static getInstance(): HealthMonitorManager {
    if (!HealthMonitorManager.instance) {
      HealthMonitorManager.instance = new HealthMonitorManager();
    }
    return HealthMonitorManager.instance;
  }

  private initializeEventListeners() {
    this.monitor.on('healthCheckFailed', ({ name }) => {
      const currentCount = this.errorCounts.get(name) || 0;
      this.errorCounts.set(name, currentCount + 1);

      if (currentCount + 1 >= this.MAX_ERRORS) {
        this.handleCriticalError(name);
      }
    });

    this.monitor.on('healed', ({ name }) => {
      this.errorCounts.delete(name);
    });
  }

  private handleCriticalError(name: string) {
    console.error(`Critical error in ${name} - system needs attention`);
    // Implement critical error handling strategy
    this.errorCounts.delete(name);
  }

  startMonitoring() {
    this.monitor.start();
  }

  stopMonitoring() {
    this.monitor.stop();
  }

  addCustomHealthCheck(name: string, check: () => Promise<boolean>) {
    this.monitor.addHealthCheck(name, check);
  }

  addCustomHealingStrategy(name: string, strategy: () => Promise<boolean>) {
    this.monitor.addHealingStrategy(name, strategy);
  }
}

export const healthMonitorManager = HealthMonitorManager.getInstance();