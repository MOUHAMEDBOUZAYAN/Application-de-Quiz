import axios from 'axios';
import { QuestionState } from '../types/quizTypes';

export const fetchQuizQuestions = async (amount: number): Promise<QuestionState[]> => {
  try {
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&encode=url3986`);
    if (response.data.response_code !== 0) {
      throw new Error('API returned no results');
    }
    
    return response.data.results.map((question: any) => ({
      category: decodeURIComponent(question.category),
      type: decodeURIComponent(question.type),
      difficulty: decodeURIComponent(question.difficulty),
      question: decodeURIComponent(question.question),
      correct_answer: decodeURIComponent(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map((a: string) => decodeURIComponent(a)),
      answers: [...question.incorrect_answers, question.correct_answer]
        .map((a: string) => decodeURIComponent(a))
        .sort(() => Math.random() - 0.5),
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions. Please try again later.');
  }
};