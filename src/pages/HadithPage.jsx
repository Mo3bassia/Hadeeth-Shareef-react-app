import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BookmarkIcon from "../icons/BookmarkIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import Clipboard from "../icons/Clipboard";
import ShareIcon from "../icons/ShareIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import Loader from "../components/Loader";

export default function HadithPage() {
  const { hadithsId, pageid, hadith } = useParams();
  const [currentHadith, setCurrentHadith] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showTashkeel, setShowTashkeel] = useState(true); // إضافة حالة التشكيل

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
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen bg-[#1E293B] text-white rounded-xl">
          <div className="container mx-auto px-6 py-6 ">
            {/* Header */}
            <div className="flex flex-col-reverse gap-4 sm:flex-row-reverse sm:justify-between sm:items-center">
              <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
                {/* إضافة زر التبديل */}
                <div className="flex items-center gap-2 order-first sm:order-none">
                  <span className="text-sm font-Alexandria min-w-[40px]">
                    تشكيل
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={showTashkeel}
                    onChange={(e) => setShowTashkeel(e.target.checked)}
                  />
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#18212e] flex items-center justify-center hover:bg-[#1c2431] transition-colors cursor-pointer">
                    <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#18212e] flex items-center justify-center hover:bg-[#1c2431] transition-colors cursor-pointer">
                    <BookmarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#18212e] flex items-center justify-center hover:bg-[#1c2431] transition-colors cursor-pointer">
                    <Clipboard className="w-4 h-4 sm:w-5 sm:h-5" />
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
            <div className="h-0.5 bg-[#0f222b] w-full my-4 sm:my-6"></div>

            {/* Main Hadith Content */}
            <div className="bg-[#18212e] rounded-lg p-6 mb-6">
              <div className="border border-[#1c243182] rounded-lg ">
                {showTashkeel ? (
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-right leading-[2.5] font-Alexandria !font-normal">
                    {currentHadith.hadeeth}
                  </p>
                ) : (
                  <p
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-right leading-[2.5] font-Alexandria !font-normal"
                    dangerouslySetInnerHTML={{
                      __html: highlightWords(
                        HadithContentWithoutTashkel,
                        currentHadith.words_meanings
                      ),
                    }}
                  />
                )}
              </div>
              <div className="flex justify-end items-center gap-6">
                <div className="flex items-center gap-3 bg-[#1c2431] rounded-lg px-4 py-2">
                  <span className="text-sm sm:text-base ">
                    {currentHadith.grade}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#18212e] flex items-center justify-center text-green-500">
                    <span className="text-lg">ℹ</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#1c2431] rounded-lg px-4 py-2">
                  <span className="text-base sm:text-lg ">
                    {currentHadith.attribution}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#18212e] flex items-center justify-center text-yellow-500">
                    <span className="text-lg">★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-3">
              {/* Explanation */}
              <details className="group">
                <summary className="flex justify-between items-center bg-[#18212e] rounded-lg p-4 cursor-pointer hover:bg-[#1c2431] transition-colors">
                  <span className="text-base md:text-lg font-Alexandria">
                    شرح الحديث
                  </span>
                  <ArrowDownIcon className="w-5 h-5 text-blue-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="overflow-hidden">
                  <div className="mt-2 p-6 bg-[#18212e] rounded-lg text-gray-300 slide-down opacity-0">
                    <p className="text-sm sm:text-base md:text-lg text-right leading-[2] font-Alexandria">
                      {currentHadith.explanation}
                    </p>
                  </div>
                </div>
              </details>

              {/* Benefits */}
              <details className="group">
                <summary className="flex justify-between items-center bg-[#18212e] rounded-lg p-4 cursor-pointer hover:bg-[#1c2431] transition-colors">
                  <span className="text-base md:text-lg font-Alexandria">
                    نقاط مهمة وفوائد
                  </span>
                  <ArrowDownIcon className="w-5 h-5 text-purple-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="overflow-hidden">
                  <div className="mt-2 space-y-2">
                    {currentHadith.hints?.map((hint, index) => (
                      <div
                        key={index}
                        className="bg-[#1c2431] rounded-lg p-4 hover:bg-[#1c243182] transition-colors slide-down opacity-0"
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
                  <summary className="flex justify-between items-center bg-[#18212e] rounded-lg p-4 cursor-pointer hover:bg-[#1c2431] transition-colors">
                    <span className="text-lg md:text-xl font-Alexandria">
                      معاني الكلمات
                    </span>
                    <ArrowDownIcon className="w-5 h-5 text-green-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="overflow-hidden">
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentHadith.words_meanings?.map((item, index) => (
                        <div
                          key={index}
                          className="bg-[#18212e] rounded-lg p-4 border border-[#1c243182] slide-down opacity-0"
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
                <summary className="flex justify-between items-center bg-[#18212e] rounded-lg p-4 cursor-pointer hover:bg-[#1c2431] transition-colors">
                  <span className="text-lg md:text-xl font-Alexandria">
                    المصدر والتخريج
                  </span>
                  <ArrowDownIcon className="w-5 h-5 text-yellow-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="overflow-hidden">
                  <div className="mt-2 p-6 bg-[#18212e] rounded-lg text-gray-300 slide-down opacity-0">
                    <div className="text-right text-gray-300 whitespace-pre-line">
                      {currentHadith.reference}
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
