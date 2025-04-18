import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { FiUser, FiArrowRight, FiAward, FiClock, FiHelpCircle } from 'react-icons/fi';
import { FaLightbulb } from 'react-icons/fa';
import backgroundPattern from '../assets/pattern.png'; // Add a subtle pattern

export default function Home() {
  const [name, setName] = useState('');
  const [, setStoredName] = useLocalStorage('quizUserName', '');
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (!name.trim()) return;
    setStoredName(name);
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-indigo-900 text-white">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{ backgroundImage: `url(${backgroundPattern})` }}
      />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-gradient-to-br from-white/90 to-white/80 text-gray-900 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-3xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl">
              <FiAward className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-white">Quiz Challenge</h1>
            <p className="text-indigo-100 mt-1 text-sm">Test your brain, earn a crown 👑</p>
          </div>

          {/* Input form */}
          <div className="p-8">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2 flex items-center">
              <FiUser className="mr-2" />
              Your Name
            </label>
            <div className="relative mb-6">
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
              />
              <FiUser className="absolute left-3 top-3.5 text-gray-500" />
            </div>

            <button
              onClick={handleStartQuiz}
              disabled={!name.trim()}
              className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                name.trim()
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              Start Challenge <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Quiz info cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-indigo-50/90 p-4 rounded-lg border border-indigo-100 flex items-start gap-3 hover:bg-indigo-100 transition-colors duration-200">
                <FiClock className="text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">15 min</h3>
                  <p className="text-xs text-gray-600">Time limit</p>
                </div>
              </div>
              <div className="bg-purple-50/90 p-4 rounded-lg border border-purple-100 flex items-start gap-3 hover:bg-purple-100 transition-colors duration-200">
                <FiHelpCircle className="text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">10 Questions</h3>
                  <p className="text-xs text-gray-600">Mix of topics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50/80 px-6 py-4 text-center border-t border-white/20">
            <p className="text-xs text-gray-600 flex items-center justify-center">
              <FaLightbulb className="mr-2 text-yellow-500" />
              Your progress is saved automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}