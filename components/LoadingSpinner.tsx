
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500"></div>
      <p className="ml-4 text-slate-600 text-lg">Henter opskrift...</p>
    </div>
  );
};

export default LoadingSpinner;
