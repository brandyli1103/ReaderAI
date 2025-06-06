
import { Book, BookOpen, TrendingUp, HelpCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b-2 border-readwise-blue/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-readwise-blue to-readwise-green p-2 rounded-xl">
              <Book className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-readwise-blue font-comic">ReadWise</h1>
              <p className="text-sm text-readwise-green font-comic">Kids</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="text-readwise-blue hover:bg-readwise-blue/10 font-comic text-lg">
              <Book className="h-5 w-5 mr-2" />
              Home
            </Button>
            <Button variant="ghost" className="text-readwise-green hover:bg-readwise-green/10 font-comic text-lg">
              <BookOpen className="h-5 w-5 mr-2" />
              My Books
            </Button>
            <Button variant="ghost" className="text-readwise-orange hover:bg-readwise-orange/10 font-comic text-lg">
              <TrendingUp className="h-5 w-5 mr-2" />
              Progress
            </Button>
            <Button variant="ghost" className="text-readwise-purple hover:bg-readwise-purple/10 font-comic text-lg">
              <HelpCircle className="h-5 w-5 mr-2" />
              Help
            </Button>
          </nav>

          {/* Profile/Parent Login */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-readwise-blue text-readwise-blue hover:bg-readwise-blue hover:text-white font-comic">
              <User className="h-4 w-4 mr-2" />
              Parent Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
