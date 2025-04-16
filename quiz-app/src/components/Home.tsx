import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { FiUser, FiArrowRight, FiAward, FiClock, FiHelpCircle } from 'react-icons/fi';

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 to-purple-900/70"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-indigo-400/20 blur-xl"></div>
      <div className="absolute bottom-1/4 right-20 w-24 h-24 rounded-full bg-purple-400/20 blur-xl"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-white/10 blur-lg"></div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <FiAward className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-white">Quiz Challenge</h1>
            <p className="text-indigo-100 mt-2">Prove your knowledge!</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2 flex items-center">
                <FiUser className="mr-2" />
                Enter Your Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="Your name here"
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/70"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
                />
                <FiUser className="absolute left-3 top-3.5 text-gray-500" />
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              disabled={!name.trim()}
              className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-medium text-white transition-all transform hover:scale-[1.02] ${
                name.trim()
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Start Challenge
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Additional info cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-indigo-50/70 p-3 rounded-lg border border-indigo-100 flex items-start">
                <FiClock className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800">15 min</h3>
                  <p className="text-xs text-gray-600">Time limit</p>
                </div>
              </div>
              <div className="bg-purple-50/70 p-3 rounded-lg border border-purple-100 flex items-start">
                <FiHelpCircle className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800">10 Qs</h3>
                  <p className="text-xs text-gray-600">Questions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50/50 px-6 py-4 text-center border-t border-gray-100/50">
            <p className="text-xs text-gray-600 flex items-center justify-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
              Your progress will be saved automatically
            </p>
          </div>
        </div>
      </div>

      {/* Floating quiz elements */}
      <div className="absolute bottom-10 left-10 animate-float">
        <div className="bg-white/10 p-3 rounded-full border border-white/20 backdrop-blur-sm">
          <span className="text-white">?</span>
        </div>
      </div>
      <div className="absolute top-20 right-10 animate-float-delay">
        <div className="bg-indigo-400/20 p-3 rounded-full border border-indigo-300/20 backdrop-blur-sm">
          <span className="text-white">A</span>
        </div>
      </div>
    </div>
  );
}