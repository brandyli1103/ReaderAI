
import { Button } from '@/components/ui/button';
import { BookOpen, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Hero Text */}
          <div className="text-center md:text-left space-y-6">
            <div className="inline-flex items-center bg-readwise-yellow/20 px-4 py-2 rounded-full">
              <Sparkles className="h-5 w-5 text-readwise-orange mr-2" />
              <span className="text-readwise-orange font-comic font-bold">AI-Powered Reading Fun!</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-comic leading-tight">
              <span className="text-readwise-blue">Reading</span>{' '}
              <span className="text-readwise-green">Adventures</span>{' '}
              <span className="text-readwise-orange">Await!</span>
            </h1>
            
            <p className="text-xl text-gray-600 font-comic leading-relaxed">
              Join thousands of kids on magical reading journeys with our AI reading assistant. 
              Level up your skills, earn badges, and discover amazing stories!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-readwise-blue to-readwise-green hover:from-readwise-green hover:to-readwise-blue text-white font-comic text-xl px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="h-6 w-6 mr-2" />
                Start Reading Now!
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-readwise-orange text-readwise-orange hover:bg-readwise-orange hover:text-white font-comic text-xl px-8 py-6 rounded-2xl transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-readwise-blue/10 to-readwise-green/10 rounded-3xl p-8 relative overflow-hidden">
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-readwise-yellow rounded-full flex items-center justify-center float">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              
              <div className="absolute bottom-8 left-4 w-12 h-12 bg-readwise-pink rounded-full flex items-center justify-center bounce-slow">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              
              {/* Main illustration placeholder */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-readwise-blue to-readwise-purple rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-readwise-blue font-comic mb-2">Emma's Reading</h3>
                <p className="text-readwise-green font-comic">Level 5 Reader</p>
                <div className="mt-4 bg-readwise-green/20 rounded-lg p-3">
                  <p className="text-sm text-readwise-green font-comic">"Just finished Harry Potter!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
