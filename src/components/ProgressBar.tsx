
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  goal: number;
  label: string;
  color?: string;
}

const ProgressBar = ({ current, goal, label, color = 'bg-readwise-blue' }: ProgressBarProps) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-comic text-gray-700">{label}</span>
        <span className="font-comic text-sm text-gray-500">{current}/{goal}</span>
      </div>
      <div className="relative">
        <Progress value={percentage} className="h-3" />
        {percentage === 100 && (
          <div className="absolute right-0 top-0 -mt-1 text-readwise-green">
            ⭐
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
