import { useState, useEffect } from 'react';
import { QuestionState } from '../types/quizTypes';

type QuestionProps = {
  question: QuestionState;
  questionNumber: number;
  onAnswer: (isCorrect: boolean) => void;
};

export default function Question({ question, questionNumber, onAnswer }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    // Reset state when new question loads
    setSelectedAnswer(null);
    setIsAnswered(false);
    // Use the pre-shuffled answers from the API
    setShuffledAnswers(question.answers);
  }, [question]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    // Delay to allow user to see their selection before moving on
    setTimeout(() => {
      onAnswer(answer === question.correct_answer);
    }, 1000);
  };

  const getAnswerClass = (answer: string) => {
    if (!isAnswered) return 'hover:bg-gray-100';
    
    if (answer === question.correct_answer) {
      return 'bg-green-500 text-white';
    }
    
    if (answer === selectedAnswer && answer !== question.correct_answer) {
      return 'bg-red-500 text-white';
    }
    
    return 'bg-gray-200';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <span className="text-gray-600">Question {questionNumber}</span>
        <h3 className="text-xl font-semibold mt-1" dangerouslySetInnerHTML={{ __html: question.question }} />
      </div>
      
      <div className="space-y-3">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className={`w-full text-left p-3 rounded transition-colors ${getAnswerClass(answer)} ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
            dangerouslySetInnerHTML={{ __html: answer }}
            disabled={isAnswered}
          />
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Category: {question.category} | Difficulty: {question.difficulty}
      </div>
    </div>
  );
}