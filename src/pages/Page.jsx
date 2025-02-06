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

  return (
    <>
      {isLoading ? (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 z-[9999]">
          <Loader />
        </div>
      ) : (
        <div className={`min-h-screen`} ref={containerEl}>
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
              {[...hadiths.sort((a, b) => a.id - b.id)]?.map((hadith) => {
                return (
                  <Hadith
                    id={`hadith-${hadith.id}`}
                    hadith={hadith}
                    key={hadith.id}
                    allCategories={allCategories}
                    hadithsId={hadithsId}
                    pageid={pageid}
                  />
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center gap-6 mt-8">
              {/* Page Input */}
              <div className="flex items-center gap-3 bg-[#1E293B] p-3 rounded-xl border border-gray-800">
                <span className="text-gray-400 text-sm">انتقال إلى</span>
                <form
                  onSubmit={handlePageSubmit}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={pageInput}
                      onChange={handlePageInputChange}
                      placeholder="رقم الصفحة"
                      className={`w-24 h-9 bg-[#2D3B4F] text-gray-300 rounded-lg px-3 focus:outline-none border ${
                        error ? "border-red-500" : "border-gray-700"
                      } text-center placeholder:text-gray-500 text-sm`}
                      min="1"
                      max={hadithList.meta?.last_page}
                    />
                    <button
                      type="submit"
                      className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none min-h-0 h-9"
                    >
                      انتقال
                    </button>
                  </div>
                  {error && (
                    <span className="text-red-500 text-xs mt-1">{error}</span>
                  )}
                </form>
              </div>

              {/* Pagination Buttons */}
              <div className="join flex-wrap justify-center items-center gap-2">
                {/* Previous Button */}
                <NavLink
                  to={`/hadiths/${hadithsId}/page/${parseInt(pageid) - 1}`}
                  className={`join-item btn bg-[#1E293B] text-gray-300 hover:bg-[#2D3B4F] border-gray-800 ${
                    parseInt(pageid) <= 1 ? "btn-disabled" : ""
                  }`}
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </NavLink>

                {/* Page Numbers */}
                {(() => {
                  const lastPage = hadithList.meta?.last_page;
                  const currentPage = parseInt(pageid);
                  let pages = [];

                  if (lastPage <= 9) {
                    // إذا كان عدد الصفحات 9 أو أقل، اعرض كل الأرقام
                    pages = Array.from({ length: lastPage }, (_, i) => i + 1);
                  } else {
                    // إذا كان العدد أكبر من 9، اعرض النظام المطلوب
                    if (currentPage <= 4) {
                      // في بداية الصفحات
                      pages = [1, 2, 3, 4, 5, null, lastPage - 1, lastPage];
                    } else if (currentPage >= lastPage - 3) {
                      // في نهاية الصفحات
                      pages = [
                        1,
                        2,
                        null,
                        lastPage - 4,
                        lastPage - 3,
                        lastPage - 2,
                        lastPage - 1,
                        lastPage,
                      ];
                    } else {
                      // في المنتصف
                      pages = [
                        1,
                        2,
                        null,
                        currentPage - 1,
                        currentPage,
                        currentPage + 1,
                        null,
                        lastPage - 1,
                        lastPage,
                      ];
                    }
                  }

                  return pages.map((page, index) => {
                    if (page === null) {
                      return (
                        <button
                          key={`dots-${index}`}
                          className="join-item btn btn-disabled bg-[#1E293B] text-gray-500 border-gray-800"
                        >
                          ...
                        </button>
                      );
                    }
                    return (
                      <NavLink
                        to={`/hadiths/${hadithsId}/page/${page}`}
                        className={`join-item btn bg-[#1E293B] text-gray-300 hover:bg-[#2D3B4F] border-gray-800 ${
                          currentPage === page ? "btn-active" : ""
                        }`}
                        key={page}
                      >
                        {page}
                      </NavLink>
                    );
                  });
                })()}

                {/* Next Button */}
                <NavLink
                  to={`/hadiths/${hadithsId}/page/${parseInt(pageid) + 1}`}
                  className={`join-item btn bg-[#1E293B] text-gray-300 hover:bg-[#2D3B4F] border-gray-800 ${
                    parseInt(pageid) >= hadithList.meta?.last_page
                      ? "btn-disabled"
                      : ""
                  }`}
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
