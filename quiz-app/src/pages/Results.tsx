import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { FiHome, FiRepeat } from 'react-icons/fi';
import { FaMedal, FaUserGraduate } from 'react-icons/fa';

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
    if (percentage >= 90) return '🏆 Exceptional! You nailed it!';
    if (percentage >= 70) return '⭐ Great job! You know your stuff.';
    if (percentage >= 50) return '💡 Good effort! Keep learning.';
    if (percentage >= 30) return '🧠 Keep practicing!';
    return '🔄 Don’t worry, try again!';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8 bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="w-full max-w-xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getResultColor()} p-6 text-center relative`}>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-white text-4xl drop-shadow-lg">
            <FaMedal />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide pt-4">Quiz Results</h1>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-xl text-gray-800 mb-2 flex justify-center items-center gap-2">
              <FaUserGraduate className="text-indigo-500" />
              <span className="font-medium">{name}</span>, you scored <span className="font-bold">{score}</span> out of <span className="font-bold">{total}</span>
            </p>
            <p className="text-5xl font-bold mb-2 text-indigo-600">{percentage}%</p>
            <p className={`text-lg font-semibold ${
              percentage >= 80 ? 'text-green-700' :
              percentage >= 50 ? 'text-yellow-700' : 'text-red-600'
            }`}>
              {getResultMessage()}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-300 rounded-full h-5 mb-8 overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getResultColor()} transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              <FiHome className="text-lg" /> Home
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition"
            >
              <FiRepeat className="text-lg" /> Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
