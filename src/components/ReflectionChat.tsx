import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  BookHeart,
  Volume2,
  Save
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  message: string;
  timestamp: Date;
  isVoice?: boolean;
}

interface ReflectionChatProps {
  bookTitle: string;
  onSaveReflection: (messages: ChatMessage[]) => void;
}

const ReflectionChat = ({ bookTitle, onSaveReflection }: ReflectionChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showStarterQuestions, setShowStarterQuestions] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const starterQuestions = [
    "What was your favorite part of the story?",
    "Which character did you like most and why?",
    "What lesson did you learn from this book?",
    "How did the story make you feel?",
    "Would you recommend this book to a friend?",
    "What would you do if you were the main character?"
  ];

  const aiResponses = {
    "favorite part": [
      "That sounds like an exciting part! What made it so special for you?",
      "I can see why that would be your favorite! Can you tell me more about what happened?",
      "That's a great choice! What emotions did you feel during that part?"
    ],
    "character": [
      "That character sounds interesting! What did you like about them?",
      "Characters can teach us a lot! What did this character do that you admired?",
      "It's fun to have favorite characters! How was this character similar to or different from you?"
    ],
    "lesson": [
      "That's a wonderful lesson to learn! How might you use this lesson in your own life?",
      "Books can teach us so much! Can you think of a time when this lesson might be helpful?",
      "What a great insight! Do you think other people could learn this lesson too?"
    ],
    "feeling": [
      "Feelings are so important when reading! What part of the story made you feel that way?",
      "Books can make us feel many different things! Did your feelings change as you read?",
      "That's a very thoughtful response! Stories can really touch our hearts, can't they?"
    ],
    "recommend": [
      "Sharing good books is wonderful! What would you tell your friend about this book?",
      "Recommendations from friends are the best! What age do you think would enjoy this book most?",
      "That's so kind of you to want to share! What makes this book special enough to recommend?"
    ],
    "default": [
      "That's a really thoughtful answer! Can you tell me more about that?",
      "I love hearing your thoughts! What else did you notice about the story?",
      "You're such a good reader! What other ideas do you have about this book?"
    ]
  };

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'ai',
      message: `Hi there! 🌟 Congratulations on finishing "${bookTitle}"! I'm your reading buddy, and I'm so excited to hear about your reading adventure. Let's chat about the story you just read!`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [bookTitle]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('favorite') || message.includes('best') || message.includes('liked')) {
      return aiResponses["favorite part"][Math.floor(Math.random() * aiResponses["favorite part"].length)];
    } else if (message.includes('character') || message.includes('person')) {
      return aiResponses["character"][Math.floor(Math.random() * aiResponses["character"].length)];
    } else if (message.includes('learn') || message.includes('lesson') || message.includes('teach')) {
      return aiResponses["lesson"][Math.floor(Math.random() * aiResponses["lesson"].length)];
    } else if (message.includes('feel') || message.includes('emotion') || message.includes('sad') || message.includes('happy')) {
      return aiResponses["feeling"][Math.floor(Math.random() * aiResponses["feeling"].length)];
    } else if (message.includes('recommend') || message.includes('friend') || message.includes('tell')) {
      return aiResponses["recommend"][Math.floor(Math.random() * aiResponses["recommend"].length)];
    } else {
      return aiResponses["default"][Math.floor(Math.random() * aiResponses["default"].length)];
    }
  };

  const handleSendMessage = (message: string, isVoice: boolean = false) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: message.trim(),
      timestamp: new Date(),
      isVoice
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setShowStarterQuestions(false);

    // Generate AI response after a short delay
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: generateAIResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleStarterQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // In a real app, you would process the recorded audio here
      const simulatedVoiceMessage = "This is a simulated voice message response";
      handleSendMessage(simulatedVoiceMessage, true);
    } else {
      // Start recording
      setIsRecording(true);
      // In a real app, you would start audio recording here
    }
  };

  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSaveReflection = () => {
    onSaveReflection(messages);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <Card className="border-2 border-readwise-purple/20">
        <CardHeader className="bg-gradient-to-r from-readwise-purple/10 to-readwise-blue/10">
          <CardTitle className="font-comic text-xl text-readwise-purple flex items-center">
            <MessageCircle className="h-6 w-6 mr-3" />
            💭 Let's Talk About Your Reading!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Chat Messages */}
          <ScrollArea className="h-96 w-full mb-4" ref={scrollAreaRef}>
            <div className="space-y-4 pr-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-readwise-blue text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Badge 
                        className={`text-xs ${
                          msg.type === 'user' 
                            ? 'bg-white/20 text-white' 
                            : 'bg-readwise-purple text-white'
                        }`}
                      >
                        {msg.type === 'user' ? 'You' : '🤖 Reading Buddy'}
                      </Badge>
                      {msg.type === 'ai' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakMessage(msg.message)}
                          className="h-6 w-6 p-0 hover:bg-white/20"
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <p className="font-comic leading-relaxed">{msg.message}</p>
                    {msg.isVoice && (
                      <Badge className="mt-2 bg-readwise-green text-white text-xs">
                        🎤 Voice Message
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Starter Questions */}
          {showStarterQuestions && (
            <div className="mb-4">
              <h4 className="font-comic font-bold text-readwise-purple mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Conversation Starters:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {starterQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleStarterQuestion(question)}
                    className="text-left justify-start h-auto p-3 font-comic text-sm border-readwise-blue/30 text-readwise-blue hover:bg-readwise-blue hover:text-white"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(currentInput)}
              placeholder="Type your thoughts about the book..."
              className="flex-1 font-comic border-readwise-blue/30 focus:border-readwise-blue"
            />
            
            <Button
              onClick={handleVoiceToggle}
              variant="outline"
              className={`border-readwise-green text-readwise-green hover:bg-readwise-green hover:text-white ${
                isRecording ? 'bg-readwise-green text-white animate-pulse' : ''
              }`}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            
            <Button
              onClick={() => handleSendMessage(currentInput)}
              disabled={!currentInput.trim()}
              className="bg-readwise-blue hover:bg-readwise-blue/90 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Save Button */}
          <div className="mt-4 text-center">
            <Button
              onClick={handleSaveReflection}
              className="bg-readwise-yellow hover:bg-readwise-yellow/90 text-white font-comic px-6"
            >
              <Save className="h-4 w-4 mr-2" />
              Save to Reading Journal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReflectionChat;
