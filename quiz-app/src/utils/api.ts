import axios from 'axios';

import { QuestionState } from '../types/quizTypes';

export const fetchQuizQuestions = async (amount: number): Promise<QuestionState[]> => {
  const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}`);
  return response.data.results.map((question: any) => ({
    ...question,
    answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
  }));
};