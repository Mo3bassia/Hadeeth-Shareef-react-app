import React, { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import FolderIcon from "../icons/FolderIcon.jsx";
import ArrowRightIcon from "../icons/ArrowRightIcon.jsx";
import { Link } from "react-router-dom";

export default function Hadith({
  setAllHadithsId,
  allHadithsId,
  hadithList,
  setHadithList,
  isLoading,
}) {
  return (
    <div className=" bg-gradient-to-b  relative overflow-hidden backdrop-blur-3xl">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-islamic.png')] opacity-[0.02]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-purple-600/20 to-green-600/20 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Enhanced Header */}
        <div className="text-center relative mb-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400 mb-6 leading-loose relative animate-fade-in">
            موسوعة الأحاديث النبوية
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-loose animate-fade-in-up">
            تصفح الأحاديث حسب التصنيف واستكشف كنوز السنة النبوية
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {hadithList?.map((hadith, index) => (
              <Link
                key={hadith.id}
                to={`/hadiths/${hadith.id}/page/1`}
                className="group backdrop-blur-md bg-gradient-to-b from-white/5 via-white/2 to-transparent 
                  border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-500 
                  hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400 
                    group-hover:scale-110 transition-transform duration-500"
                  >
                    <FolderIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center gap-4">
                      <div>
                        <h2
                          className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 
                          bg-clip-text text-transparent group-hover:from-white group-hover:to-blue-300 
                          transition-all duration-300"
                        >
                          {hadith.title}
                        </h2>
                        <span className="text-sm text-gray-400 mt-1 block group-hover:text-gray-300">
                          {hadith.hadeeths_count} حديث
                        </span>
                      </div>
                      <ArrowRightIcon
                        className="w-5 h-5 text-gray-400 group-hover:text-blue-400 
                        group-hover:translate-x-1 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
