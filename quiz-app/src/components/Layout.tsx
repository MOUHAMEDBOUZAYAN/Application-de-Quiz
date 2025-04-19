import { Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { FiAward, FiHome, FiSettings } from 'react-icons/fi';
import Footer from './Footer';

export default function Layout() {
  const [name] = useLocalStorage('quizUserName', '');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header amélioré */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FiAward className="text-indigo-600 text-xl" />
            <h1 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              QuizMaster Pro
            </h1>
          </div>
          
          {name && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full">
                <span className="text-indigo-700 font-medium">{name}</span>
              </div>
              <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                <FiSettings className="text-lg" />
              </button>
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