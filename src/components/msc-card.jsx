import React from 'react';

// Main App component
const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 font-sans">
      {/* The transformed component card */}
      <div className="relative bg-orange-200 rounded-3xl shadow-xl overflow-hidden max-w-md w-full p-8 md:p-12">
        {/* Decorative badge in the top right corner */}
        <div className="absolute top-6 right-6">
          <svg
            className="w-10 h-10 text-orange-600 drop-shadow-md"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simple badge icon (e.g., a star) */}
            <path
              fillRule="evenodd"
              d="M10.788 3.212a.75.75 0 011.424 0l4.5 9A.75.75 0 0116.5 13.5h-9a.75.75 0 01-.688-1.038l4.5-9zM12 16.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M12 21a.75.75 0 100-1.5.75.75 0 000 1.5zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Content Section */}
        <div className="text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-900 leading-tight mb-4 mt-8">
            Awesome Feature
          </h1>

          {/* Paragraph */}
          <p className="text-lg text-orange-800 mb-8 max-w-sm mx-auto">
            Discover how this innovative feature can revolutionize your daily workflow and bring
            unparalleled efficiency.
          </p>

          {/* Illustration Placeholder */}
          {/* In a real application, this would be a complex SVG illustration or an image */}
          <div className="w-full h-48 md:h-64 bg-gradient-to-br from-orange-300 to-orange-400 rounded-2xl mb-8 flex items-center justify-center">
            <svg
              className="w-24 h-24 text-orange-700 opacity-60"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* A simplified graphic to represent the illustration, e.g., a abstract shape */}
              <path
                fillRule="evenodd"
                d="M3.75 6.75a.75.75 0 01.75-.75h14.25a.75.75 0 110 1.5H4.5a.75.75 0 01-.75-.75zM3.75 12a.75.75 0 01.75-.75h14.25a.75.75 0 110 1.5H4.5a.75.75 0 01-.75-.75zM4.5 17.25a.75.75 0 000 1.5h14.25a.75.75 0 000-1.5H4.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Button */}
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
