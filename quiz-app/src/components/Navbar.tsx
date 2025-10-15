import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaQuestionCircle, FaChartBar, FaSignOutAlt, FaTrophy,
  FaSun, FaMoon, FaDesktop, FaBrain, FaRocket, FaGem
} from 'react-icons/fa';
import { FiMenu, FiX, FiUser, FiSettings, FiChevronDown, FiZap } from 'react-icons/fi';
import useLocalStorage from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [name, , removeName] = useLocalStorage('quizUserName', '');
  const [userStats] = useLocalStorage('quizUserStats', { totalQuizzes: 0, bestScore: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme, toggleTheme, resolvedTheme } = useTheme();
  
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
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl shadow-blue-500/10'
          : 'bg-slate-900/90 backdrop-blur-lg border-b border-slate-800/30'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo avec design sombre et professionnel */}
          <Link to="/" className="flex items-center group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaBrain className="text-white text-xl" />
                
                {/* Effet de lueur animé - réduit */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-sm opacity-30"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
            
            <div className="ml-4 hidden sm:block">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  QuizMaster
                </span>
                <motion.div
                  className="flex items-center gap-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaGem className="text-yellow-400 text-sm" />
                  <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full font-semibold">
                    Pro
                  </span>
                </motion.div>
              </motion.div>
              <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <FiZap className="text-blue-400" />
                Powered by AI
              </div>
            </div>
          </Link>

          {/* Navigation Desktop avec style sombre professionnel */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <motion.div key={path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(path)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700/50'
                  }`}
                >
                  <Icon className="text-base" />
                  {label}
                  
                  {/* Effet de lueur pour l'élément actif */}
                  {isActive(path) && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30"
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
            {/* Toggle Thème avec style sombre */}
            <div className="relative">
              <motion.button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 relative overflow-hidden border border-transparent hover:border-slate-700/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Changer le thème"
              >
                <ThemeIcon className="text-lg" />
                
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

              {/* Menu Thème avec style sombre */}
              <AnimatePresence>
                {showThemeMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 py-2 z-50"
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
                            ? 'bg-blue-500/20 text-blue-300 border-l-2 border-blue-400' 
                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <Icon className="text-base" />
                        {label}
                        {theme === value && (
                          <motion.div
                            layoutId="themeCheck"
                            className="ml-auto w-2 h-2 bg-blue-400 rounded-full"
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Menu Utilisateur avec style sombre */}
            {name ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
                    animate={{ 
                      boxShadow: [
                        "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
                        "0 10px 15px -3px rgba(147, 51, 234, 0.4)",
                        "0 4px 6px -1px rgba(59, 130, 246, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {name.charAt(0).toUpperCase()}
                  </motion.div>
                  
                  <div className="text-left hidden lg:block">
                    <div className="text-sm font-semibold text-white">
                      {name}
                    </div>
                    <div className="text-xs text-slate-400">
                      Best: {userStats.bestScore}% • Quiz: {userStats.totalQuizzes}
                    </div>
                  </div>
                  
                  <FiChevronDown className={`text-sm text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Dropdown User Menu avec style sombre */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-72 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 py-3 z-50"
                    >
                      {/* Header Utilisateur */}
                      <div className="px-4 py-3 border-b border-slate-700/50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              {name}
                            </div>
                            <div className="text-sm text-slate-400">
                              Membre depuis aujourd'hui
                            </div>
                          </div>
                        </div>
                        
                        {/* Stats rapides */}
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div className="text-center p-2 rounded-lg bg-slate-700/50">
                            <div className="text-lg font-bold text-white">
                              {userStats.totalQuizzes}
                            </div>
                            <div className="text-xs text-slate-400">
                              Quiz Complétés
                            </div>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-slate-700/50">
                            <div className="text-lg font-bold text-green-400">
                              {userStats.bestScore}%
                            </div>
                            <div className="text-xs text-slate-400">
                              Meilleur Score
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-700/50 hover:translate-x-1"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiUser className="text-blue-400" />
                          Mon Profil
                          <div className="ml-auto text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                            Nouveau
                          </div>
                        </Link>
                        
                        <Link
                          to="/settings"
                          className="flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-700/50 hover:translate-x-1"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiSettings className="text-slate-400" />
                          Paramètres
                        </Link>
                      </div>

                      {/* Déconnexion */}
                      <div className="border-t border-slate-700/50 pt-2">
                        <motion.button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm transition-all duration-200 text-red-400 hover:bg-red-500/10 hover:translate-x-1"
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
                  className="relative px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/25 overflow-hidden group border border-blue-400/30"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FaRocket className="text-sm" />
                    Commencer
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button avec style sombre */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Toggle thème mobile */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <ThemeIcon className="text-lg" />
            </motion.button>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
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
                    <FiX size={24} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu size={24} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Navigation Mobile avec style sombre */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-slate-700/50"
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
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border border-blue-400/30' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="text-lg" />
                    {label}
                  </Link>
                </motion.div>
              ))}
              
              <div className="border-t border-slate-700/50 pt-4 mt-4">
                {name ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="px-4 py-3 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl mb-3 border border-slate-600/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
                          {name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-white">
                            {name}
                          </div>
                          <div className="text-sm text-slate-400">
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
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:bg-red-500/10 transition-colors"
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
                      className="block w-full text-center px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg border border-blue-400/30"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <FaRocket className="text-sm" />
                        Commencer
                      </span>
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