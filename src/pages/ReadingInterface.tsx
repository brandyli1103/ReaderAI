import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  HelpCircle,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import ComprehensionQuestion from '@/components/ComprehensionQuestion';
import PostReadingQuiz from '@/components/PostReadingQuiz';
import { useComprehensionQuestions, type ComprehensionQuestion as ComprehensionQuestionType } from '@/hooks/useComprehensionQuestions';
import { useToast } from '@/hooks/use-toast';

interface BookContent {
  id: string;
  title: string;
  author: string;
  chapters: Chapter[];
}

interface Chapter {
  id: number;
  title: string;
  pages: Page[];
}

interface Page {
  id: number;
  content: string;
  vocabularyWords: VocabularyWord[];
}

interface VocabularyWord {
  word: string;
  definition: string;
  pronunciation?: string;
}

const sampleBook: BookContent = {
  id: '1',
  title: 'The Magic Forest Adventure',
  author: 'Sarah Wonder',
  chapters: [
    {
      id: 1,
      title: 'Chapter 1: The Mysterious Path',
      pages: [
        {
          id: 1,
          content: `Emma loved exploring the woods behind her house. One sunny morning, she discovered a shimmering path she had never seen before. The path was covered with sparkly leaves that seemed to dance in the sunlight.

"This is extraordinary!" Emma whispered to herself. She had always dreamed of finding something magical, and this mysterious path looked like it led to an adventure.

Emma decided to follow the path deeper into the forest. As she walked, she noticed the trees were taller and more magnificent than any she had seen before. Colorful butterflies fluttered around her, and she could hear the gentle melody of a stream nearby.`,
          vocabularyWords: [
            { word: 'extraordinary', definition: 'Very unusual or remarkable', pronunciation: 'ik-STRAWR-dn-er-ee' },
            { word: 'mysterious', definition: 'Difficult to understand or explain; strange', pronunciation: 'mi-STEER-ee-uhs' },
            { word: 'magnificent', definition: 'Extremely beautiful or impressive', pronunciation: 'mag-NIF-uh-suhnt' },
            { word: 'melody', definition: 'A sequence of musical sounds; a tune', pronunciation: 'MEL-uh-dee' }
          ]
        },
        {
          id: 2,
          content: `Suddenly, Emma heard a tiny voice calling for help. She looked around carefully and spotted a small, glowing fairy trapped under a fallen leaf.

"Please help me!" squeaked the fairy. "I'm Luna, and I've been trapped here for hours!"

Emma gently lifted the leaf and freed the grateful fairy. Luna's wings sparkled like diamonds in the sunlight.

"Thank you so much!" Luna exclaimed. "As a reward for your kindness, I'll show you the most wonderful secret in this enchanted forest!"`,
          vocabularyWords: [
            { word: 'grateful', definition: 'Feeling thankful for kindness received', pronunciation: 'GRAYT-fuhl' },
            { word: 'enchanted', definition: 'Magical; under a spell', pronunciation: 'en-CHAN-tid' },
            { word: 'exclaimed', definition: 'Said something suddenly with strong feeling', pronunciation: 'ik-SKLEYMD' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Chapter 2: The Secret Garden',
      pages: [
        {
          id: 3,
          content: `Luna led Emma through a curtain of hanging vines to reveal the most beautiful garden Emma had ever seen. Flowers of every color imaginable bloomed in perfect harmony, and a crystal-clear pond reflected the azure sky above.

"This is the Heart of the Forest," Luna explained. "Only those with pure hearts and courage can find this place."

Emma felt honored to be chosen. She sat by the pond and watched as fish with scales like jewels swam gracefully beneath the surface.`,
          vocabularyWords: [
            { word: 'harmony', definition: 'A pleasing combination; agreement', pronunciation: 'HAHR-muh-nee' },
            { word: 'azure', definition: 'Bright blue color, like a clear sky', pronunciation: 'AZH-er' },
            { word: 'honored', definition: 'Feeling proud and privileged', pronunciation: 'ON-erd' },
            { word: 'gracefully', definition: 'In a smooth and elegant way', pronunciation: 'GREYS-fuhl-ee' }
          ]
        }
      ]
    }
  ]
};

const ReadingInterface = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [showComprehensionQuestion, setShowComprehensionQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<ComprehensionQuestionType | null>(null);
  const [showPostReadingQuiz, setShowPostReadingQuiz] = useState(false);
  const [hasSeenPageQuestions, setHasSeenPageQuestions] = useState<Set<number>>(new Set());

  const {
    getQuestionsForPage,
    getPostReadingQuestions,
    markQuestionAnswered,
    comprehensionScore
  } = useComprehensionQuestions(bookId || '1');

  const book = sampleBook; // In real app, fetch based on bookId
  const totalPages = book.chapters.reduce((total, chapter) => total + chapter.pages.length, 0);
  const currentPageNumber = book.chapters.slice(0, currentChapter).reduce((total, chapter) => total + chapter.pages.length, 0) + currentPage + 1;
  const progress = (currentPageNumber / totalPages) * 100;

  const currentPageContent = book.chapters[currentChapter]?.pages[currentPage];

  // Check for comprehension questions when page changes
  useEffect(() => {
    const pageQuestions = getQuestionsForPage(currentPageNumber);
    if (pageQuestions.length > 0 && !hasSeenPageQuestions.has(currentPageNumber)) {
      // Show question after a short delay to let reader see the page first
      const timer = setTimeout(() => {
        setCurrentQuestion(pageQuestions[0]);
        setShowComprehensionQuestion(true);
        setHasSeenPageQuestions(prev => new Set([...prev, currentPageNumber]));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentPageNumber, getQuestionsForPage, hasSeenPageQuestions]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setCurrentPage(book.chapters[currentChapter - 1].pages.length - 1);
    }
  };

  const handleNextPage = () => {
    const isLastPageOfBook = currentChapter === book.chapters.length - 1 && 
                            currentPage === book.chapters[currentChapter].pages.length - 1;
    
    if (isLastPageOfBook) {
      // Show post-reading quiz
      setShowPostReadingQuiz(true);
      return;
    }

    if (currentPage < book.chapters[currentChapter].pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (currentChapter < book.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentPage(0);
    }
  };

  const handleChapterChange = (chapterIndex: string) => {
    setCurrentChapter(parseInt(chapterIndex));
    setCurrentPage(0);
  };

  const handleFontSizeChange = (increment: boolean) => {
    setFontSize(prev => {
      if (increment && prev < 24) return prev + 2;
      if (!increment && prev > 14) return prev - 2;
      return prev;
    });
  };

  const handleComprehensionAnswer = (correct: boolean) => {
    if (currentQuestion) {
      markQuestionAnswered(currentQuestion.id, correct);
      
      toast({
        title: correct ? "Excellent! 🌟" : "Good try! 📚",
        description: correct 
          ? "You understood the story perfectly!" 
          : "Keep reading and learning!",
        duration: 3000,
      });
    }
    setShowComprehensionQuestion(false);
    setCurrentQuestion(null);
  };

  const handlePostReadingQuizComplete = (score: number) => {
    toast({
      title: "Quiz Completed! 🎉",
      description: `You scored ${score}% on the reading quiz!`,
      duration: 5000,
    });
    setShowPostReadingQuiz(false);
  };

  const renderContentWithVocabulary = (content: string, vocabularyWords: VocabularyWord[]) => {
    let processedContent = content;
    
    vocabularyWords.forEach(vocab => {
      const regex = new RegExp(`\\b${vocab.word}\\b`, 'gi');
      processedContent = processedContent.replace(regex, `<span class="vocabulary-word">${vocab.word}</span>`);
    });

    return processedContent.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 leading-relaxed">
        {paragraph.split(' ').map((word, wordIndex) => {
          const cleanWord = word.replace(/[.,!?]/g, '');
          const vocab = vocabularyWords.find(v => v.word.toLowerCase() === cleanWord.toLowerCase());
          
          if (vocab) {
            return (
              <HoverCard key={wordIndex}>
                <HoverCardTrigger asChild>
                  <span className="cursor-help text-readwise-blue font-semibold underline decoration-dotted hover:bg-readwise-blue/10 px-1 rounded">
                    {word}
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white border-2 border-readwise-blue/20 shadow-lg">
                  <div className="space-y-2">
                    <h4 className="font-bold text-readwise-blue font-comic text-lg">{vocab.word}</h4>
                    {vocab.pronunciation && (
                      <p className="text-sm text-gray-500 font-comic italic">/{vocab.pronunciation}/</p>
                    )}
                    <p className="font-comic text-gray-700">{vocab.definition}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          }
          return <span key={wordIndex}>{word} </span>;
        })}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header with Progress */}
      <div className="bg-white/90 backdrop-blur-sm border-b-2 border-readwise-blue/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Button
              onClick={() => navigate('/library')}
              variant="ghost"
              className="text-readwise-blue hover:bg-readwise-blue/10 font-comic"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Library
            </Button>
            
            <div className="text-center">
              <h1 className="font-bold text-xl font-comic text-readwise-blue">{book.title}</h1>
              <p className="text-sm text-gray-600 font-comic">by {book.author}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`${isBookmarked ? 'text-readwise-yellow' : 'text-gray-400'} hover:bg-readwise-yellow/10`}
              >
                <Bookmark className="h-5 w-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-comic text-gray-600">
              <span>Page {currentPageNumber} of {totalPages}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Reading Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-comic text-gray-600">Chapter:</span>
              <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
                <SelectTrigger className="w-64 font-comic">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {book.chapters.map((chapter, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {chapter.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-comic text-gray-600">Font Size:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFontSizeChange(false)}
                className="border-readwise-blue text-readwise-blue hover:bg-readwise-blue hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-comic text-sm w-8 text-center">{fontSize}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFontSizeChange(true)}
                className="border-readwise-blue text-readwise-blue hover:bg-readwise-blue hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              className={`border-readwise-green text-readwise-green hover:bg-readwise-green hover:text-white font-comic ${
                isAudioPlaying ? 'bg-readwise-green text-white' : ''
              }`}
            >
              {isAudioPlaying ? <VolumeX className="h-5 w-5 mr-2" /> : <Volume2 className="h-5 w-5 mr-2" />}
              {isAudioPlaying ? 'Stop Audio' : 'Play Audio'}
            </Button>
          </div>

          {/* Reading Content */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div 
                className="font-comic text-gray-800 leading-relaxed"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
              >
                {currentPageContent && renderContentWithVocabulary(
                  currentPageContent.content, 
                  currentPageContent.vocabularyWords
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePreviousPage}
              disabled={currentChapter === 0 && currentPage === 0}
              className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg py-6 px-8"
            >
              <ChevronLeft className="h-6 w-6 mr-2" />
              Previous
            </Button>

            <div className="text-center">
              <p className="font-comic text-gray-600">
                {book.chapters[currentChapter]?.title}
              </p>
              <p className="font-comic text-sm text-gray-500">
                Page {currentPage + 1} of {book.chapters[currentChapter]?.pages.length}
              </p>
              {comprehensionScore > 0 && (
                <p className="font-comic text-xs text-readwise-green mt-1">
                  Comprehension Score: {comprehensionScore} ⭐
                </p>
              )}
            </div>

            <Button
              onClick={handleNextPage}
              className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg py-6 px-8"
            >
              {currentChapter === book.chapters.length - 1 && currentPage === book.chapters[currentChapter].pages.length - 1 
                ? 'Finish Book' 
                : 'Next'
              }
              <ChevronRight className="h-6 w-6 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* AI Helper Floating Button */}
      <Button
        onClick={() => setShowAIHelper(!showAIHelper)}
        className="fixed bottom-6 right-6 bg-readwise-purple hover:bg-readwise-purple/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        size="lg"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>

      {/* AI Helper Panel */}
      {showAIHelper && (
        <Card className="fixed bottom-20 right-6 w-80 shadow-xl border-2 border-readwise-purple/20">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg font-comic text-readwise-purple mb-3">
              📚 AI Reading Helper
            </h3>
            <p className="font-comic text-gray-600 mb-3">
              Ask me anything about the story!
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full text-left font-comic text-sm">
                What happened in this chapter?
              </Button>
              <Button variant="outline" className="w-full text-left font-comic text-sm">
                Who are the main characters?
              </Button>
              <Button variant="outline" className="w-full text-left font-comic text-sm">
                What does this word mean?
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comprehension Question Modal */}
      {currentQuestion && (
        <ComprehensionQuestion
          question={currentQuestion}
          isOpen={showComprehensionQuestion}
          onAnswer={handleComprehensionAnswer}
          onClose={() => setShowComprehensionQuestion(false)}
          showHint={true}
        />
      )}

      {/* Post-Reading Quiz Modal */}
      <PostReadingQuiz
        questions={getPostReadingQuestions()}
        isOpen={showPostReadingQuiz}
        onComplete={handlePostReadingQuizComplete}
        onClose={() => setShowPostReadingQuiz(false)}
        bookTitle={book.title}
      />
    </div>
  );
};

export default ReadingInterface;
