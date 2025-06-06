import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, Play, Pause, ArrowLeft, Check, HelpCircle, BookOpen, Star, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import { textToSpeech } from '@/utils/elevenlabs';
import { analyzeStarMethod } from '@/utils/huggingface';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import StarMethodHint from '@/components/StarMethodHint';
import { Progress } from '@/components/ui/progress';

interface StarMethodScores {
  feedback: string;
}

const AudioPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isReadAlong = location.state?.mode === 'read-along';
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(isReadAlong);
  const [summary, setSummary] = useState('');
  const [summarySubmitted, setSummarySubmitted] = useState(false);
  const [showStarHint, setShowStarHint] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [starScores, setStarScores] = useState<StarMethodScores | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<StarMethodScores | null>(null);

  const sampleParagraph = `Emma loved exploring the woods behind her house. One sunny morning, she discovered a shimmering path she had never seen before. The path was covered with sparkly leaves that seemed to dance in the sunlight.

"This is extraordinary!" Emma whispered to herself. She had always dreamed of finding something magical, and this mysterious path looked like it led to an adventure.`;

  const handleStartReading = () => {
    navigate('/library', { state: { readingMode: 'audio' } });
  };

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setShowSummary(true);
      });
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
        toast({
          title: "Error",
          description: "There was a problem playing the audio. Please try again.",
          variant: "destructive",
        });
        setIsPlaying(false);
        setIsLoading(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, []);

  // Update audio source when URL changes
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
    }
  }, [audioUrl]);

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
        return;
      }

      if (!audioUrl) {
        setIsLoading(true);
        const url = await textToSpeech(sampleParagraph);
        setAudioUrl(url);
      }

      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (playError) {
          console.error('Error playing audio:', playError);
          toast({
            title: "Error",
            description: "Could not play the audio. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Error in handlePlayPause:', error);
      toast({
        title: "Error",
        description: "Could not generate or play the audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarySubmit = async () => {
    if (!summary.trim()) {
      toast({
        title: "Please write a summary",
        description: "Your summary can't be empty!",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeStarMethod(sampleParagraph, summary);
      setAnalysisResult(result);
      setShowResults(true);
    } catch (error) {
      console.error('Error analyzing summary:', error);
      toast({
        title: "Error",
        description: "Could not analyze your summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderScoreCard = (title: string, score: number) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-center space-x-2">
        <Progress value={score} className="h-2" />
        <span className="text-sm font-bold text-readwise-blue">{score}%</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-readwise-blue font-comic mb-4">
              {isReadAlong ? 'Read Along Mode 📖' : 'Audio Preview 🎧'}
            </h1>
            <p className="text-xl text-gray-600 font-comic">
              {isReadAlong ? 'Read the story and write your summary!' : 'Listen to the story and practice your summary!'}
            </p>
          </div>

          {/* STAR Method Hint */}
          <div className="mb-12">
            <StarMethodHint />
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-readwise-blue font-comic">
                  {isReadAlong ? 'Story Text' : 'Story Preview'}
                </h2>
                <p className="text-gray-600 font-comic">
                  {sampleParagraph}
                </p>
                {!isReadAlong && (
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={handlePlayPause}
                      disabled={isLoading}
                      className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-6"
                    >
                      {isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button
                      onClick={() => setShowSummary(true)}
                      className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-6"
                    >
                      Write Summary
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Summary Section */}
          {showSummary && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-readwise-blue font-comic">
                    Your Summary
                  </h2>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Write your summary here using the STAR method..."
                    className="w-full h-32 p-4 border rounded-lg font-comic"
                  />
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={handleSummarySubmit}
                      disabled={isAnalyzing}
                      className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-6"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Check My Summary'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Results */}
          {showResults && analysisResult && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-readwise-blue font-comic">
                    Analysis Results
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-600 font-comic">
                      {analysisResult.feedback}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setShowResults(false);
                      setSummary('');
                      setAnalysisResult(null);
                    }}
                    className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-8 py-6 w-full"
                  >
                    Try Another Summary
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPreview; 