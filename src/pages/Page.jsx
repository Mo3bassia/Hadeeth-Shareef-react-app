import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Hadith from "../components/Hadith";
import Loader from "../components/Loader";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

export default function Page({ allCategories, savedHadiths, setSavedHadiths }) {
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

  const renderPaginationButtons = () => {
    const currentPage = parseInt(pageid);
    const lastPage = hadithList.meta?.last_page || 1;
    const paginationItems = [];

    // Previous Button
    paginationItems.push(
      <NavLink
        key="prev"
        to={
          currentPage > 1
            ? `/hadiths/${hadithsId}/page/${currentPage - 1}`
            : "#"
        }
        className="px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
        onClick={(e) => currentPage <= 1 && e.preventDefault()}
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </NavLink>
    );

    // Always show first page
    paginationItems.push(
      <NavLink
        key="page-1"
        to={`/hadiths/${hadithsId}/page/1`}
        className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 
          ${
            currentPage === 1
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
              : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
          }`}
      >
        1
      </NavLink>
    );

    if (lastPage <= 7) {
      // Show all pages if 7 or less
      for (let i = 2; i <= lastPage; i++) {
        paginationItems.push(
          <NavLink
            key={`page-${i}`}
            to={`/hadiths/${hadithsId}/page/${i}`}
            className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 
              ${
                currentPage === i
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
          >
            {i}
          </NavLink>
        );
      }
    } else {
      // Show dots and nearby pages
      if (currentPage > 3) {
        paginationItems.push(
          <span key="dots-1" className="px-4 py-2 text-gray-400">
            ...
          </span>
        );
      }

      // Show nearby pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(lastPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        paginationItems.push(
          <NavLink
            key={`page-${i}`}
            to={`/hadiths/${hadithsId}/page/${i}`}
            className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 
              ${
                currentPage === i
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
          >
            {i}
          </NavLink>
        );
      }

      if (currentPage < lastPage - 2) {
        paginationItems.push(
          <span key="dots-2" className="px-4 py-2 text-gray-400">
            ...
          </span>
        );
      }

      // Always show last page
      if (lastPage > 1) {
        paginationItems.push(
          <NavLink
            key={`page-${lastPage}`}
            to={`/hadiths/${hadithsId}/page/${lastPage}`}
            className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 
              ${
                currentPage === lastPage
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
          >
            {lastPage}
          </NavLink>
        );
      }
    }

    // Next Button
    paginationItems.push(
      <NavLink
        key="next"
        to={
          currentPage < lastPage
            ? `/hadiths/${hadithsId}/page/${currentPage + 1}`
            : "#"
        }
        className="px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
        onClick={(e) => currentPage >= lastPage && e.preventDefault()}
      >
        <ArrowRightIcon className="w-5 h-5" />
      </NavLink>
    );

    return paginationItems;
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
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/hadiths"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/5 
              border border-white/10 text-gray-300 hover:bg-white/10 transition-all duration-300
              group hover:border-blue-500/20"
          >
            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>العودة للقائمة الرئيسية</span>
          </Link>
        </div>

        {isLoading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <Loader />
            <p className="text-gray-400 animate-pulse">
              جاري تحميل الأحاديث...
            </p>
          </div>
        ) : (
          <>
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
                    hadithsId={hadithsId}
                    pageid={pageid}
                    id={`hadith-${hadith.id}`}
                    savedHadiths={savedHadiths}
                    setSavedHadiths={setSavedHadiths}
                  />
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            <div className="flex justify-center items-center gap-3 flex-wrap">
              {renderPaginationButtons()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
