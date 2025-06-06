
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Book, Target, Star } from 'lucide-react';

const ReadingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Sample reading data for the calendar
  const readingData = {
    '2024-01-01': { books: 1, minutes: 30, hasQuiz: true },
    '2024-01-02': { books: 0, minutes: 15, hasQuiz: false },
    '2024-01-03': { books: 1, minutes: 45, hasQuiz: true },
    '2024-01-04': { books: 0, minutes: 20, hasQuiz: false },
    '2024-01-05': { books: 2, minutes: 60, hasQuiz: true },
    '2024-01-06': { books: 1, minutes: 35, hasQuiz: false },
    '2024-01-07': { books: 0, minutes: 0, hasQuiz: false },
    '2024-01-08': { books: 1, minutes: 40, hasQuiz: true },
    '2024-01-09': { books: 1, minutes: 25, hasQuiz: true },
    '2024-01-10': { books: 0, minutes: 30, hasQuiz: false },
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getActivityLevel = (data: any) => {
    if (!data) return 'none';
    if (data.minutes >= 30 && data.books >= 1) return 'high';
    if (data.minutes >= 15 || data.books >= 1) return 'medium';
    if (data.minutes > 0) return 'low';
    return 'none';
  };

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-readwise-green';
      case 'medium': return 'bg-readwise-blue';
      case 'low': return 'bg-readwise-orange';
      default: return 'bg-gray-200';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Calculate streak and monthly stats
  const currentMonthData = Object.entries(readingData).filter(([date]) => {
    const [year, month] = date.split('-');
    return parseInt(year) === currentDate.getFullYear() && 
           parseInt(month) === currentDate.getMonth() + 1;
  });

  const activeDays = currentMonthData.filter(([, data]) => data.minutes > 0).length;
  const totalBooks = currentMonthData.reduce((sum, [, data]) => sum + data.books, 0);
  const totalMinutes = currentMonthData.reduce((sum, [, data]) => sum + data.minutes, 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-readwise-blue font-comic mb-2">
          📅 Reading Calendar
        </h2>
        <p className="text-gray-600 font-comic">
          Track your daily reading progress
        </p>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-readwise-green/10 to-green-100 border-readwise-green/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-readwise-green font-comic mb-1">
              {activeDays}
            </div>
            <div className="text-sm font-comic text-gray-600">Days Read This Month</div>
            <Target className="h-5 w-5 text-readwise-green mx-auto mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-readwise-blue/10 to-blue-100 border-readwise-blue/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-readwise-blue font-comic mb-1">
              {totalBooks}
            </div>
            <div className="text-sm font-comic text-gray-600">Books Completed</div>
            <Book className="h-5 w-5 text-readwise-blue mx-auto mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-readwise-orange/10 to-orange-100 border-readwise-orange/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-readwise-orange font-comic mb-1">
              {Math.round(totalMinutes / 60)}h
            </div>
            <div className="text-sm font-comic text-gray-600">Reading Time</div>
            <Star className="h-5 w-5 text-readwise-orange mx-auto mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between font-comic text-xl">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('prev')}
              className="border-readwise-blue text-readwise-blue hover:bg-readwise-blue hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-readwise-blue">{monthYear}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateMonth('next')}
              className="border-readwise-blue text-readwise-blue hover:bg-readwise-blue hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-comic font-bold text-gray-600 p-2 text-sm">
                {day}
              </div>
            ))}
            
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} className="h-12"></div>
            ))}
            
            {/* Calendar days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
              const dayData = readingData[dateKey];
              const activityLevel = getActivityLevel(dayData);
              const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
              
              return (
                <div
                  key={day}
                  className={`h-12 rounded-lg border-2 flex flex-col items-center justify-center relative cursor-pointer transition-all duration-200 hover:scale-105 ${
                    isToday ? 'border-readwise-yellow shadow-md' : 'border-gray-200'
                  } ${getActivityColor(activityLevel)}`}
                >
                  <div className={`font-comic font-bold text-sm ${
                    activityLevel === 'none' ? 'text-gray-600' : 'text-white'
                  }`}>
                    {day}
                  </div>
                  
                  {dayData && (
                    <div className="absolute -top-1 -right-1 flex space-x-1">
                      {dayData.books > 0 && (
                        <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                          <Book className="h-2 w-2 text-readwise-blue" />
                        </div>
                      )}
                      {dayData.hasQuiz && (
                        <div className="w-3 h-3 bg-readwise-yellow rounded-full flex items-center justify-center">
                          <Star className="h-2 w-2 text-white" />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {isToday && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-readwise-yellow rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-readwise-green rounded"></div>
              <span className="font-comic text-gray-600">Great Day (30+ min, 1+ book)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-readwise-blue rounded"></div>
              <span className="font-comic text-gray-600">Good Day (15+ min or 1+ book)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-readwise-orange rounded"></div>
              <span className="font-comic text-gray-600">Some Reading (1+ min)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span className="font-comic text-gray-600">No Reading</span>
            </div>
          </div>

          {/* Symbols Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Book className="h-4 w-4 text-readwise-blue" />
              <span className="font-comic text-gray-600">Book Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-readwise-yellow" />
              <span className="font-comic text-gray-600">Quiz Taken</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading Goals */}
      <Card className="bg-gradient-to-r from-readwise-purple/10 to-purple-100 border-readwise-purple/30">
        <CardHeader>
          <CardTitle className="text-readwise-purple font-comic text-xl">
            🎯 Monthly Reading Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-comic text-gray-700">Read 20 days this month</span>
              <Badge className={`font-comic ${activeDays >= 20 ? 'bg-readwise-green' : 'bg-gray-400'} text-white`}>
                {activeDays}/20 days
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-comic text-gray-700">Complete 10 books</span>
              <Badge className={`font-comic ${totalBooks >= 10 ? 'bg-readwise-green' : 'bg-gray-400'} text-white`}>
                {totalBooks}/10 books
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-comic text-gray-700">Read 15 hours total</span>
              <Badge className={`font-comic ${totalMinutes >= 900 ? 'bg-readwise-green' : 'bg-gray-400'} text-white`}>
                {Math.round(totalMinutes / 60)}/15 hours
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReadingCalendar;
