
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, CheckCircle, Book, ArrowRight, Volume2 } from 'lucide-react';
import type { ComprehensionQuestion } from './ComprehensionQuestion';

interface PostReadingQuizProps {
  questions: ComprehensionQuestion[];
  isOpen: boolean;
  onComplete: (score: number) => void;
  onClose: () => void;
  bookTitle: string;
}

const PostReadingQuiz = ({ questions, isOpen, onComplete, onClose, bookTitle }: PostReadingQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex: number, optionId: string) => {
    if (showResults) return;
    setAnswers({ ...answers, [questionIndex]: optionId });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      const selectedAnswer = answers[index];
      const isCorrect = question.options.find(opt => opt.id === selectedAnswer)?.isCorrect;
      if (isCorrect) correctAnswers++;
    });
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    // Play celebration sound
    if (finalScore >= 70) {
      const audio = new Audio('/celebration-sound.mp3');
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
  };

  const handleClose = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
    onClose();
  };

  const handleComplete = () => {
    onComplete(score);
    handleClose();
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { message: "Outstanding! You're a reading superstar! 🌟", color: "text-yellow-600" };
    if (score >= 80) return { message: "Excellent work! Keep it up! 🎉", color: "text-green-600" };
    if (score >= 70) return { message: "Good job! You understood the story well! 👏", color: "text-blue-600" };
    return { message: "Good effort! Let's practice more to improve! 💪", color: "text-orange-600" };
  };

  const getBadgeEarned = (score: number) => {
    if (score >= 90) return { name: "Reading Master", icon: "🏆", color: "bg-yellow-500" };
    if (score >= 80) return { name: "Story Expert", icon: "⭐", color: "bg-green-500" };
    if (score >= 70) return { name: "Good Reader", icon: "📚", color: "bg-blue-500" };
    return { name: "Keep Trying", icon: "💪", color: "bg-orange-500" };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => !showResults && handleClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-green-50">
        <DialogHeader>
          <DialogTitle className="font-comic text-2xl text-readwise-blue flex items-center">
            <Book className="h-7 w-7 mr-3" />
            {showResults ? 'Quiz Results' : `Reading Quiz: ${bookTitle}`}
          </DialogTitle>
        </DialogHeader>

        {!showResults ? (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-comic text-gray-600">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Question Card */}
            <Card className="border-2 border-readwise-blue/20 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-readwise-purple text-white font-comic">
                    {currentQ.category.charAt(0).toUpperCase() + currentQ.category.slice(1)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(currentQ.question)}
                    className="text-readwise-blue hover:bg-readwise-blue/10"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-comic text-gray-800 mb-6 leading-relaxed text-center">
                  {currentQ.question}
                </h3>

                <div className="grid gap-3">
                  {currentQ.options.map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      onClick={() => handleAnswerSelect(currentQuestion, option.id)}
                      className={`p-4 h-auto text-left font-comic text-base border-2 transition-all duration-300 ${
                        selectedAnswer === option.id
                          ? 'border-readwise-blue bg-readwise-blue/10 text-readwise-blue'
                          : 'border-gray-300 hover:border-readwise-blue hover:bg-readwise-blue/5'
                      }`}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="font-comic border-readwise-blue text-readwise-blue hover:bg-readwise-blue hover:text-white"
              >
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="bg-readwise-green hover:bg-readwise-green/90 text-white font-comic px-8"
              >
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          /* Results Screen */
          <div className="text-center space-y-6">
            {/* Animated Trophy */}
            <div className="flex justify-center">
              <div className="animate-bounce">
                <Trophy className="h-20 w-20 text-yellow-500 fill-current" />
              </div>
            </div>

            {/* Score Display */}
            <div className="space-y-4">
              <h2 className="text-4xl font-comic font-bold text-readwise-blue">
                {score}%
              </h2>
              <p className={`text-xl font-comic font-bold ${getScoreMessage(score).color}`}>
                {getScoreMessage(score).message}
              </p>
            </div>

            {/* Badge Earned */}
            <Card className="bg-gradient-to-r from-readwise-blue/10 to-readwise-green/10 border-2 border-readwise-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-4">
                  <div className={`w-16 h-16 rounded-full ${getBadgeEarned(score).color} flex items-center justify-center text-2xl`}>
                    {getBadgeEarned(score).icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-comic font-bold text-gray-800">
                      Badge Earned!
                    </h3>
                    <p className="text-lg font-comic text-gray-600">
                      {getBadgeEarned(score).name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <div className="text-left space-y-3">
              <h4 className="text-lg font-comic font-bold text-gray-800 mb-3">Review Your Answers:</h4>
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const correctOption = question.options.find(opt => opt.isCorrect);
                const isCorrect = question.options.find(opt => opt.id === userAnswer)?.isCorrect;
                
                return (
                  <div key={index} className="p-3 rounded-lg border border-gray-200 bg-white">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-comic text-sm text-gray-800 mb-1">
                          Q{index + 1}: {question.question}
                        </p>
                        <p className="font-comic text-xs text-gray-600">
                          Correct answer: {correctOption?.text}
                        </p>
                        {!isCorrect && (
                          <p className="font-comic text-xs text-gray-500 mt-1">
                            {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Button */}
            <Button
              onClick={handleComplete}
              className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-3"
            >
              Continue Learning
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostReadingQuiz;
