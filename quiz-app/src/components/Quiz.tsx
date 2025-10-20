import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useLocalStorage, { useUserStats, useUserPreferences } from '../hooks/useLocalStorage';
import Question from './Question';
import ProgressBar from './ProgressBar';
import { fetchQuizQuestionsWithRetry, QuizParams } from '../utils/api';
import { QuestionState } from '../types/quizTypes';
import { 
  FiAward, FiPause, FiPlay, FiHome,
  FiVolume2, FiVolumeX, FiRefreshCw, FiEye, FiEyeOff
} from 'react-icons/fi';

interface QuizState {
  questions: QuestionState[];
  currentIndex: number;
  score: number;
  answers: boolean[];
  timeSpent: number[];
  startTime: number;
  isPaused: boolean;
  streak: number;
  maxStreak: number;
}

interface QuizSettings {
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: number;
  questionCount: number;
  timeLimit: number;
}

export default function Quiz() {
  const [name] = useLocalStorage('quizUserName', '');
  const { updateStats } = useUserStats();
  const [preferences] = useUserPreferences();
  const navigate = useNavigate();
  const location = useLocation();

  // État du quiz
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    answers: [],
    timeSpent: [],
    startTime: Date.now(),
    isPaused: false,
    streak: 0,
    maxStreak: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(preferences.soundEnabled);
  const [hintsEnabled, setHintsEnabled] = useState(preferences.showHints);

  // Paramètres du quiz (peuvent venir des props ou des paramètres par défaut)
  const quizSettings: QuizSettings = {
    questionCount: 10,
    timeLimit: preferences.questionTimeLimit,
    difficulty: preferences.difficulty,
    ...location.state // Permet de passer des paramètres via la navigation
  };

  // Effets sonores
  const playSound = useCallback((type: 'correct' | 'incorrect' | 'complete') => {
    if (!soundEnabled) return;
    
    const audio = new Audio();
    switch (type) {
      case 'correct':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBzuL0fPTgCkFKoHM8dGHNgcZZ7ng5Z1PEAxRo+Dvr2AXBjmM1PLDSjEGHHDF7t2FNgYeab7f5aJSEQxHo+HqsBkGaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBzuL0fPTgCkFKoHM8dGHNgcZZ7ng5Z1PEAxRo+Dvr2AXBjmM1PLDSjEGHHDF7t2FNgYeab7f5aJSEQxHo+HqsBkGamA=';
        break;
      case 'incorrect':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBzuL0fPTgCkFKoHM8dGHNgcZZ7ng5Z1PEAxRo+Dvr2AXBjmM1PLDSjEGHHDF7t2FNgYeab7f5aJSEQxHo+HqsBkGaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBzuL0fPTgCkFKoHM8dGHNgcZZ7ng5Z1PEAxRo+Dvr2AXBjmM1PLDSjEGHHDF7t2FNgYeab7f5aJSEQxHo+HqsBkGam=';
        break;
      case 'complete':
        audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBzuL0fPTgCkFKoHM8dGHNgcZZ7ng5Z1PEAxRo+Dvr2AXBjmM1PLDSjEGHHDF7t2FNgYeab7f5aJSEQxHo+HqsBkGaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBzuL0fPTgCkFKoHM8dGHNgcZZ7ng5Z1PEAxRo+Dvr2AXBjmM1PLDSjEGHHDF7t2FNgYeab7f5aJSEQxHo+HqsBkGamA=';
        break;
    }
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignorer les erreurs audio
  }, [soundEnabled]);

  // Redirection si pas de nom d'utilisateur
  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [name, navigate]);

  // Charger les questions au démarrage
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError('');

        const params: QuizParams = {
          amount: quizSettings.questionCount,
          difficulty: quizSettings.difficulty,
          category: quizSettings.category,
        };

        const questions = await fetchQuizQuestionsWithRetry(params);
        
        setQuizState(prev => ({
          ...prev,
          questions,
          startTime: Date.now(),
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des questions');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [quizSettings.questionCount, quizSettings.difficulty, quizSettings.category]);

  // Gérer la réponse à une question
  const handleAnswer = useCallback((isCorrect: boolean, timeSpent: number) => {
    setQuizState(prev => {
      const newAnswers = [...prev.answers, isCorrect];
      const newTimeSpent = [...prev.timeSpent, timeSpent];
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newMaxStreak = Math.max(prev.maxStreak, newStreak);

      // Son selon la réponse
      playSound(isCorrect ? 'correct' : 'incorrect');

      return {
        ...prev,
        score: newScore,
        answers: newAnswers,
        timeSpent: newTimeSpent,
        streak: newStreak,
        maxStreak: newMaxStreak,
      };
    });

    // Délai avant de passer à la question suivante ou aux résultats
    setTimeout(() => {
      setQuizState(prev => {
        if (prev.currentIndex < prev.questions.length - 1) {
          return { ...prev, currentIndex: prev.currentIndex + 1 };
        } else {
          // Quiz terminé
          const totalTime = Math.round((Date.now() - prev.startTime) / 1000);
          const finalScore = prev.answers.filter(Boolean).length + (isCorrect ? 1 : 0);
          
          // Mettre à jour les statistiques
          updateStats({
            score: finalScore,
            totalQuestions: prev.questions.length,
            category: prev.questions[0]?.category || 'Mixed',
            completionTime: totalTime,
          });

          playSound('complete');

          // Naviguer vers les résultats
          navigate('/results', {
            state: {
              score: finalScore,
              total: prev.questions.length,
              timeSpent: totalTime,
              answers: [...prev.answers, isCorrect],
              questions: prev.questions,
              streak: prev.maxStreak,
              averageTime: totalTime / prev.questions.length,
            }
          });
          
          return prev;
        }
      });
    }, preferences.autoNextQuestion ? 1500 : 2000);
  }, [playSound, updateStats, navigate, preferences.autoNextQuestion]);

  // Gérer la pause/reprise
  const togglePause = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  }, []);

  // Quitter le quiz
  const quitQuiz = useCallback(() => {
    if (window.confirm('Êtes-vous sûr de vouloir quitter le quiz? Votre progression sera perdue.')) {
      navigate('/');
    }
  }, [navigate]);

  // Calculer les statistiques en temps réel
  const currentQuestionNumber = quizState.currentIndex + 1;
  const totalTimeElapsed = Math.round((Date.now() - quizState.startTime) / 1000);
  const averageTimePerQuestion = quizState.timeSpent.length > 0 
    ? quizState.timeSpent.reduce((a, b) => a + b, 0) / quizState.timeSpent.length
    : 0;

  // Rendu des états de chargement et d'erreur
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <motion.div 
          className="text-center p-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-slate-600 border-t-blue-500 mx-auto mb-4"
          />
          <p className="text-blue-400 text-xl font-medium">Chargement des questions...</p>
          <p className="text-slate-400 text-sm mt-2">Préparation de votre quiz personnalisé</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <motion.div 
          className="text-center p-8 bg-slate-800 shadow-xl max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <FiRefreshCw className="text-red-400 text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Erreur de Chargement</h2>
          <p className="text-red-400 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-indigo-600 text-white px-6 py-3 hover:bg-indigo-700 transition-colors font-medium"
            >
              Réessayer
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-slate-700 text-slate-300 px-6 py-3 hover:bg-slate-600 transition-colors font-medium"
            >
              Retour à l'accueil
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!quizState.questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center p-8 text-slate-400 text-xl">
          Aucune question disponible
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-4 px-4 relative overflow-hidden">
      {/* Éléments de fond animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-32 right-10 w-40 h-40 bg-purple-500/10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Interface principale */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header avec contrôles */}
        <motion.div 
          className="bg-slate-800/90 backdrop-blur-md border border-slate-700 shadow-lg p-4 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 text-white font-medium">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{name}</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-indigo-500/20 px-3 py-1">
                <FiAward className="text-indigo-400" />
                <span className="text-indigo-300 font-semibold text-sm">
                  {quizState.score}/{currentQuestionNumber - 1}
                </span>
              </div>

              {quizState.streak > 0 && (
                <motion.div 
                  className="flex items-center space-x-1 bg-yellow-500/20 px-3 py-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={quizState.streak}
                >
                  <span className="text-yellow-400 text-sm">🔥</span>
                  <span className="text-yellow-300 font-semibold text-sm">
                    {quizState.streak}
                  </span>
                </motion.div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 bg-slate-700 hover:bg-slate-600 transition-colors"
                title={soundEnabled ? 'Désactiver le son' : 'Activer le son'}
              >
                {soundEnabled ? <FiVolume2 className="text-slate-300" /> : <FiVolumeX className="text-slate-500" />}
              </button>

              <button
                onClick={() => setHintsEnabled(!hintsEnabled)}
                className="p-2 bg-slate-700 hover:bg-slate-600 transition-colors"
                title={hintsEnabled ? 'Désactiver les indices' : 'Activer les indices'}
              >
                {hintsEnabled ? <FiEye className="text-slate-300" /> : <FiEyeOff className="text-slate-500" />}
              </button>

              <button
                onClick={togglePause}
                className="p-2 bg-blue-600/20 hover:bg-blue-600/30 transition-colors"
                title={quizState.isPaused ? 'Reprendre' : 'Mettre en pause'}
              >
                {quizState.isPaused ? <FiPlay className="text-blue-400" /> : <FiPause className="text-blue-400" />}
              </button>

              <button
                onClick={quitQuiz}
                className="p-2 bg-red-600/20 hover:bg-red-600/30 transition-colors"
                title="Quitter le quiz"
              >
                <FiHome className="text-red-400" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Contenu principal */}
        <AnimatePresence mode="wait">
          {!quizState.isPaused ? (
            <motion.div
              key="quiz-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <ProgressBar
                current={currentQuestionNumber}
                total={quizState.questions.length}
                score={quizState.score}
                timeElapsed={totalTimeElapsed}
                averageTimePerQuestion={averageTimePerQuestion}
                streak={quizState.streak}
                showDetailedStats={true}
              />

              <Question
                question={quizState.questions[quizState.currentIndex]}
                questionNumber={currentQuestionNumber}
                totalQuestions={quizState.questions.length}
                onAnswer={handleAnswer}
                timeLimit={quizSettings.timeLimit}
                showHints={hintsEnabled}
                autoNext={preferences.autoNextQuestion}
                onTimeUp={() => handleAnswer(false, quizSettings.timeLimit)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="paused-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center justify-center min-h-[400px]"
            >
              <div className="text-center bg-slate-800/90 backdrop-blur-md p-8 shadow-xl">
                <FiPause className="text-4xl text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Quiz en Pause</h2>
                <p className="text-slate-300 mb-6">Prenez votre temps, nous vous attendons!</p>
                <button
                  onClick={togglePause}
                  className="bg-blue-600 text-white px-8 py-3 hover:bg-blue-700 transition-colors font-medium"
                >
                  Reprendre le Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}