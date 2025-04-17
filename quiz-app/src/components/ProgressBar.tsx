type ProgressBarProps = {
    current: number;
    total: number;
  };
  
  export default function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = (current / total) * 100;
  
    return (
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="text-sm text-gray-600 mt-1">
          Question {current} of {total} ({Math.round(percentage)}%)
        </div>
      </div>
    );
  }