import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(
  key: string, 
  initialValue: T,
  options?: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  }
): [T, (value: SetValue<T>) => void, () => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      return options?.deserialize 
        ? options.deserialize(item)
        : JSON.parse(item);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const setValue = useCallback((value: SetValue<T>) => {
    try {
      setIsLoading(true);
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        const serializedValue = options?.serialize 
          ? options.serialize(valueToStore)
          : JSON.stringify(valueToStore);
        window.localStorage.setItem(key, serializedValue);
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    } finally {
      setIsLoading(false);
    }
  }, [key, storedValue, options]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Synchroniser avec les changements d'autres onglets
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = options?.deserialize 
            ? options.deserialize(e.newValue)
            : JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, options]);

  return [storedValue, setValue, removeValue, isLoading];
}

// Hook spécialisé pour les statistiques utilisateur
export function useUserStats() {
  const defaultStats = {
    totalQuizzes: 0,
    bestScore: 0,
    averageScore: 0,
    totalCorrectAnswers: 0,
    totalQuestions: 0,
    categoriesPlayed: [] as string[],
    recentScores: [] as number[],
    achievements: [] as string[],
    lastPlayedDate: null as string | null,
    streakDays: 0,
    preferredDifficulty: 'medium' as 'easy' | 'medium' | 'hard',
    fastestCompletion: null as number | null, // en secondes
  };

  const [stats, setStats, removeStats] = useLocalStorage('quizUserStats', defaultStats);

  const updateStats = useCallback((newQuizData: {
    score: number;
    totalQuestions: number;
    category: string;
    completionTime?: number;
  }) => {
    setStats(prevStats => {
      const { score, totalQuestions, category, completionTime } = newQuizData;
      const percentage = Math.round((score / totalQuestions) * 100);
      
      const updatedStats = {
        ...prevStats,
        totalQuizzes: prevStats.totalQuizzes + 1,
        bestScore: Math.max(prevStats.bestScore, percentage),
        totalCorrectAnswers: prevStats.totalCorrectAnswers + score,
        totalQuestions: prevStats.totalQuestions + totalQuestions,
        categoriesPlayed: prevStats.categoriesPlayed.includes(category) 
          ? prevStats.categoriesPlayed 
          : [...prevStats.categoriesPlayed, category],
        recentScores: [...prevStats.recentScores.slice(-9), percentage], // Garder les 10 derniers scores
        lastPlayedDate: new Date().toISOString(),
      };

      // Calculer la moyenne
      updatedStats.averageScore = Math.round(
        (updatedStats.totalCorrectAnswers / updatedStats.totalQuestions) * 100
      );

      // Mettre à jour le temps le plus rapide
      if (completionTime && (
        !prevStats.fastestCompletion || 
        completionTime < prevStats.fastestCompletion
      )) {
        updatedStats.fastestCompletion = completionTime;
      }

      // Gérer les achievements
      const newAchievements = [...prevStats.achievements];
      
      if (percentage === 100 && !newAchievements.includes('perfect-score')) {
        newAchievements.push('perfect-score');
      }
      
      if (updatedStats.totalQuizzes >= 10 && !newAchievements.includes('veteran')) {
        newAchievements.push('veteran');
      }
      
      if (updatedStats.bestScore >= 90 && !newAchievements.includes('expert')) {
        newAchievements.push('expert');
      }

      updatedStats.achievements = newAchievements;

      return updatedStats;
    });
  }, [setStats]);

  const resetStats = useCallback(() => {
    removeStats();
  }, [removeStats]);

  return {
    stats,
    updateStats,
    resetStats,
    setStats
  };
}

// Hook pour les préférences utilisateur
export function useUserPreferences() {
  const defaultPreferences = {
    theme: 'light' as 'light' | 'dark' | 'auto',
    soundEnabled: true,
    animationsEnabled: true,
    autoNextQuestion: false,
    questionTimeLimit: 30, // secondes
    showHints: true,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    preferredCategories: [] as string[],
    language: 'fr' as 'fr' | 'en',
  };

  return useLocalStorage('quizUserPreferences', defaultPreferences);
}

export default useLocalStorage;