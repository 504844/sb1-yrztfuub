import { Trophy } from 'lucide-react';

export function Header() {
  return (
    <div className="py-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Trophy className="w-7 h-7 text-orange-500" />
          <h1 className="text-2xl font-bold">Kada kašis?</h1>
        </div>
      </div>
    </div>
  );
}