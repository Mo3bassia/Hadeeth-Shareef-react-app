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
      className="block group backdrop-blur-md bg-gradient-to-b from-white/5 via-transparent to-white/5 
        border border-white/10 rounded-xl p-6 transition-all duration-300 
        hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
      id={id}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 
            bg-clip-text text-transparent group-hover:from-white group-hover:to-blue-300 
            transition-all duration-300 mb-2 font-alexandria leading-[2]">
            {hadith.title}
          </h2>
          <span className="inline-block bg-blue-500/10 text-blue-400 text-sm px-3 py-1 
            rounded-full border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
            اضغط للتفاصيل
          </span>
        </div>

        <div className="flex gap-3">
          <button
            className="p-2 rounded-xl bg-white/5 border border-white/10 
              hover:bg-white/10 transition-all duration-300 group-hover:border-blue-500/20 relative"
            onClick={(e) => handleCopy(e)}
          >
            <CopyIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
            {showCopyNotification && (
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 
                bg-green-900/50 text-green-300 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap
                border border-green-500/20 backdrop-blur-sm">
                تم النسخ بنجاح
              </div>
            )}
          </button>
          <button
            className="p-2 rounded-xl bg-white/5 border border-white/10 
              hover:bg-white/10 transition-all duration-300 group-hover:border-blue-500/20"
          >
            <SaveIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <span className="bg-white/5 text-gray-300 px-3 py-1 rounded-full border border-white/10">
          {hadith.attribution}
        </span>
        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
          {hadith.grade}
        </span>
      </div>

      {hadith.categories?.length > 0 && (
        <>
          <div className="w-full h-[1px] bg-white/5 my-4"></div>
          <div className="flex flex-col gap-3">
            <span className="text-gray-400 text-sm">التصنيفات الفرعية:</span>
            <div className="flex flex-wrap gap-2">
              {hadith.categories?.map((cat) => {
                const category = allCategories.find((aCat) => aCat.id == cat);
                if (!category) return null;

                return (
                  <span
                    key={cat}
                    className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-full 
                      border border-white/10 hover:bg-white/10 hover:border-blue-500/20 
                      transition-all duration-300 cursor-pointer"
                  >
                    {category.title}
                  </span>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Link>
  );
}
