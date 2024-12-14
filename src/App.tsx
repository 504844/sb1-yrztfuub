import { useBasketballData } from '@/hooks/useBasketballData';
import { LeagueTab } from '@/components/league/LeagueTab';
import { LoadingGames } from '@/components/loading/LoadingGames';
import { Header } from '@/components/layout/Header';
import { FavoriteTeams } from '@/components/favorites/FavoriteTeams';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function App() {
  const { games, loading, error } = useBasketballData();
  const { preferences } = useUserPreferences();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-xl">Klaida: {error}</p>
          <p className="mt-2">Bandykite vėliau dar kartą</p>
        </div>
      </div>
    );
  }

  const leagues = Array.from(new Set(games.map(game => game.league_name)))
    .filter(Boolean)
    .sort();

  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {!loading && preferences.favoriteTeams.length > 0 && (
              <div className="border-b">
                <div className="max-w-[1600px] mx-auto px-4">
                  <FavoriteTeams 
                    games={games} 
                    favoriteTeams={preferences.favoriteTeams} 
                  />
                </div>
              </div>
            )}
            <div className="border-b">
              <div className="max-w-[1600px] mx-auto px-4">
                <Header />
              </div>
            </div>
          </div>
          
          <main className="max-w-[1600px] mx-auto px-4 py-6">
            {loading ? <LoadingGames /> : <LeagueTab games={games} leagues={leagues} />}
          </main>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}