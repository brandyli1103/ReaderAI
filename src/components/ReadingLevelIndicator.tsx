
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star } from 'lucide-react';

interface ReadingLevelIndicatorProps {
  currentLevel: number;
  xpPoints: number;
  xpToNextLevel: number;
}

const ReadingLevelIndicator = ({ currentLevel, xpPoints, xpToNextLevel }: ReadingLevelIndicatorProps) => {
  const progress = (xpPoints / xpToNextLevel) * 100;
  const xpNeeded = xpToNextLevel - xpPoints;

  const getLevelColor = (level: number) => {
    if (level <= 2) return 'from-readwise-green to-green-400';
    if (level <= 4) return 'from-readwise-blue to-blue-400';
    if (level <= 6) return 'from-readwise-orange to-orange-400';
    if (level <= 8) return 'from-readwise-purple to-purple-400';
    return 'from-readwise-pink to-pink-400';
  };

  const getLevelTitle = (level: number) => {
    if (level <= 2) return 'Beginning Reader';
    if (level <= 4) return 'Developing Reader';
    if (level <= 6) return 'Independent Reader';
    if (level <= 8) return 'Advanced Reader';
    return 'Expert Reader';
  };

  const getLevelBadge = (level: number) => {
    if (level <= 2) return '🌱';
    if (level <= 4) return '🌿';
    if (level <= 6) return '🌳';
    if (level <= 8) return '🦉';
    return '👑';
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className={`bg-gradient-to-r ${getLevelColor(currentLevel)} text-white`}>
        <CardTitle className="flex items-center justify-between font-comic text-2xl">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{getLevelBadge(currentLevel)}</div>
            <div>
              <div>Level {currentLevel}</div>
              <div className="text-lg opacity-90">{getLevelTitle(currentLevel)}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5" fill="currentColor" />
              <span className="text-xl font-bold">{xpPoints}</span>
            </div>
            <div className="text-sm opacity-90">XP Points</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-comic text-gray-700">Progress to Level {currentLevel + 1}</span>
            <span className="font-comic text-sm text-gray-500">
              {xpNeeded} XP needed
            </span>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-comic font-bold text-white drop-shadow">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          {/* XP Earning Tips */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-comic font-bold text-readwise-blue mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Earn More XP:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm font-comic text-gray-700">
              <div>📚 Finish a book: +50 XP</div>
              <div>🎯 Perfect quiz: +25 XP</div>
              <div>📖 Daily reading: +10 XP</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingLevelIndicator;
