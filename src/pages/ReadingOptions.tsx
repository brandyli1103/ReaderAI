import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, BookOpen } from 'lucide-react';
import Header from '@/components/Header';

const ReadingOptions = () => {
  const navigate = useNavigate();

  const handleOptionSelect = (mode: 'audio' | 'read-along') => {
    // Navigate to the library page with the selected mode
    navigate('/library', { state: { readingMode: mode } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-readwise-blue font-comic mb-4">
            Choose Your Reading Adventure! 📚
          </h1>
          <p className="text-xl text-gray-600 font-comic">
            Select how you'd like to enjoy your reading experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Audio Reading Option */}
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-readwise-blue/20 rounded-full flex items-center justify-center mx-auto">
                  <Volume2 className="h-10 w-10 text-readwise-blue" />
                </div>
                <h2 className="text-2xl font-bold text-readwise-blue font-comic">
                  Listen & Learn
                </h2>
                <p className="text-gray-600 font-comic">
                  Perfect for younger readers or when you want to relax and enjoy the story. 
                  Our AI narrator will read the story to you with engaging voices and sound effects!
                </p>
                <Button 
                  onClick={() => handleOptionSelect('audio')}
                  className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-6"
                >
                  Start Listening
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Read Along Option */}
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-readwise-green/20 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="h-10 w-10 text-readwise-green" />
                </div>
                <h2 className="text-2xl font-bold text-readwise-green font-comic">
                  Read Along
                </h2>
                <p className="text-gray-600 font-comic">
                  Read the story yourself with our AI helper ready to assist. 
                  Get help with difficult words and answer fun comprehension questions!
                </p>
                <Button 
                  onClick={() => handleOptionSelect('read-along')}
                  className="bg-readwise-green hover:bg-readwise-green/90 text-white font-comic text-lg px-8 py-6"
                >
                  Start Reading
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReadingOptions; 