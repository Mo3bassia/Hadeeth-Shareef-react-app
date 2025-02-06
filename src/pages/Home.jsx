import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      title: "تصفح الأحاديث",
      description:
        "استكشف مجموعة واسعة من الأحاديث النبوية الشريفة مصنفة حسب المواضيع",
      icon: "📚",
      color:
        "bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-blue-600/20 text-blue-500",
      animation: "fade-in-right",
    },
    {
      title: "شرح وتفسير",
      description: "شرح مفصل وتفسير دقيق لكل حديث من كتب العلماء المعتمدة",
      icon: "📖",
      color:
        "bg-gradient-to-br from-green-500/20 via-green-400/10 to-green-600/20 text-green-500",
      animation: "fade-in-up",
    },
    {
      title: "معاني الكلمات",
      description: "توضيح معاني الكلمات وشرح المفردات لفهم أعمق للأحاديث",
      icon: "🔍",
      color:
        "bg-gradient-to-br from-purple-500/20 via-purple-400/10 to-purple-600/20 text-purple-500",
      animation: "fade-in-left",
    },
  ];

  const statistics = [
    {
      number: "5300+",
      label: "حديث شريف",
      color: "from-blue-500/20",
      icon: "📚",
    },
    {
      number: "40+",
      label: "كتاب حديث",
      color: "from-green-500/20",
      icon: "📖",
    },
    {
      number: "400+",
      label: "تصنيف فرعي",
      color: "from-yellow-500/20",
      icon: "🗂️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b  relative overflow-hidden backdrop-blur-3xl">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-islamic.png')] opacity-[0.02]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-purple-600/20 to-green-600/20 rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-600/30 to-green-600/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-30">
        <div className="absolute top-20 right-10 w-32 h-32 border border-white/10 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/0 rotate-12 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 border border-white/10 rounded-full backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/0 -rotate-12 animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-white/10 rounded-lg backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/0 rotate-45 animate-float-slow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
        {/* Enhanced Hero Section */}
        <div className="text-center relative mb-20 p-8 rounded-2xl backdrop-blur-md bg-gradient-to-b from-white/5 to-transparent border border-white/10 shadow-2xl shadow-blue-500/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="absolute top-40 left-1/4 w-32 h-32 bg-green-500/10 rounded-full blur-2xl" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400 mb-6  leading-loose relative animate-fade-in">
            موسوعة الحديث الشريف
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-loose animate-fade-in-up">
            اكتشف كنوز السنة النبوية من خلال مجموعة شاملة من الأحاديث الشريفة مع
            الشرح والتفسير
          </p>
          <Link
            to="/hadiths"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-xl hover:scale-105 transition-all duration-300 group gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 animate-fade-in-up"
          >
            ابدأ التصفح
            <span className="inline-block transition-transform group-hover:translate-x-1 rtl:rotate-180">
              ←
            </span>
          </Link>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16 sm:mt-20 lg:mt-24 relative">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group backdrop-blur-md bg-gradient-to-b from-white/5 via-transparent to-white/5 border border-white/10 rounded-2xl p-8 
                hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10
                ${feature.animation}`}
            >
              <div className="">
                <span className="text-3xl filter drop-shadow-lg">
                  {feature.icon}
                </span>
              </div>
              <div
                className={`${feature.color} rounded-xl p-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 pb-2 shadow-lg`}
              >
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 mt-20">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className={`backdrop-blur-md bg-gradient-to-br ${stat.color} to-transparent border border-white/10 rounded-xl p-6 
                text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg group`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* New Section: Key Features */}
        <div className="mt-24 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-gray-300 bg-clip-text text-transparent mb-4">
              مميزات الموسوعة
            </h2>
            <p className="text-gray-400">كل ما تحتاجه في مكان واحد</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "تخريج دقيق للأحاديث",
                description:
                  "توثيق كامل لمصادر الأحاديث وتخريجها من كتب السنة المعتمدة",
                icon: "⚡",
                color: "from-blue-600/20",
              },
              {
                title: "شرح مفصل",
                description: "شرح واف للأحاديث من كتب شروح الحديث المعتمدة",
                icon: "📝",
                color: "from-green-600/20",
              },
              {
                title: "درجة الحديث",
                description: "بيان درجة الحديث من حيث الصحة والضعف",
                icon: "⭐",
                color: "from-yellow-600/20",
              },
              {
                title: "معاني المفردات",
                description: "توضيح معاني الكلمات الغريبة في الحديث",
                icon: "📖",
                color: "from-purple-600/20",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`backdrop-blur-md bg-gradient-to-br ${feature.color} to-transparent p-6 rounded-xl border border-white/10 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Quote Section */}
        <div className="mt-20 relative">
          <blockquote className="backdrop-blur-lg bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/islamic-pattern.png')] opacity-[0.02]"></div>
            <div className="absolute -top-10 right-10 text-8xl text-blue-500/20 font-traditional transform hover:scale-110 transition-transform">
              ٭
            </div>
            <p className="relative z-10 text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-gray-400 leading-relaxed font-Alexandria">
              مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ
              بِهِ طَرِيقًا إِلَى الْجَنَّةِ
            </p>
            <div className="absolute -bottom-10 left-10 text-8xl text-blue-500/20 font-traditional rotate-180 transform hover:scale-110 transition-transform">
              ٭
            </div>
            <div className="mt-6 text-gray-400">رواه مسلم</div>
          </blockquote>
        </div>

        {/* Enhanced Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">
          {[
            { number: "1000+", label: "حديث شريف", color: "from-blue-500/20" },
            { number: "500+", label: "تفسير وشرح", color: "from-green-500/20" },
            { number: "100+", label: "تصنيف", color: "from-purple-500/20" },
            {
              number: "24/7",
              label: "متاح دائماً",
              color: "from-yellow-500/20",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`backdrop-blur-md bg-gradient-to-br ${stat.color} to-transparent border border-white/10 rounded-xl p-6 
                text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg group`}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
