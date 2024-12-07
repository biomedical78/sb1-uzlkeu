import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Rocket, Zap } from 'lucide-react';

export function WelcomeBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-12"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiLz48L2c+PC9zdmc+')] opacity-20" />
      
      <div className="relative z-10">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-4 mb-8"
        >
          <div className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white/10 backdrop-blur-xl rounded-full px-4 py-1">
              <Sparkles className="h-4 w-4 text-yellow-300 mr-2" />
              <span className="text-sm font-medium text-white">AI-Enhanced Learning</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-xl rounded-full px-4 py-1">
              <Zap className="h-4 w-4 text-cyan-300 mr-2" />
              <span className="text-sm font-medium text-white">Real-time Progress</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to the Future of Medical Device Training
          </h1>
          <p className="text-lg text-indigo-100">
            Experience personalized, adaptive learning powered by AI. Master quality management 
            and regulatory compliance through immersive, interactive training modules.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white text-indigo-600 px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            <Rocket className="h-5 w-5" />
            <span>Start Your Journey</span>
          </motion.button>
          <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-full hover:bg-white/20 transition-colors">
            <span>View Curriculum</span>
          </button>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-violet-500/30 to-indigo-500/30 rounded-full blur-3xl"
      />
    </motion.div>
  );
}