
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Book, 
  Target, 
  Zap, 
  TrendingUp, 
  Users, 
  Star,
  Crown,
  Award,
  Flame
} from 'lucide-react';

interface Achievement {
  id: number;
  name: string;
  earned: boolean;
  icon: string;
  description?: string;
  progress?: number;
  requirement?: number;
}

interface AchievementGridProps {
  achievements: Achievement[];
}

const AchievementGrid = ({ achievements }: AchievementGridProps) => {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      book: Book,
      trophy: Trophy,
      target: Target,
      zap: Zap,
      'trending-up': TrendingUp,
      users: Users,
      star: Star,
      crown: Crown,
      award: Award,
      flame: Flame
    };
    return icons[iconName] || Trophy;
  };

  const getAchievementColor = (earned: boolean) => {
    return earned ? 'from-readwise-yellow to-yellow-400' : 'from-gray-300 to-gray-400';
  };

  // Enhanced achievement data with descriptions and requirements
  const enhancedAchievements = [
    {
      id: 1,
      name: "First Book",
      earned: true,
      icon: "book",
      description: "Completed your very first book!",
      category: "Reading Milestones"
    },
    {
      id: 2,
      name: "Speed Reader",
      earned: true,
      icon: "zap",
      description: "Read 3 books in one week!",
      category: "Reading Speed"
    },
    {
      id: 3,
      name: "Level Up",
      earned: true,
      icon: "trending-up",
      description: "Advanced to Reading Level 5!",
      category: "Progress"
    },
    {
      id: 4,
      name: "Perfect Week",
      earned: false,
      icon: "target",
      description: "Read every day for 7 days in a row",
      progress: 6,
      requirement: 7,
      category: "Consistency"
    },
    {
      id: 5,
      name: "Book Club Hero",
      earned: false,
      icon: "users",
      description: "Join a reading group and participate",
      category: "Social Reading"
    },
    {
      id: 6,
      name: "Reading Champion",
      earned: false,
      icon: "crown",
      description: "Complete 50 books total",
      progress: 23,
      requirement: 50,
      category: "Reading Milestones"
    },
    {
      id: 7,
      name: "Quiz Master",
      earned: true,
      icon: "star",
      description: "Get 100% on 5 reading quizzes",
      category: "Comprehension"
    },
    {
      id: 8,
      name: "Genre Explorer",
      earned: false,
      icon: "award",
      description: "Read books from 5 different genres",
      progress: 3,
      requirement: 5,
      category: "Variety"
    },
    {
      id: 9,
      name: "Reading Streak",
      earned: true,
      icon: "flame",
      description: "Read for 30 days in a row",
      category: "Consistency"
    }
  ];

  const categories = [...new Set(enhancedAchievements.map(a => a.category))];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-readwise-yellow font-comic mb-2">
          🏆 Achievement Gallery
        </h2>
        <p className="text-gray-600 font-comic">
          Unlock badges by completing reading challenges!
        </p>
      </div>

      {categories.map(category => {
        const categoryAchievements = enhancedAchievements.filter(a => a.category === category);
        const earnedCount = categoryAchievements.filter(a => a.earned).length;
        
        return (
          <div key={category}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-readwise-blue font-comic">
                {category}
              </h3>
              <Badge className="bg-readwise-blue text-white font-comic">
                {earnedCount}/{categoryAchievements.length} Earned
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryAchievements.map((achievement) => {
                const Icon = getIcon(achievement.icon);
                const hasProgress = achievement.progress !== undefined && achievement.requirement !== undefined;
                
                return (
                  <Card 
                    key={achievement.id} 
                    className={`transition-all duration-300 hover:shadow-lg ${
                      achievement.earned 
                        ? 'border-readwise-yellow shadow-md transform hover:scale-105' 
                        : 'border-gray-300 opacity-75'
                    }`}
                  >
                    <CardHeader className={`text-center bg-gradient-to-r ${getAchievementColor(achievement.earned)} text-white rounded-t-lg`}>
                      <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2">
                        <Icon className={`h-8 w-8 ${achievement.earned ? 'animate-pulse' : ''}`} />
                      </div>
                      <CardTitle className="font-comic text-lg">{achievement.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm font-comic text-gray-600 mb-3">
                        {achievement.description}
                      </p>
                      
                      {hasProgress && !achievement.earned && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-comic text-gray-500">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.requirement}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress! / achievement.requirement!) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}
                      
                      {achievement.earned && (
                        <Badge className="bg-readwise-green text-white font-comic">
                          ✅ Earned!
                        </Badge>
                      )}
                      
                      {!achievement.earned && !hasProgress && (
                        <Badge variant="outline" className="font-comic border-gray-400 text-gray-500">
                          🔒 Locked
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Achievement Stats */}
      <Card className="bg-gradient-to-r from-readwise-yellow/10 to-yellow-100 border-readwise-yellow/30">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold text-readwise-yellow font-comic mb-4">
            🎯 Achievement Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-readwise-yellow font-comic">
                {enhancedAchievements.filter(a => a.earned).length}
              </div>
              <div className="text-sm font-comic text-gray-600">Achievements Earned</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-readwise-blue font-comic">
                {Math.round((enhancedAchievements.filter(a => a.earned).length / enhancedAchievements.length) * 100)}%
              </div>
              <div className="text-sm font-comic text-gray-600">Completion Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-readwise-green font-comic">
                {enhancedAchievements.filter(a => !a.earned).length}
              </div>
              <div className="text-sm font-comic text-gray-600">To Unlock</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementGrid;
