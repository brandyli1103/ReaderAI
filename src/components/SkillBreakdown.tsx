
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Award 
} from 'lucide-react';

interface Skills {
  vocabulary: number;
  comprehension: number;
  fluency: number;
  criticalThinking: number;
}

interface SkillBreakdownProps {
  skills: Skills;
}

const SkillBreakdown = ({ skills }: SkillBreakdownProps) => {
  const skillsData = [
    {
      name: 'Vocabulary',
      value: skills.vocabulary,
      icon: BookOpen,
      color: 'readwise-blue',
      description: 'Understanding word meanings and using new words',
      tips: ['Look up new words', 'Use context clues', 'Practice with word games']
    },
    {
      name: 'Comprehension',
      value: skills.comprehension,
      icon: Brain,
      color: 'readwise-green',
      description: 'Understanding what you read and remembering details',
      tips: ['Ask questions while reading', 'Summarize chapters', 'Discuss books with others']
    },
    {
      name: 'Fluency',
      value: skills.fluency,
      icon: Zap,
      color: 'readwise-orange',
      description: 'Reading smoothly and at the right speed',
      tips: ['Read aloud daily', 'Practice with familiar books', 'Focus on expression']
    },
    {
      name: 'Critical Thinking',
      value: skills.criticalThinking,
      icon: Target,
      color: 'readwise-purple',
      description: 'Analyzing and thinking deeply about stories',
      tips: ['Ask "why" questions', 'Compare characters', 'Predict what happens next']
    }
  ];

  const getSkillLevel = (value: number) => {
    if (value >= 90) return { level: 'Excellent', color: 'bg-readwise-green', emoji: '🌟' };
    if (value >= 80) return { level: 'Great', color: 'bg-readwise-blue', emoji: '🎯' };
    if (value >= 70) return { level: 'Good', color: 'bg-readwise-orange', emoji: '👍' };
    if (value >= 60) return { level: 'Improving', color: 'bg-readwise-yellow', emoji: '📈' };
    return { level: 'Needs Practice', color: 'bg-gray-400', emoji: '💪' };
  };

  const averageSkill = Math.round(Object.values(skills).reduce((a, b) => a + b, 0) / Object.values(skills).length);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-readwise-blue font-comic mb-2">
          📈 Reading Skills Dashboard
        </h2>
        <p className="text-gray-600 font-comic">
          Track your progress in key reading areas
        </p>
      </div>

      {/* Overall Score */}
      <Card className="bg-gradient-to-r from-readwise-blue/10 to-readwise-green/10 border-2 border-readwise-blue/20">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-6xl font-bold text-readwise-blue font-comic">
              {averageSkill}
            </div>
            <div className="text-left">
              <div className="text-xl font-bold font-comic text-readwise-blue">
                Overall Reading Score
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`${getSkillLevel(averageSkill).color} text-white font-comic`}>
                  {getSkillLevel(averageSkill).emoji} {getSkillLevel(averageSkill).level}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skillsData.map((skill) => {
          const Icon = skill.icon;
          const skillInfo = getSkillLevel(skill.value);
          
          return (
            <Card key={skill.name} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-3 font-comic text-xl">
                  <div className={`p-2 rounded-lg bg-${skill.color}/20`}>
                    <Icon className={`h-6 w-6 text-${skill.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-${skill.color}`}>{skill.name}</div>
                    <div className="text-sm text-gray-500 font-normal">
                      {skill.description}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold text-${skill.color} font-comic`}>
                      {skill.value}%
                    </div>
                    <Badge className={`${skillInfo.color} text-white font-comic text-xs`}>
                      {skillInfo.emoji} {skillInfo.level}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Progress value={skill.value} className="h-3" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-comic font-bold text-white drop-shadow">
                      {skill.value}%
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-comic font-bold text-gray-800 mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Tips to Improve:
                  </h4>
                  <ul className="space-y-1">
                    {skill.tips.map((tip, index) => (
                      <li key={index} className="text-sm font-comic text-gray-600 flex items-start">
                        <span className="text-readwise-green mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Skill Recommendations */}
      <Card className="bg-gradient-to-r from-readwise-purple/10 to-purple-100 border-readwise-purple/30">
        <CardHeader>
          <CardTitle className="text-readwise-purple font-comic text-xl flex items-center">
            <Award className="h-6 w-6 mr-2" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Find lowest skill and provide specific recommendation */}
            {(() => {
              const lowestSkill = skillsData.reduce((min, skill) => 
                skill.value < min.value ? skill : min
              );
              const highestSkill = skillsData.reduce((max, skill) => 
                skill.value > max.value ? skill : max
              );
              
              return (
                <>
                  <div className="bg-white p-4 rounded-lg border border-readwise-orange/20">
                    <h4 className="font-comic font-bold text-readwise-orange mb-2">
                      🎯 Focus Area: {lowestSkill.name}
                    </h4>
                    <p className="text-sm font-comic text-gray-700">
                      This is your biggest opportunity for growth! Try spending extra time on {lowestSkill.name.toLowerCase()} activities.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-readwise-green/20">
                    <h4 className="font-comic font-bold text-readwise-green mb-2">
                      ⭐ Strength: {highestSkill.name}
                    </h4>
                    <p className="text-sm font-comic text-gray-700">
                      You're doing great with {highestSkill.name.toLowerCase()}! Keep up the excellent work.
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillBreakdown;
