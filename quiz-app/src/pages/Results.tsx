import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { FiHome, FiRepeat } from 'react-icons/fi';

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
    if (percentage >= 90) return 'Exceptional! You nailed it!';
    if (percentage >= 70) return 'Great job! You know your stuff.';
    if (percentage >= 50) return 'Good effort! Keep learning.';
    if (percentage >= 30) return 'Keep practicing!';
    return 'Don\'t worry, try again!';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getResultColor()} p-6 text-center relative`}>
          <h1 className="text-3xl font-bold text-white">Quiz Results</h1>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-xl text-gray-700 mb-2">
              {name}, you scored <span className="font-bold">{score}</span> out of <span className="font-bold">{total}</span>
            </p>
            <p className="text-4xl font-bold mb-2">{percentage}%</p>
            <p className={`text-lg font-medium ${
              percentage >= 80 ? 'text-green-600' :
              percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {getResultMessage()}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
            <div
              className={`h-4 rounded-full bg-gradient-to-r ${getResultColor()}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FiHome /> Home
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <FiRepeat /> Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}