import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle, XCircle } from 'lucide-react';
import { HealthMonitor } from '../../../services/health/HealthMonitor';

export function HealthStatus() {
  const [statuses, setStatuses] = useState<Record<string, boolean>>({});
  const monitor = HealthMonitor.getInstance();

  useEffect(() => {
    const updateStatuses = async () => {
      const newStatuses: Record<string, boolean> = {};
      for (const name of ['sessions', 'database', 'memory']) {
        newStatuses[name] = await monitor.runHealthCheck(name);
      }
      setStatuses(newStatuses);
    };

    updateStatuses();
    const interval = setInterval(updateStatuses, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold">System Health</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(statuses).map(([name, isHealthy]) => (
          <div key={name} className="flex items-center justify-between">
            <span className="capitalize">{name}</span>
            {isHealthy ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}