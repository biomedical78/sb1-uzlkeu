import React from 'react';
import { Check, Star } from 'lucide-react';

export function PricingBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-500/20 rounded-full px-4 py-2 mb-6">
          <Star className="h-5 w-5 text-yellow-300" />
          <span className="text-white font-medium">Special Launch Offer</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">
          Complete Medical Device Training
        </h2>
        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
          <div className="text-5xl font-bold text-white mb-4">
            $499
            <span className="text-lg font-normal text-blue-200">/lifetime access</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-6">
            {[
              'All 6 core training categories',
              'Downloadable resources & templates',
              'Interactive quizzes & assessments',
              'Certificate of completion',
              'Lifetime access to updates',
              'Community forum access'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-white">
                <Check className="h-5 w-5 text-blue-200" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}