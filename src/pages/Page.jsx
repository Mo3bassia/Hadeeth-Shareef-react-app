import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader";

export default function Page() {
  let { hadithsId, pageid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hadithList, setHadithList] = useState([]);
  const [hadiths, setHadiths] = useState([]);
  const [hadithName, setHadithName] = useState("");
  const [totalHadiths, setTotalHadiths] = useState(0);
  useEffect(() => {
    async function getHadithList() {
      let request = await fetch(
        `https://hadeethenc.com/api/v1/hadeeths/list/?language=ar&category_id=${hadithsId}&page=${pageid}`
      );
      let response = await request.json();
      let requestforName = await fetch(
        `https://hadeethenc.com/api/v1/categories/roots/?language=ar`
      );
      let responseForName = await requestforName.json();
      setHadithName(responseForName[hadithsId - 1].title);
      setTotalHadiths(responseForName[hadithsId - 1].hadeeths_count);
      setHadithList(response);
      [...Array(20).keys()].forEach((id) => {
        async function getHadith() {
          let request = await fetch(
            `https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${response.data[id].id}`
          );
          let hadith = await request.json();
          setHadiths((prev) => [...prev, hadith]);
          if (id == 19) {
            setIsLoading(false);
          }
        }
        getHadith();
      });
    }

    getHadithList();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 z-[9999]">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="mx-auto w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] py-10">
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  {hadithName}
                </h1>
              </div>

              <div className="text-gray-400 text-sm">
                {totalHadiths} حديث في هذا التصنيف
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-[60%]">
                <input
                  type="text"
                  placeholder="إبحث في الأحاديث..."
                  className="w-full bg-[#1E293B] text-gray-300 rounded-2xl py-4 px-6 pr-12 focus:outline-none border border-gray-800 focus:border-gray-700 text-right placeholder:text-gray-500 shadow-sm"
                  dir="rtl"
                />
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {hadiths?.map((hadith) => {
                return (
                  <div
                    className="bg-[#1E293B] rounded-lg p-4 md:p-6 hover:bg-[#2D3B4F] transition-all duration-300 border border-gray-800"
                    key={hadith.id}
                  >
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">
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
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
