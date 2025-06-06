
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Star } from 'lucide-react';

interface BookCardProps {
  title: string;
  author: string;
  level: number;
  rating: number;
  image?: string;
  isCurrentBook?: boolean;
}

const BookCard = ({ title, author, level, rating, isCurrentBook = false }: BookCardProps) => {
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

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
      isCurrentBook ? 'ring-2 ring-readwise-blue ring-offset-2' : ''
    }`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Book Cover Placeholder */}
          <div className="w-full h-40 bg-gradient-to-br from-readwise-blue/20 to-readwise-green/20 rounded-lg flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-readwise-blue" />
          </div>
          
          {/* Book Info */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg font-comic text-gray-800 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 font-comic">by {author}</p>
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              {renderStars(rating)}
            </div>
            
            {/* Level Badge */}
            <div className="inline-block bg-readwise-green/20 text-readwise-green px-2 py-1 rounded-lg text-xs font-comic font-bold">
              Level {level}
            </div>
          </div>

          {/* Action Button */}
          <Button 
            className={`w-full font-comic ${
              isCurrentBook 
                ? 'bg-readwise-blue hover:bg-readwise-blue/90' 
                : 'bg-readwise-green hover:bg-readwise-green/90'
            } text-white`}
          >
            {isCurrentBook ? 'Continue Reading' : 'Start Reading'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
