import { Link, useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { FaHome, FaQuestionCircle, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const [name, , removeName] = useLocalStorage('quizUserName', '');
  const location = useLocation();

  const handleLogout = () => {
    removeName();
    window.location.href = '/';
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et liens gauche */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                QuizMaster Pro
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <FaHome className="mr-1" /> Accueil
              </Link>
              {name && (
                <>
                  <Link
                    to="/home"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/home')
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <FaQuestionCircle className="mr-1" /> Nouveau Quiz
                  </Link>
                  <Link
                    to="/results"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/results')
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <FaChartBar className="mr-1" /> Résultats
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Droite - profil utilisateur */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {name ? (
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">Bonjour, {name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
                  >
                    <FaSignOutAlt className="mr-1" /> Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/home"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Commencer
              </Link>
            )}
          </div>

          {/* Menu mobile */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile (hidden by default) */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/')
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            }`}
          >
            <FaHome className="inline mr-2" /> Accueil
          </Link>
          {name && (
            <>
              <Link
                to="/home"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/home')
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                <FaQuestionCircle className="inline mr-2" /> Nouveau Quiz
              </Link>
              <Link
                to="/results"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/results')
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                <FaChartBar className="inline mr-2" /> Résultats
              </Link>
            </>
          )}
        </div>
        {name && (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{name}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <FaSignOutAlt className="inline mr-2" /> Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}