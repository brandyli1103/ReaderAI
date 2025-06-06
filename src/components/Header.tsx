import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Library', path: '/library', icon: 'book-open' },
    { name: 'Progress', path: '/progress', icon: 'progress' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b-2 border-readwise-blue/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 rounded-md hover:bg-gray-100">
              <Menu className="h-6 w-6 text-readwise-blue" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle className="font-bold text-lg font-comic text-readwise-blue">Navigation</SheetTitle>
              <SheetDescription className="font-comic">
                Explore the world of reading!
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block py-2 px-4 rounded-md hover:bg-gray-100 font-comic text-gray-700 ${isActive(item.path) ? 'bg-readwise-blue/20 text-readwise-blue font-semibold' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold font-comic text-readwise-blue">
          ReadWise Kids 🚀
        </Link>

        {/* Navigation (Desktop) */}
        <nav className="hidden lg:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`py-2 px-4 rounded-md hover:bg-gray-100 font-comic text-gray-700 ${isActive(item.path) ? 'bg-readwise-blue/20 text-readwise-blue font-semibold' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex space-x-4">
          <button className="py-2 px-4 border border-readwise-blue text-readwise-blue font-comic rounded-md hover:bg-readwise-blue hover:text-white transition-colors">
            Sign In
          </button>
          <button className="py-2 px-4 bg-readwise-blue text-white font-comic rounded-md hover:bg-readwise-blue/90 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
