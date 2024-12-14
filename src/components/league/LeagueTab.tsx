import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Game } from '@/types/basketball';
import { LeagueTabList } from './LeagueTabList';
import { LeagueGames } from './LeagueGames';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useEffect } from 'react';

interface LeagueTabProps {
  games: Game[];
  leagues: string[];
}

export function LeagueTab({ games, leagues }: LeagueTabProps) {
  const { preferences, toggleFavoriteTeam, setLastVisitedLeague } = useUserPreferences();
  
  const allLeagues = [
    'Visos lygos',
    ...leagues,
    'Neprasidėjo',
    'Pasibaigė'
  ];

  const defaultLeague = preferences.lastVisitedLeague || 'Visos lygos';

  useEffect(() => {
    // Force re-render of favorite games when preferences change
    const forceUpdate = () => {};
    forceUpdate();
  }, [preferences.favoriteTeams]);

  const getFilteredGames = (league: string) => {
    switch (league) {
      case 'Visos lygos':
        return games;
      case 'Neprasidėjo':
        return games.filter(game => 
          game.event_status.toLowerCase().includes('neprasidėjo')
        );
      case 'Pasibaigė':
        return games.filter(game => 
          game.event_status.toLowerCase().includes('pasibaigė')
        );
      default:
        return games.filter(game => game.league_name === league);
    }
  };

  return (
    <Tabs 
      defaultValue={defaultLeague} 
      className="w-full"
      onValueChange={setLastVisitedLeague}
    >
      <div className="sticky top-[var(--header-height)] bg-gray-50 z-40 border-b border-gray-200 pb-4">
        <LeagueTabList leagues={allLeagues} />
      </div>

      <div className="min-h-[500px]">
        {allLeagues.map(league => (
          <TabsContent 
            key={league} 
            value={league} 
            className="mt-4 focus-visible:outline-none focus-visible:ring-0"
          >
            <LeagueGames
              games={getFilteredGames(league)}
              favoriteTeams={preferences.favoriteTeams}
              onToggleFavorite={toggleFavoriteTeam}
            />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}