import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
                QuizMaster Pro
              </span>
            </h2>
            <p className="text-gray-400">
              La plateforme ultime pour tester vos connaissances et apprendre de manière interactive.
            </p>
            <div className="flex space-x-6 mt-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Liens */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition">Accueil</a></li>
              <li><a href="/home" className="text-gray-400 hover:text-white transition">Quiz</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">À propos</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Confidentialité</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} QuizMaster Pro. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm mr-4">Conditions</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}