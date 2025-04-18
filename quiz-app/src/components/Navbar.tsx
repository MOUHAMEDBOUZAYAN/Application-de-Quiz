import { Link, useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { FaHome, FaQuestionCircle, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { FaBrain } from 'react-icons/fa'; // Using brain icon for logo

export default function Navbar() {
  const [name, , removeName] = useLocalStorage('quizUserName', '');
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeName();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo - Icon only on mobile, icon+text on desktop */}
          <Link to="/" className="flex items-center">
            <FaBrain className="text-indigo-600 text-2xl mr-2" />
            <span className="hidden sm:inline text-xl font-bold text-indigo-600">
              QuizMaster Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center gap-1 text-sm font-medium ${
                isActive('/')
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaHome /> Accueil
            </Link>
            {name && (
              <>
                <Link
                  to="/quiz"
                  className={`flex items-center gap-1 text-sm font-medium ${
                    isActive('/quiz')
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FaQuestionCircle /> Quiz
                </Link>
                <Link
                  to="/results"
                  className={`flex items-center gap-1 text-sm font-medium ${
                    isActive('/results')
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FaChartBar /> Résultats
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* User/Login - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {name ? (
              <>
                <span className="text-sm text-gray-700 font-semibold">👤 {name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1"
                >
                  <FaSignOutAlt /> Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/home"
                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Commencer
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaHome className="inline mr-2" /> Accueil
            </Link>
            {name && (
              <>
                <Link
                  to="/quiz"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/quiz') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaQuestionCircle className="inline mr-2" /> Quiz
                </Link>
                <Link
                  to="/results"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/results') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaChartBar className="inline mr-2" /> Résultats
                </Link>
              </>
            )}
            <div className="border-t border-gray-200 pt-4">
              {name ? (
                <>
                  <div className="px-3 py-2 text-gray-700">👤 {name}</div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <FaSignOutAlt className="inline mr-2" /> Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  to="/home"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Commencer
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}