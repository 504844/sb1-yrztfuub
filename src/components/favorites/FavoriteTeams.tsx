import { Game } from '@/types/basketball';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { getFullImageUrl } from '@/lib/utils';
import { formatGameTime, formatGameDate } from '@/lib/date';

interface FavoriteTeamsProps {
  games: Game[];
  favoriteTeams: string[];
}

export function FavoriteTeams({ games, favoriteTeams }: FavoriteTeamsProps) {
  if (favoriteTeams.length === 0) return null;

  const favoriteGames = games.filter(game => 
    favoriteTeams.includes(game.home_team_key) || 
    favoriteTeams.includes(game.away_team_key)
  );

  if (favoriteGames.length === 0) return null;

  return (
    <div className="py-3">
      <ScrollArea className="w-full">
        <div className="flex gap-3">
          {favoriteGames.map(game => (
            <Card key={game.event_key} className="w-[200px] flex-shrink-0">
              <CardContent className="p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                    game.event_status.toLowerCase().includes('vyksta')
                      ? 'bg-red-500 text-white'
                      : game.event_status.toLowerCase().includes('neprasidėjo')
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {game.event_status}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {formatGameDate(game.event_timestamp)} {formatGameTime(game.event_timestamp)}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <img 
                        src={getFullImageUrl(game.event_home_team_logo)} 
                        alt="" 
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-xs truncate max-w-[100px]">
                        {game.event_home_team}
                      </span>
                    </div>
                    <span className="text-xs font-semibold">{game.event_home_team_score}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <img 
                        src={getFullImageUrl(game.event_away_team_logo)} 
                        alt="" 
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-xs truncate max-w-[100px]">
                        {game.event_away_team}
                      </span>
                    </div>
                    <span className="text-xs font-semibold">{game.event_away_team_score}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}