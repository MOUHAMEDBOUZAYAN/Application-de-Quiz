import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionState } from '../types/quizTypes';
import { useTheme, useThemeClasses } from '../contexts/ThemeContext';
import { 
  FiClock, FiCheck, FiX, FiZap, FiStar,
  FiTarget, FiEye
} from 'react-icons/fi';
import { FaLightbulb, FaBolt, FaFire, FaGem } from 'react-icons/fa';
import { Brain } from 'lucide-react';

type QuestionProps = {
  question: QuestionState;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean, timeSpent: number) => void;
  timeLimit?: number;
  showHints?: boolean;
  autoNext?: boolean;
  onTimeUp?: () => void;
  streak?: number;
};

export default function Question({ 
  question, 
  questionNumber, 
  totalQuestions,
  onAnswer, 
  timeLimit = 30,
  showHints = true,
  autoNext = true,
  onTimeUp,
  streak = 0
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { resolvedTheme } = useTheme();
  const themeClasses = useThemeClasses();

  // Réinitialiser l'état pour une nouvelle question
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShuffledAnswers(question.answers);
    setTimeLeft(timeLimit);
    setShowHint(false);
    setIsTimeUp(false);
    setShowConfetti(false);
  }, [question, timeLimit]);

  // Minuteur avec effets visuels
  useEffect(() => {
    if (isAnswered || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimeUp(true);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAnswered, isTimeUp, onTimeUp]);

  // Navigation au clavier améliorée
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isAnswered || isTimeUp) return;

      const keys = ['1', '2', '3', '4', 'a', 'b', 'c', 'd'];
      const keyIndex = keys.indexOf(event.key.toLowerCase());
      
      if (keyIndex !== -1 && keyIndex < shuffledAnswers.length) {
        const actualIndex = keyIndex > 3 ? keyIndex - 4 : keyIndex;
        if (actualIndex < shuffledAnswers.length) {
          handleAnswer(shuffledAnswers[actualIndex], actualIndex);
        }
      }
      
      if (event.key.toLowerCase() === 'h' && showHints) {
        setShowHint(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAnswered, isTimeUp, shuffledAnswers, showHints]);

  const handleAnswer = useCallback((answer: string, index: number) => {
    if (isAnswered || isTimeUp) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const timeSpent = (Date.now() - startTime) / 1000;
    const isCorrect = answer === question.correct_answer;
    
    // Effet confettis pour bonne réponse
    if (isCorrect && streak >= 2) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    
    const delay = autoNext ? 2500 : 1500;
    setTimeout(() => {
      onAnswer(isCorrect, timeSpent);
    }, delay);
  }, [isAnswered, isTimeUp, question.correct_answer, startTime, onAnswer, autoNext, streak]);

  const getAnswerClass = (answer: string) => {
    const baseClass = "group relative w-full text-left p-5 rounded-2xl transition-all duration-300 border-2 font-medium transform";
    
    if (!isAnswered && !isTimeUp) {
      return `${baseClass} ${themeClasses.border} ${themeClasses.bgPrimary} hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:scale-[1.02] cursor-pointer hover:-translate-y-1`;
    }
    
    if (answer === question.correct_answer) {
      return `${baseClass} border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105 animate-pulse`;
    }
    
    if (answer === selectedAnswer && answer !== question.correct_answer) {
      return `${baseClass} border-red-500 bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg animate-shake`;
    }
    
    return `${baseClass} ${themeClasses.border} ${themeClasses.bgTertiary} ${themeClasses.textMuted} opacity-60`;
  };

  const getTimeColor = () => {
    const percentage = (timeLeft / timeLimit) * 100;
    if (percentage > 60) return 'from-green-500 to-emerald-600';
    if (percentage > 30) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <FiStar className="text-green-500" />;
      case 'medium': return <FiZap className="text-yellow-500" />;
      case 'hard': return <FaFire className="text-red-500" />;
      default: return <FiTarget className="text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
      case 'hard': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const getHint = () => {
    if (question.type === 'boolean') {
      return "💡 Astuce: C'est une question Vrai/Faux. Analysez chaque mot avec attention !";
    }
    
    const incorrectAnswers = shuffledAnswers.filter(answer => 
      answer !== question.correct_answer
    );
    const randomIncorrect = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
    
    return `💡 Indice: "${randomIncorrect}" n'est certainement pas la bonne réponse.`;
  };

  const getStreakBonus = () => {
    if (streak >= 5) return { icon: <FaGem className="text-purple-400" />, text: "Série Légendaire!", color: "from-purple-500 to-pink-600" };
    if (streak >= 3) return { icon: <FaFire className="text-orange-400" />, text: "En Feu!", color: "from-orange-500 to-red-600" };
    if (streak >= 2) return { icon: <FaBolt className="text-yellow-400" />, text: "Bien Joué!", color: "from-yellow-500 to-orange-500" };
    return null;
  };

  const streakBonus = getStreakBonus();

  return (
    <motion.div 
      className={`${themeClasses.bgCard} rounded-3xl ${themeClasses.shadow} border ${themeClasses.border} overflow-hidden backdrop-blur-xl`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      layout
    >
      {/* Effets de confettis */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Header avec informations */}
      <div className={`bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 text-white relative overflow-hidden`}>
        {/* Éléments décoratifs de fond */}
        <div className="absolute inset-0 bg-black/10" />
        <motion.div 
          className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div 
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30"
                whileHover={{ scale: 1.05 }}
              >
                <Brain className="text-yellow-300" />
                <span className="font-bold text-sm">
                  {questionNumber}/{totalQuestions}
                </span>
              </motion.div>
              
              <motion.div 
                className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getDifficultyColor(question.difficulty)} text-xs font-semibold`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {getDifficultyIcon(question.difficulty)}
                {question.difficulty.toUpperCase()}
              </motion.div>

              {/* Bonus de série */}
              {streakBonus && (
                <motion.div
                  className={`flex items-center gap-2 bg-gradient-to-r ${streakBonus.color} px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                >
                  {streakBonus.icon}
                  {streakBonus.text}
                </motion.div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {showHints && !isAnswered && !isTimeUp && (
                <motion.button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 transition-all text-sm font-medium"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLightbulb className="text-yellow-300" />
                  Indice
                </motion.button>
              )}
              
              <div className="flex items-center gap-3">
                <FiClock className="text-xl" />
                <motion.div
                  className="relative"
                  animate={timeLeft <= 10 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
                >
                  <span className={`font-bold text-2xl ${timeLeft <= 10 ? 'text-red-300' : 'text-white'}`}>
                    {timeLeft}
                  </span>
                  <span className="text-sm opacity-75">s</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Barre de progression du temps */}
          <div className="relative w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${getTimeColor()} shadow-lg`}
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / timeLimit) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Indicateur de danger */}
            {timeLeft <= 10 && (
              <motion.div
                className="absolute inset-0 bg-red-400/20 rounded-full"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </div>

          {/* Indicateurs de progression */}
          <div className="flex justify-between mt-3 text-sm opacity-75">
            <span>Question {questionNumber}</span>
            <span>{Math.round((timeLeft / timeLimit) * 100)}% temps restant</span>
          </div>
        </div>
      </div>

      {/* Contenu de la question */}
      <div className="p-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-4 mb-6">
            <motion.div 
              className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              Q
            </motion.div>
            <h3 
              className={`text-xl lg:text-2xl font-bold ${themeClasses.textPrimary} leading-relaxed`}
              dangerouslySetInnerHTML={{ __html: question.question }} 
            />
          </div>
        </motion.div>

        {/* Indice */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className={`mb-8 p-6 ${themeClasses.bgSecondary} border-l-4 border-yellow-500 rounded-r-2xl ${themeClasses.shadow}`}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FaLightbulb className="text-yellow-500 text-xl mt-1 flex-shrink-0" />
                </motion.div>
                <div>
                  <h4 className={`font-semibold ${themeClasses.textPrimary} mb-2 flex items-center gap-2`}>
                    Indice Intelligent
                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                      IA
                    </span>
                  </h4>
                  <p className={`${themeClasses.textSecondary}`}>{getHint()}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Réponses */}
        <div className="space-y-4">
          {shuffledAnswers.map((answer, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(answer, index)}
              className={getAnswerClass(answer)}
              disabled={isAnswered || isTimeUp}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={!isAnswered && !isTimeUp ? { 
                scale: 1.02,
                boxShadow: resolvedTheme === 'dark' 
                  ? "0 10px 30px rgba(99, 102, 241, 0.3)" 
                  : "0 10px 30px rgba(99, 102, 241, 0.2)"
              } : {}}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                      !isAnswered && !isTimeUp 
                        ? `${themeClasses.bgSecondary} ${themeClasses.textSecondary} group-hover:bg-indigo-500 group-hover:text-white` 
                        : answer === question.correct_answer 
                          ? 'bg-white/20 text-white' 
                          : answer === selectedAnswer 
                            ? 'bg-white/20 text-white' 
                            : `${themeClasses.bgTertiary} ${themeClasses.textMuted}`
                    }`}
                    whileHover={!isAnswered && !isTimeUp ? { scale: 1.1 } : {}}
                  >
                    {String.fromCharCode(65 + index)}
                  </motion.div>
                  <span 
                    className="text-left"
                    dangerouslySetInnerHTML={{ __html: answer }} 
                  />
                </div>
                
                {isAnswered && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
                    className="flex items-center"
                  >
                    {answer === question.correct_answer ? (
                      <div className="flex items-center gap-2">
                        <FiCheck size={24} className="text-white" />
                        <span className="text-sm font-semibold text-white/90">Correct!</span>
                      </div>
                    ) : answer === selectedAnswer ? (
                      <div className="flex items-center gap-2">
                        <FiX size={24} className="text-white" />
                        <span className="text-sm font-semibold text-white/90">Incorrect</span>
                      </div>
                    ) : null}
                  </motion.div>
                )}
              </div>

              {/* Effet de hover pour les réponses non répondues */}
              {!isAnswered && !isTimeUp && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Informations supplémentaires */}
        <motion.div 
          className={`mt-8 pt-6 border-t ${themeClasses.border}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FiTarget className="text-indigo-500" />
                <span className={themeClasses.textSecondary}>
                  Catégorie: <strong className={themeClasses.textPrimary}>{question.category}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiEye className="text-purple-500" />
                <span className={themeClasses.textSecondary}>
                  Type: <strong className={themeClasses.textPrimary}>
                    {question.type === 'multiple' ? 'QCM' : 'Vrai/Faux'}
                  </strong>
                </span>
              </div>
            </div>
            
            {!isAnswered && !isTimeUp && (
              <motion.div 
                className={`text-xs ${themeClasses.textMuted} bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 px-3 py-2 rounded-full`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💡 Utilisez les touches A-{String.fromCharCode(65 + shuffledAnswers.length - 1)} pour répondre
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Message de temps écoulé */}
        <AnimatePresence>
          {isTimeUp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className={`mt-6 p-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl text-white text-center shadow-xl`}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  <FiClock className="text-2xl" />
                </motion.div>
                <span className="text-xl font-bold">Temps Écoulé!</span>
              </div>
              <p className="text-red-100 mb-3">
                Ne vous inquiétez pas, c'était une question difficile !
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                <p className="text-sm">
                  💡 La bonne réponse était : <strong className="text-yellow-200">{question.correct_answer}</strong>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}