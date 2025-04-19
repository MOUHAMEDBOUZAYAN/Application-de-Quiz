import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Question from './Question';
import ProgressBar from './ProgressBar';
import { fetchQuizQuestions } from '../utils/api';
import { QuestionState } from '../types/quizTypes';
import { FiUser, FiAward } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';

export default function Quiz() {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name] = useLocalStorage('quizUserName', '');
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuizQuestions(10);
        setQuestions(data);
      } catch (err) {
        setError('Échec du chargement des questions. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, []);

  useEffect(() => {
    if (!name) navigate('/');
  }, [name]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/results', { state: { score: isCorrect ? score + 1 : score, total: questions.length } });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="text-center p-8 text-indigo-600 text-xl">
        Chargement des questions...
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="text-center p-8 text-red-500 text-xl">
        {error}
      </div>
    </div>
  );

  if (!questions.length) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="text-center p-8 text-gray-500 text-xl">
        Aucune question disponible
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-10 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-blue-600/10 rounded-full blur-lg"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 sm:p-10 my-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3 text-gray-700 font-medium text-lg">
            <FiUser className="text-indigo-600" />
            <span>{name}</span>
          </div>
          <div className="flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full">
            <FiAward className="text-indigo-600" />
            <span className="text-indigo-700 font-semibold">Score: {score}</span>
          </div>
        </div>

        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
        />

        <Question
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}