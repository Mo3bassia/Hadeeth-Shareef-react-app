import React from "react";

export default function Hadith({ hadith, allCategories }) {
  console.log(hadith.categories);
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
      <div className="w-full h-[1px] bg-gray-800 my-4"></div>
      <div className="flex flex-col gap-3">
        <span className="text-gray-400 text-xs sm:text-sm">
          التصنيفات الفرعية:
        </span>
        <div className="flex flex-wrap gap-2 items-center">
          {hadith.categories?.map(function (cat) {
            const category = allCategories.find((aCat) => aCat.id == cat);
            if (!category) return null;

            return (
              <span
                key={cat}
                className="px-3 py-1.5 bg-[#1A2234] text-gray-300 text-xs sm:text-sm md:text-base 
                  rounded-full border border-gray-700 hover:bg-[#2D3B4F] hover:border-gray-600 
                  transition-all duration-200 cursor-pointer select-none"
              >
                {category.title}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
