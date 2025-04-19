import { FaGithub, FaLinkedin, FaTwitter, FaQuestionCircle, FaTrophy, FaBook, FaHome, FaChartBar } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo et description */}
          <motion.div className="md:col-span-5 lg:col-span-4" variants={itemVariants}>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
                QuizMaster Pro
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              La plateforme ultime pour tester vos connaissances et apprendre de manière interactive.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div className="md:col-span-3 lg:col-span-2" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaQuestionCircle className="text-indigo-400" />
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <FaHome className="text-sm" /> Accueil
                </a>
              </li>
              <li>
                <a href="/home" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <FaQuestionCircle className="text-sm" /> Quiz
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <FaChartBar className="text-sm" /> Résultats
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div className="md:col-span-4 lg:col-span-3" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaTrophy className="text-yellow-400" />
              Fonctionnalités
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                Quiz personnalisés
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                Suivi des progrès
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                Classements
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div className="md:col-span-3 lg:col-span-3" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaBook className="text-blue-400" />
              Ressources
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Support
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} QuizMaster Pro. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Conditions
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}