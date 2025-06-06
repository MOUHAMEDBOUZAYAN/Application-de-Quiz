import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme, useThemeClasses } from '../contexts/ThemeContext';
import { 
  FiPlay, FiStar, FiUsers, FiZap,
  FiTarget, FiHeart, FiGlobe, FiShield, FiGift
} from 'react-icons/fi';
import { 
  FaBrain, FaRocket, FaTrophy, FaFire, FaGem, FaLightbulb,
  FaMagic, FaInfinity
} from 'react-icons/fa';

// Données pour les statistiques
const stats = [
  { value: "10K+", label: "Joueurs Actifs", icon: <FiUsers className="text-2xl" />, color: "from-blue-500 to-cyan-500" },
  { value: "50K+", label: "Questions", icon: <FaBrain className="text-2xl" />, color: "from-purple-500 to-pink-500" },
  { value: "25+", label: "Catégories", icon: <FiTarget className="text-2xl" />, color: "from-green-500 to-emerald-500" },
  { value: "99%", label: "Satisfaction", icon: <FiHeart className="text-2xl" />, color: "from-red-500 to-pink-500" }
];

// Fonctionnalités principales
const features = [
  {
    icon: <FaBrain className="text-3xl" />,
    title: "IA Avancée",
    description: "Notre intelligence artificielle adapte la difficulté selon vos performances en temps réel.",
    gradient: "from-indigo-500 to-purple-600",
    delay: 0.1
  },
  {
    icon: <FaRocket className="text-3xl" />,
    title: "Progression Rapide",
    description: "Système de niveaux gamifié avec récompenses et défis quotidiens.",
    gradient: "from-blue-500 to-cyan-600",
    delay: 0.2
  },
  {
    icon: <FaTrophy className="text-3xl" />,
    title: "Compétitions",
    description: "Participez à des tournois et gravissez les classements mondiaux.",
    gradient: "from-yellow-500 to-orange-600",
    delay: 0.3
  },
  {
    icon: <FiShield className="text-3xl" />,
    title: "Sécurisé",
    description: "Vos données sont protégées avec un chiffrement de niveau bancaire.",
    gradient: "from-green-500 to-emerald-600",
    delay: 0.4
  },
  {
    icon: <FiGlobe className="text-3xl" />,
    title: "Multilingue",
    description: "Interface disponible en 15 langues avec du contenu localisé.",
    gradient: "from-pink-500 to-rose-600",
    delay: 0.5
  },
  {
    icon: <FaInfinity className="text-3xl" />,
    title: "Contenu Infini",
    description: "Base de données mise à jour quotidiennement avec de nouveaux défis.",
    gradient: "from-teal-500 to-blue-600",
    delay: 0.6
  }
];

// Témoignages
const testimonials = [
  {
    name: "Marie L.",
    role: "Étudiante en médecine",
    content: "QuizMaster Pro m'aide énormément dans mes révisions. L'adaptation intelligente de la difficulté est géniale !",
    rating: 5,
    avatar: "M"
  },
  {
    name: "Thomas B.",
    role: "Professeur",
    content: "J'utilise cette app avec mes élèves. Les analytics détaillés m'aident à identifier leurs points faibles.",
    rating: 5,
    avatar: "T"
  },
  {
    name: "Sarah K.",
    role: "Passionnée de culture G",
    content: "Addictive ! Je passe des heures à défier mes amis. Les catégories sont très variées.",
    rating: 5,
    avatar: "S"
  }
];

// Badges/achievements
const achievements = [
  { icon: <FaFire />, name: "Série de Feu", description: "10 bonnes réponses d'affilée" },
  { icon: <FaGem />, name: "Perfectionniste", description: "Score parfait en mode difficile" },
  { icon: <FaLightbulb />, name: "Génie", description: "Répondre sans indice 50 fois" },
  { icon: <FaMagic />, name: "Magicien", description: "Maîtriser 5 catégories différentes" }
];

