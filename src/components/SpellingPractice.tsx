import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const sampleWords = [
  'cat',
  'dog',
  'bird',
  'fish',
  'tree',
  'house',
  'book',
  'star',
  'moon',
  'sun'
];

const SpellingPractice = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { toast } = useToast();

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * sampleWords.length);
    return sampleWords[randomIndex];
  };

  const startNewWord = () => {
    setCurrentWord(getRandomWord());
    setUserInput('');
    setShowResult(false);
  };

  const handlePlayWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord);
      utterance.rate = 0.8; // Slightly slower for clarity
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheckSpelling = () => {
    const isCorrectSpelling = userInput.toLowerCase() === currentWord.toLowerCase();
    setIsCorrect(isCorrectSpelling);
    setShowResult(true);
    
    if (isCorrectSpelling) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job spelling that word!",
      });
    } else {
      toast({
        title: "Try Again! 💪",
        description: `The correct spelling is: ${currentWord}`,
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-readwise-blue font-comic">
            Spelling Practice
          </h2>
          
          {!currentWord ? (
            <Button
              onClick={startNewWord}
              className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-6 w-full"
            >
              Start Spelling Practice
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handlePlayWord}
                  className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-6"
                >
                  <Volume2 className="mr-2 h-5 w-5" />
                  Hear Word
                </Button>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type the word you heard..."
                  className="w-full p-4 border rounded-lg font-comic text-lg"
                />
                
                {showResult && (
                  <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className="font-comic text-lg">
                      {isCorrect ? 'Correct! 🎉' : `The correct spelling is: ${currentWord}`}
                    </p>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={handleCheckSpelling}
                    className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-6"
                  >
                    Check Spelling
                  </Button>
                  <Button
                    onClick={startNewWord}
                    className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-6"
                  >
                    Next Word
                  </Button>
                </div>
              </div>

              <div className="text-xl font-comic">
                Score: {score}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpellingPractice; 