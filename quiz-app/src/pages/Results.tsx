import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Results() {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };
  const [name] = useLocalStorage('quizUserName', '');
  const navigate = useNavigate();

  const percentage = Math.round((score / total) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
      <p className="text-xl mb-4">
        {name}, you scored {score} out of {total} ({percentage}%)
      </p>
      <div className="w-full max-w-md h-6 bg-gray-200 rounded-full mb-6">
        <div
          className="h-6 bg-blue-500 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Start New Quiz
      </button>
    </div>
  );
}