export default function AcceuilPage() {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const themeClasses = useThemeClasses();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -150]);
  const yParallaxSlow = useTransform(scrollY, [0, 500], [0, -75]);

  // Gestion du mouvement de la souris pour les effets parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Rotation automatique des témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate('/home');
  };

  // Animations pour les éléments
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

  const floatingVariants = {
    float: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${themeClasses.bgGradient}`}>
      {/* Éléments de fond interactifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particules flottantes interactives */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 4 === 0 ? 'bg-indigo-400/30' :
              i % 4 === 1 ? 'bg-purple-400/30' :
              i % 4 === 2 ? 'bg-cyan-400/30' : 'bg-pink-400/30'
            }`}
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i * 7)}%`,
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 25, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}

        {/* Formes géométriques avec parallax */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl"
          style={{ y: yParallax }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute top-1/2 right-10 w-40 h-40 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl"
          style={{ y: yParallaxSlow }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <motion.div 
          className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-lg blur-lg"
          style={{ y: yParallax }}
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Section Hero */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          className="text-center max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge de nouveauté */}
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full px-6 py-2 mb-8 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <FiGift className="text-indigo-500 dark:text-indigo-400" />
            <span className={`text-sm font-semibold ${themeClasses.textPrimary}`}>
              🎉 Nouveau: Mode IA révolutionnaire disponible !
            </span>
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
              BETA
            </span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1 
            className={`text-6xl md:text-8xl font-extrabold mb-8 ${themeClasses.textPrimary}`}
            variants={itemVariants}
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              QuizMaster
            </motion.span>
            <br />
            <motion.span
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              Pro
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaFire className="text-orange-600 text-sm" />
              </motion.div>
            </motion.span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p 
            className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${themeClasses.textSecondary}`}
            variants={itemVariants}
          >
            L'expérience de quiz la plus avancée au monde. Intelligence artificielle, 
            compétitions en temps réel, et progression personnalisée pour 
            <motion.span
              className="font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {" "}révolutionner votre apprentissage
            </motion.span>
          </motion.p>

          {/* Boutons d'action */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            variants={itemVariants}
          >
            <motion.button
              onClick={handleGetStarted}
              className="group relative px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Effet de lueur animé */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              />
              
              <div className="relative flex items-center gap-3">
                <FiPlay className="text-xl" />
                Commencer l'Aventure
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiZap className="text-xl" />
                </motion.div>
              </div>
            </motion.button>

            <motion.button
              className={`px-12 py-4 ${themeClasses.bgCard} ${themeClasses.textPrimary} border-2 border-indigo-500/30 rounded-2xl font-bold text-lg hover:border-indigo-500 transition-all backdrop-blur-sm`}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3">
                <FiTarget className="text-xl" />
                Voir la Démo
              </div>
            </motion.button>
          </motion.div>

          {/* Statistiques */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`${themeClasses.bgCard} p-6 rounded-2xl backdrop-blur-xl border ${themeClasses.border} group cursor-default`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform`}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className={`text-3xl font-bold mb-2 ${themeClasses.textPrimary}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className={`text-sm ${themeClasses.textSecondary}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className={`text-5xl md:text-6xl font-bold mb-6 ${themeClasses.textPrimary}`}
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              Fonctionnalités
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Révolutionnaires
              </span>
            </motion.h2>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              Découvrez les technologies de pointe qui font de QuizMaster Pro 
              l'application de quiz la plus avancée du marché.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`${themeClasses.bgCard} p-8 rounded-3xl backdrop-blur-xl border ${themeClasses.border} group`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: feature.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(99, 102, 241, 0.3)",
                      "0 0 40px rgba(139, 92, 246, 0.4)",
                      "0 0 20px rgba(99, 102, 241, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                  {feature.title}
                </h3>
                
                <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                  {feature.description}
                </p>

                {/* Indicateur de hover */}
                <motion.div
                  className="w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-6 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-5xl font-bold mb-6 ${themeClasses.textPrimary}`}>
              Ce que disent nos
              <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                {" "}Champions
              </span>
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary}`}>
              Rejoignez des milliers d'utilisateurs qui ont transformé leur apprentissage
            </p>
          </motion.div>

          <motion.div
            className={`${themeClasses.bgCard} p-8 md:p-12 rounded-3xl backdrop-blur-xl border ${themeClasses.border} relative overflow-hidden`}
            layout
          >
            {/* Éléments décoratifs */}
            <div className="absolute top-4 left-4 text-6xl text-indigo-500/20">"</div>
            <div className="absolute bottom-4 right-4 text-6xl text-indigo-500/20 rotate-180">"</div>

            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center relative z-10"
            >
              {/* Avatar */}
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {testimonials[currentTestimonial].avatar}
              </motion.div>

              {/* Étoiles */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FiStar className="text-yellow-500 text-xl fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Contenu */}
              <p className={`text-xl md:text-2xl mb-6 ${themeClasses.textPrimary} leading-relaxed max-w-4xl mx-auto`}>
                {testimonials[currentTestimonial].content}
              </p>

              {/* Auteur */}
              <div>
                <h4 className={`text-lg font-bold ${themeClasses.textPrimary}`}>
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className={`${themeClasses.textMuted}`}>
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </motion.div>

            {/* Indicateurs */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial 
                      ? 'bg-indigo-500 w-8' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Achievements */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-5xl font-bold mb-6 ${themeClasses.textPrimary}`}>
              Débloquez des
              <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                {" "}Achievements
              </span>
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary}`}>
              Collectionnez des badges uniques en accomplissant des défis extraordinaires
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className={`${themeClasses.bgCard} p-6 rounded-2xl backdrop-blur-xl border ${themeClasses.border} group text-center`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                >
                  {achievement.icon}
                </motion.div>
                
                <h3 className={`text-lg font-bold mb-2 ${themeClasses.textPrimary}`}>
                  {achievement.name}
                </h3>
                
                <p className={`text-sm ${themeClasses.textSecondary}`}>
                  {achievement.description}
                </p>

                {/* Barre de progression simulée */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.random() * 80 + 20}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className={`${themeClasses.bgCard} p-12 rounded-3xl backdrop-blur-xl border ${themeClasses.border} relative overflow-hidden`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Éléments décoratifs animés */}
            <motion.div
              className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <motion.h2 
              className={`text-5xl font-bold mb-6 ${themeClasses.textPrimary}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Prêt à devenir un
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Maître du Quiz
              </span> ?
            </motion.h2>

            <p className={`text-xl mb-8 ${themeClasses.textSecondary} max-w-2xl mx-auto`}>
              Rejoignez la révolution de l'apprentissage intelligent. 
              Votre cerveau va adorer ce défi !
            </p>

            {/* Statistiques impressionnantes */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className={`text-3xl font-bold ${themeClasses.textPrimary} mb-2`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                >
                  2 min
                </motion.div>
                <div className={`text-sm ${themeClasses.textMuted}`}>
                  Temps d'inscription
                </div>
              </motion.div>
              
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className={`text-3xl font-bold text-green-500 mb-2`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  100%
                </motion.div>
                <div className={`text-sm ${themeClasses.textMuted}`}>
                  Gratuit
                </div>
              </motion.div>
              
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className={`text-3xl font-bold text-yellow-500 mb-2`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  ∞
                </motion.div>
                <div className={`text-sm ${themeClasses.textMuted}`}>
                  Possibilités
                </div>
              </motion.div>
            </div>

            {/* Bouton d'action principal */}
            <motion.button
              onClick={handleGetStarted}
              className="group relative px-12 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Effet d'onde animé */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ 
                  x: ["-100%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <FaRocket className="text-2xl" />
                </motion.div>
                Commencer Maintenant
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ✨
                </motion.div>
              </div>
            </motion.button>

            {/* Garantie et confiance */}
            <motion.div 
              className="mt-8 flex items-center justify-center gap-6 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <FiShield className="text-green-500" />
                <span className={themeClasses.textMuted}>100% Sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <FiHeart className="text-red-500" />
                <span className={themeClasses.textMuted}>Sans Publicité</span>
              </div>
              <div className="flex items-center gap-2">
                <FaInfinity className="text-blue-500" />
                <span className={themeClasses.textMuted}>Accès Illimité</span>
              </div>
            </motion.div>

            {/* Note sociale */}
            <motion.div 
              className="mt-6 flex items-center justify-center gap-2"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                  <motion.div
                    key={letter}
                    className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white dark:border-gray-800"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {letter}
                  </motion.div>
                ))}
              </div>
              <span className={`text-sm ${themeClasses.textMuted}`}>
                +10,000 joueurs nous ont déjà rejoint cette semaine
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section bonus - Flottants décoratifs */}
      <div className="fixed bottom-8 right-8 z-20 pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl"
        >
          <FaBrain className="text-2xl" />
        </motion.div>
      </div>

      <div className="fixed bottom-8 left-8 z-20 pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-2xl"
          transition={{ delay: 1 }}
        >
          <FaTrophy className="text-xl" />
        </motion.div>
      </div>

      {/* Éléments flottants pour l'interaction */}
      <motion.div
        className="fixed top-1/4 right-4 z-20 pointer-events-none"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
          <span className="text-sm">?</span>
        </div>
      </motion.div>

      <motion.div
        className="fixed top-1/2 left-4 z-20 pointer-events-none"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -10, 10, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
          <FiZap className="text-xs" />
        </div>
      </motion.div>

      {/* Particules magiques au scroll */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`magic-${i}`}
          className="fixed pointer-events-none z-10"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        >
          <div className="w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full blur-sm" />
        </motion.div>
      ))}

      {/* Indicateur de scroll */}
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`w-6 h-10 border-2 ${themeClasses.border} rounded-full flex justify-center`}>
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}