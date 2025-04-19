import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full mb-8 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-indigo-600">
          <FiClock className="mr-2" />
          <span>Question {current} of {total}</span>
        </div>
        <div className="flex items-center text-purple-600">
          <FiCheckCircle className="mr-2" />
          <span>{Math.round(percentage)}% Complete</span>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}