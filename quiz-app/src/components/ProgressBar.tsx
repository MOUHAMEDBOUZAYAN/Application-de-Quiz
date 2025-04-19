import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full mb-8 space-y-4">
      <div className="flex items-center justify-between text-base">
        <div className="flex items-center text-indigo-600 font-medium">
          <FiClock className="mr-3 text-xl" />
          <span>Question {current} sur {total}</span>
        </div>
        <div className="flex items-center text-purple-600 font-medium">
          <FiCheckCircle className="mr-3 text-xl" />
          <span>{Math.round(percentage)}% Complété</span>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}