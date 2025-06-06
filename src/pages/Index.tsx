import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <Dashboard />
      
      {/* Spelling Practice Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <Button
          onClick={() => navigate('/spelling-practice')}
          className="bg-readwise-blue hover:bg-readwise-blue/90 text-white font-comic text-lg px-6 py-4 rounded-full shadow-lg flex items-center space-x-2"
        >
          <Sparkles className="h-5 w-5" />
          <span>Practice Spelling</span>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
