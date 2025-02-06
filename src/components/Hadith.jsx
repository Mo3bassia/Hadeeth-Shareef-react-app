import React, { useState } from "react";
import SaveIcon from "../icons/BookmarkIcon";
import CopyIcon from "../icons/Clipboard";
import { Link } from "react-router-dom";

export default function Hadith({
  hadith,
  allCategories,
  hadithsId,
  pageid,
  id,
}) {
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(hadith.title);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  return (
    <Link
      to={`/hadiths/${hadithsId}/page/${pageid}/hadith/${hadith.id}`}
      className="bg-[#1E293B] rounded-lg p-4 md:p-6 transition-transform duration-300 hover:scale-[1.02] border border-gray-800 relative select-none cursor-pointer"
      id={id}
    >
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div>
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white font-alexandria leading-[1.8]">
            {hadith.title}
          </h2>
          <span className="text-xs text-blue-400 block mt-1">
            (اضغط هنا للتفاصيل)
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="text-gray-400 hover:text-blue-400 transition-colors p-1.5 rounded-full hover:bg-[#2D3B4F] cursor-pointer"
            title="حفظ"
          >
            <SaveIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            className="text-gray-400 hover:text-blue-400 transition-colors p-1.5 rounded-full hover:bg-[#2D3B4F] cursor-pointer relative"
            title="نسخ"
            onClick={handleCopy}
          >
            <CopyIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            {showCopyNotification && (
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-green-900/50 text-green-300 px-2 py-1 rounded text-xs notification-fade-out whitespace-nowrap">
                تم النسخ بنجاح
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 md:mt-4">
        <span className="text-gray-400 text-xs sm:text-sm md:text-base">
          {hadith.attribution}
        </span>
        <span className="bg-blue-900/50 text-blue-300 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
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
    </Link>
  );
}
