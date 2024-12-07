import React from 'react';
import { Rocket, Shield, Users } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medical Device Quality Management Training
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master ISO 13485:2016 and quality management systems for medical devices
            through our comprehensive training platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Shield className="h-8 w-8 text-blue-600" />,
              title: 'ISO 13485:2016',
              description: 'Comprehensive coverage of quality management systems requirements'
            },
            {
              icon: <Users className="h-8 w-8 text-blue-600" />,
              title: 'Interactive Learning',
              description: 'Engage with real-world scenarios and practical exercises'
            },
            {
              icon: <Rocket className="h-8 w-8 text-blue-600" />,
              title: 'Certification',
              description: 'Earn recognized certificates upon course completion'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700">
            Start Learning Today
          </button>
        </div>
      </div>
    </div>
  );
}