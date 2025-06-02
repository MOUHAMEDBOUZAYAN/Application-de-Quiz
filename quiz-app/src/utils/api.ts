import axios from 'axios';
import { QuestionState } from '../types/quizTypes';

// Configuration de l'API
const API_BASE_URL = 'https://opentdb.com';
const TIMEOUT = 10000; // 10 secondes

// Instance axios avec configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types pour les paramètres de l'API
export interface QuizParams {
  amount: number;
  category?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple' | 'boolean';
  encode?: 'url3986' | 'base64';
}

export interface CategoryInfo {
  id: number;
  name: string;
}

export interface QuizSessionData {
  sessionToken?: string;
  questions: QuestionState[];
  startTime: number;
  settings: QuizParams;
}

// Cache simple pour les catégories
let categoriesCache: CategoryInfo[] | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let categoriesCacheTime = 0;

// Gestion des erreurs API
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public responseCode?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Fonction pour décoder les entités HTML
const decodeHtmlEntities = (text: string): string => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

// Mélanger un tableau
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Récupérer un token de session pour éviter les doublons
export const getSessionToken = async (): Promise<string> => {
  try {
    const response = await apiClient.get('/api_token.php?command=request');
    
    if (response.data.response_code !== 0) {
      throw new ApiError('Impossible de récupérer le token de session');
    }
    
    return response.data.token;
  } catch (error) {
    console.warn('Impossible de récupérer le token de session:', error);
    return ''; // Continuer sans token
  }
};

// Réinitialiser le token de session
export const resetSessionToken = async (token: string): Promise<void> => {
  try {
    await apiClient.get(`/api_token.php?command=reset&token=${token}`);
  } catch (error) {
    console.warn('Impossible de réinitialiser le token:', error);
  }
};

// Récupérer les catégories disponibles
export const fetchCategories = async (): Promise<CategoryInfo[]> => {
  const now = Date.now();
  
  // Utiliser le cache si disponible et valide
  if (categoriesCache && (now - categoriesCacheTime) < CACHE_DURATION) {
    return categoriesCache;
  }
  
  try {
    const response = await apiClient.get('/api_category.php');
    
    const categories: CategoryInfo[] = response.data.trivia_categories.map((cat: any) => ({
      id: cat.id,
      name: cat.name.replace(/^Entertainment:\s*|^Science:\s*/, ''), // Nettoyer les noms
    }));
    
    // Mettre en cache
    categoriesCache = categories;
    categoriesCacheTime = now;
    
    return categories;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    
    // Retourner des catégories par défaut en cas d'erreur
    return [
      { id: 9, name: 'Culture Générale' },
      { id: 17, name: 'Science & Nature' },
      { id: 21, name: 'Sports' },
      { id: 23, name: 'Histoire' },
    ];
  }
};

