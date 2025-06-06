
import { Button } from '@/components/ui/button';
import { Book, User, Shield, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-readwise-blue to-readwise-green text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Book className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold font-comic">ReadWise</h1>
                <p className="text-sm font-comic opacity-90">Kids</p>
              </div>
            </div>
            <p className="font-comic opacity-90">
              Making reading fun and engaging for kids everywhere with AI-powered assistance.
            </p>
          </div>

          {/* For Kids */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-comic">For Kids</h3>
            <ul className="space-y-2 font-comic">
              <li><a href="#" className="hover:underline opacity-90">My Books</a></li>
              <li><a href="#" className="hover:underline opacity-90">Reading Games</a></li>
              <li><a href="#" className="hover:underline opacity-90">Achievements</a></li>
              <li><a href="#" className="hover:underline opacity-90">Reading Buddies</a></li>
            </ul>
          </div>

          {/* For Parents & Teachers */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-comic">For Adults</h3>
            <ul className="space-y-2 font-comic">
              <li><a href="#" className="hover:underline opacity-90">Parent Dashboard</a></li>
              <li><a href="#" className="hover:underline opacity-90">Teacher Tools</a></li>
              <li><a href="#" className="hover:underline opacity-90">Progress Reports</a></li>
              <li><a href="#" className="hover:underline opacity-90">Safety & Privacy</a></li>
            </ul>
          </div>

          {/* Contact & Login */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-comic">Get Started</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full font-comic justify-start">
                <User className="h-4 w-4 mr-2" />
                Parent Login
              </Button>
              <Button variant="secondary" className="w-full font-comic justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Teacher Login
              </Button>
              <Button variant="secondary" className="w-full font-comic justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="font-comic opacity-90">
            © 2024 ReadWise Kids. Making reading magical for children worldwide. 📚✨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
