const API_URL = 'http://localhost:3000/api';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await fetch(`${API_URL}/questions`);
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const getQuestion = async (id: number): Promise<Question> => {
  try {
    const response = await fetch(`${API_URL}/questions/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch question');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
}; 