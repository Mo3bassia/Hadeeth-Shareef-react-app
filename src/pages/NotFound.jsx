import React from 'react';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '../icons/ArrowRightIcon';

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden backdrop-blur-3xl flex items-center justify-center">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-islamic.png')] opacity-[0.02]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-purple-600/20 to-green-600/20 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center">
          {/* Error Code */}
          <h1 className="text-8xl opacity-0 md:text-9xl font-bold bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent mb-8 animate-fade-in">
            404
          </h1>
          
          {/* Message */}
          <h2 className="text-2xl opacity-0 md:text-3xl font-bold text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            عذراً، الصفحة غير موجودة
          </h2>
          <p className="opacity-0 text-gray-400 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها
          </p>

          {/* Action Button */}
          <Link
            to="/"
            className="opacity-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl backdrop-blur-md bg-white/5 
              border border-white/10 text-gray-300 hover:bg-white/10 transition-all duration-300
              group hover:border-blue-500/20 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
