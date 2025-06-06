import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Users, Lightbulb, Clock, Star, Share2, Heart } from 'lucide-react';

interface BookSummary {
  keyPlotPoints: string[];
  characters: {
    name: string;
    description: string;
    role: string;
  }[];
  themes: {
    theme: string;
    explanation: string;
  }[];
  storyEvents: {
    event: string;
    chapter: string;
    importance: 'low' | 'medium' | 'high';
  }[];
}

interface BookSummaryGeneratorProps {
  bookTitle: string;
  bookCover: string;
  author: string;
  onAddToFavorites: () => void;
  onShareCertificate: () => void;
  onStartReflection: () => void;
}

const BookSummaryGenerator = ({
  bookTitle,
  bookCover,
  author,
  onAddToFavorites,
  onShareCertificate,
  onStartReflection
}: BookSummaryGeneratorProps) => {
  const [summary, setSummary] = useState<BookSummary | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [activeTab, setActiveTab] = useState<'plot' | 'characters' | 'themes' | 'timeline'>('plot');

  // Sample data - in a real app, this would come from AI generation
  const sampleSummary: BookSummary = {
    keyPlotPoints: [
      "Emma discovers a magical shimmering path in the woods behind her house",
      "She follows the mysterious path and enters an enchanted forest",
      "Emma helps Luna, a trapped fairy, by lifting a fallen leaf",
      "Luna rewards Emma's kindness by showing her the Heart of the Forest",
      "Emma learns that only those with pure hearts can find magical places"
    ],
    characters: [
      {
        name: "Emma",
        description: "A kind and curious young girl who loves exploring",
        role: "Main Character (Protagonist)"
      },
      {
        name: "Luna",
        description: "A magical fairy with sparkling wings who lives in the forest",
        role: "Magical Helper"
      }
    ],
    themes: [
      {
        theme: "Kindness and Helping Others",
        explanation: "Emma's good deed of helping Luna leads to wonderful rewards, showing that being kind to others brings good things back to us."
      },
      {
        theme: "Curiosity and Adventure",
        explanation: "Emma's curiosity about the mysterious path leads her to discover amazing things, teaching us that being curious can lead to great adventures."
      },
      {
        theme: "Inner Beauty",
        explanation: "Only people with 'pure hearts' can see the magical forest, which means being good inside is more important than how we look outside."
      }
    ],
    storyEvents: [
      { event: "Emma finds the shimmering path", chapter: "Chapter 1", importance: 'high' },
      { event: "Emma enters the magical forest", chapter: "Chapter 1", importance: 'high' },
      { event: "Emma discovers Luna trapped under a leaf", chapter: "Chapter 1", importance: 'medium' },
      { event: "Emma helps free Luna", chapter: "Chapter 1", importance: 'high' },
      { event: "Luna shows Emma the Heart of the Forest", chapter: "Chapter 2", importance: 'high' }
    ]
  };

  useEffect(() => {
    // Simulate AI generation
    const timer = setTimeout(() => {
      setSummary(sampleSummary);
      setIsGenerating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderPlotSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-comic font-bold text-readwise-blue flex items-center">
        <BookOpen className="h-5 w-5 mr-2" />
        Key Story Points
      </h3>
      <div className="space-y-3">
        {summary?.keyPlotPoints.map((point, index) => (
          <Card key={index} className="border-l-4 border-readwise-green bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Badge className="bg-readwise-blue text-white font-comic text-xs">
                  {index + 1}
                </Badge>
                <p className="font-comic text-gray-700 leading-relaxed">{point}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCharactersSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-comic font-bold text-readwise-blue flex items-center">
        <Users className="h-5 w-5 mr-2" />
        Main Characters
      </h3>
      <div className="grid gap-4">
        {summary?.characters.map((character, index) => (
          <Card key={index} className="bg-blue-50 border-readwise-blue/20">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-comic font-bold text-readwise-blue text-lg">
                    {character.name}
                  </h4>
                  <Badge className="bg-readwise-purple text-white font-comic text-xs">
                    {character.role}
                  </Badge>
                </div>
                <p className="font-comic text-gray-700">{character.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderThemesSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-comic font-bold text-readwise-blue flex items-center">
        <Lightbulb className="h-5 w-5 mr-2" />
        Story Themes & Lessons
      </h3>
      <div className="space-y-4">
        {summary?.themes.map((themeItem, index) => (
          <Card key={index} className="bg-yellow-50 border-readwise-yellow/40">
            <CardContent className="p-4">
              <div className="space-y-2">
                <h4 className="font-comic font-bold text-readwise-yellow text-lg">
                  💡 {themeItem.theme}
                </h4>
                <p className="font-comic text-gray-700 leading-relaxed">
                  {themeItem.explanation}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTimelineSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-comic font-bold text-readwise-blue flex items-center">
        <Clock className="h-5 w-5 mr-2" />
        Story Timeline
      </h3>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-readwise-blue/30"></div>
        <div className="space-y-6">
          {summary?.storyEvents.map((event, index) => (
            <div key={index} className="relative flex items-start space-x-4">
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                event.importance === 'high' ? 'bg-readwise-green' :
                event.importance === 'medium' ? 'bg-readwise-yellow' : 'bg-gray-400'
              }`}>
                <span className="text-white font-comic text-xs font-bold">{index + 1}</span>
              </div>
              <Card className="flex-1 bg-white border-readwise-blue/20">
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <Badge className="bg-readwise-purple text-white font-comic text-xs">
                      {event.chapter}
                    </Badge>
                    <p className="font-comic text-gray-700 font-medium">{event.event}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isGenerating) {
    return (
      <div className="text-center space-y-4 py-12">
        <div className="animate-spin h-12 w-12 border-4 border-readwise-blue border-t-transparent rounded-full mx-auto"></div>
        <h3 className="text-xl font-comic font-bold text-readwise-blue">
          Creating Your Book Summary...
        </h3>
        <p className="font-comic text-gray-600">
          Our AI is analyzing the story and creating a personalized summary just for you!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Book Info */}
      <Card className="bg-gradient-to-r from-readwise-blue/10 to-readwise-green/10 border-2 border-readwise-blue/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <img
              src={bookCover}
              alt={bookTitle}
              className="w-24 h-32 object-cover rounded-lg shadow-lg"
            />
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-comic font-bold text-readwise-blue">
                📚 {bookTitle} - Complete!
              </h2>
              <p className="font-comic text-gray-600">by {author}</p>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-readwise-yellow fill-current" />
                <span className="font-comic text-sm text-gray-600">
                  Finished on {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {[
          { id: 'plot', label: 'Story Summary', icon: BookOpen },
          { id: 'characters', label: 'Characters', icon: Users },
          { id: 'themes', label: 'Themes', icon: Lightbulb },
          { id: 'timeline', label: 'Timeline', icon: Clock }
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? 'default' : 'outline'}
            onClick={() => setActiveTab(id as any)}
            className={`font-comic ${
              activeTab === id 
                ? 'bg-readwise-blue text-white' 
                : 'border-readwise-blue text-readwise-blue hover:bg-readwise-blue hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>

      {/* Content Based on Active Tab */}
      <div className="min-h-[400px]">
        {activeTab === 'plot' && renderPlotSection()}
        {activeTab === 'characters' && renderCharactersSection()}
        {activeTab === 'themes' && renderThemesSection()}
        {activeTab === 'timeline' && renderTimelineSection()}
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={onStartReflection}
          className="bg-readwise-green hover:bg-readwise-green/90 text-white font-comic px-6 py-3"
        >
          💭 Start Reflection Chat
        </Button>
        
        <Button
          onClick={onAddToFavorites}
          variant="outline"
          className="border-readwise-yellow text-readwise-yellow hover:bg-readwise-yellow hover:text-white font-comic px-6 py-3"
        >
          <Heart className="h-4 w-4 mr-2" />
          Add to Favorites
        </Button>
        
        <Button
          onClick={onShareCertificate}
          variant="outline"
          className="border-readwise-purple text-readwise-purple hover:bg-readwise-purple hover:text-white font-comic px-6 py-3"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Create Certificate
        </Button>
      </div>
    </div>
  );
};

export default BookSummaryGenerator;
