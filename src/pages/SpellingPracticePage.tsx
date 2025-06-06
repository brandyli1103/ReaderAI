import Header from '@/components/Header';
import SpellingPractice from '@/components/SpellingPractice';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SpellingPracticePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="text-readwise-blue hover:text-readwise-blue/90 font-comic"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-readwise-blue font-comic mb-4">
              Spelling Practice 📝
            </h1>
            <p className="text-xl text-gray-600 font-comic">
              Listen to the word and type what you hear!
            </p>
          </div>

          <SpellingPractice />
        </div>
      </div>
    </div>
  );
};

export default SpellingPracticePage; 