import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage, { useUserStats } from '../hooks/useLocalStorage';
import { useTheme, useThemeClasses } from '../contexts/ThemeContext';
import { 
  FiHome, FiRepeat, FiShare2, FiDownload, FiTrendingUp, 
  FiClock, FiTarget, FiUsers, FiActivity
} from 'react-icons/fi';
import { 
  FaMedal, FaUserGraduate, FaTrophy, FaFire, 
  FaGem, FaRocket, FaLightbulb, FaThumbsUp, FaThumbsDown
} from 'react-icons/fa';
import { FiZap, FiBarChart2 } from 'react-icons/fi';

interface ResultsState {
  score: number;
  total: number;
  timeSpent?: number;
  answers?: boolean[];
  questions?: any[];
  streak?: number;
  averageTime?: number;
  difficulty?: string;
  category?: string;
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const themeClasses = useThemeClasses();
  const { stats, updateStats } = useUserStats();
  const [name] = useLocalStorage('quizUserName', '');
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(0);

  // Récupérer les données du quiz
  const resultData: ResultsState = location.state || { score: 0, total: 0 };
  const {
    score,
    total,
    timeSpent = 0,
    answers = [],
    questions = [],
    streak = 0,
    averageTime = 0,
    difficulty = 'mixed',
    category = 'Mixed'
  } = resultData;

  const percentage = Math.round((score / total) * 100);

  // Mise à jour des statistiques utilisateur
  useEffect(() => {
    if (score > 0 && total > 0) {
      updateStats({
        score,
        totalQuestions: total,
        category,
        completionTime: timeSpent
      });
    }
  }, [score, total, category, timeSpent, updateStats]);

