import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionState } from '../types/quizTypes';
import { FiClock, FiHelpCircle, FiCheck, FiX, FiZap } from 'react-icons/fi';
import { FaLightbulb, FaStar } from 'react-icons/fa';

type QuestionProps = {
  question: QuestionState;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean, timeSpent: number) => void;
  timeLimit?: number; // en secondes
  showHints?: boolean;
  autoNext?: boolean;
  onTimeUp?: () => void;
};

export default function Question({ 
  question, 
  questionNumber, 
  totalQuestions,
  onAnswer, 
  timeLimit = 30,
  showHints = true,
  autoNext = true,
  onTimeUp
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Réinitialiser l'état pour une nouvelle question
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShuffledAnswers(question.answers);
    setTimeLeft(timeLimit);
    setShowHint(false);
    setIsTimeUp(false);
    setSelectedIndex(null);
  }, [question, timeLimit]);

  // Minuteur
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

  // Navigation au clavier
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isAnswered || isTimeUp) return;

      const keys = ['1', '2', '3', '4'];
      const keyIndex = keys.indexOf(event.key);
      
      if (keyIndex !== -1 && keyIndex < shuffledAnswers.length) {
        handleAnswer(shuffledAnswers[keyIndex], keyIndex);
      }
      
      if (event.key === 'h' && showHints) {
        setShowHint(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAnswered, isTimeUp, shuffledAnswers, showHints]);

  const handleAnswer = useCallback((answer: string, index: number) => {
    if (isAnswered || isTimeUp) return;
    
    setSelectedAnswer(answer);
    setSelectedIndex(index);
    setIsAnswered(true);
    
    const timeSpent = (Date.now() - startTime) / 1000;
    const isCorrect = answer === question.correct_answer;
    
    // Délai pour permettre à l'utilisateur de voir la réponse
    const delay = autoNext ? 2000 : 1000;
    setTimeout(() => {
      onAnswer(isCorrect, timeSpent);
    }, delay);
  }, [isAnswered, isTimeUp, question.correct_answer, startTime, onAnswer, autoNext]);

  const getAnswerClass = (answer: string, index: number) => {
    const baseClass = "group relative w-full text-left p-4 rounded-xl transition-all duration-300 border-2 font-medium";
    
    if (!isAnswered && !isTimeUp) {
      return `${baseClass} border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md transform hover:scale-[1.02] cursor-pointer`;
    }
    
    if (answer === question.correct_answer) {
      return `${baseClass} border-green-500 bg-green-500 text-white shadow-lg scale-105`;
    }
    
    if (answer === selectedAnswer && answer !== question.correct_answer) {
      return `${baseClass} border-red-500 bg-red-500 text-white shadow-lg`;
    }
    
    return `${baseClass} border-gray-300 bg-gray-100 text-gray-500`;
  };

  const getTimeColor = () => {
    const percentage = (timeLeft / timeLimit) * 100;
    if (percentage > 60) return 'text-green-600';
    if (percentage > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHint = () => {
    if (question.type === 'boolean') {
      return "Astuce: C'est une question Vrai/Faux, réfléchissez bien aux détails!";
    }
    
    // Éliminer une mauvaise réponse comme indice
    const incorrectAnswers = shuffledAnswers.filter(answer => 
      answer !== question.correct_answer
    );
    const randomIncorrect = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
    
    return `Astuce: "${randomIncorrect}" n'est pas la bonne réponse.`;
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header avec informations */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              Question {questionNumber}/{totalQuestions}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {showHints && !isAnswered && !isTimeUp && (
              <motion.button
                onClick={() => setShowHint(true)}
                className="flex items-center gap-1 text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLightbulb className="text-yellow-300" />
                Indice
              </motion.button>
            )}
            
            <div className={`flex items-center gap-2 font-bold text-lg ${getTimeColor()}`}>
              <FiClock />
              <motion.span
                key={timeLeft}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className={timeLeft <= 10 ? 'animate-pulse' : ''}
              >
                {timeLeft}s
              </motion.span>
            </div>
          </div>
        </div>

        {/* Barre de progression du temps */}
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full rounded-full transition-colors duration-300 ${
              timeLeft > timeLimit * 0.6 ? 'bg-green-400' :
              timeLeft > timeLimit * 0.3 ? 'bg-yellow-400' : 'bg-red-400'
            }`}
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / timeLimit) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Contenu de la question */}
      <div className="p-6">
        <div className="mb-6">
          <h3 
            className="text-xl font-semibold text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: question.question }} 
          />
        </div>

        {/* Indice */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <div className="flex items-start gap-2">
                <FaLightbulb className="text-yellow-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-yellow-800">{getHint()}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Réponses */}
        <div className="space-y-3">
          {shuffledAnswers.map((answer, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(answer, index)}
              className={getAnswerClass(answer, index)}
              disabled={isAnswered || isTimeUp}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!isAnswered && !isTimeUp ? { x: 5 } : {}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-gray-200 group-hover:bg-indigo-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600 group-hover:text-indigo-600 transition-colors">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </div>
                
                {isAnswered && (
                  <div className="flex items-center">
                    {answer === question.correct_answer ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-white"
                      >
                        <FiCheck size={20} />
                      </motion.div>
                    ) : answer === selectedAnswer ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-white"
                      >
                        <FiX size={20} />
                      </motion.div>
                    ) : null}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>Catégorie: <strong>{question.category}</strong></span>
              <span>Type: <strong>{question.type === 'multiple' ? 'QCM' : 'Vrai/Faux'}</strong></span>
            </div>
            
            {!isAnswered && !isTimeUp && (
              <div className="text-xs text-gray-400">
                Utilisez les touches 1-{shuffledAnswers.length} pour répondre rapidement
              </div>
            )}
          </div>
        </div>

        {/* Message de temps écoulé */}
        {isTimeUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-center"
          >
            <div className="flex items-center justify-center gap-2 text-red-600">
              <FiClock />
              <span className="font-semibold">Temps écoulé!</span>
            </div>
            <p className="text-sm text-red-500 mt-1">
              La bonne réponse était: <strong>{question.correct_answer}</strong>
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}