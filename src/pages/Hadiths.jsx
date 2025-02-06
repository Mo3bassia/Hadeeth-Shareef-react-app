import React, { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import FolderIcon from "../icons/FolderIcon.jsx";
import ArrowRightIcon from "../icons/ArrowRightIcon.jsx";
import { Link } from "react-router-dom";

export default function Hadith() {
  let [hadithList, setHadithList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getHadithList() {
      // let request = await fetch(
      //   "https://hadeethenc.com/api/v1/categories/list/?language=ar"
      // );
      let request = await fetch(
        "https://hadeethenc.com/api/v1/categories/roots/?language=ar"
      );
      let response = await request.json();
      setHadithList(response);
      setIsLoading(false);
    }

    getHadithList();
  }, []);

  return (
    <>
      <div className="mt-20">
        <h2 className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold">
          موسوعة الأحاديث النبوية
        </h2>
        <p className="text-center text-sm md:text-base lg:text-lg xl:text-xl mt-4 text-slate-400 mb-10">
          تصفح الأحاديث حسب التصنيف واستكشف كنوز السنة النبوية
        </p>
      </div>
      <div>
        {isLoading ? (
          <div className="fixed top-1/2 left-1/2  -translate-x-1/2 z-[9999]">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hadithList?.map((hadith) => {
              return (
                <Link
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 dark:border-gray-700 p-6 hover:scale-[1.03]"
                  key={hadith.id}
                  to={`/hadiths/${hadith.id}/page/1`}
                >
                  <div className="flex gap-3 md:gap-4 lg:gap-5 flex-row items-center">
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
                      <FolderIcon />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h2 className="card-title">{hadith.title}</h2>
                        <ArrowRightIcon className={"w-5 h-5"} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
