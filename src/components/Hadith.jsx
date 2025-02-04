import React from "react";

export default function Hadith({ hadith }) {
  return (
    <div className="bg-[#1E293B] rounded-lg p-4 md:p-6 hover:bg-[#2D3B4F] transition-all duration-300 border border-gray-800">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white font-alexandria leading-[1.8]">
          {hadith.title}
        </h2>
        <button className="text-blue-500 hover:text-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2 mt-3 md:mt-4">
        <span className="text-gray-400 text-xs sm:text-sm md:text-base">
          {hadith.attribution}
        </span>
        <span className="bg-blue-600 text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
          {hadith.grade}
        </span>
      </div>
    </div>
  );
}
