import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="relative">
        <h1 className="text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-primary-400 to-primary-900/10 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white tracking-widest uppercase">
          Signal Lost
        </div>
      </div>
      
      <p className="text-text-muted max-w-md mt-6 mb-8 leading-relaxed">
        The requested sector could not be located in the system. The endpoint may have been moved or you lack the necessary clearance.
      </p>
      
      <Link to="/" className="btn-primary flex items-center gap-2 px-6 py-3">
        <Home className="w-4 h-4" />
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
