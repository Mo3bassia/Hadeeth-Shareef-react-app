import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BookmarkIcon from "../icons/BookmarkIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import Clipboard from "../icons/Clipboard";
import ZoomInIcon from "../icons/ZoomInIcon.jsx";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import Loader from "../components/Loader";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export default function HadithPage() {
  const { hadithsId, pageid, hadith } = useParams();
  const [currentHadith, setCurrentHadith] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showTashkeel, setShowTashkeel] = useLocalStorage(true, "tashkeel"); // إضافة حالة التشكيل
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [showCopyLinkNotification, setShowCopyLinkNotification] =
    useState(false);
  const [fontSize, setFontSize] = useLocalStorage(1, "font-size"); // تصحيح ترتيب المعاملات

  useEffect(() => {
    async function getHadith() {
      let request = await fetch(
        `https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${hadith}`
      );
      let response = await request.json();
      setCurrentHadith(response);
      setIsLoading(false);
    }
    getHadith();
  }, [hadith]);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(currentHadith.hadeeth);
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  const getZoomText = (size) => {
    if (size === 1) return "تكبير النص";
    if (size === 1.25) return "تكبير النص";
    return "تصغير النص";
  };

  const handleZoom = () => {
    setFontSize((prev) => {
      if (prev >= 1.5) return 1;
      return prev + 0.25;
    });
  };

  const HadithContentWithoutTashkel = currentHadith?.hadeeth
    ?.replaceAll("ُ", "")
    .replaceAll("َ", "")
    .replaceAll("ِ", "")
    .replaceAll("ً", "")
    .replaceAll("ٌ", "")
    .replaceAll("ٍ", "")
    .replaceAll("ّ", "")
    .replaceAll("ْ", "")
    .replaceAll("ٰ", "")
    .replaceAll("ٓ", "")
    .replaceAll("ٔ", "")
    .replaceAll("ٕ", "")
    .replaceAll("ٖ", "")
    .replaceAll("ٗ", "")
    .replaceAll("٘", "")
    .replaceAll("ٙ", "")
    .replaceAll("ٚ", "")
    .replaceAll("ٛ", "")
    .replaceAll("ٜ", "")
    .replaceAll("ٝ", "")
    .replaceAll("ٞ", "")
    .replaceAll("ٟ", "");

  // دالة لتحويل النص إلى HTML مع إضافة التنسيق للكلمات
  const highlightWords = (text, meanings) => {
    if (!text || !meanings) return text;

    let result = text;
    meanings.forEach(({ word, meaning }) => {
      const wordWithoutTashkeel = word
        .replace(/[\u064B-\u0652]/g, "") // إزالة علامات التشكيل من الكلمة في المعاني
        .trim();

      result = result.replace(
        new RegExp(wordWithoutTashkeel, "g"),
        `<span class="text-blue-400 cursor-help relative inline-block group">
          ${wordWithoutTashkeel}
          <span class="absolute right-1/2 translate-x-1/2 -top-2 -translate-y-full hidden group-hover:block bg-[#293446] text-gray-300 text-sm rounded-lg px-3 py-2 min-w-[150px] text-center shadow-lg z-10">
            ${meaning}
          </span>
        </span>`
      );
    });

    return result;
  };

  return (
    <div className="relative overflow-hidden backdrop-blur-3xl">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-islamic.png')] opacity-[0.02]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-purple-600/20 to-green-600/20 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Enhanced Header */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-col-reverse gap-4 sm:flex-row-reverse sm:justify-between sm:items-center">
              <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
                {/* Controls Group */}
                <div className="flex items-center gap-3 bg-[#1c2431]/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/5">
                  <span className="text-sm text-gray-300">تشكيل</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-success toggle-sm"
                    checked={showTashkeel}
                    onChange={(e) => setShowTashkeel(e.target.checked)}
                  />
                </div>
                <div className="flex gap-2">
                  {/* ...existing buttons with enhanced styling... */}
                  <button
                    onClick={handleZoom}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 
                      flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer group relative"
                  >
                    <ZoomInIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    <span className="absolute scale-0 group-hover:scale-100 transition-all duration-200 -top-12 right-1/2 translate-x-1/2 text-xs bg-[#293446] text-gray-300 px-3 py-2 rounded shadow-lg whitespace-nowrap z-50">
                      {getZoomText(fontSize)}
                    </span>
                  </button>
                  <button
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 
                      flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer group relative"
                  >
                    <BookmarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    <span className="absolute scale-0 group-hover:scale-100 transition-all duration-200 -top-12 right-1/2 translate-x-1/2 text-xs bg-[#293446] text-gray-300 px-3 py-2 rounded shadow-lg whitespace-nowrap z-50">
                      حفظ الحديث
                    </span>
                  </button>
                  <button
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 
                      flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer relative group"
                    onClick={handleCopy}
                  >
                    <Clipboard className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    <span className="absolute scale-0 group-hover:scale-100 transition-all duration-200 -top-12 right-1/2 translate-x-1/2 text-xs bg-[#293446] text-gray-300 px-3 py-2 rounded shadow-lg whitespace-nowrap z-50">
                      نسخ الحديث
                    </span>
                    {showCopyNotification && (
                      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-green-900/50 text-green-300 px-3 py-2 rounded text-xs notification-fade-out whitespace-nowrap z-50">
                        تم النسخ بنجاح
                      </span>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex gap-2 justify-center sm:justify-start">
                <Link
                  to={`/hadiths/${hadithsId}/page/${pageid}?hadithid=${currentHadith.id}`}
                >
                  <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                </Link>
                <h1 className="text-lg sm:text-xl font-bold font-alexandria">
                  تفاصيل الحديث
                </h1>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="border border-white/5 rounded-xl p-6 bg-gradient-to-b from-white/5 to-transparent">
              {showTashkeel ? (
                <p
                  style={{ fontSize: `${fontSize}rem` }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-right leading-[2.5] font-Alexandria !font-normal transition-all duration-200"
                >
                  {currentHadith.hadeeth}
                </p>
              ) : (
                <p
                  style={{ fontSize: `${fontSize}rem` }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-right leading-[2.5] font-Alexandria !font-normal transition-all duration-200"
                  dangerouslySetInnerHTML={{
                    __html: highlightWords(
                      HadithContentWithoutTashkel,
                      currentHadith.words_meanings
                    ),
                  }}
                />
              )}
            </div>
            {/* Enhanced Metadata */}
            <div className="flex flex-wrap justify-end items-center gap-4 mt-6">
              <div className="backdrop-blur-sm bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl px-4 py-2 border border-green-500/10">
                <span className="text-sm sm:text-base text-green-400">
                  {currentHadith.grade}
                </span>
              </div>
              <div className="backdrop-blur-sm bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl px-4 py-2 border border-yellow-500/10">
                <span className="text-sm sm:text-base text-yellow-400">
                  {currentHadith.attribution}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Accordions */}
          <div className="space-y-4">
            {/* Explanation */}
            <details className="group">
              <summary
                className="flex justify-between items-center backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 
                cursor-pointer hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-base md:text-lg text-blue-300">
                  شرح الحديث
                </span>
                <ArrowDownIcon className="w-5 h-5 text-blue-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="overflow-hidden">
                <div
                  className="mt-2 p-6 backdrop-blur-sm bg-gradient-to-b from-white/5 to-transparent rounded-xl border border-white/5 
                  text-gray-300 slide-down opacity-0"
                >
                  <p className="text-sm sm:text-base md:text-lg text-right leading-[2] font-Alexandria">
                    {currentHadith.explanation}
                  </p>
                </div>
              </div>
            </details>

            {/* Benefits */}
            <details className="group">
              <summary
                className="flex justify-between items-center backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 
                cursor-pointer hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-base md:text-lg text-blue-300">
                  نقاط مهمة وفوائد
                </span>
                <ArrowDownIcon className="w-5 h-5 text-blue-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="overflow-hidden">
                <div className="mt-2 space-y-2">
                  {currentHadith.hints?.map((hint, index) => (
                    <div
                      key={index}
                      className="backdrop-blur-sm bg-gradient-to-b from-white/5 to-transparent rounded-xl border border-white/5 p-4 
                        hover:bg-white/10 transition-all duration-300 slide-down opacity-0"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <p className="text-sm sm:text-base text-right text-gray-300 font-Alexandria">
                        {hint}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </details>

            {/* Word Meanings */}
            {currentHadith.words_meanings?.length > 0 && (
              <details className="group">
                <summary
                  className="flex justify-between items-center backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 
                  cursor-pointer hover:bg-white/10 transition-all duration-300"
                >
                  <span className="text-base md:text-lg text-blue-300">
                    معاني الكلمات
                  </span>
                  <ArrowDownIcon className="w-5 h-5 text-blue-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="overflow-hidden">
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentHadith.words_meanings?.map((item, index) => (
                      <div
                        key={index}
                        className="backdrop-blur-sm bg-gradient-to-b from-white/5 to-transparent rounded-xl border border-white/5 p-4 
                          slide-down opacity-0"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="text-right">
                          <span className="text-blue-400 font-bold block mb-2">
                            {item.word}
                          </span>
                          <span className="text-gray-300 text-sm">
                            {item.meaning}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            )}

            {/* References */}
            <details className="group">
              <summary
                className="flex justify-between items-center backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 
                cursor-pointer hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-base md:text-lg text-blue-300">
                  المصدر والتخريج
                </span>
                <ArrowDownIcon className="w-5 h-5 text-blue-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="overflow-hidden">
                <div
                  className="mt-2 p-6 backdrop-blur-sm bg-gradient-to-b from-white/5 to-transparent rounded-xl border border-white/5 
                  text-gray-300 slide-down opacity-0"
                >
                  <div className="text-right text-gray-300 whitespace-pre-line">
                    {currentHadith.reference}
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
