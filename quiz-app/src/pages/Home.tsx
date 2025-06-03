import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage from '../hooks/useLocalStorage';
import { useTheme, useThemeClasses } from '../contexts/ThemeContext';
import { fetchCategories, CategoryInfo } from '../utils/api';
import { 
  FiUser, FiArrowRight, 
  FiBarChart2, FiZap, FiStar, FiTrendingUp, FiShield,
  FiSettings, FiTarget, FiLayers, FiRefreshCw, FiChevronDown
} from 'react-icons/fi';
import { 
  FaLightbulb, FaBrain, FaRocket, FaTrophy, FaFire, FaGem,
  FaBook, FaGamepad, FaFilm, FaMusic, FaFootballBall, FaFlask
} from 'react-icons/fa';

// Types pour les options de quiz
interface QuizOptions {
  name: string;
  category: number | null;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  questionCount: number;
  timeLimit: number;
  type: 'multiple' | 'boolean' | 'mixed';
}

// Interface pour les configurations de suggestion
interface SuggestionConfig {
  category: number | null;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  questionCount: number;
  type: 'multiple' | 'boolean' | 'mixed';
}

export default function Home() {
  const [quizOptions, setQuizOptions] = useState<QuizOptions>({
    name: '',
    category: null,
    difficulty: 'mixed',
    questionCount: 10,
    timeLimit: 30,
    type: 'mixed'
  });
  const [, setStoredName] = useLocalStorage('quizUserName', '');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const themeClasses = useThemeClasses();

  // Charger les catégories au démarrage
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories([
          { id: 0, name: 'Toutes les Catégories' },
          ...fetchedCategories
        ]);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
        // Catégories par défaut si l'API échoue
        setCategories([
          { id: 0, name: 'Toutes les Catégories' },
          { id: 9, name: 'Culture Générale' },
          { id: 17, name: 'Science & Nature' },
          { id: 21, name: 'Sports' },
          { id: 23, name: 'Histoire' },
          { id: 18, name: 'Informatique' },
          { id: 11, name: 'Cinéma' },
          { id: 12, name: 'Musique' }
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const handleStartQuiz = async () => {
    if (!quizOptions.name.trim()) return;
    
    setIsLoading(true);
    
    // Simulation d'un chargement pour l'effet UX
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setStoredName(quizOptions.name);
    
    // Passer les options du quiz via state
    navigate('/quiz', {
      state: {
        category: quizOptions.category === 0 ? null : quizOptions.category,
        difficulty: quizOptions.difficulty === 'mixed' ? null : quizOptions.difficulty,
        questionCount: quizOptions.questionCount,
        timeLimit: quizOptions.timeLimit,
        type: quizOptions.type === 'mixed' ? null : quizOptions.type
      }
    });
  };

  // Données des fonctionnalités avec icônes de catégories
  const categoryIcons: { [key: string]: React.ReactNode } = {
    'Culture Générale': <FaBook className="text-blue-500" />,
    'Science & Nature': <FaFlask className="text-green-500" />,
    'Sports': <FaFootballBall className="text-orange-500" />,
    'Histoire': <FaBook className="text-amber-500" />,
    'Informatique': <FaBrain className="text-purple-500" />,
    'Cinéma': <FaFilm className="text-red-500" />,
    'Musique': <FaMusic className="text-pink-500" />,
    'default': <FaGamepad className="text-indigo-500" />
  };

  const difficultyConfig = {
    easy: { label: 'Facile', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    medium: { label: 'Moyen', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    hard: { label: 'Difficile', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
    mixed: { label: 'Mixte', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' }
  };

  const typeConfig = {
    multiple: { label: 'QCM', icon: <FiLayers />, desc: 'Questions à choix multiples' },
    boolean: { label: 'Vrai/Faux', icon: <FiTarget />, desc: 'Questions binaires' },
    mixed: { label: 'Mixte', icon: <FiSettings />, desc: 'Tous types de questions' }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${themeClasses.bgGradient}`}>
      {/* Éléments de fond animés améliorés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particules flottantes interactives */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${
              i % 4 === 0 ? 'from-indigo-400 to-purple-600' :
              i % 4 === 1 ? 'from-pink-400 to-red-600' :
              i % 4 === 2 ? 'from-cyan-400 to-blue-600' :
              'from-yellow-400 to-orange-600'
            } opacity-30`}
            style={{
              left: `${5 + (i * 12)}%`,
              top: `${15 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}

        {/* Formes géométriques avec thème */}
        <motion.div 
          className={`absolute top-20 left-10 w-40 h-40 ${
            resolvedTheme === 'dark' 
              ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20' 
              : 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20'
          } rounded-full blur-2xl`}
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 py-8 flex items-center justify-center min-h-screen relative z-10">
        <motion.div
          className="w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className={`w-full ${themeClasses.bgCard} rounded-3xl ${themeClasses.shadow} overflow-hidden border ${themeClasses.border}`}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header amélioré */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-center overflow-hidden">
              {/* Éléments décoratifs */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl" />
              
              {/* Badge flottant */}
              <motion.div 
                className="absolute top-6 right-6 bg-yellow-400/20 backdrop-blur-sm border border-yellow-300/30 rounded-full px-4 py-2"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <FaGem className="text-yellow-300 text-sm" />
                  <span className="text-yellow-100 text-xs font-semibold">Premium</span>
                </div>
              </motion.div>

              <motion.div 
                className="relative z-10"
                variants={itemVariants}
              >
                <motion.h1 
                  className="text-4xl sm:text-5xl font-bold text-white flex items-center justify-center gap-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity }
                    }}
                  >
                    <FaBrain className="text-yellow-300 text-3xl sm:text-4xl drop-shadow-lg" />
                  </motion.div>
                  Quiz Personnalisé
                </motion.h1>
                
                <motion.p 
                  className="text-indigo-100 text-lg font-medium mb-4"
                  variants={itemVariants}
                >
                  Créez votre expérience de quiz sur mesure
                </motion.p>

                {/* Indicateurs de personnalisation */}
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { icon: <FiTarget />, label: `${categories.length - 1}+ Catégories` },
                    { icon: <FiLayers />, label: "3 Types" },
                    { icon: <FiBarChart2 />, label: "4 Niveaux" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    >
                      <span className="text-white/80">{item.icon}</span>
                      <span className="text-white text-sm font-medium">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Corps du formulaire */}
            <div className="p-8 space-y-8">
              {/* Section Nom */}
              <motion.div variants={itemVariants}>
                <label 
                  htmlFor="name" 
                  className={`block ${themeClasses.textPrimary} font-semibold mb-4 flex items-center text-lg`}
                >
                  <motion.div
                    className="mr-3 p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FiUser className="text-xl" />
                  </motion.div>
                  Votre nom de joueur
                </label>
                
                <div className="relative group">
                  <input
                    id="name"
                    type="text"
                    placeholder="Entrez votre nom..."
                    className={`w-full px-6 py-4 pl-14 border-2 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-lg font-medium ${themeClasses.inputBg} ${themeClasses.border} group-hover:border-indigo-400`}
                    value={quizOptions.name}
                    onChange={(e) => setQuizOptions(prev => ({ ...prev, name: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
                  />
                  <FiUser className={`absolute left-5 top-1/2 transform -translate-y-1/2 text-xl ${themeClasses.textMuted} group-hover:text-indigo-500 transition-colors`} />
                  
                  {/* Indicateur de validation */}
                  <AnimatePresence>
                    {quizOptions.name.trim() && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <FiZap className="text-white text-sm" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Section Catégorie */}
              <motion.div variants={itemVariants}>
                <label className={`block ${themeClasses.textPrimary} font-semibold mb-4 flex items-center text-lg`}>
                  <div className="mr-3 p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl text-white">
                    <FaBook className="text-xl" />
                  </div>
                  Catégorie de questions
                </label>
                
                <div className="relative">
                  <select
                    className={`w-full px-6 py-4 pr-12 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg appearance-none ${themeClasses.inputBg} ${themeClasses.border}`}
                    value={quizOptions.category || 0}
                    onChange={(e) => setQuizOptions(prev => ({ 
                      ...prev, 
                      category: parseInt(e.target.value) === 0 ? null : parseInt(e.target.value)
                    }))}
                    disabled={loadingCategories}
                  >
                    {loadingCategories ? (
                      <option>Chargement...</option>
                    ) : (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    )}
                  </select>
                  <FiChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-xl ${themeClasses.textMuted} pointer-events-none`} />
                </div>
                
                {/* Aperçu des catégories */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.slice(1, 5).map((category) => (
                    <motion.div
                      key={category.id}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        quizOptions.category === category.id 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                          : `${themeClasses.border} ${themeClasses.bgTertiary} hover:border-blue-400`
                      }`}
                      onClick={() => setQuizOptions(prev => ({ ...prev, category: category.id }))}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        {categoryIcons[category.name] || categoryIcons.default}
                        <span className={`font-medium ${themeClasses.textPrimary} truncate`}>
                          {category.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Section Type de questions */}
              <motion.div variants={itemVariants}>
                <label className={`block ${themeClasses.textPrimary} font-semibold mb-4 flex items-center text-lg`}>
                  <div className="mr-3 p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white">
                    <FiLayers className="text-xl" />
                  </div>
                  Type de questions
                </label>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(typeConfig).map(([key, config]) => (
                    <motion.div
                      key={key}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        quizOptions.type === key 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30' 
                          : `${themeClasses.border} ${themeClasses.bgTertiary} hover:border-purple-400`
                      }`}
                      onClick={() => setQuizOptions(prev => ({ ...prev, type: key as any }))}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                          quizOptions.type === key 
                            ? 'bg-purple-500 text-white' 
                            : `${themeClasses.bgSecondary} ${themeClasses.textSecondary}`
                        }`}>
                          {config.icon}
                        </div>
                        <h3 className={`font-bold mb-1 ${themeClasses.textPrimary}`}>
                          {config.label}
                        </h3>
                        <p className={`text-sm ${themeClasses.textMuted}`}>
                          {config.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Section Options Avancées */}
              <motion.div variants={itemVariants}>
                <motion.button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className={`flex items-center justify-between w-full p-4 rounded-2xl border ${themeClasses.border} ${themeClasses.bgTertiary} hover:bg-opacity-80 transition-all`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-white">
                      <FiSettings className="text-xl" />
                    </div>
                    <div className="text-left">
                      <h3 className={`font-semibold ${themeClasses.textPrimary}`}>
                        Options Avancées
                      </h3>
                      <p className={`text-sm ${themeClasses.textMuted}`}>
                        Difficulté, nombre de questions, temps
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: showAdvanced ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className={`text-xl ${themeClasses.textMuted}`} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 space-y-6"
                    >
                      {/* Difficulté */}
                      <div>
                        <label className={`block ${themeClasses.textPrimary} font-medium mb-3`}>
                          Niveau de difficulté
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {Object.entries(difficultyConfig).map(([key, config]) => (
                            <motion.button
                              key={key}
                              onClick={() => setQuizOptions(prev => ({ ...prev, difficulty: key as any }))}
                              className={`p-3 rounded-xl border-2 transition-all ${
                                quizOptions.difficulty === key 
                                  ? `border-current ${config.bg} ${config.color}` 
                                  : `${themeClasses.border} ${themeClasses.bgTertiary} ${themeClasses.textSecondary} hover:border-gray-400`
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="text-center">
                                <div className={`text-lg font-bold ${config.color}`}>
                                  {config.label}
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Nombre de questions */}
                      <div>
                        <label className={`block ${themeClasses.textPrimary} font-medium mb-3`}>
                          Nombre de questions: {quizOptions.questionCount}
                        </label>
                        <input
                          type="range"
                          min="5"
                          max="50"
                          step="5"
                          value={quizOptions.questionCount}
                          onChange={(e) => setQuizOptions(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
                        />
                        <div className="flex justify-between text-sm mt-2">
                          <span className={themeClasses.textMuted}>5</span>
                          <span className={themeClasses.textMuted}>25</span>
                          <span className={themeClasses.textMuted}>50</span>
                        </div>
                      </div>

                      {/* Temps par question */}
                      <div>
                        <label className={`block ${themeClasses.textPrimary} font-medium mb-3`}>
                          Temps par question: {quizOptions.timeLimit}s
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="120"
                          step="10"
                          value={quizOptions.timeLimit}
                          onChange={(e) => setQuizOptions(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex justify-between text-sm mt-2">
                          <span className={themeClasses.textMuted}>10s</span>
                          <span className={themeClasses.textMuted}>60s</span>
                          <span className={themeClasses.textMuted}>120s</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Récapitulatif des options */}
              <motion.div 
                variants={itemVariants}
                className={`p-6 rounded-2xl ${themeClasses.bgSecondary} border ${themeClasses.border}`}
              >
                <h3 className={`font-bold mb-4 flex items-center gap-2 ${themeClasses.textPrimary}`}>
                  <FiTarget className="text-indigo-500" />
                  Récapitulatif de votre quiz
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className={themeClasses.textMuted}>Catégorie:</span>
                    <span className={`font-medium ${themeClasses.textPrimary}`}>
                      {categories.find(c => c.id === (quizOptions.category || 0))?.name || 'Toutes'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.textMuted}>Type:</span>
                    <span className={`font-medium ${themeClasses.textPrimary}`}>
                      {typeConfig[quizOptions.type].label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.textMuted}>Difficulté:</span>
                    <span className={`font-medium ${difficultyConfig[quizOptions.difficulty].color}`}>
                      {difficultyConfig[quizOptions.difficulty].label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={themeClasses.textMuted}>Questions:</span>
                    <span className={`font-medium ${themeClasses.textPrimary}`}>
                      {quizOptions.questionCount}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Bouton de démarrage */}
              <motion.div variants={itemVariants}>
                <motion.button
                  onClick={handleStartQuiz}
                  disabled={!quizOptions.name.trim() || isLoading}
                  className={`w-full flex items-center justify-center py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 relative overflow-hidden group ${
                    quizOptions.name.trim() && !isLoading
                      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-[1.02]'
                      : `${themeClasses.bgTertiary} ${themeClasses.textMuted} cursor-not-allowed`
                  }`}
                  whileHover={quizOptions.name.trim() && !isLoading ? { y: -3 } : {}}
                  whileTap={quizOptions.name.trim() && !isLoading ? { scale: 0.98 } : {}}
                >
                  {/* Effet d'onde animé */}
                  {quizOptions.name.trim() && !isLoading && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{ 
                        x: ["-100%", "100%"],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  <span className="relative z-10 flex items-center gap-4">
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full"
                          />
                          <span>Préparation de votre quiz...</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="start"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <FaRocket className="text-2xl" />
                          </motion.div>
                          <span>Lancer Mon Quiz Personnalisé</span>
                          <motion.div
                            animate={{ x: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <FiArrowRight className="text-2xl" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </span>
                </motion.button>
              </motion.div>

              {/* Statistiques et confiance */}
              <motion.div 
                variants={itemVariants}
                className="grid md:grid-cols-3 gap-4 text-center"
              >
                {[
                  { icon: <FiShield />, label: "100% Gratuit", color: "text-green-500" },
                  { icon: <FaFire />, label: "Mise à jour quotidienne", color: "text-orange-500" },
                  { icon: <FaTrophy />, label: "Classements temps réel", color: "text-yellow-500" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-xl ${themeClasses.bgTertiary} border ${themeClasses.border} group`}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <motion.div 
                      className={`text-2xl mb-2 ${item.color} group-hover:scale-110 transition-transform`}
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <p className={`text-sm font-medium ${themeClasses.textPrimary}`}>
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Call to action final avec témoignage */}
              <motion.div 
                className="text-center"
                variants={itemVariants}
              >
                <div className={`p-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border ${themeClasses.border} relative overflow-hidden`}>
                  {/* Éléments décoratifs */}
                  <motion.div
                    className="absolute top-2 right-2 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    {/* Étoiles animées */}
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                        >
                          <FiStar className="text-yellow-500 text-lg fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.p 
                      className={`${themeClasses.textSecondary} mb-2 text-lg font-medium`}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      "Cette personnalisation rend chaque quiz unique !"
                    </motion.p>
                    
                    <p className={`${themeClasses.textMuted} text-sm`}>
                      - Marie L., utilisatrice depuis 2024
                    </p>

                    {/* Compteur de joueurs en temps réel */}
                    <motion.div 
                      className="mt-4 flex items-center justify-center gap-2"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex -space-x-1">
                        {['A', 'B', 'C', 'D'].map((letter, i) => (
                          <motion.div
                            key={letter}
                            className={`w-8 h-8 bg-gradient-to-r ${
                              i % 2 === 0 ? 'from-indigo-500 to-purple-600' : 'from-pink-500 to-red-600'
                            } rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white dark:border-gray-800`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            {letter}
                          </motion.div>
                        ))}
                      </div>
                      <span className={`text-sm ${themeClasses.textMuted}`}>
                        +{Math.floor(Math.random() * 50) + 150} joueurs en ligne
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Section bonus - Suggestions rapides */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4"
              >
                <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} text-center flex items-center justify-center gap-2`}>
                  <FaLightbulb className="text-yellow-500" />
                  Suggestions populaires
                </h3>
                
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { 
                      name: "Quiz Express", 
                      config: { category: 0, difficulty: 'mixed', questionCount: 5, type: 'mixed' } as SuggestionConfig,
                      desc: "5 questions rapides, toutes catégories",
                      icon: <FiZap className="text-yellow-500" />
                    },
                    { 
                      name: "Défi Expert", 
                      config: { category: 0, difficulty: 'hard', questionCount: 20, type: 'multiple' } as SuggestionConfig,
                      desc: "20 QCM difficiles pour les pros",
                      icon: <FaTrophy className="text-purple-500" />
                    },
                    { 
                      name: "Culture Générale", 
                      config: { category: 9, difficulty: 'medium', questionCount: 10, type: 'mixed' } as SuggestionConfig,
                      desc: "Le classique incontournable",
                      icon: <FaBook className="text-blue-500" />
                    },
                    { 
                      name: "Vrai ou Faux", 
                      config: { category: 0, difficulty: 'easy', questionCount: 15, type: 'boolean' } as SuggestionConfig,
                      desc: "Questions simples et rapides",
                      icon: <FiTarget className="text-green-500" />
                    }
                  ].map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setQuizOptions(prev => ({ 
                        ...prev, 
                        ...suggestion.config 
                      }))}
                      className={`p-4 rounded-xl border-2 border-dashed transition-all text-left group ${themeClasses.border} ${themeClasses.bgTertiary} hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          className="p-2 bg-white dark:bg-gray-700 rounded-lg group-hover:scale-110 transition-transform"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {suggestion.icon}
                        </motion.div>
                        <div>
                          <h4 className={`font-semibold ${themeClasses.textPrimary} mb-1`}>
                            {suggestion.name}
                          </h4>
                          <p className={`text-sm ${themeClasses.textMuted}`}>
                            {suggestion.desc}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Éléments flottants décoratifs */}
      <motion.div
        className="fixed bottom-8 right-8 z-20 pointer-events-none"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-2xl">
          <FaBrain className="text-2xl" />
        </div>
      </motion.div>

      <motion.div
        className="fixed top-1/4 right-6 z-20 pointer-events-none"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 5, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-xl">
          <span className="text-lg">?</span>
        </div>
      </motion.div>

      {/* Particules magiques supplémentaires */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`magic-${i}`}
          className="fixed pointer-events-none z-10"
          style={{
            left: `${15 + i * 25}%`,
            bottom: `${20 + i * 15}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut"
          }}
        >
          <div className={`w-3 h-3 bg-gradient-to-r ${
            i % 3 === 0 ? 'from-cyan-400 to-blue-600' :
            i % 3 === 1 ? 'from-pink-400 to-purple-600' :
            'from-yellow-400 to-red-600'
          } rounded-full blur-sm`} />
        </motion.div>
      ))}
    </div>
  );
}