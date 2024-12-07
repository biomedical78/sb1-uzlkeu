export interface HealingStrategy {
  heal(id?: string): Promise<boolean>;
  reset?(id?: string): void;
}

export interface HealthCheck {
  name: string;
  check: () => Promise<boolean>;
  healingStrategy: HealingStrategy;
  criticalError?: boolean;
}

export interface HealthStatus {
  name: string;
  healthy: boolean;
  lastCheck: Date;
  lastHealing?: Date;
  errorCount: number;
}