  // Effet confetti pour les excellents résultats
  useEffect(() => {
    if (percentage >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [percentage]);

  // Analyse des performances
  const getPerformanceAnalysis = () => {
    const analyses = [
      {
        title: "Performance Globale",
        data: [
          { label: "Score", value: `${percentage}%`, color: getScoreColor() },
          { label: "Précision", value: `${score}/${total}`, color: "text-blue-500" },
          { label: "Temps moyen", value: `${averageTime.toFixed(1)}s`, color: "text-purple-500" },
          { label: "Série max", value: `${streak}`, color: "text-orange-500" }
        ]
      },
      {
        title: "Comparaison",
        data: [
          { label: "Votre score", value: `${percentage}%`, color: getScoreColor() },
          { label: "Moyenne globale", value: "67%", color: "text-gray-500" },
          { label: "Votre meilleur", value: `${stats.bestScore}%`, color: "text-green-500" },
          { label: "Amélioration", value: `+${Math.max(0, percentage - stats.averageScore)}%`, color: "text-blue-500" }
        ]
      },
      {
        title: "Progression",
        data: [
          { label: "Quiz total", value: `${stats.totalQuizzes}`, color: "text-indigo-500" },
          { label: "Score moyen", value: `${stats.averageScore}%`, color: "text-purple-500" },
          { label: "Catégories", value: `${stats.categoriesPlayed.length}`, color: "text-cyan-500" },
          { label: "Niveau", value: getRankLevel(), color: "text-yellow-500" }
        ]
      }
    ];
    return analyses[currentAnalysis] || analyses[0];
  };

  const getResultColor = () => {
    if (percentage >= 90) return 'from-green-400 to-emerald-600';
    if (percentage >= 80) return 'from-blue-400 to-cyan-600';
    if (percentage >= 60) return 'from-yellow-400 to-amber-600';
    if (percentage >= 40) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-rose-600';
  };

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getResultMessage = () => {
    if (percentage >= 95) return { emoji: '🏆', text: 'PARFAIT ! Vous êtes un génie !' };
    if (percentage >= 90) return { emoji: '🌟', text: 'Exceptionnel ! Performance remarquable !' };
    if (percentage >= 80) return { emoji: '⭐', text: 'Excellent travail ! Très impressionnant !' };
    if (percentage >= 70) return { emoji: '💪', text: 'Très bien ! Vous maîtrisez le sujet !' };
    if (percentage >= 60) return { emoji: '👍', text: 'Bon effort ! Continuez comme ça !' };
    if (percentage >= 40) return { emoji: '💡', text: 'Pas mal ! Place à l\'amélioration !' };
    return { emoji: '🔄', text: 'Nouvelle tentative pour progresser !' };
  };

  const getRankLevel = () => {
    if (stats.bestScore >= 95) return "Maître";
    if (stats.bestScore >= 85) return "Expert";
    if (stats.bestScore >= 70) return "Avancé";
    if (stats.bestScore >= 50) return "Intermédiaire";
    return "Débutant";
  };

  const getAchievements = () => {
    const achievements = [];
    if (percentage === 100) achievements.push({ icon: <FaGem />, title: "Score Parfait", desc: "100% de réussite !" });
    if (streak >= 5) achievements.push({ icon: <FaFire />, title: "En Feu", desc: `${streak} bonnes réponses d'affilée` });
    if (averageTime < 15) achievements.push({ icon: <FiZap />, title: "Éclair", desc: "Réponses ultra rapides" });
    if (percentage >= 90) achievements.push({ icon: <FaTrophy />, title: "Excellence", desc: "Performance exceptionnelle" });
    return achievements;
  };

  const shareResults = () => {
    const text = `🧠 Je viens de scorer ${percentage}% sur QuizMaster Pro ! ${getResultMessage().emoji}\n\n📊 ${score}/${total} bonnes réponses\n⏱️ Temps: ${Math.round(timeSpent)}s\n🎯 Catégorie: ${category}\n\nVenez me défier ! 🚀`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Mes résultats QuizMaster Pro',
        text: text,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('Résultats copiés dans le presse-papier !');
      });
    }
  };

  const downloadResults = () => {
    const analysisData = getPerformanceAnalysis();
    const csvContent = [
      ['Métrique', 'Valeur'],
      ['Score', `${percentage}%`],
      ['Bonnes réponses', `${score}/${total}`],
      ['Temps total', `${Math.round(timeSpent)}s`],
      ['Temps moyen', `${averageTime.toFixed(1)}s`],
      ['Série maximale', `${streak}`],
      ['Catégorie', category],
      ['Difficulté', difficulty],
      ['Date', new Date().toLocaleDateString()]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resultMessage = getResultMessage();
  const achievements = getAchievements();
  const currentAnalysisData = getPerformanceAnalysis();

  return (
    <div className={`min-h-screen relative overflow-hidden ${themeClasses.bgGradient}`}>
      {/* Effets de confettis */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-3 h-3 ${
                  i % 4 === 0 ? 'bg-yellow-400' :
                  i % 4 === 1 ? 'bg-green-400' :
                  i % 4 === 2 ? 'bg-blue-400' : 'bg-purple-400'
                } rounded-full`}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  y: window.innerHeight + 20,
                  scale: [0, 1, 0.5, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 3,
                  ease: "easeOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Éléments de fond animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              i % 3 === 0 ? 'bg-indigo-400/30' :
              i % 3 === 1 ? 'bg-purple-400/30' : 'bg-cyan-400/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl"
        >
          {/* Header principal */}
          <motion.div 
            className={`${themeClasses.bgCard} rounded-3xl ${themeClasses.shadow} border ${themeClasses.border} overflow-hidden mb-8`}
            whileHover={{ scale: 1.01 }}
          >
            <div className={`bg-gradient-to-r ${getResultColor()} p-8 text-center relative overflow-hidden`}>
              {/* Éléments décoratifs */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              
              <motion.div 
                className="absolute top-6 left-6 text-white text-6xl opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaMedal />
              </motion.div>

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                  className="text-7xl mb-4"
                >
                  {resultMessage.emoji}
                </motion.div>
                
                <motion.h1 
                  className="text-4xl md:text-5xl font-extrabold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {resultMessage.text}
                </motion.h1>

                <motion.div 
                  className="flex items-center justify-center gap-3 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <FaUserGraduate className="text-2xl text-white/90" />
                  <span className="text-xl font-semibold text-white">
                    {name}
                  </span>
                </motion.div>

                <motion.div 
                  className="text-8xl font-extrabold text-white mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", bounce: 0.4 }}
                >
                  {percentage}%
                </motion.div>
                
                <motion.p 
                  className="text-2xl text-white/90 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {score} / {total} bonnes réponses
                </motion.p>
              </div>
            </div>

            {/* Barre de progression animée */}
            <div className="p-6">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${getResultColor()} shadow-lg relative overflow-hidden`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Grille de contenu */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Colonne gauche - Statistiques détaillées */}
            <div className="lg:col-span-2 space-y-6">
              {/* Analyses de performance */}
              <motion.div 
                className={`${themeClasses.bgCard} rounded-2xl ${themeClasses.shadow} border ${themeClasses.border} p-6`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${themeClasses.textPrimary} flex items-center gap-3`}>
                    <FiBarChart2 className="text-indigo-500" />
                    Analyse Détaillée
                  </h2>
                  
                  {/* Navigation des analyses */}
                  <div className="flex gap-2">
                    {['Global', 'Comparaison', 'Progression'].map((tab, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentAnalysis(index)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          currentAnalysis === index
                            ? 'bg-indigo-500 text-white'
                            : `${themeClasses.textSecondary} hover:bg-indigo-100 dark:hover:bg-indigo-900/30`
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tab}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAnalysis}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {currentAnalysisData.data.map((item, index) => (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-xl ${themeClasses.bgTertiary} border ${themeClasses.border} group`}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${themeClasses.textMuted}`}>
                            {item.label}
                          </span>
                          <motion.span 
                            className={`text-2xl font-bold ${item.color}`}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          >
                            {item.value}
                          </motion.span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Métriques de temps */}
              <motion.div 
                className={`${themeClasses.bgCard} rounded-2xl ${themeClasses.shadow} border ${themeClasses.border} p-6`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-6 flex items-center gap-3`}>
                  <FiClock className="text-purple-500" />
                  Analyse du Temps
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: "Temps Total", value: `${Math.floor(timeSpent / 60)}:${String(Math.floor(timeSpent % 60)).padStart(2, '0')}`, icon: FiClock, color: "text-blue-500" },
                    { label: "Temps Moyen", value: `${averageTime.toFixed(1)}s`, icon: FiTarget, color: "text-green-500" },
                    { label: "Vitesse", value: averageTime < 15 ? "Rapide" : averageTime < 25 ? "Normal" : "Réfléchi", icon: FiZap, color: "text-yellow-500" }
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl ${themeClasses.bgSecondary} text-center group`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div 
                        className={`text-3xl ${metric.color} mb-2 group-hover:scale-110 transition-transform`}
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <metric.icon />
                      </motion.div>
                      <div className={`text-lg font-bold ${themeClasses.textPrimary}`}>
                        {metric.value}
                      </div>
                      <div className={`text-sm ${themeClasses.textMuted}`}>
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements débloqués */}
              {achievements.length > 0 && (
                <motion.div 
                  className={`${themeClasses.bgCard} rounded-2xl ${themeClasses.shadow} border ${themeClasses.border} p-6`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-6 flex items-center gap-3`}>
                    <FaTrophy className="text-yellow-500" />
                    Achievements Débloqués
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.4 + index * 0.1, type: "spring", bounce: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div 
                          className="text-3xl text-yellow-500"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, delay: index }}
                        >
                          {achievement.icon}
                        </motion.div>
                        <div>
                          <div className="font-bold text-yellow-700 dark:text-yellow-300">
                            {achievement.title}
                          </div>
                          <div className="text-sm text-yellow-600 dark:text-yellow-400">
                            {achievement.desc}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Colonne droite - Actions et historique */}
            <div className="space-y-6">
              {/* Actions rapides */}
              <motion.div 
                className={`${themeClasses.bgCard} rounded-2xl ${themeClasses.shadow} border ${themeClasses.border} p-6`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-6 flex items-center gap-3`}>
                  <FiZap className="text-indigo-500" />
                  Actions
                </h3>

                <div className="space-y-3">
                  <motion.button
                    onClick={() => navigate('/home')}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiRepeat className="text-lg" /> 
                    Nouveau Quiz
                  </motion.button>

                  <motion.button
                    onClick={() => navigate('/')}
                    className={`w-full flex items-center justify-center gap-3 ${themeClasses.bgSecondary} ${themeClasses.textPrimary} border-2 border-indigo-500/30 px-6 py-3 rounded-xl hover:border-indigo-500 transition-all font-semibold`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiHome className="text-lg" /> 
                    Accueil
                  </motion.button>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <motion.button
                      onClick={shareResults}
                      className={`flex items-center justify-center gap-2 ${themeClasses.bgTertiary} ${themeClasses.textSecondary} px-4 py-3 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiShare2 className="text-blue-500" />
                      <span className="text-sm font-medium">Partager</span>
                    </motion.button>

                    <motion.button
                      onClick={downloadResults}
                      className={`flex items-center justify-center gap-2 ${themeClasses.bgTertiary} ${themeClasses.textSecondary} px-4 py-3 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-all`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiDownload className="text-green-500" />
                      <span className="text-sm font-medium">Export</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Statistiques globales */}
              <motion.div 
                className={`${themeClasses.bgCard} rounded-2xl ${themeClasses.shadow} border ${themeClasses.border} p-6`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-6 flex items-center gap-3`}>
                  <FiTrendingUp className="text-green-500" />
                  Vos Statistiques
                </h3>

                <div className="space-y-4">
                  {[
                    { label: "Quiz Complétés", value: stats.totalQuizzes, icon: FiActivity, color: "text-blue-500" },
                    { label: "Meilleur Score", value: `${stats.bestScore}%`, icon: FaTrophy, color: "text-yellow-500" },
                    { label: "Score Moyen", value: `${stats.averageScore}%`, icon: FiBarChart2, color: "text-purple-500" },
                    { label: "Niveau", value: getRankLevel(), icon: FaRocket, color: "text-red-500" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${themeClasses.bgTertiary} group`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3">
                        <stat.icon className={`text-lg ${stat.color} group-hover:scale-110 transition-transform`} />
                        <span className={`text-sm ${themeClasses.textSecondary}`}>
                          {stat.label}
                        </span>
                      </div>
                      <span className={`font-bold ${themeClasses.textPrimary}`}>
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recommandations */}
              <motion.div 
                className={`${themeClasses.bgCard} rounded-2xl ${themeClasses.shadow} border ${themeClasses.border} p-6`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4 flex items-center gap-3`}>
                  <FaLightbulb className="text-yellow-500" />
                  Suggestions
                </h3>

                <div className="space-y-3">
                  {percentage < 70 && (
                    <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700">
                      <div className="flex items-start gap-2">
                        <FaLightbulb className="text-yellow-500 mt-1" />
                        <div>
                          <div className="font-semibold text-yellow-700 dark:text-yellow-300 text-sm">
                            Améliorez vos performances
                          </div>
                          <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                            Essayez des questions plus faciles pour gagner en confiance
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {percentage >= 80 && (
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
                      <div className="flex items-start gap-2">
                        <FaTrophy className="text-green-500 mt-1" />
                        <div>
                          <div className="font-semibold text-green-700 dark:text-green-300 text-sm">
                            Excellent niveau !
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                            Prêt pour des défis plus difficiles ?
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                    <div className="flex items-start gap-2">
                      <FiUsers className="text-blue-500 mt-1" />
                      <div>
                        <div className="font-semibold text-blue-700 dark:text-blue-300 text-sm">
                          Défiez vos amis
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Partagez vos résultats et créez une compétition
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}