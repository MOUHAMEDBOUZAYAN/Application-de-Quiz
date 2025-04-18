import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/quiz-bg.jpg';

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
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

const floatVariants = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function AcceuilPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={backgroundImage}
          alt="Quiz background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-800/90" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="max-w-3xl mx-auto space-y-8">
          <motion.h1 
            className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              QuizMaster
            </span>{' '}
            Challenge
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Test your knowledge with our interactive quizzes. Customize your experience and challenge yourself!
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              onClick={handleGetStarted}
              className="px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {[
            { value: "20+", label: "Categories", icon: "📚" },
            { value: "5000+", label: "Questions", icon: "❓" },
            { value: "Custom", label: "Quizzes", icon: "✨" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.15)"
              }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all duration-300 cursor-default"
            >
              <p className="text-4xl mb-2">{item.icon}</p>
              <p className="text-4xl font-bold text-blue-400">{item.value}</p>
              <p className="mt-2 text-gray-300">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div 
        className="absolute bottom-10 left-10"
        variants={floatVariants}
        animate="float"
      >
        <div className="bg-white/10 p-4 rounded-full border border-white/20 backdrop-blur-sm">
          <span className="text-white text-xl">?</span>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute top-20 right-10"
        variants={floatVariants}
        animate="float"
        transition={{ delay: 0.5, duration: 4.5 }}
      >
        <div className="bg-blue-400/20 p-4 rounded-full border border-blue-300/20 backdrop-blur-sm">
          <span className="text-white text-xl">A</span>
        </div>
      </motion.div>
    </div>
  );
}