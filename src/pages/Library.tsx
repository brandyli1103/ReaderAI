
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Clock, Star, Eye, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  readingLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  genre: string;
  estimatedTime: string;
  rating: number;
  description: string;
}

const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Magic Forest Adventure',
    author: 'Sarah Wonder',
    coverImage: '/placeholder.svg',
    readingLevel: 'Beginner',
    genre: 'Fantasy',
    estimatedTime: '15 min',
    rating: 4,
    description: 'Join Emma on her magical journey through an enchanted forest!'
  },
  {
    id: '2',
    title: 'Space Explorers Unite',
    author: 'Alex Starlight',
    coverImage: '/placeholder.svg',
    readingLevel: 'Intermediate',
    genre: 'Science Fiction',
    estimatedTime: '25 min',
    rating: 5,
    description: 'Blast off to outer space with the brave Space Explorers crew!'
  },
  {
    id: '3',
    title: 'The Friendly Dragon',
    author: 'Maya Kindness',
    coverImage: '/placeholder.svg',
    readingLevel: 'Beginner',
    genre: 'Fantasy',
    estimatedTime: '12 min',
    rating: 4,
    description: 'Meet Spark, the friendliest dragon in the kingdom!'
  },
  {
    id: '4',
    title: 'Mystery of the Lost Treasure',
    author: 'Detective Jones',
    coverImage: '/placeholder.svg',
    readingLevel: 'Advanced',
    genre: 'Mystery',
    estimatedTime: '35 min',
    rating: 5,
    description: 'Help solve the greatest treasure mystery of all time!'
  },
  {
    id: '5',
    title: 'Animals Around the World',
    author: 'Dr. Nature',
    coverImage: '/placeholder.svg',
    readingLevel: 'Intermediate',
    genre: 'Educational',
    estimatedTime: '20 min',
    rating: 4,
    description: 'Discover amazing animals from every continent!'
  },
  {
    id: '6',
    title: 'The Little Seed\'s Journey',
    author: 'Garden Grace',
    coverImage: '/placeholder.svg',
    readingLevel: 'Beginner',
    genre: 'Nature',
    estimatedTime: '10 min',
    rating: 5,
    description: 'Follow a tiny seed as it grows into a beautiful flower!'
  }
];

const Library = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  
  const filteredBooks = sampleBooks.filter(book => {
    const levelMatch = selectedLevel === 'all' || book.readingLevel === selectedLevel;
    const genreMatch = selectedGenre === 'all' || book.genre === selectedGenre;
    return levelMatch && genreMatch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-readwise-green';
      case 'Intermediate': return 'bg-readwise-blue';
      case 'Advanced': return 'bg-readwise-purple';
      default: return 'bg-gray-500';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-readwise-yellow fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleStartReading = (bookId: string) => {
    navigate(`/read/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-readwise-blue font-comic mb-2">
            📚 Book Library
          </h1>
          <p className="text-lg text-gray-600 font-comic">
            Choose your next adventure!
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex flex-col">
            <label className="text-sm font-comic text-gray-700 mb-1">Reading Level</label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-48 font-comic">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-comic text-gray-700 mb-1">Genre</label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-48 font-comic">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="Fantasy">Fantasy</SelectItem>
                <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                <SelectItem value="Mystery">Mystery</SelectItem>
                <SelectItem value="Educational">Educational</SelectItem>
                <SelectItem value="Nature">Nature</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Book Cover */}
                  <div className="w-full h-48 bg-gradient-to-br from-readwise-blue/20 to-readwise-green/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <BookOpen className="h-16 w-16 text-readwise-blue" />
                    <div className={`absolute top-2 right-2 ${getLevelColor(book.readingLevel)} text-white px-2 py-1 rounded-lg text-xs font-comic font-bold`}>
                      {book.readingLevel}
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl font-comic text-gray-800 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-comic">by {book.author}</p>
                    <p className="text-sm text-gray-500 font-comic line-clamp-2">
                      {book.description}
                    </p>

                    {/* Rating and Time */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {renderStars(book.rating)}
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-comic">{book.estimatedTime}</span>
                      </div>
                    </div>

                    {/* Genre Badge */}
                    <div className="inline-block bg-readwise-orange/20 text-readwise-orange px-3 py-1 rounded-lg text-xs font-comic font-bold">
                      {book.genre}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleStartReading(book.id)}
                      className="flex-1 bg-readwise-green hover:bg-readwise-green/90 text-white font-comic text-lg py-6"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start Reading
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-readwise-blue text-readwise-blue hover:bg-readwise-blue hover:text-white font-comic py-6 px-4"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-comic text-gray-500">No books found with these filters.</p>
            <p className="text-gray-400 font-comic">Try adjusting your search criteria!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
