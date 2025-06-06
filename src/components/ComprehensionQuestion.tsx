
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, CheckCircle, XCircle, Volume2, Lightbulb, Star } from 'lucide-react';

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface ComprehensionQuestion {
  id: string;
  question: string;
  options: QuestionOption[];
  hint: string;
  explanation: string;
  type: 'multiple-choice' | 'drag-drop' | 'image-match';
  category: 'character' | 'plot' | 'vocabulary' | 'prediction' | 'main-idea' | 'details' | 'sequence' | 'cause-effect';
}

interface ComprehensionQuestionProps {
  question: ComprehensionQuestion;
  isOpen: boolean;
  onAnswer: (correct: boolean) => void;
  onClose: () => void;
  showHint?: boolean;
}

const ComprehensionQuestion = ({ question, isOpen, onAnswer, onClose, showHint = false }: ComprehensionQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHintText, setShowHintText] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswerSelect = (optionId: string) => {
    if (answered) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || answered) return;
    
    const isCorrect = question.options.find(opt => opt.id === selectedAnswer)?.isCorrect || false;
    setAnswered(true);
    setShowFeedback(true);
    
    // Play sound effect
    const audio = new Audio(isCorrect ? '/correct-sound.mp3' : '/incorrect-sound.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore audio errors
    
    setTimeout(() => {
      onAnswer(isCorrect);
      handleClose();
    }, 2500);
  };

  const handleClose = () => {
    setSelectedAnswer('');
    setShowFeedback(false);
    setShowHintText(false);
    setAnswered(false);
    onClose();
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      character: 'bg-readwise-purple',
      plot: 'bg-readwise-blue',
      vocabulary: 'bg-readwise-green',
      prediction: 'bg-readwise-orange',
      'main-idea': 'bg-readwise-pink',
      details: 'bg-readwise-blue',
      sequence: 'bg-readwise-green',
      'cause-effect': 'bg-readwise-purple'
    };
    return colors[category as keyof typeof colors] || 'bg-readwise-blue';
  };

  const isCorrect = answered && question.options.find(opt => opt.id === selectedAnswer)?.isCorrect;

  return (
    <Dialog open={isOpen} onOpenChange={() => !answered && handleClose()}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-blue-50 to-green-50 border-2 border-readwise-blue/20">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-comic text-xl text-readwise-blue flex items-center">
              <HelpCircle className="h-6 w-6 mr-2" />
              Comprehension Question
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Badge className={`${getCategoryColor(question.category)} text-white font-comic`}>
                {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakText(question.question)}
                className="text-readwise-blue hover:bg-readwise-blue/10"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Question */}
              <div className="text-center">
                <h3 className="text-lg font-comic text-gray-800 mb-4 leading-relaxed">
                  {question.question}
                </h3>
              </div>

              {/* Answer Options */}
              <div className="grid gap-3">
                {question.options.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    onClick={() => handleAnswerSelect(option.id)}
                    disabled={answered}
                    className={`p-4 h-auto text-left font-comic text-base border-2 transition-all duration-300 ${
                      selectedAnswer === option.id
                        ? answered
                          ? option.isCorrect
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-red-500 bg-red-50 text-red-700'
                          : 'border-readwise-blue bg-readwise-blue/10 text-readwise-blue'
                        : answered && option.isCorrect
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-readwise-blue hover:bg-readwise-blue/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{option.text}</span>
                      {answered && selectedAnswer === option.id && (
                        option.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )
                      )}
                      {answered && option.isCorrect && selectedAnswer !== option.id && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>

              {/* Hint Section */}
              {showHint && !answered && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowHintText(!showHintText)}
                    className="border-readwise-orange text-readwise-orange hover:bg-readwise-orange hover:text-white font-comic"
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {showHintText ? 'Hide Hint' : 'Show Hint'}
                  </Button>
                  {showHintText && (
                    <div className="mt-3 p-3 bg-readwise-orange/10 border border-readwise-orange/20 rounded-lg">
                      <p className="text-readwise-orange font-comic text-sm">
                        💡 {question.hint}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Feedback */}
              {showFeedback && (
                <div className={`text-center p-4 rounded-lg border-2 ${
                  isCorrect 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-orange-50 border-orange-200'
                }`}>
                  <div className="flex items-center justify-center mb-2">
                    {isCorrect ? (
                      <>
                        <Star className="h-6 w-6 text-yellow-500 fill-current mr-2" />
                        <span className="font-comic text-lg text-green-700 font-bold">
                          Excellent! Well done! 🎉
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-comic text-lg text-orange-700 font-bold">
                          Good try! Let's learn together! 📚
                        </span>
                      </>
                    )}
                  </div>
                  <p className="font-comic text-sm text-gray-700 mt-2">
                    {question.explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-3">
                {!answered ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className="bg-readwise-green hover:bg-readwise-green/90 text-white font-comic text-lg px-8 py-3"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleClose}
                    className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-3"
                  >
                    Continue Reading
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ComprehensionQuestion;
