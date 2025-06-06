import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookSummaryGenerator from './BookSummaryGenerator';
import ReflectionChat, { ChatMessage } from './ReflectionChat';
import ReadingCertificate from './ReadingCertificate';

interface BookSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  author: string;
  bookCover: string;
  studentName?: string;
  comprehensionScore: number;
}

const BookSummaryModal = ({
  isOpen,
  onClose,
  bookTitle,
  author,
  bookCover,
  studentName = "Amazing Reader",
  comprehensionScore
}: BookSummaryModalProps) => {
  const [activeTab, setActiveTab] = useState("summary");
  const [isFavorite, setIsFavorite] = useState(false);
  const [reflectionMessages, setReflectionMessages] = useState<ChatMessage[]>([]);

  const handleAddToFavorites = () => {
    setIsFavorite(true);
    // In a real app, save to favorites list
  };

  const handleStartReflection = () => {
    setActiveTab("reflection");
  };

  const handleShareCertificate = () => {
    setActiveTab("certificate");
  };

  const handleSaveReflection = (messages: ChatMessage[]) => {
    setReflectionMessages(messages);
    // In a real app, save to reading journal
  };

  const handleDownloadCertificate = () => {
    // In a real app, generate and download PDF
    console.log("Downloading certificate...");
  };

  const handleShareCertificate2 = () => {
    // In a real app, share via various platforms
    console.log("Sharing certificate...");
  };

  const keyInsights = [
    "Learned the importance of kindness and helping others in need",
    "Discovered that curiosity can lead to wonderful adventures",
    "Understood that inner beauty (pure heart) is more valuable than appearance",
    "Realized that good deeds are often rewarded in unexpected ways"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-green-50">
        <DialogHeader>
          <DialogTitle className="font-comic text-2xl text-readwise-blue text-center">
            🎉 Reading Adventure Complete! 🎉
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="summary" className="font-comic">
              📖 Book Summary
            </TabsTrigger>
            <TabsTrigger value="reflection" className="font-comic">
              💭 Reflection Chat
            </TabsTrigger>
            <TabsTrigger value="certificate" className="font-comic">
              🏆 Certificate
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <BookSummaryGenerator
              bookTitle={bookTitle}
              bookCover={bookCover}
              author={author}
              onAddToFavorites={handleAddToFavorites}
              onShareCertificate={handleShareCertificate}
              onStartReflection={handleStartReflection}
            />
          </TabsContent>

          <TabsContent value="reflection" className="space-y-4">
            <ReflectionChat
              bookTitle={bookTitle}
              onSaveReflection={handleSaveReflection}
            />
          </TabsContent>

          <TabsContent value="certificate" className="space-y-4">
            <ReadingCertificate
              bookTitle={bookTitle}
              author={author}
              bookCover={bookCover}
              studentName={studentName}
              completionDate={new Date()}
              comprehensionScore={comprehensionScore}
              keyInsights={keyInsights}
              readingLevel="Intermediate"
              onDownload={handleDownloadCertificate}
              onShare={handleShareCertificate2}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-6">
          <Button
            onClick={onClose}
            className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic px-8"
          >
            Continue Learning
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookSummaryModal;
