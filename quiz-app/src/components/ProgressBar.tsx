import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiTarget, FiTrendingUp, FiZap } from 'react-icons/fi';
import { FaStar, FaTrophy } from 'react-icons/fa';

type ProgressBarProps = {
  current: number;
  total: number;
  score?: number;
  timeElapsed?: number;
  averageTimePerQuestion?: number;
  streak?: number;
  showDetailedStats?: boolean;
};

export default function ProgressBar({ 
  current, 
  total, 
  score = 0,
  timeElapsed = 0,
  averageTimePerQuestion = 0,
  streak = 0,
  showDetailedStats = true
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  const scorePercentage = current > 0 ? Math.round((score / current) * 100) : 0;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressGradient = (percentage: number) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600';
    if (percentage >= 60) return 'from-yellow-500 to-amber-600';
    if (percentage >= 40) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="w-full mb-8 space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Progression</p>
              <p className="text-2xl font-bold text-indigo-600">{current}/{total}</p>
            </div>
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FiTarget className="text-indigo-600 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Score Actuel</p>
              <p className={`text-2xl font-bold ${getScoreColor(scorePercentage)}`}>
                {scorePercentage}%
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiCheckCircle className="text-purple-600 text-xl" />
            </div>
          </div>
        </motion.div>

        {showDetailedStats && (
          <>
            <motion.div 
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Temps</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatTime(timeElapsed)}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiClock className="text-blue-600 text-xl" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Série</p>
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-bold text-yellow-600">{streak}</p>
                    {streak >= 3 && <FiZap className="text-yellow-500" />}
                  </div>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FaTrophy className="text-yellow-600 text-xl" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Barre de progression principale */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-medium text-gray-700">
          <span>Progression du Quiz</span>
          <span>{Math.round(percentage)}% Complété</span>
        </div>
        
        <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${getProgressGradient(scorePercentage)} shadow-lg`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          
          {/* Indicateur de position actuelle */}
          <motion.div
            className="absolute top-0 w-1 h-full bg-white shadow-lg"
            initial={{ left: '0%' }}
            animate={{ left: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Barre de score */}
      {current > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium text-gray-700">
            <span>Score de Précision</span>
            <span className={getScoreColor(scorePercentage)}>
              {score}/{current} correct{score !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${getProgressGradient(scorePercentage)}`}
              initial={{ width: 0 }}
              animate={{ width: `${scorePercentage}%` }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>
      )}

      {/* Statistiques détaillées */}
      {showDetailedStats && current > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <FiTrendingUp className="text-blue-500" />
              <span className="text-sm font-medium">Temps Moyen</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {averageTimePerQuestion > 0 ? `${averageTimePerQuestion.toFixed(1)}s` : '--'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <FaStar className="text-yellow-500" />
              <span className="text-sm font-medium">Rythme</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {averageTimePerQuestion < 15 ? 'Rapide' : 
               averageTimePerQuestion < 25 ? 'Moyen' : 'Réfléchi'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <FiZap className="text-orange-500" />
              <span className="text-sm font-medium">Performance</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {scorePercentage >= 90 ? 'Excellent' :
               scorePercentage >= 75 ? 'Très Bien' :
               scorePercentage >= 60 ? 'Bien' :
               scorePercentage >= 40 ? 'Moyen' : 'À Améliorer'}
            </p>
          </div>
        </div>
      )}

      {/* Messages de motivation */}
      {streak >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3"
        >
          <div className="flex items-center gap-2 text-yellow-800">
            <FiZap className="text-yellow-600" />
            <span className="font-semibold">Série Impressionnante!</span>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            Vous êtes en feu! {streak} bonnes réponses d'affilée! 🔥
          </p>
        </motion.div>
      )}

      {scorePercentage === 100 && current >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3"
        >
          <div className="flex items-center gap-2 text-green-800">
            <FaTrophy className="text-green-600" />
            <span className="font-semibold">Performance Parfaite!</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Score parfait jusqu'à présent! Continuez comme ça! ⭐
          </p>
        </motion.div>
      )}
    </div>
  );
}