import React from 'react';

interface StarMethodHintProps {
  className?: string;
}

const StarMethodHint: React.FC<StarMethodHintProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">STAR Method Guide</h3>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold">S</span>
          </div>
          <div className="ml-4">
            <h4 className="font-medium text-gray-800">Situation</h4>
            <p className="text-gray-600">Set the scene and provide the necessary context for the example.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 font-semibold">T</span>
          </div>
          <div className="ml-4">
            <h4 className="font-medium text-gray-800">Task</h4>
            <p className="text-gray-600">Describe the task or goal you were responsible for achieving.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <span className="text-yellow-600 font-semibold">A</span>
          </div>
          <div className="ml-4">
            <h4 className="font-medium text-gray-800">Action</h4>
            <p className="text-gray-600">Detail the steps you took to address the situation or accomplish the task.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-semibold">R</span>
          </div>
          <div className="ml-4">
            <h4 className="font-medium text-gray-800">Result</h4>
            <p className="text-gray-600">Share the outcomes of your actions and what was achieved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarMethodHint; 