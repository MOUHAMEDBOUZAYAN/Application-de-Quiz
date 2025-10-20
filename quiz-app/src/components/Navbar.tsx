import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  FaHome, FaQuestionCircle, FaChartBar, FaSignOutAlt, FaTrophy,
  FaBrain, FaRocket
} from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Navbar() {
  const [name, , removeName] = useLocalStorage('quizUserName', '');
  const [userStats] = useLocalStorage('quizUserStats', { totalQuizzes: 0, bestScore: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Récupérer le nom directement depuis localStorage comme fallback
  const actualName = name || (typeof window !== 'undefined' ? localStorage.getItem('quizUserName') || '' : '');

  const handleLogout = () => {
    removeName();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Accueil', icon: FaHome },
    ...(actualName ? [
      { path: '/quiz', label: 'Quiz', icon: FaQuestionCircle },
      { path: '/results', label: 'Résultats', icon: FaChartBar },
      { path: '/leaderboard', label: 'Classement', icon: FaTrophy },
    ] : [])
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo simple */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FaBrain className="text-white text-lg" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">QuizMaster</div>
              <div className="text-xs text-slate-400">Powered by AI</div>
            </div>
          </Link>

          {/* Navigation simple */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(path)
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="text-sm" />
                {label}
              </Link>
            ))}
          </div>

          {/* Bouton Commencer simple et carré */}
          {!actualName && (
            <Link
              to="/home"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FaRocket className="text-sm" />
              Commencer
            </Link>
          )}

          {/* Menu utilisateur simple */}
          {actualName && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-white">{actualName}</div>
                <div className="text-xs text-slate-400">
                  {userStats.totalQuizzes} quiz • Meilleur: {userStats.bestScore}%
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <FaSignOutAlt className="text-sm" />
                Déconnexion
              </button>
            </div>
          )}

          {/* Menu mobile simple */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(path)
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="text-lg" />
                  {label}
                </Link>
              ))}
              
              {!actualName && (
                <Link
                  to="/home"
                  className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaRocket className="text-lg" />
                  Commencer
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}