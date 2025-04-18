import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Question from './Question';
import ProgressBar from './ProgressBar';
import { fetchQuizQuestions } from '../utils/api';
import { QuestionState } from '../types/quizTypes';
import { FiUser } from 'react-icons/fi';

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
        const data = await fetchQuizQuestions(10); // 10 questions
        setQuestions(data);
      } catch (err) {
        setError('Failed to load questions. Please try again.');
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

  if (loading) return <div className="text-center p-8 text-gray-600">Loading questions...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!questions.length) return <div className="text-center p-8 text-gray-500">No questions available</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-10 px-4 flex flex-col items-center relative">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-indigo-300/30 rounded-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute bottom-32 right-10 w-24 h-24 bg-purple-300/20 rounded-full blur-3xl z-0 animate-ping"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl bg-white/90 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 sm:p-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-gray-700 font-medium">
            <FiUser />
            <span>{name}</span>
          </div>
          <div className="text-sm text-gray-500">
            Score: {score}
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
