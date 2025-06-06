
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, Trophy, Target, TrendingUp, Star, Book, Clock, Users } from 'lucide-react';
import Header from '@/components/Header';
import ReadingLevelIndicator from '@/components/ReadingLevelIndicator';
import AchievementGrid from '@/components/AchievementGrid';
import SkillBreakdown from '@/components/SkillBreakdown';
import ReadingCalendar from '@/components/ReadingCalendar';
import ProgressChart from '@/components/ProgressChart';

const Progressed = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample progress data
  const studentData = {
    name: "Emma",
    currentLevel: 5,
    xpPoints: 2850,
    xpToNextLevel: 3000,
    booksRead: 23,
    monthlyGoal: 10,
    currentMonthBooks: 8,
    readingStreak: 6,
    totalReadingTime: 1420, // minutes
    achievements: [
      { id: 1, name: "First Book", earned: true, icon: "book" },
      { id: 2, name: "Speed Reader", earned: true, icon: "zap" },
      { id: 3, name: "Level Up", earned: true, icon: "trending-up" },
      { id: 4, name: "Perfect Week", earned: false, icon: "target" },
      { id: 5, name: "Book Club", earned: false, icon: "users" },
      { id: 6, name: "Champion", earned: false, icon: "trophy" }
    ],
    skills: {
      vocabulary: 78,
      comprehension: 85,
      fluency: 72,
      criticalThinking: 68
    }
  };

  const currentLevelProgress = (studentData.xpPoints / studentData.xpToNextLevel) * 100;
  const monthlyProgress = (studentData.currentMonthBooks / studentData.monthlyGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-readwise-blue font-comic mb-2">
            📊 Your Reading Progress
          </h1>
          <p className="text-lg text-gray-600 font-comic">
            Keep up the amazing work, {studentData.name}! 🌟
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-readwise-blue/10 to-readwise-blue/20 border-readwise-blue/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-readwise-blue font-comic mb-1">
                {studentData.booksRead}
              </div>
              <div className="text-sm font-comic text-gray-600">Books Read</div>
              <Book className="h-6 w-6 text-readwise-blue mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-readwise-green/10 to-readwise-green/20 border-readwise-green/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-readwise-green font-comic mb-1">
                {studentData.readingStreak}
              </div>
              <div className="text-sm font-comic text-gray-600">Day Streak</div>
              <Target className="h-6 w-6 text-readwise-green mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-readwise-purple/10 to-readwise-purple/20 border-readwise-purple/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-readwise-purple font-comic mb-1">
                {studentData.xpPoints}
              </div>
              <div className="text-sm font-comic text-gray-600">XP Points</div>
              <Star className="h-6 w-6 text-readwise-purple mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-readwise-orange/10 to-readwise-orange/20 border-readwise-orange/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-readwise-orange font-comic mb-1">
                {Math.floor(studentData.totalReadingTime / 60)}h
              </div>
              <div className="text-sm font-comic text-gray-600">Reading Time</div>
              <Clock className="h-6 w-6 text-readwise-orange mx-auto mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview" className="font-comic">
              <TrendingUp className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="achievements" className="font-comic">
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="skills" className="font-comic">
              <Target className="h-4 w-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="calendar" className="font-comic">
              <CalendarDays className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Reading Level & XP */}
              <div className="lg:col-span-2 space-y-6">
                <ReadingLevelIndicator 
                  currentLevel={studentData.currentLevel}
                  xpPoints={studentData.xpPoints}
                  xpToNextLevel={studentData.xpToNextLevel}
                />
                
                {/* Monthly Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-readwise-green font-comic text-xl">
                      📅 This Month's Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-comic text-gray-700">Books Read</span>
                      <span className="font-comic text-sm text-gray-500">
                        {studentData.currentMonthBooks}/{studentData.monthlyGoal}
                      </span>
                    </div>
                    <Progress value={monthlyProgress} className="h-4" />
                    {monthlyProgress >= 100 && (
                      <div className="text-center">
                        <Badge className="bg-readwise-green text-white font-comic">
                          🎉 Monthly Goal Achieved!
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <ProgressChart />
              </div>

              {/* Recent Achievements */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-readwise-yellow font-comic text-xl">
                      🏆 Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {studentData.achievements.filter(a => a.earned).slice(-3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                          <div className="w-10 h-10 bg-readwise-yellow rounded-full flex items-center justify-center">
                            <Trophy className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-comic font-bold text-gray-800">{achievement.name}</h4>
                            <p className="text-xs font-comic text-gray-600">Just earned!</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-readwise-yellow text-readwise-yellow hover:bg-readwise-yellow hover:text-white font-comic"
                      onClick={() => setActiveTab('achievements')}
                    >
                      View All Achievements
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementGrid achievements={studentData.achievements} />
          </TabsContent>

          <TabsContent value="skills">
            <SkillBreakdown skills={studentData.skills} />
          </TabsContent>

          <TabsContent value="calendar">
            <ReadingCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Progressed;
