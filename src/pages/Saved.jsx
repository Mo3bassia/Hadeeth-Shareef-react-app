import React from "react";
import Hadith from "../components/Hadith";
import Loader from "../components/Loader";

export default function Saved({
  savedHadiths,
  setSavedHadiths,
  allCategories,
}) {
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
              الأحاديث المحفوظة
            </h1>
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full border border-blue-500/20">
                عدد الأحاديث المحفوظة: {savedHadiths.length}
              </span>
            </div>
          </div>
        </div>

        {/* Saved Hadiths Grid */}
        {savedHadiths.length === 0 ? (
          <div className="text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-400 text-lg">لا توجد أحاديث محفوظة</p>
            <p className="text-gray-500 text-sm mt-2">
              يمكنك حفظ الأحاديث من خلال الضغط على أيقونة الحفظ
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedHadiths.map((hadith, index) => {
              console.log(hadith);
              return (
                <div
                  key={hadith.id}
                  className="fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Hadith
                    hadith={hadith}
                    allCategories={allCategories}
                    hadithsId={hadith.hadithsId}
                    pageid={hadith.pageid}
                    id={hadith.idHTML}
                    savedHadiths={savedHadiths}
                    setSavedHadiths={setSavedHadiths}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
