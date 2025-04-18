import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  // Using a more reliable video source
  const videoSource = "https://cdn.pixabay.com/vimeo/740176671/abstract-134109.mp4?width=1280&hash=9a8d7b5f8e3f0b8e5b8e5b8e5b8e5b8e5b8e5b8e";

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Video Background with fallback */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
          poster="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        >
          <source src={videoSource} type="video/mp4" />
          <source src="/videos/fallback.webm" type="video/webm" />
          Your browser does not support HTML5 video
        </video>
        {/* Fallback image if video fails */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Quiz Platform</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your knowledge with our interactive quizzes. Learn while having fun and challenge your friends!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </button>
            
            <button className="px-8 py-4 text-lg font-medium text-white bg-transparent border-2 border-indigo-400 rounded-lg hover:bg-indigo-900/30 transition-all duration-300">
              View Features
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { value: "10+", label: "Categories" },
            { value: "1000+", label: "Questions" },
            { value: "24/7", label: "Available" }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <p className="text-4xl font-bold text-indigo-400">{item.value}</p>
              <p className="mt-2 text-gray-300">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-64 text-gray-900"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}