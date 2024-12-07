import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { trainingSessionManager } from '../../services/training-session';

interface SessionManagerProps {
  courseId: string;
  userId: string;
  onSessionStart: () => void;
}

export function SessionManager({ courseId, userId, onSessionStart }: SessionManagerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCount(trainingSessionManager.getActiveSessionCount());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStartSession = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!trainingSessionManager.isSessionAvailable()) {
        throw new Error('No training slots available. Please try again later.');
      }

      await trainingSessionManager.startSession(courseId, userId);
      onSessionStart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start training session');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Training Session</h2>
        <div className="text-sm text-gray-500">
          Active Sessions: {activeCount}/20
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {trainingSessionManager.isSessionAvailable() ? (
        <button
          onClick={handleStartSession}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Starting Session...' : 'Start Training Session'}
        </button>
      ) : (
        <div className="p-3 bg-yellow-50 text-yellow-700 rounded-md">
          All training slots are currently in use. Please try again later.
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        <CheckCircle className="h-4 w-4 inline mr-2" />
        Sessions are automatically managed for optimal performance
      </div>
    </div>
  );
}