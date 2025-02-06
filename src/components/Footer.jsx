import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-gradient-to-t from-gray-900/90 to-transparent border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* عن الموقع */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">عن الموقع</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              موسوعة للأحاديث النبوية الشريفة تضم مجموعة كبيرة من الأحاديث
              المصنفة مع الشرح والتفسير ومعاني الكلمات
            </p>
          </div>

          {/* أقسام الموقع */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">أقسام الموقع</h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "الرئيسية", icon: "🏠" },
                { to: "/hadiths", label: "الأحاديث", icon: "📚" },
                { to: "/saved", label: "المحفوظات", icon: "🔖" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* روابط التواصل */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">تواصل معنا</h3>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/mo3bassia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 
                  hover:border-blue-500/20 transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/mo3bassia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 
                  hover:border-blue-500/20 transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="/logo-white-and-blue.png"
            className="h-12"
            alt="حديث شريف"
          />
          <p className="text-gray-400 text-sm">
            تم التطوير بواسطة{" "}
            <a
              href="https://github.com/mohamedabassia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Mohamed Abassia
            </a>
          </p>
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
