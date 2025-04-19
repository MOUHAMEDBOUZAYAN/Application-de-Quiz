import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { FiUser, FiArrowRight, FiAward, FiClock, FiHelpCircle, FiBarChart2 } from 'react-icons/fi';
import { FaLightbulb, FaBrain } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Home() {
  const [name, setName] = useState('');
  const [, setStoredName] = useLocalStorage('quizUserName', '');
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (!name.trim()) return;
    setStoredName(name);
    navigate('/quiz');
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
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
    <div className="full-screen-page bg-gradient-to-br from-indigo-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('../assets/pattern.png')] opacity-5"></div>
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-indigo-700/20 blur-xl"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-purple-700/20 blur-xl"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full bg-blue-600/10 blur-lg"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 py-16 flex items-center justify-center min-h-screen">
        <motion.div
          className="relative z-10 w-full max-w-2xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 text-center relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <FiAward className="text-white text-2xl" />
              </div>
              <motion.h1 
                className="text-3xl sm:text-4xl font-bold text-white flex items-center justify-center gap-2 sm:gap-3"
                variants={item}
              >
                <FaBrain className="text-yellow-300 text-2xl sm:text-3xl" />
                QuizMaster Pro
              </motion.h1>
              <motion.p 
                className="text-indigo-100 mt-2 text-sm sm:text-base"
                variants={item}
              >
                Testez vos connaissances et montez dans le classement
              </motion.p>
            </div>

            {/* Form content */}
            <div className="p-6 sm:p-8">
              <motion.div 
                className="mb-6 sm:mb-8"
                variants={item}
              >
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2 sm:mb-3 flex items-center text-base sm:text-lg">
                  <FiUser className="mr-2 sm:mr-3 text-indigo-600 text-xl sm:text-2xl" />
                  Entrez votre nom
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder="Votre nom ici"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 pl-10 sm:pl-12 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/95 text-gray-900 text-base sm:text-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
                  />
                  <FiUser className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg sm:text-xl" />
                </div>
              </motion.div>

              <motion.button
                onClick={handleStartQuiz}
                disabled={!name.trim()}
                className={`w-full flex items-center justify-center py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl font-medium text-white transition-all text-base sm:text-lg ${
                  name.trim()
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                variants={item}
                whileHover={name.trim() ? { scale: 1.02 } : {}}
                whileTap={name.trim() ? { scale: 0.98 } : {}}
              >
                Commencer le quiz
                <FiArrowRight className="ml-2 sm:ml-3 text-lg sm:text-xl" />
              </motion.button>

              {/* Info cards */}
              <motion.div 
                className="mt-8 sm:mt-10 grid grid-cols-2 gap-4 sm:gap-5"
                variants={container}
              >
                {[
                  { icon: <FiClock className="text-indigo-600 text-xl sm:text-2xl" />, title: "15 min", desc: "Durée" },
                  { icon: <FiHelpCircle className="text-purple-600 text-xl sm:text-2xl" />, title: "10 Qs", desc: "Questions" },
                  { icon: <FiBarChart2 className="text-cyan-600 text-xl sm:text-2xl" />, title: "5 Niveaux", desc: "Difficulté" },
                  { icon: <FaLightbulb className="text-yellow-500 text-xl sm:text-2xl" />, title: "Astuces", desc: "Disponibles" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={item}
                    className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 flex items-start gap-3 sm:gap-4 hover:bg-gray-50 transition-colors"
                    whileHover={{ y: -3 }}
                  >
                    <div className="p-1 sm:p-2 bg-indigo-50 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm sm:text-base">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}