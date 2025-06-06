
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, Trophy, Star, BookOpen } from 'lucide-react';

interface ReadingCertificateProps {
  bookTitle: string;
  author: string;
  bookCover: string;
  studentName: string;
  completionDate: Date;
  comprehensionScore: number;
  keyInsights: string[];
  readingLevel: string;
  onDownload: () => void;
  onShare: () => void;
}

const ReadingCertificate = ({
  bookTitle,
  author,
  bookCover,
  studentName,
  completionDate,
  comprehensionScore,
  keyInsights,
  readingLevel,
  onDownload,
  onShare
}: ReadingCertificateProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Certificate */}
      <Card className="border-4 border-readwise-yellow bg-gradient-to-br from-yellow-50 to-orange-50 shadow-2xl">
        <CardContent className="p-8">
          {/* Header with Trophy */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-readwise-yellow rounded-full p-4">
                <Trophy className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="font-comic text-4xl font-bold text-readwise-yellow mb-2">
              🎉 Reading Achievement Certificate 🎉
            </h1>
            <p className="font-comic text-lg text-gray-600">
              Presented to an Amazing Reader
            </p>
          </div>

          {/* Student Info */}
          <div className="text-center mb-8">
            <h2 className="font-comic text-3xl font-bold text-readwise-blue mb-2">
              {studentName}
            </h2>
            <p className="font-comic text-lg text-gray-600">
              has successfully completed reading
            </p>
          </div>

          {/* Book Information */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <img
              src={bookCover}
              alt={bookTitle}
              className="w-32 h-40 object-cover rounded-lg shadow-lg border-4 border-white"
            />
            <div className="text-center space-y-2">
              <h3 className="font-comic text-2xl font-bold text-readwise-purple">
                "{bookTitle}"
              </h3>
              <p className="font-comic text-lg text-gray-600">by {author}</p>
              <Badge className="bg-readwise-blue text-white font-comic text-sm">
                {readingLevel} Level
              </Badge>
            </div>
          </div>

          {/* Achievement Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-readwise-green rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <p className="font-comic font-bold text-readwise-green text-lg">Book Completed</p>
              <p className="font-comic text-sm text-gray-600">
                {completionDate.toLocaleDateString()}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-readwise-purple rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Star className="h-8 w-8 text-white" />
              </div>
              <p className="font-comic font-bold text-readwise-purple text-lg">
                {comprehensionScore}% Score
              </p>
              <p className="font-comic text-sm text-gray-600">Comprehension Quiz</p>
            </div>
            <div className="text-center">
              <div className="bg-readwise-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <p className="font-comic font-bold text-readwise-yellow text-lg">Achievement</p>
              <p className="font-comic text-sm text-gray-600">Reading Master</p>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-white rounded-lg p-6 mb-8 border-2 border-readwise-blue/20">
            <h4 className="font-comic font-bold text-readwise-blue text-lg mb-4 text-center">
              📝 Key Learning Insights
            </h4>
            <div className="space-y-2">
              {keyInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Badge className="bg-readwise-green text-white font-comic text-xs mt-1">
                    {index + 1}
                  </Badge>
                  <p className="font-comic text-gray-700 text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t-2 border-readwise-yellow/30 pt-6">
            <p className="font-comic text-sm text-gray-600 mb-4">
              Presented on {completionDate.toLocaleDateString()}
            </p>
            <div className="flex justify-center items-center space-x-4">
              <div className="text-center">
                <div className="w-24 h-1 bg-readwise-blue mb-1"></div>
                <p className="font-comic text-xs text-gray-500">ReadWise AI</p>
              </div>
              <div className="w-12 h-12 bg-readwise-blue rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-center">
                <div className="w-24 h-1 bg-readwise-blue mb-1"></div>
                <p className="font-comic text-xs text-gray-500">Learning Platform</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={onDownload}
          className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic px-6 py-3"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Certificate
        </Button>
        <Button
          onClick={onShare}
          variant="outline"
          className="border-readwise-green text-readwise-green hover:bg-readwise-green hover:text-white font-comic px-6 py-3"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share with Family
        </Button>
      </div>
    </div>
  );
};

export default ReadingCertificate;
