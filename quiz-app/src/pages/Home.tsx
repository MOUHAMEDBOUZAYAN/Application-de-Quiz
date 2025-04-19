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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('../assets/pattern.png')] opacity-5"></div>
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-indigo-700/20 blur-xl"></div>
        <div className="absolute bottom-1/4 right-20 w-40 h-40 rounded-full bg-purple-700/20 blur-xl"></div>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex items-center justify-center min-h-screen p-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20"
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <FiAward className="text-white text-2xl" />
            </div>
            <motion.h1 
              className="text-3xl font-bold text-white flex items-center justify-center gap-2"
              variants={item}
            >
              <FaBrain className="text-yellow-300" />
              Quiz Challenge
            </motion.h1>
            <motion.p 
              className="text-indigo-100 mt-2 text-sm"
              variants={item}
            >
              Test your knowledge and climb the leaderboard
            </motion.p>
          </div>

          {/* Form content */}
          <div className="p-8">
            <motion.div 
              className="mb-6"
              variants={item}
            >
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2 flex items-center">
                <FiUser className="mr-2 text-indigo-600" />
                Enter Your Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="Your name here"
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/95 text-gray-900"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
                />
                <FiUser className="absolute left-3 top-3.5 text-gray-500" />
              </div>
            </motion.div>

            <motion.button
              onClick={handleStartQuiz}
              disabled={!name.trim()}
              className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-medium text-white transition-all ${
                name.trim()
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              variants={item}
              whileHover={name.trim() ? { scale: 1.02 } : {}}
              whileTap={name.trim() ? { scale: 0.98 } : {}}
            >
              Start Challenge
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </motion.button>

            {/* Info cards */}
            <motion.div 
              className="mt-8 grid grid-cols-2 gap-4"
              variants={container}
            >
              {[
                { icon: <FiClock className="text-indigo-600 text-xl" />, title: "15 min", desc: "Time limit" },
                { icon: <FiHelpCircle className="text-purple-600 text-xl" />, title: "10 Qs", desc: "Questions" },
                { icon: <FiBarChart2 className="text-cyan-600 text-xl" />, title: "5 Levels", desc: "Difficulty" },
                { icon: <FaLightbulb className="text-yellow-500 text-xl" />, title: "Hints", desc: "Available" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={item}
                  className="bg-white p-3 rounded-lg border border-gray-200 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                  whileHover={{ y: -3 }}
                >
                  {item.icon}
                  <div>
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

       
          
        </motion.div>
      </motion.div>
    </div>
  );
}