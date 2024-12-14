import { useState, useEffect, useCallback } from 'react';

interface UserPreferences {
  favoriteTeams: string[];
  favoriteGames: string[];
  lastVisitedLeague?: string;
}

const STORAGE_KEY = 'kada-kasis-preferences';

const defaultPreferences: UserPreferences = {
  favoriteTeams: [],
  favoriteGames: [],
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultPreferences;
    } catch {
      return defaultPreferences;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }, [preferences]);

  const toggleFavoriteTeam = useCallback((teamId: string) => {
    setPreferences(prev => {
      const newFavorites = prev.favoriteTeams.includes(teamId)
        ? prev.favoriteTeams.filter(id => id !== teamId)
        : [...prev.favoriteTeams, teamId];
      
      return {
        ...prev,
        favoriteTeams: newFavorites
      };
    });
  }, []);

  const toggleFavoriteGame = useCallback((gameId: string) => {
    setPreferences(prev => {
      const newFavorites = prev.favoriteGames.includes(gameId)
        ? prev.favoriteGames.filter(id => id !== gameId)
        : [...prev.favoriteGames, gameId];
      
      return {
        ...prev,
        favoriteGames: newFavorites
      };
    });
  }, []);

  const setLastVisitedLeague = useCallback((league: string) => {
    setPreferences(prev => ({
      ...prev,
      lastVisitedLeague: league
    }));
  }, []);

  return {
    preferences,
    toggleFavoriteTeam,
    toggleFavoriteGame,
    setLastVisitedLeague
  };
}