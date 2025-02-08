import React, { useState } from "react";
import SaveIcon from "../icons/BookmarkIcon";
import SaveSlashIcon from "../icons/SaveSlashIcon";
import CopyIcon from "../icons/Clipboard";
import { Link, useNavigate } from "react-router-dom";

export default function Hadith({
  hadith,
  allCategories,
  hadithsId,
  pageid,
  id,
  savedHadiths,
  setSavedHadiths,
}) {
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [showUnsaveNotifcation, setShowUnsaveNotifcation] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(hadith.title);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  function handleSave(e) {
    e.preventDefault();
    e.stopPropagation();
    if (savedHadiths.filter((h) => h.id === hadith.id).length) {
      setSavedHadiths((prev) => prev.filter((h) => h.id !== hadith.id));
      setShowUnsaveNotifcation(true);
      setTimeout(() => setShowUnsaveNotifcation(false), 2000);
    } else {
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 2000);
      setSavedHadiths((prev) => [
        ...prev,
        {
          ...hadith,
          // currentPage: pageid,
          hadithsId: hadithsId,
          pageid: pageid,
          idHTML: `hadith-${hadith.id}`,
        },
      ]);
    }
    // setShowSaveNotification(true);
    // setTimeout(() => setShowSaveNotification(false), 2000);
    // setSavedHadiths((prev) => [...prev, hadith]);
  }

  const navigate = useNavigate();
  function handleCat(e, link) {
    e.preventDefault();
    e.stopPropagation();
    navigate(link);
  }

  return (
    <Link
      to={`/hadiths/${hadithsId}/page/${pageid}/hadith/${hadith.id}`}
      className="block group backdrop-blur-md bg-gradient-to-b from-white/5 via-transparent to-white/5 
        border border-white/10 rounded-xl p-6 transition-all duration-300 
        hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
      id={id}
    >
      {/* تعديل التنسيق ليكون responsive */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex-1 space-y-2">
          <h2
            className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 
            bg-clip-text text-transparent group-hover:from-white group-hover:to-blue-300 
            transition-all duration-300 font-alexandria leading-[2]"
          >
            {hadith.title}
          </h2>
          <span
            className="inline-block bg-blue-500/10 text-blue-400 text-sm px-3 py-1 
            rounded-full border border-blue-500/20 group-hover:bg-blue-500/20 transition-all"
          >
            اضغط للتفاصيل
          </span>
        </div>

        <div className="flex gap-3 self-end sm:self-center w-full sm:w-auto justify-center">
          <button
            className="p-2 rounded-xl bg-white/5 border border-white/10 
              hover:bg-white/10 transition-all duration-300 group-hover:border-blue-500/20 relative cursor-pointer group/copy"
            onClick={(e) => handleCopy(e)}
          >
            <CopyIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
            <span
              className="absolute scale-0 group-hover/copy:scale-100 transition-all duration-200 -top-12 
                  right-1/2 translate-x-1/2 text-xs bg-[#293446] text-blue-300 px-3 py-2 
                  rounded-lg shadow-lg whitespace-nowrap z-50 border border-blue-500/20"
            >
              نسخ الحديث
            </span>
            {showCopyNotification && (
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-12 
                bg-green-900/50 text-green-300 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap
                border border-green-500/20 backdrop-blur-sm"
              >
                تم النسخ بنجاح
              </div>
            )}
          </button>
          <button
            className="p-2 rounded-xl bg-white/5 border border-white/10 
              hover:bg-white/10 transition-all duration-300 group-hover:border-blue-500/20 relative cursor-pointer
              group/save"
            onClick={(e) => handleSave(e)}
          >
            {savedHadiths.filter((h) => h.id === hadith.id).length ? (
              <>
                <SaveSlashIcon className="h-5 w-5 text-green-300 fill-green-300 hover:fill-red-400 hover:text-red-400" />
                <span
                  className="absolute scale-0 group-hover/save:scale-100 transition-all duration-200 -top-12 
                  right-1/2 translate-x-1/2 text-xs bg-[#293446] text-red-300 px-3 py-2 
                  rounded-lg shadow-lg whitespace-nowrap z-50 border border-red-500/20"
                >
                  إلغاء الحفظ
                </span>
              </>
            ) : (
              <>
                <SaveIcon className="h-5 w-5 text-blue-400 group-hover:text-blue-500 hover:fill-blue-500" />
                <span
                  className="absolute scale-0 group-hover/save:scale-100 transition-all duration-200 -top-12 
                  right-1/2 translate-x-1/2 text-xs bg-[#293446] text-blue-300 px-3 py-2 
                  rounded-lg shadow-lg whitespace-nowrap z-50 border border-blue-500/20"
                >
                  حفظ الحديث
                </span>
              </>
            )}
            {showSaveNotification && (
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-12 
                bg-green-900/50 text-green-300 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap
                border border-green-500/20 backdrop-blur-sm"
              >
                تم الحفظ بنجاح
              </div>
            )}
            {showUnsaveNotifcation && (
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-12 
                bg-red-900/50 text-red-300 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap
                border border-red-500/20 backdrop-blur-sm"
              >
                تم الغاء الحفظ بنجاح
              </div>
            )}
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
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-400/80 text-sm bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                التصنيفات الفرعية
              </span>
              <span className="text-gray-400 text-xs">
                ({hadith.categories.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {hadith.categories?.map((cat) => {
                const category = allCategories.find((aCat) => aCat.id == cat);
                if (!category) return null;

                return (
                  <span
                    onClick={(e) => handleCat(e, `/hadiths/${cat}/page/1`)}
                    key={cat}
                    className="group/cat relative px-4 py-2 bg-gradient-to-r from-white/5 to-transparent 
                      text-gray-300 text-sm rounded-lg border border-white/10 
                      hover:bg-white/10 hover:border-blue-500/20 hover:text-blue-400
                      transition-all duration-300 cursor-pointer flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400/50 group-hover/cat:bg-blue-400"></span>
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
