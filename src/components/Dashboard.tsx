
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReadingLevelBadge from './ReadingLevelBadge';
import ProgressBar from './ProgressBar';
import BookCard from './BookCard';
import AchievementBadges from './AchievementBadges';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const currentBook = {
    title: "The Magic Tree House: Dinosaurs Before Dark",
    author: "Mary Pope Osborne",
    level: 5,
    rating: 5,
    isCurrentBook: true
  };

  const recommendedBooks = [
    {
      title: "Charlotte's Web",
      author: "E.B. White",
      level: 5,
      rating: 5
    },
    {
      title: "The Lion, the Witch and the Wardrobe",
      author: "C.S. Lewis",
      level: 6,
      rating: 4
    },
    {
      title: "Matilda",
      author: "Roald Dahl",
      level: 5,
      rating: 5
    },
    {
      title: "Where the Red Fern Grows",
      author: "Wilson Rawls",
      level: 6,
      rating: 4
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome & Level */}
            <Card className="bg-gradient-to-r from-readwise-blue to-readwise-green text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold font-comic mb-2">Welcome back, Emma! 👋</h2>
                    <ReadingLevelBadge level={5} className="text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold font-comic">87%</div>
                    <div className="text-sm font-comic opacity-90">Books completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Book */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-readwise-blue font-comic text-2xl">
                  <BookOpen className="h-6 w-6 mr-2" />
                  Continue Your Adventure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <BookCard {...currentBook} />
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold font-comic text-gray-800">
                      Chapter 3: The Knight at Dawn
                    </h3>
                    <ProgressBar current={65} goal={100} label="Reading Progress" />
                    <Button size="lg" className="w-full bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg">
                      Continue Reading
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-readwise-green font-comic text-2xl">This Month's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar current={8} goal={10} label="Books Read This Month" />
                <ProgressBar current={145} goal={200} label="Pages Read" />
                <ProgressBar current={6} goal={7} label="Reading Days" />
              </CardContent>
            </Card>

            {/* Recommended Books */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-readwise-orange font-comic text-2xl">
                  <span>Recommended for You</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {recommendedBooks.map((book, index) => (
                    <BookCard key={index} {...book} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <AchievementBadges />
            
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-readwise-purple font-comic text-xl">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-comic text-gray-600">Total Books</span>
                  <span className="font-bold font-comic text-2xl text-readwise-blue">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-comic text-gray-600">Reading Streak</span>
                  <span className="font-bold font-comic text-2xl text-readwise-green">6 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-comic text-gray-600">Favorite Genre</span>
                  <span className="font-bold font-comic text-readwise-orange">Fantasy</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
