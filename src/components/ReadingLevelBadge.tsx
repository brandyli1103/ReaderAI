
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface ReadingLevelBadgeProps {
  level: number;
  className?: string;
}

const ReadingLevelBadge = ({ level, className = "" }: ReadingLevelBadgeProps) => {
  const getLevelColor = (level: number) => {
    if (level <= 2) return 'bg-readwise-green';
    if (level <= 4) return 'bg-readwise-blue';
    if (level <= 6) return 'bg-readwise-orange';
    if (level <= 8) return 'bg-readwise-purple';
    return 'bg-readwise-pink';
  };

  const getLevelTitle = (level: number) => {
    if (level <= 2) return 'Beginning Reader';
    if (level <= 4) return 'Developing Reader';
    if (level <= 6) return 'Independent Reader';
    if (level <= 8) return 'Advanced Reader';
    return 'Expert Reader';
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <Badge className={`${getLevelColor(level)} text-white font-comic text-lg px-4 py-2 rounded-xl`}>
        <TrendingUp className="h-5 w-5 mr-2" />
        Level {level} - {getLevelTitle(level)}
      </Badge>
    </div>
  );
};

export default ReadingLevelBadge;
