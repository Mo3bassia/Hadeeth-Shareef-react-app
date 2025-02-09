import React, { useEffect, useState, useRef, useMemo } from "react";
import Loader from "../components/Loader.jsx";
import FolderIcon from "../icons/FolderIcon.jsx";
import ArrowRightIcon from "../icons/ArrowRightIcon.jsx";
import { Link } from "react-router-dom";

export default function Hadith({ allCategories, ...props }) {
  const [activeTab, setActiveTab] = useState("main");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCategories, setVisibleCategories] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef(null);

  // تصفية التصنيفات حسب البحث
  const filteredCategories = useMemo(() => {
    return activeTab === "main"
      ? props.hadithList?.filter((category) =>
          category.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allCategories?.filter((category) =>
          category.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
  }, [props.hadithList, allCategories, searchQuery, activeTab]);

  // Intersection Observer للتحميل المتدرج
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        loadMoreCategories();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCategories, filteredCategories]);

  const loadMoreCategories = () => {
    if (visibleCategories < filteredCategories.length) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCategories((prev) => prev + 8);
        setIsLoadingMore(false);
      }, 500);
    }
  };

  return (
    <div className="bg-gradient-to-b relative overflow-hidden backdrop-blur-3xl">
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

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl backdrop-blur-md bg-white/5 border border-white/10 p-1">
            <button
              onClick={() => setActiveTab("main")}
              className={`px-6 py-3 rounded-lg transition-all duration-300 text-lg
                ${
                  activeTab === "main"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-400 hover:text-gray-300"
                }`}
            >
              التصنيفات الرئيسية
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 rounded-lg transition-all duration-300 text-lg
                ${
                  activeTab === "all"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-400 hover:text-gray-300"
                }`}
            >
              كل التصنيفات
            </button>
          </div>
        </div>

        {/* Search Input - Only show when activeTab is "all" */}
        {activeTab === "all" && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في التصنيفات..."
                className="w-full px-6 py-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 
                  text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500/50
                  transition-all duration-300"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                {/* Search Icon */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </div>
        )}

        {props.isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader />
          </div>
        ) : (
          <>
            {activeTab === "main" ? (
              // تصميم مختلف للتصنيفات الرئيسية
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {props.hadithList?.map((category, index) => (
                  <Link
                    key={category.id}
                    to={`/hadiths/${category.id}/page/1`}
                    className="group backdrop-blur-md bg-gradient-to-b from-white/10 to-transparent 
                      border border-white/10 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300
                      hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex flex-col gap-6">
                      <div
                        className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 
                        w-fit group-hover:scale-110 transition-transform duration-500"
                      >
                        <FolderIcon className="w-8 h-8 text-blue-400" />
                      </div>

                      <div>
                        <h3
                          className="text-xl font-bold text-white group-hover:text-blue-400 
                          transition-colors mb-3 leading-relaxed"
                        >
                          {category.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-400 text-sm">
                            {category.hadeeths_count} حديث
                          </span>
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
            ) : (
              // تصميم التصنيفات الأخرى
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredCategories
                  ?.slice(0, visibleCategories)
                  .map((category, index) => (
                    <Link
                      key={category.id}
                      to={`/hadiths/${category.id}/page/1`}
                      className="group backdrop-blur-md bg-gradient-to-b from-white/10 to-transparent 
                      border border-white/10 rounded-xl p-4 hover:bg-white/15 transition-all duration-300
                      hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400/70 group-hover:bg-blue-400 transition-colors"></div>
                        <div className="flex-1">
                          <h3 className="text-lg text-gray-200 font-medium group-hover:text-blue-400 transition-colors">
                            {category.title}
                          </h3>
                          <span className="text-sm text-gray-400 group-hover:text-gray-300">
                            {category.hadeeths_count} حديث
                          </span>
                        </div>
                        <ArrowRightIcon
                          className="w-5 h-5 text-gray-400 group-hover:text-blue-400 
                        group-hover:translate-x-1 transition-all duration-300"
                        />
                      </div>
                    </Link>
                  ))}
              </div>
            )}

            {/* Loading More Indicator - فقط للتصنيفات الأخرى */}
            {activeTab === "all" &&
              visibleCategories < filteredCategories?.length && (
                <div className="flex justify-center items-center mt-8 py-4">
                  {isLoadingMore && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  )}
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
}
