import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Question from './Question';
import ProgressBar from './ProgressBar';
import { fetchQuizQuestions } from '../utils/api';
import { QuestionState } from '../types/quizTypes';

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

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/results', { state: { score, total: questions.length } });
    }
  };

  if (!name) navigate('/');

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>{error}</div>;
  if (!questions.length) return <div>No questions available</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Welcome, {name}!</h2>
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
  );
}