import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme, useThemeClasses } from '../contexts/ThemeContext';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaQuestionCircle, FaTrophy, 
  FaBook, FaHome, FaChartBar, FaBrain, FaRocket, FaHeart,
  FaDiscord, FaInstagram, FaYoutube, FaStar, FaGem, FaFire
} from 'react-icons/fa';
import { 
  FiMail, FiPhone, FiMapPin, FiArrowUp, FiGlobe, 
  FiShield, FiZap, FiAward, FiTrendingUp, FiUsers
} from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const themeClasses = useThemeClasses();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect pour le footer
  const yParallax = useTransform(scrollY, [0, 1000], [0, -50]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Données de navigation améliorées
  const navigationLinks = [
    { href: "/", label: "Accueil", icon: FaHome },
    { href: "/home", label: "Créer un Quiz", icon: FaQuestionCircle },
    { href: "/leaderboard", label: "Classements", icon: FaTrophy },
    { href: "/results", label: "Mes Résultats", icon: FaChartBar },
    { href: "/profile", label: "Mon Profil", icon: FiUsers },
  ];

  const productLinks = [
    { href: "#", label: "Quiz IA", icon: FaBrain, badge: "Nouveau" },
    { href: "#", label: "Mode Équipe", icon: FiUsers, badge: "Bêta" },
    { href: "#", label: "Tournois", icon: FaTrophy },
    { href: "#", label: "Achievements", icon: FaGem },
    { href: "#", label: "Analytics", icon: FiTrendingUp },
  ];

  const resourceLinks = [
    { href: "#", label: "Documentation", icon: FaBook },
    { href: "#", label: "Guide d'utilisation", icon: FiZap },
    { href: "#", label: "FAQ", icon: FaQuestionCircle },
    { href: "#", label: "Support", icon: FiShield },
    { href: "#", label: "API", icon: FiGlobe },
  ];

  const socialLinks = [
    { href: "#", icon: FaGithub, label: "GitHub", color: "hover:text-gray-400" },
    { href: "#", icon: FaLinkedin, label: "LinkedIn", color: "hover:text-blue-500" },
    { href: "#", icon: FaTwitter, label: "Twitter", color: "hover:text-blue-400" },
    { href: "#", icon: FaDiscord, label: "Discord", color: "hover:text-indigo-500" },
    { href: "#", icon: FaInstagram, label: "Instagram", color: "hover:text-pink-500" },
    { href: "#", icon: FaYoutube, label: "YouTube", color: "hover:text-red-500" },
  ];

  const stats = [
    { value: "50K+", label: "Utilisateurs Actifs", icon: FiUsers },
    { value: "1M+", label: "Questions Répondues", icon: FaQuestionCircle },
    { value: "25+", label: "Catégories", icon: FaBook },
    { value: "99%", label: "Satisfaction", icon: FaHeart },
  ];

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
    <motion.footer 
      className={`relative overflow-hidden ${
        resolvedTheme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900' 
          : 'bg-gradient-to-br from-gray-800 via-indigo-800 to-purple-800'
      } text-white`}
      style={{ y: yParallax }}
    >
      {/* Éléments de fond animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particules flottantes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
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
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}

        {/* Formes géométriques */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Section des statistiques */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(99, 102, 241, 0.3)",
                    "0 0 30px rgba(139, 92, 246, 0.4)",
                    "0 0 20px rgba(99, 102, 241, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                <stat.icon className="text-2xl text-white" />
              </motion.div>
              <motion.div
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contenu principal du footer */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section À propos */}
          <motion.div className="md:col-span-4" variants={itemVariants}>
            <motion.div 
              className="flex items-center mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="mr-3"
              >
                <FaBrain className="text-3xl text-indigo-400" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                QuizMaster Pro
              </span>
              <motion.div
                className="ml-2 px-2 py-1 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-xs text-yellow-300 font-semibold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                IA
              </motion.div>
            </motion.div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              La plateforme de quiz la plus avancée au monde. Intelligence artificielle, 
              personnalisation complète et compétitions en temps réel pour révolutionner 
              votre apprentissage.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <FiMail className="text-indigo-400" />
                Newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 backdrop-blur-sm"
                />
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubscribed ? '✓' : 'S\'abonner'}
                </motion.button>
              </form>
              {isSubscribed && (
                <motion.p 
                  className="text-green-400 text-sm mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✨ Merci ! Vous êtes abonné(e) !
                </motion.p>
              )}
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h4 className="text-white font-semibold mb-3">Suivez-nous</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 transition-all ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <social.icon className="text-lg" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <FaHome className="text-indigo-400" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 4 }}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-3 group"
                  >
                    <link.icon className="text-sm group-hover:text-indigo-400 transition-colors" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Produits */}
          <motion.div className="md:col-span-3" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <FaRocket className="text-purple-400" />
              Produits
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 4 }}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      {link.icon && <link.icon className="text-sm group-hover:text-purple-400 transition-colors" />}
                      {link.label}
                    </div>
                    {link.badge && (
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        link.badge === 'Nouveau' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Ressources */}
          <motion.div className="md:col-span-3" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <FaBook className="text-cyan-400" />
              Ressources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 4 }}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-3 group"
                  >
                    <link.icon className="text-sm group-hover:text-cyan-400 transition-colors" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <FiMapPin className="text-cyan-400" />
                Contact
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <FiMail className="text-cyan-400" />
                  support@quizmaster.pro
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="text-cyan-400" />
                  +212 690 815 605 
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-cyan-400" />
                  Beni Mellal, Maroc
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section badges et certifications */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: FiShield, label: "Sécurisé SSL", color: "text-green-400" },
            { icon: FaGem, label: "Premium Quality", color: "text-purple-400" },
            { icon: FaStar, label: "5 étoiles", color: "text-yellow-400" },
            { icon: FiAward, label: "App of the Year", color: "text-blue-400" }
          ].map((badge, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <badge.icon className={`text-lg ${badge.color}`} />
              <span className="text-sm text-gray-300 font-medium">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer bottom */}
        <motion.div 
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} QuizMaster Pro. Tous droits réservés. 
            <span className="ml-2">Fait avec</span>
            <motion.span
              className="mx-1 text-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            <span>à Paris</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Cookies
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Contact
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bouton Retour en haut */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all z-50"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: [
            "0 4px 20px rgba(99, 102, 241, 0.4)",
            "0 8px 30px rgba(139, 92, 246, 0.6)",
            "0 4px 20px rgba(99, 102, 241, 0.4)"
          ]
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Infinity },
          default: { type: "spring", stiffness: 400, damping: 25 }
        }}
      >
        <FiArrowUp className="text-lg" />
      </motion.button>
    </motion.footer>
  );
}