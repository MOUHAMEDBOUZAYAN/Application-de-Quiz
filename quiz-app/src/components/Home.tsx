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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-2">
              Quiz Challenge
            </h1>
            <p className="text-gray-600 font-medium">Testez vos connaissances dès maintenant !</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                VOTRE NOM
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="Votre prénom"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  aria-label="Entrez votre nom pour commencer le quiz"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartQuiz}
              disabled={!name.trim()}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                name.trim()
                  ? 'bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              COMMENCER LE QUIZ
            </button>
          </div>

          {/* Nouveaux éléments sous le bouton */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-center font-medium text-gray-700 mb-3">Ce qui vous attend :</h3>
            <ul className="space-y-3">
              {[
                "10 questions variées",
                "Thèmes multiples au choix",
                "Score en temps réel",
                "Correction détaillée",
                "Classement des meilleurs scores"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Quiz Master | Conçu pour les passionnés de savoir
          </p>
        </div>
      </div>
    </div>
  );
}