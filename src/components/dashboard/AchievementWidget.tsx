import React from 'react';
import { Award, Trophy, Target } from 'lucide-react';

export function AchievementWidget() {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-sm p-6 text-white mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Your Achievements</h2>
        <Trophy className="h-6 w-6" />
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="bg-white/10 rounded-lg p-3 mb-2">
            <Award className="h-6 w-6 mx-auto" />
          </div>
          <div className="text-2xl font-bold">4</div>
          <div className="text-xs text-indigo-200">Certificates</div>
        </div>
        <div>
          <div className="bg-white/10 rounded-lg p-3 mb-2">
            <Target className="h-6 w-6 mx-auto" />
          </div>
          <div className="text-2xl font-bold">85%</div>
          <div className="text-xs text-indigo-200">Avg. Score</div>
        </div>
        <div>
          <div className="bg-white/10 rounded-lg p-3 mb-2">
            <Trophy className="h-6 w-6 mx-auto" />
          </div>
          <div className="text-2xl font-bold">12</div>
          <div className="text-xs text-indigo-200">Badges</div>
        </div>
      </div>
    </div>
  );
}