import React from 'react';
import { Clock, Award, Target } from 'lucide-react';

interface MetricProps {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
}

function Metric({ icon: Icon, label, value, subtext }: MetricProps) {
  return (
    <div className="text-center p-4 bg-blue-50 rounded-lg">
      <Icon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xs text-gray-500">{subtext}</div>
    </div>
  );
}

export function LearningMetrics() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Metric
        icon={Clock}
        label="Learning Time"
        value="24h"
        subtext="This Month"
      />
      <Metric
        icon={Award}
        label="Certificates"
        value="3"
        subtext="Completed"
      />
      <Metric
        icon={Target}
        label="Progress"
        value="78%"
        subtext="Overall"
      />
    </div>
  );
}