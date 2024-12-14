import { Game } from '@/types/basketball';
import { Card, CardContent } from '@/components/ui/card';
import { GameTeam } from './GameTeam';
import { GameStatus } from './GameStatus';

interface GameCardProps {
  game: Game;
  favoriteTeams: string[];
  onToggleFavorite: (teamId: string) => void;
}

export function GameCard({ game, favoriteTeams, onToggleFavorite }: GameCardProps) {
  return (
    <Card className="w-full h-full hover:shadow-md transition-shadow">
      <CardContent className="p-4 h-full flex flex-col">
        <GameStatus 
          status={game.event_status} 
          timestamp={game.event_timestamp} 
        />

        <div className="space-y-3 flex-grow">
          <GameTeam
            logo={game.event_home_team_logo}
            name={game.event_home_team}
            score={game.event_home_team_score}
            teamId={game.home_team_key}
            isFavorite={favoriteTeams.includes(game.home_team_key)}
            onToggleFavorite={onToggleFavorite}
          />
          <GameTeam
            logo={game.event_away_team_logo}
            name={game.event_away_team}
            score={game.event_away_team_score}
            teamId={game.away_team_key}
            isFavorite={favoriteTeams.includes(game.away_team_key)}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      </CardContent>
    </Card>
  );
}