import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Trophy, Target, Sparkles } from 'lucide-react';

export function LearningProgress() {
  const progress = 65;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 rounded-2xl p-8 mb-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/5 bg-grid-16" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <Brain className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold text-white">Your Learning Journey</h2>
                <div className="flex items-center bg-indigo-500/10 rounded-full px-3 py-1">
                  <Sparkles className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-xs font-medium text-indigo-300">Level 7</span>
                </div>
              </div>
              <p className="text-gray-400">Making consistent progress</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { icon: Trophy, label: 'Achievements', value: '12', color: 'text-yellow-400' },
            { icon: Target, label: 'Course Progress', value: '65%', color: 'text-emerald-400' },
            { icon: Zap, label: 'Skill Points', value: '1,234', color: 'text-purple-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <motion.div
              key={label}
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 rounded-xl p-4 backdrop-blur-sm border border-slate-700/50"
            >
              <Icon className={`h-6 w-6 ${color} mb-2`} />
              <div className="text-2xl font-bold text-white mb-1">{value}</div>
              <div className="text-sm text-slate-400">{label}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Overall Progress</span>
            <span className="text-white font-medium">{progress}%</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-grid-white/10 bg-grid-8"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}