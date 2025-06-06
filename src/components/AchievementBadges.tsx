
import { Badge } from '@/components/ui/badge';
import { Award, Book, TrendingUp, Zap, Target, Users } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  earned: boolean;
  description: string;
}

const AchievementBadges = () => {
  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'First Book',
      icon: Book,
      color: 'bg-readwise-green',
      earned: true,
      description: 'Completed your first book!'
    },
    {
      id: '2',
      name: 'Speed Reader',
      icon: Zap,
      color: 'bg-readwise-yellow',
      earned: true,
      description: 'Read 3 books this week!'
    },
    {
      id: '3',
      name: 'Level Up',
      icon: TrendingUp,
      color: 'bg-readwise-blue',
      earned: true,
      description: 'Advanced to Level 5!'
    },
    {
      id: '4',
      name: 'Perfect Week',
      icon: Target,
      color: 'bg-readwise-orange',
      earned: false,
      description: 'Read every day for a week'
    },
    {
      id: '5',
      name: 'Book Club',
      icon: Users,
      color: 'bg-readwise-purple',
      earned: false,
      description: 'Join a reading group'
    },
    {
      id: '6',
      name: 'Champion',
      icon: Award,
      color: 'bg-readwise-pink',
      earned: false,
      description: 'Complete 50 books'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold font-comic text-readwise-blue">Your Achievements</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                achievement.earned
                  ? `${achievement.color} border-transparent text-white shadow-lg`
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              } ${achievement.earned ? 'transform hover:scale-105' : ''}`}
            >
              <div className="text-center space-y-2">
                <Icon className={`h-8 w-8 mx-auto ${achievement.earned ? 'animate-pulse' : ''}`} />
                <h4 className="font-bold font-comic text-sm">{achievement.name}</h4>
                <p className="text-xs font-comic opacity-80">{achievement.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementBadges;
