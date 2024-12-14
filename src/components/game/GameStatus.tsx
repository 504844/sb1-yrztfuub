import { formatGameTime, formatGameDate } from '@/lib/date';

interface GameStatusProps {
  status: string;
  timestamp: string;
}

export function GameStatus({ status, timestamp }: GameStatusProps) {
  const getStatusStyle = (status: string) => {
    const lowercaseStatus = status.toLowerCase();
    if (lowercaseStatus.includes('vyksta')) {
      return 'bg-red-500 text-white';
    }
    if (lowercaseStatus.includes('neprasidėjo')) {
      return 'bg-blue-500 text-white';
    }
    if (lowercaseStatus.includes('pasibaigė')) {
      return 'bg-gray-500 text-white';
    }
    return 'bg-gray-200 text-gray-700';
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusStyle(status)}`}>
        {status}
      </span>
      <span className="text-sm text-gray-500">
        {formatGameDate(timestamp)} {formatGameTime(timestamp)}
      </span>
    </div>
  );
}