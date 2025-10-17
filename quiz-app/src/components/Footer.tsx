import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaQuestionCircle, FaTrophy, 
  FaBook, FaHome, FaChartBar, FaBrain, FaRocket, FaHeart
} from 'react-icons/fa';
import { 
  FiMail, FiPhone, FiMapPin, FiArrowUp, FiUsers
} from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  // Navigation simplifiée
  const navigationLinks = [
    { href: "/", label: "Accueil", icon: FaHome },
    { href: "/home", label: "Créer un Quiz", icon: FaQuestionCircle },
    { href: "/leaderboard", label: "Classements", icon: FaTrophy },
    { href: "/results", label: "Mes Résultats", icon: FaChartBar },
  ];

  const socialLinks = [
    { href: "#", icon: FaGithub, label: "GitHub" },
    { href: "#", icon: FaLinkedin, label: "LinkedIn" },
    { href: "#", icon: FaTwitter, label: "Twitter" },
  ];

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <FaBrain className="text-white text-lg" />
              </div>
              <div>
                <div className="text-xl font-bold">QuizMaster Pro</div>
                <div className="text-sm text-slate-400">Powered by AI</div>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              La plateforme de quiz la plus avancée au monde. Intelligence artificielle, 
              personnalisation complète et compétitions en temps réel.
            </p>

            {/* Newsletter simple */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <FiMail className="text-blue-400" />
                Newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors font-medium"
                >
                  {isSubscribed ? '✓' : 'S\'abonner'}
                </button>
              </form>
              {isSubscribed && (
                <p className="text-green-400 text-sm mt-2">
                  ✨ Merci ! Vous êtes abonné(e) !
                </p>
              )}
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h4 className="text-white font-semibold mb-3">Suivez-nous</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-slate-800 border border-slate-600 flex items-center justify-center hover:bg-slate-700 transition-colors"
                    title={social.label}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaHome className="text-blue-400" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-3"
                  >
                    <link.icon className="text-sm" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiMapPin className="text-blue-400" />
              Contact
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <FiMail className="text-blue-400" />
                support@quizmaster.pro
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-blue-400" />
                +212 690 815 605
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-blue-400" />
                Beni Mellal, Maroc
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {currentYear} QuizMaster Pro. Tous droits réservés. 
            <span className="ml-2">Fait avec</span>
            <span className="mx-1 text-red-500">❤️</span>
            <span>à Paris</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Bouton Retour en haut */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white shadow-lg transition-all z-50"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiArrowUp className="text-lg" />
      </motion.button>
    </footer>
  );
}