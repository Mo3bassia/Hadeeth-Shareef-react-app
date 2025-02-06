import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Hadith from "../components/Hadith";
import Loader from "../components/Loader";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

export default function Page({ allCategories }) {
  let { hadithsId, pageid } = useParams();
  const containerEl = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hadithList, setHadithList] = useState([]);
  const [hadiths, setHadiths] = useState([]);
  const [hadithName, setHadithName] = useState("");
  const [totalHadiths, setTotalHadiths] = useState(0);
  const [heightContainer, setHeightContainer] = useState(0);
  const [pageInput, setPageInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    // السماح فقط بالأرقام
    if (/^\d*$/.test(value)) {
      setPageInput(value);
    }
  };

  const handlePageSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(pageInput);

    // التحقق من وجود الصفحة
    if (!pageNumber || pageNumber <= 0) {
      setError("رقم الصفحة غير صحيح");
      return;
    }

    if (pageNumber > hadithList.meta?.last_page) {
      setError(`آخر صفحة متاحة هي ${hadithList.meta?.last_page}`);
      return;
    }

    navigate(`/hadiths/${hadithsId}/page/${pageNumber}`);
    setPageInput("");
    setError(null);
  };

  useEffect(() => {
    setHadiths([]);
    setIsLoading(true);
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
      [...Array(response.data.length).keys()].forEach((id) => {
        async function getHadith() {
          let request = await fetch(
            `https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${response.data[id].id}`
          );
          let hadith = await request.json();
          setHadiths((prev) => [...prev, hadith]);
          if (id == response.data.length - 1) {
            setHadiths((prev) => [...prev].sort((a, b) => a.id - b.id));
            setIsLoading(false);
          }
        }
        getHadith();
      });
    }

    getHadithList();
  }, [pageid]);

  useEffect(function () {
    setHeightContainer(containerEl?.current?.offsetHeight);
  });

  useEffect(function () {
    if (location.search) {
      const element = document.getElementById(
        `hadith-${location.search.split("?")[1].replace("hadithid=", "")}`
      );

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  const currentPage = parseInt(pageid);
  const lastPage = parseInt(hadithList.meta?.last_page) || 1;

  const generatePagination = () => {
    const pages = [];
    if (lastPage <= 7) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('dots');
        pages.push(lastPage);
      } else if (currentPage >= lastPage - 3) {
        pages.push(1);
        pages.push('dots');
        for (let i = lastPage - 4; i <= lastPage; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('dots');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('dots');
        pages.push(lastPage);
      }
    }
    return pages;
  };

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
        {/* Enhanced Header */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent mb-4">
              {hadithName}
            </h1>
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full border border-blue-500/20">
                عدد الأحاديث: {totalHadiths}
              </span>
              <span className="bg-purple-500/10 text-purple-400 px-4 py-1 rounded-full border border-purple-500/20">
                الصفحة: {pageid}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Hadiths Grid */}
        <div className="space-y-4 mb-12">
          {hadiths?.map((hadith, index) => (
            <div
              key={hadith.id}
              className="fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Hadith
                hadith={hadith}
                currentPage={pageid}
                allCategories={allCategories}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className="flex justify-center gap-3 flex-wrap">
          <NavLink
            key="prev"
            to={`/hadiths/${hadithsId}/page/${Math.max(1, currentPage - 1)}`}
            className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 
              ${currentPage <= 1
                ? "opacity-50 cursor-not-allowed bg-white/5 text-gray-500"
                : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
            onClick={(e) => currentPage <= 1 && e.preventDefault()}
          >
            السابق
          </NavLink>

          {generatePagination().map((page, index) => {
            if (page === 'dots') {
              return (
                <span
                  key={`dots-${index}`}
                  className="px-4 py-2 text-gray-400"
                >
                  ...
                </span>
              );
            }
            
            return (
              <NavLink
                key={`page-${page}`}
                to={`/hadiths/${hadithsId}/page/${page}`}
                className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 
                  ${currentPage === page
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                  }`}
              >
                {page}
              </NavLink>
            );
          })}

          <NavLink
            key="next"
            to={`/hadiths/${hadithsId}/page/${Math.min(lastPage, currentPage + 1)}`}
            className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 
              ${currentPage >= lastPage
                ? "opacity-50 cursor-not-allowed bg-white/5 text-gray-500"
                : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
            onClick={(e) => currentPage >= lastPage && e.preventDefault()}
          >
            التالي
          </NavLink>
        </div>
      </div>
    </div>
  );
}
