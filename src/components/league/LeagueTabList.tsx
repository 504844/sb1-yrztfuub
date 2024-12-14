import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LeagueTabListProps {
  leagues: string[];
}

export function LeagueTabList({ leagues }: LeagueTabListProps) {
  return (
    <ScrollArea className="w-full">
      <TabsList className="inline-flex w-auto p-1 bg-gray-100 rounded-lg">
        {leagues.map(league => (
          <TabsTrigger
            key={league}
            value={league}
            className="px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            {league}
          </TabsTrigger>
        ))}
      </TabsList>
    </ScrollArea>
  );
}