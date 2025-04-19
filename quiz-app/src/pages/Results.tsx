import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { FiHome, FiRepeat } from 'react-icons/fi';
import { FaMedal, FaUserGraduate, FaBrain } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Results() {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };
  const [name] = useLocalStorage('quizUserName', '');
  const navigate = useNavigate();

  const percentage = Math.round((score / total) * 100);

  const getResultColor = () => {
    if (percentage >= 80) return 'from-green-400 to-emerald-600';
    if (percentage >= 50) return 'from-yellow-400 to-amber-600';
    return 'from-red-400 to-rose-600';
  };

  const getResultMessage = () => {
    if (percentage >= 90) return '🏆 Exceptionnel ! Vous avez tout réussi !';
    if (percentage >= 70) return '⭐ Excellent travail ! Vous maîtrisez le sujet.';
    if (percentage >= 50) return '💡 Bon effort ! Continuez à apprendre.';
    if (percentage >= 30) return '🧠 Continuez à pratiquer !';
    return '🔄 Pas de souci, réessayez !';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-blue-600/10 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r ${getResultColor()} p-8 text-center relative`}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-white text-5xl drop-shadow-lg">
                <FaMedal />
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-wide pt-6">
                Résultats du Quiz
              </h1>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-xl text-gray-800 mb-3 flex justify-center items-center gap-3">
                  <FaUserGraduate className="text-indigo-500 text-2xl" />
                  <span className="font-medium">{name}</span>, vous avez obtenu
                </p>
                <p className="text-6xl font-bold mb-3 text-indigo-600">{percentage}%</p>
                <p className="text-2xl mb-4">
                  <span className="font-bold">{score}</span> / <span className="font-bold">{total}</span> bonnes réponses
                </p>
                <p className={`text-xl font-semibold ${
                  percentage >= 80 ? 'text-green-700' :
                  percentage >= 50 ? 'text-yellow-700' : 'text-red-600'
                }`}>
                  {getResultMessage()}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-300 rounded-full h-4 mb-10 overflow-hidden shadow-inner">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getResultColor()} transition-all duration-1000`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={() => navigate('/')}
                  className="flex-1 flex items-center justify-center gap-3 bg-indigo-600 text-white px-6 py-4 rounded-xl hover:bg-indigo-700 transition text-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiHome className="text-xl" /> Accueil
                </motion.button>
                <motion.button
                  onClick={() => navigate('/quiz')}
                  className="flex-1 flex items-center justify-center gap-3 bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-4 rounded-xl hover:bg-indigo-50 transition text-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiRepeat className="text-xl" /> Réessayer
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}