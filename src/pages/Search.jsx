import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import CopyIcon from "../icons/Clipboard";
import SaveIcon from "../icons/BookmarkIcon";
import SaveSlashIcon from "../icons/SaveSlashIcon";

export default function Search({
  allHadithsContent,
  allCategories,
  allHadithsCount,
  savedHadiths,
  setSavedHadiths,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHadiths, setFilteredHadiths] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState({});
  const [showSaveNotification, setShowSaveNotification] = useState({});
  const [showUnsaveNotification, setShowUnsaveNotification] = useState({});

  useEffect(() => {
    if (allHadithsContent.length === allHadithsCount && allCategories.length) {
      // Check for duplicates
      const titleMap = new Map();
      const duplicates = [];

      allHadithsContent.forEach((hadith) => {
        if (titleMap.has(hadith.title)) {
          duplicates.push({
            title: hadith.title,
            firstId: titleMap.get(hadith.title).id,
            secondId: hadith.id,
            firstHadithsId: titleMap.get(hadith.title).hadithsId,
            secondHadithsId: hadith.hadithsId,
          });
        } else {
          titleMap.set(hadith.title, hadith);
        }
      });

      if (duplicates.length > 0) {
        console.log("Found duplicate hadiths:", duplicates);
      } else {
        console.log(
          "No duplicates found in",
          allHadithsContent.length,
          "hadiths"
        );
      }

      setIsLoading(false);
      console.log("Sample hadith:", allHadithsContent[0]); // Debug log
    }
  }, [allHadithsCount, allHadithsContent, allCategories]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Only reset and return if query is empty or whitespace
    if (!query.trim()) {
      setHasSearched(false);
      setFilteredHadiths([]);
      return;
    }

    setHasSearched(true);
    setIsSearching(true);

    setTimeout(() => {
      const normalizedQuery = query
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[أإآا]/g, "ا")
        .replace(/[يى]/g, "ي")
        .replace(/ة/g, "ه");

      const filtered = allHadithsContent.filter((hadith) => {
        const normalizedTitle = hadith.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[أإآا]/g, "ا")
          .replace(/[يى]/g, "ي")
          .replace(/ة/g, "ه");

        return normalizedTitle.includes(normalizedQuery);
      });

      setFilteredHadiths(filtered);
      setIsSearching(false);
    }, 500);
  };

  const handleCopy = (e, hadithTitle, hadithId) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(hadithTitle);
    setShowCopyNotification((prev) => ({ ...prev, [hadithId]: true }));
    setTimeout(
      () => setShowCopyNotification((prev) => ({ ...prev, [hadithId]: false })),
      2000
    );
  };

  const handleSave = (e, hadith, hadithsId, pageid) => {
    e.preventDefault();
    e.stopPropagation();

    if (savedHadiths.filter((h) => h.id === hadith.id).length) {
      setSavedHadiths((prev) => prev.filter((h) => h.id !== hadith.id));
      setShowUnsaveNotification((prev) => ({ ...prev, [hadith.id]: true }));
      setTimeout(
        () =>
          setShowUnsaveNotification((prev) => ({
            ...prev,
            [hadith.id]: false,
          })),
        2000
      );
    } else {
      setShowSaveNotification((prev) => ({ ...prev, [hadith.id]: true }));
      setTimeout(
        () =>
          setShowSaveNotification((prev) => ({ ...prev, [hadith.id]: false })),
        2000
      );
      setSavedHadiths((prev) => [
        ...prev,
        {
          ...hadith,
          hadithsId: hadithsId,
          pageid: pageid,
          idHTML: `hadith-${hadith.id}`,
        },
      ]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  console.log(filteredHadiths);

  return (
    <div className="min-h-screen relative overflow-hidden backdrop-blur-3xl">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-islamic.png')] opacity-[0.02]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-purple-600/20 to-green-600/20 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      {/* Glass Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 border border-white/10 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/0 rotate-12 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 border border-white/10 rounded-full backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/0 -rotate-12 animate-float-delay"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header with Search */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent mb-4">
              البحث في الأحاديث
            </h1>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="ابحث عن حديث..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500/50 text-white placeholder-gray-400"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {hasSearched && !isSearching && (
              <div className="mt-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-blue-300">
                  <span className="ml-2">نتائج البحث:</span>
                  <span className="font-bold">{filteredHadiths.length}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Results Display */}
        {isSearching ? (
          <div className="flex justify-center items-center py-12">
            <Loader />
          </div>
        ) : !hasSearched ? (
          <div className="text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-400 text-lg">ابدأ البحث عن الأحاديث</p>
          </div>
        ) : filteredHadiths.length === 0 ? (
          <div className="text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-400 text-lg">لا توجد نتائج للبحث</p>
            <p className="text-gray-500 text-sm mt-2">
              جرب البحث بكلمات مختلفة
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHadiths.map((hadith, index) => (
              <Link
                to={`/hadiths/${hadith.hadithsId}/page/${hadith.pageid}?hadithid=${hadith.id}`}
                key={`${hadith.hadithsId}-${hadith.pageid}-${hadith.id}`}
                className="block group backdrop-blur-md bg-gradient-to-b from-white/5 via-transparent to-white/5 
                  border border-white/10 rounded-xl p-6 transition-all duration-300 
                  hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
              >
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

                  <div className="flex gap-3 self-end sm:self-center">
                    <button
                      className="p-2 rounded-xl bg-white/5 border border-white/10 
                        hover:bg-white/10 transition-all duration-300 group-hover:border-blue-500/20 relative cursor-pointer group/copy"
                      onClick={(e) => handleCopy(e, hadith.title, hadith.id)}
                    >
                      <CopyIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
                      <span
                        className="absolute scale-0 group-hover/copy:scale-100 transition-all duration-200 -top-12 
                        right-1/2 translate-x-1/2 text-xs bg-[#293446] text-blue-300 px-3 py-2 
                        rounded-lg shadow-lg whitespace-nowrap z-50 border border-blue-500/20"
                      >
                        نسخ الحديث
                      </span>
                      {showCopyNotification[hadith.id] && (
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
                        hover:bg-white/10 transition-all duration-300 group-hover:border-blue-500/20 relative cursor-pointer group/save"
                      onClick={(e) =>
                        handleSave(e, hadith, hadith.hadithsId, hadith.pageid)
                      }
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
                      {showSaveNotification[hadith.id] && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 -bottom-12 
                          bg-green-900/50 text-green-300 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap
                          border border-green-500/20 backdrop-blur-sm"
                        >
                          تم الحفظ بنجاح
                        </div>
                      )}
                      {showUnsaveNotification[hadith.id] && (
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
                  <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                    {allCategories[hadith.hadithsId - 1]?.title || "غير معروف"}
                  </span>
                  <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20">
                    الصفحة: {hadith.pageid}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
