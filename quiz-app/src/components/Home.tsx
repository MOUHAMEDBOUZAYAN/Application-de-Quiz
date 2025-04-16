import { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleStartQuiz = (): void => {
    if (name.trim()) {
      localStorage.setItem('playerName', name);
      navigate('/quiz');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleStartQuiz();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-2">
            Quiz Challenge
          </h1>
          <p className="text-gray-600">Test your knowledge and have fun!</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={!name.trim()}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              name.trim()
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Start Quiz
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>You'll face 10 questions with multiple choices</p>
          <p className="mt-1">Good luck!</p>
        </div>
      </div>

      <footer className="mt-8 text-white text-sm">
        <p>© {new Date().getFullYear()} Quiz App - Test Your Knowledge</p>
      </footer>
    </div>
  );
}