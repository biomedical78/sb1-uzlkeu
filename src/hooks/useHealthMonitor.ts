import { useEffect, useState } from 'react';
import { healthMonitorManager } from '../services/health/HealthMonitorManager';

export function useHealthMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    healthMonitorManager.startMonitoring();
    setIsMonitoring(true);

    return () => {
      healthMonitorManager.stopMonitoring();
      setIsMonitoring(false);
    };
  }, []);

  return { isMonitoring };
}