import { Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Layout() {
  const [name] = useLocalStorage('quizUserName', '');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Quiz App</h1>
          {name && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Player:</span>
              <span className="font-medium">{name}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}