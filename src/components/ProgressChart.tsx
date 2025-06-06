
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ProgressChart = () => {
  // Sample progress data over time
  const readingProgressData = [
    { month: 'Sep', books: 4, level: 4.2, comprehension: 75 },
    { month: 'Oct', books: 6, level: 4.5, comprehension: 78 },
    { month: 'Nov', books: 8, level: 4.8, comprehension: 82 },
    { month: 'Dec', books: 7, level: 5.0, comprehension: 85 },
    { month: 'Jan', books: 8, level: 5.0, comprehension: 85 },
  ];

  const skillProgressData = [
    { skill: 'Vocabulary', current: 78, previous: 72 },
    { skill: 'Comprehension', current: 85, previous: 80 },
    { skill: 'Fluency', current: 72, previous: 68 },
    { skill: 'Critical Thinking', current: 68, previous: 62 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg font-comic">
          <p className="font-bold text-readwise-blue">{`Month: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'level' ? '' : entry.dataKey === 'comprehension' ? '%' : ' books'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Reading Progress Over Time */}
      <Card>
        <CardHeader>
          <CardTitle className="text-readwise-blue font-comic text-xl">
            📈 Reading Progress Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={readingProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fontFamily: 'Comic Neue' }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 12, fontFamily: 'Comic Neue' }}
                stroke="#666"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="books" 
                stroke="hsl(var(--readwise-blue))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--readwise-blue))", r: 6 }}
                name="Books Read"
              />
              <Line 
                type="monotone" 
                dataKey="comprehension" 
                stroke="hsl(var(--readwise-green))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--readwise-green))", r: 6 }}
                name="Comprehension Score"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4 text-sm font-comic">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-1 bg-readwise-blue rounded"></div>
              <span className="text-gray-600">Books Read</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-1 bg-readwise-green rounded"></div>
              <span className="text-gray-600">Comprehension Score (%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Improvement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-readwise-purple font-comic text-xl">
            🎯 Skills Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillProgressData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                type="number" 
                tick={{ fontSize: 12, fontFamily: 'Comic Neue' }}
                stroke="#666"
                domain={[0, 100]}
              />
              <YAxis 
                type="category" 
                dataKey="skill" 
                tick={{ fontSize: 12, fontFamily: 'Comic Neue' }}
                stroke="#666"
                width={100}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value}%`, 
                  name === 'current' ? 'Current Score' : 'Previous Score'
                ]}
                labelStyle={{ fontFamily: 'Comic Neue' }}
                contentStyle={{ fontFamily: 'Comic Neue' }}
              />
              <Bar 
                dataKey="previous" 
                fill="hsl(var(--readwise-orange))" 
                name="Previous Score"
                radius={[0, 4, 4, 0]}
              />
              <Bar 
                dataKey="current" 
                fill="hsl(var(--readwise-purple))" 
                name="Current Score"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4 text-sm font-comic">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-readwise-orange rounded"></div>
              <span className="text-gray-600">Previous Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-readwise-purple rounded"></div>
              <span className="text-gray-600">Current Score</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressChart;
