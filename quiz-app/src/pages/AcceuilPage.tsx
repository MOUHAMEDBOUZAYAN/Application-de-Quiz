import { useNavigate } from 'react-router-dom';

export default function AcceuilPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">QuizMaster</span> Challenge
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your knowledge with our interactive quizzes. Customize your experience and challenge yourself!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { value: "20+", label: "Categories" },
            { value: "5000+", label: "Questions" },
            { value: "Custom", label: "Quizzes" }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <p className="text-4xl font-bold text-blue-400">{item.value}</p>
              <p className="mt-2 text-gray-300">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}