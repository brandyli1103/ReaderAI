import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, Play, Pause, ArrowLeft, Check } from 'lucide-react';
import Header from '@/components/Header';
import { textToSpeech } from '@/utils/elevenlabs';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import StarFrameworkHints from '@/components/StarFrameworkHints';

const AudioPreview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState('');
  const [summarySubmitted, setSummarySubmitted] = useState(false);
  const [showStarHints, setShowStarHints] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sampleParagraph = `Emma loved exploring the woods behind her house. One sunny morning, she discovered a shimmering path she had never seen before. The path was covered with sparkly leaves that seemed to dance in the sunlight.

"This is extraordinary!" Emma whispered to herself. She had always dreamed of finding something magical, and this mysterious path looked like it led to an adventure.`;

  const handleStartReading = () => {
    navigate('/library', { state: { readingMode: 'audio' } });
  };

  const handlePlayAudio = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    try {
      const audioUrl = await textToSpeech(sampleParagraph);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
        setIsPlaying(true);
        audioRef.current.onended = () => {
          setIsPlaying(false);
          setShowSummary(true);
        };
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarySubmit = () => {
    if (summary.trim().length < 10) {
      toast({
        title: "Summary too short",
        description: "Please write a longer summary of what you heard.",
        variant: "destructive",
      });
      return;
    }
    setSummarySubmitted(true);
  };

  const handleStartOver = () => {
    setShowSummary(false);
    setSummary('');
    setSummarySubmitted(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const handleHintSelect = (hint: string) => {
    setSummary(prev => {
      const newSummary = prev ? `${prev}\n\n${hint}` : hint;
      return newSummary;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-readwise-blue/5 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 font-comic text-readwise-blue hover:bg-readwise-blue/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Card className="border-2 border-readwise-blue/20 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-readwise-blue font-comic mb-2">
                    Audio Preview
                  </h1>
                  <p className="text-gray-600 font-comic">
                    Listen to a sample of how the story will be read aloud
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-readwise-blue/20">
                  <p className="text-gray-700 font-comic leading-relaxed mb-6">
                    {sampleParagraph}
                  </p>

                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={handlePlayAudio}
                      disabled={isLoading}
                      className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic px-8"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Loading...
                        </div>
                      ) : isPlaying ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Play Sample
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {showSummary && !summarySubmitted && (
                  <div className="mt-8 space-y-4">
                    <div className="p-6 bg-white rounded-lg border-2 border-readwise-blue/20">
                      <h2 className="text-2xl font-bold text-readwise-blue font-comic mb-4">
                        Write a Summary 📝
                      </h2>
                      <p className="text-gray-700 font-comic mb-4">
                        Please write a summary of what you just heard in your own words.
                      </p>
                      <Textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Write your summary here..."
                        className="w-full h-32 font-comic mb-4"
                      />
                      <div className="flex justify-between items-center">
                        <Button
                          onClick={() => setShowStarHints(!showStarHints)}
                          variant="outline"
                          className="font-comic text-readwise-yellow border-readwise-yellow hover:bg-readwise-yellow/10"
                        >
                          {showStarHints ? 'Hide STAR Hints' : 'Show STAR Hints'}
                        </Button>
                        <Button
                          onClick={handleSummarySubmit}
                          className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic"
                        >
                          Submit Summary
                        </Button>
                      </div>
                    </div>

                    {showStarHints && (
                      <StarFrameworkHints onHintSelect={handleHintSelect} />
                    )}
                  </div>
                )}

                {summarySubmitted && (
                  <div className="mt-8 p-6 bg-white rounded-lg border-2 border-readwise-blue/20">
                    <h2 className="text-2xl font-bold text-readwise-blue font-comic mb-4">
                      Great Job! 🎉
                    </h2>
                    <div className="space-y-4">
                      <p className="text-xl font-comic text-gray-700">
                        Thank you for writing your summary! This helps you understand and remember the story better.
                      </p>
                      <div className="flex justify-between">
                        <Button
                          onClick={handleStartOver}
                          variant="outline"
                          className="font-comic"
                        >
                          Listen Again
                        </Button>
                        <Button
                          onClick={handleStartReading}
                          className="bg-readwise-green hover:bg-readwise-green/90 text-white font-comic"
                        >
                          Start Reading
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {!showSummary && !summarySubmitted && (
                  <div className="mt-8">
                    <Button
                      onClick={handleStartReading}
                      className="w-full bg-readwise-green hover:bg-readwise-green/90 text-white font-comic py-6 text-lg"
                    >
                      Start Reading
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Hidden Audio Element */}
          <audio ref={audioRef} className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default AudioPreview; 