// Récupérer le nombre de questions disponibles pour une catégorie
export const getCategoryQuestionCount = async (categoryId: number): Promise<{
  total: number;
  easy: number;
  medium: number;
  hard: number;
}> => {
  try {
    const response = await apiClient.get(`/api_count.php?category=${categoryId}`);
    
    return {
      total: response.data.category_question_count.total_question_count,
      easy: response.data.category_question_count.total_easy_question_count,
      medium: response.data.category_question_count.total_medium_question_count,
      hard: response.data.category_question_count.total_hard_question_count,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de questions:', error);
    return { total: 0, easy: 0, medium: 0, hard: 0 };
  }
};

// Fonction principale pour récupérer les questions
export const fetchQuizQuestions = async (
  params: QuizParams,
  sessionToken?: string
): Promise<QuestionState[]> => {
  try {
    // Construire l'URL avec les paramètres
    const searchParams = new URLSearchParams({
      amount: params.amount.toString(),
      encode: 'url3986', // Toujours encoder pour éviter les problèmes
    });
    
    if (params.category) searchParams.append('category', params.category.toString());
    if (params.difficulty) searchParams.append('difficulty', params.difficulty);
    if (params.type) searchParams.append('type', params.type);
    if (sessionToken) searchParams.append('token', sessionToken);
    
    const response = await apiClient.get(`/api.php?${searchParams.toString()}`);
    
    // Gérer les codes de réponse de l'API
    switch (response.data.response_code) {
      case 0:
        break; // Succès
      case 1:
        throw new ApiError('Pas assez de questions disponibles pour ces critères', 400, 1);
      case 2:
        throw new ApiError('Paramètres invalides', 400, 2);
      case 3:
        throw new ApiError('Token non trouvé', 400, 3);
      case 4:
        throw new ApiError('Token vide, réinitialisation nécessaire', 400, 4);
      default:
        throw new ApiError('Erreur inconnue de l\'API', 400, response.data.response_code);
    }
    
    if (!response.data.results || response.data.results.length === 0) {
      throw new ApiError('Aucune question reçue de l\'API');
    }
    
    // Traiter et mélanger les questions
    return response.data.results.map((question: any) => {
      const correct = decodeURIComponent(question.correct_answer);
      const incorrect = question.incorrect_answers.map((a: string) => decodeURIComponent(a));
      const allAnswers = shuffleArray([correct, ...incorrect]);
      
      return {
        category: decodeURIComponent(question.category),
        type: decodeURIComponent(question.type),
        difficulty: decodeURIComponent(question.difficulty),
        question: decodeHtmlEntities(decodeURIComponent(question.question)),
        correct_answer: correct,
        incorrect_answers: incorrect,
        answers: allAnswers,
      };
    });
    
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new ApiError('Délai d\'attente dépassé. Vérifiez votre connexion internet.');
      }
      if (!error.response) {
        throw new ApiError('Impossible de contacter le serveur. Vérifiez votre connexion internet.');
      }
      throw new ApiError(`Erreur serveur: ${error.response.status}`);
    }
    
    console.error('Erreur lors de la récupération des questions:', error);
    throw new ApiError('Erreur inattendue lors de la récupération des questions');
  }
};

// Fonction simplifiée pour l'interface existante
export const fetchQuizQuestionsSimple = async (amount: number): Promise<QuestionState[]> => {
  return fetchQuizQuestions({ amount });
};

// Créer une session de quiz complète
export const createQuizSession = async (params: QuizParams): Promise<QuizSessionData> => {
  const sessionToken = await getSessionToken();
  const questions = await fetchQuizQuestions(params, sessionToken);
  
  return {
    sessionToken,
    questions,
    startTime: Date.now(),
    settings: params,
  };
};

// Valider les paramètres avant de faire l'appel API
export const validateQuizParams = async (params: QuizParams): Promise<boolean> => {
  if (params.amount < 1 || params.amount > 50) {
    throw new ApiError('Le nombre de questions doit être entre 1 et 50');
  }
  
  if (params.category) {
    const count = await getCategoryQuestionCount(params.category);
    const availableCount = params.difficulty 
      ? count[params.difficulty] 
      : count.total;
    
    if (params.amount > availableCount) {
      throw new ApiError(
        `Seulement ${availableCount} questions disponibles pour cette catégorie/difficulté`
      );
    }
  }
  
  return true;
};

// Fonction utilitaire pour obtenir les statistiques globales
export const getGlobalStats = async (): Promise<{
  totalCategories: number;
  totalQuestions: number;
  averageQuestionsPerCategory: number;
}> => {
  try {
    const response = await apiClient.get('/api_count_global.php');
    
    return {
      totalCategories: response.data.overall.total_num_of_verified_questions,
      totalQuestions: response.data.overall.total_num_of_questions,
      averageQuestionsPerCategory: Math.round(
        response.data.overall.total_num_of_questions / 
        response.data.overall.total_num_of_verified_questions
      ),
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques globales:', error);
    return {
      totalCategories: 24,
      totalQuestions: 4000,
      averageQuestionsPerCategory: 167,
    };
  }
};

// Fonction pour récupérer des questions avec retry automatique
export const fetchQuizQuestionsWithRetry = async (
  params: QuizParams,
  maxRetries: number = 3
): Promise<QuestionState[]> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchQuizQuestions(params);
    } catch (error) {
      lastError = error as Error;
      
      if (error instanceof ApiError && error.responseCode === 4) {
        // Token vide, essayer sans token
        const { sessionToken, ...paramsWithoutToken } = params as any;
        return await fetchQuizQuestions(paramsWithoutToken);
      }
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Attendre avant de réessayer (backoff exponentiel)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  
  throw lastError!;
};

// Export des fonctions principales
export {
  ApiError,
  fetchQuizQuestionsSimple as default,
};