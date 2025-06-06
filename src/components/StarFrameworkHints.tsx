import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface StarFrameworkHintsProps {
  onHintSelect: (hint: string) => void;
}

const StarFrameworkHints = ({ onHintSelect }: StarFrameworkHintsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const starHints = {
    situation: [
      "What is the main setting of the story?",
      "Who are the main characters involved?",
      "What is the initial problem or challenge?",
    ],
    task: [
      "What does the main character need to accomplish?",
      "What is their goal or mission?",
      "What obstacles do they face?",
    ],
    action: [
      "What steps did the character take to solve the problem?",
      "How did they overcome the obstacles?",
      "What choices did they make?",
    ],
    result: [
      "How did the story end?",
      "What was the outcome of their actions?",
      "What did they learn from the experience?",
    ],
  };

  return (
    <Card className="border-2 border-readwise-yellow/20 bg-yellow-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-comic font-bold text-readwise-yellow text-lg flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            STAR Framework Hints
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-readwise-yellow hover:text-readwise-yellow/80"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-4 mt-4">
            {Object.entries(starHints).map(([category, hints]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-comic font-bold text-readwise-yellow capitalize">
                  {category}:
                </h4>
                <div className="space-y-1">
                  {hints.map((hint, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left font-comic text-sm border-readwise-yellow/30 hover:bg-readwise-yellow/10"
                      onClick={() => onHintSelect(hint)}
                    >
                      {hint}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StarFrameworkHints; 