import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, BookOpen } from 'lucide-react';
import Header from '@/components/Header';

const ReadingOptions = () => {
  const navigate = useNavigate();

  const handleOptionSelect = (mode: 'audio' | 'read-along') => {
    if (mode === 'audio') {
      navigate('/audio-preview');
    } else {
      navigate('/library', { state: { readingMode: 'read-along' } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-readwise-blue font-comic mb-4">
              Choose Your Reading Adventure! 📚
            </h1>
            <p className="text-xl text-gray-600 font-comic">
              Pick how you'd like to enjoy your story
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Audio Reading Option */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-readwise-blue/10 rounded-full flex items-center justify-center mx-auto">
                    <Volume2 className="h-8 w-8 text-readwise-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-readwise-blue font-comic">
                    Listen to Stories
                  </h2>
                  <p className="text-gray-600 font-comic">
                    Let our friendly AI narrator read the story to you with fun voices and sound effects!
                  </p>
                  <Button
                    onClick={() => handleOptionSelect('audio')}
                    className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-6 w-full"
                  >
                    Start Listening
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Read Along Option */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-readwise-blue/10 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="h-8 w-8 text-readwise-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-readwise-blue font-comic">
                    Read Along
                  </h2>
                  <p className="text-gray-600 font-comic">
                    Read the story yourself with AI assistance to help with tricky words and concepts!
                  </p>
                  <Button
                    onClick={() => handleOptionSelect('read-along')}
                    className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-6 w-full"
                  >
                    Start Reading
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingOptions; 