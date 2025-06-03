import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaQuestionCircle, FaChartBar, FaSignOutAlt, FaTrophy,
  FaSun, FaMoon, FaDesktop, FaBrain
} from 'react-icons/fa';
import { FiMenu, FiX, FiUser, FiSettings, FiChevronDown } from 'react-icons/fi';
import useLocalStorage from '../hooks/useLocalStorage';
import { useTheme, useThemeClasses } from '../contexts/ThemeContext';

export default function Navbar() {
  const [name, , removeName] = useLocalStorage('quizUserName', '');
  const [userStats] = useLocalStorage('quizUserStats', { totalQuizzes: 0, bestScore: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme, toggleTheme, resolvedTheme } = useTheme();
  const themeClasses = useThemeClasses();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Détection du scroll pour effet glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    removeName();
    setShowUserMenu(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Accueil', icon: FaHome },
    ...(name ? [
      { path: '/quiz', label: 'Quiz', icon: FaQuestionCircle },
      { path: '/results', label: 'Résultats', icon: FaChartBar },
      { path: '/leaderboard', label: 'Classement', icon: FaTrophy },
    ] : [])
  ];

  const themeOptions = [
    { value: 'light', label: 'Clair', icon: FaSun },
    { value: 'dark', label: 'Sombre', icon: FaMoon },
    { value: 'auto', label: 'Auto', icon: FaDesktop },
  ];

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return FaSun;
      case 'dark': return FaMoon;
      case 'auto': return FaDesktop;
      default: return FaSun;
    }
  };

  const ThemeIcon = getThemeIcon();

  return (
    <motion.nav 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? `${themeClasses.navbarBg} border-b ${themeClasses.border} shadow-lg`
          : `${themeClasses.navbarBg} border-b ${themeClasses.border}`
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo avec animation améliorée */}
          <Link to="/" className="flex items-center group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaBrain className="text-indigo-600 dark:text-indigo-400 text-3xl" />
              </motion.div>
              
              {/* Effet de lueur */}
              <motion.div
                className="absolute inset-0 bg-indigo-500/20 rounded-full blur-lg"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <div className="ml-3 hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                QuizMaster
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Pro Edition
              </div>
            </div>
          </Link>

          {/* Navigation Desktop avec design moderne */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <motion.div key={path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(path)
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                      : `${themeClasses.textSecondary} ${themeClasses.hoverBg} hover:text-indigo-600 dark:hover:text-indigo-400`
                  }`}
                >
                  <Icon className="text-base" />
                  {label}
                  
                  {/* Effet de lueur pour l'élément actif */}
                  {isActive(path) && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-30"
                      layoutId="navGlow"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Contrôles Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Toggle Thème */}
            <div className="relative">
              <motion.button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={`p-2 rounded-xl ${themeClasses.hoverBg} transition-colors relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Changer le thème"
              >
                <ThemeIcon className={`text-lg ${themeClasses.textSecondary}`} />
                
                {/* Effet de particules */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl"
                  animate={{ 
                    opacity: resolvedTheme === 'light' ? [0, 0.3, 0] : [0, 0.2, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>

              {/* Menu Thème */}
              <AnimatePresence>
                {showThemeMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className={`absolute right-0 mt-2 w-40 ${themeClasses.bgCard} rounded-xl ${themeClasses.shadow} border ${themeClasses.border} py-2 z-50`}
                  >
                    {themeOptions.map(({ value, label, icon: Icon }) => (
                      <motion.button
                        key={value}
                        onClick={() => {
                          setTheme(value as any);
                          setShowThemeMenu(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          theme === value 
                            ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' 
                            : `${themeClasses.textSecondary} ${themeClasses.hoverBg}`
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <Icon className="text-base" />
                        {label}
                        {theme === value && (
                          <motion.div
                            layoutId="themeCheck"
                            className="ml-auto w-2 h-2 bg-indigo-500 rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Menu Utilisateur */}
            {name ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border ${themeClasses.border} transition-all duration-300 hover:shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    animate={{ 
                      boxShadow: [
                        "0 4px 6px -1px rgba(79, 70, 229, 0.3)",
                        "0 10px 15px -3px rgba(79, 70, 229, 0.4)",
                        "0 4px 6px -1px rgba(79, 70, 229, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {name.charAt(0).toUpperCase()}
                  </motion.div>
                  
                  <div className="text-left hidden lg:block">
                    <div className={`text-sm font-semibold ${themeClasses.textPrimary}`}>
                      {name}
                    </div>
                    <div className={`text-xs ${themeClasses.textMuted}`}>
                      Best: {userStats.bestScore}% • Quiz: {userStats.totalQuizzes}
                    </div>
                  </div>
                  
                  <FiChevronDown className={`text-sm ${themeClasses.textMuted} transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Dropdown User Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className={`absolute right-0 mt-2 w-72 ${themeClasses.bgCard} rounded-2xl ${themeClasses.shadow} border ${themeClasses.border} py-3 z-50`}
                    >
                      {/* Header Utilisateur */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className={`font-semibold ${themeClasses.textPrimary}`}>
                              {name}
                            </div>
                            <div className={`text-sm ${themeClasses.textMuted}`}>
                              Membre depuis aujourd'hui
                            </div>
                          </div>
                        </div>
                        
                        {/* Stats rapides */}
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div className={`text-center p-2 rounded-lg ${themeClasses.bgTertiary}`}>
                            <div className={`text-lg font-bold ${themeClasses.textPrimary}`}>
                              {userStats.totalQuizzes}
                            </div>
                            <div className={`text-xs ${themeClasses.textMuted}`}>
                              Quiz Complétés
                            </div>
                          </div>
                          <div className={`text-center p-2 rounded-lg ${themeClasses.bgTertiary}`}>
                            <div className={`text-lg font-bold text-green-600 dark:text-green-400`}>
                              {userStats.bestScore}%
                            </div>
                            <div className={`text-xs ${themeClasses.textMuted}`}>
                              Meilleur Score
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${themeClasses.textSecondary} ${themeClasses.hoverBg} hover:translate-x-1`}
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiUser className="text-indigo-500" />
                          Mon Profil
                          <div className="ml-auto text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                            Nouveau
                          </div>
                        </Link>
                        
                        <Link
                          to="/settings"
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${themeClasses.textSecondary} ${themeClasses.hoverBg} hover:translate-x-1`}
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiSettings className={themeClasses.textMuted} />
                          Paramètres
                        </Link>
                      </div>

                      {/* Déconnexion */}
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                        <motion.button
                          onClick={handleLogout}
                          className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-all duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:translate-x-1`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaSignOutAlt />
                          Déconnexion
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/home"
                  className="relative px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl overflow-hidden group"
                >
                  <span className="relative z-10">Commencer</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Toggle thème mobile */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${themeClasses.hoverBg} transition-colors`}
              whileTap={{ scale: 0.95 }}
            >
              <ThemeIcon className={`text-lg ${themeClasses.textSecondary}`} />
            </motion.button>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${themeClasses.hoverBg} transition-colors`}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX size={24} className={themeClasses.textPrimary} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu size={24} className={themeClasses.textPrimary} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Navigation Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${themeClasses.bgCard} border-t ${themeClasses.border} backdrop-blur-xl`}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to={path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive(path) 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                        : `${themeClasses.textSecondary} ${themeClasses.hoverBg}`
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="text-lg" />
                    {label}
                  </Link>
                </motion.div>
              ))}
              
              <div className={`border-t ${themeClasses.border} pt-4 mt-4`}>
                {name ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className={`px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl mb-3 border ${themeClasses.border}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
                          {name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className={`font-semibold ${themeClasses.textPrimary}`}>
                            {name}
                          </div>
                          <div className={`text-sm ${themeClasses.textMuted}`}>
                            Quiz: {userStats.totalQuizzes} • Best: {userStats.bestScore}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors`}
                    >
                      <FaSignOutAlt />
                      Déconnexion
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      to="/home"
                      className="block w-full text-center px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Commencer
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlays pour fermer les menus */}
      {(showUserMenu || showThemeMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowUserMenu(false);
            setShowThemeMenu(false);
          }}
        />
      )}
    </motion.nav>
  );
}