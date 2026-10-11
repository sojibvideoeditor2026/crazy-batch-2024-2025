import React from 'react';
import confetti from 'canvas-confetti';
import { Compass, Sparkles, Flame, Coffee, HeartHandshake, ShieldCheck } from 'lucide-react';
import { playSound } from '../utils/sound';

export const HeroSection: React.FC = () => {
  const handleFunClick = () => {
    playSound('boing');
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 bg-funky-dots border-b-4 border-slate-900">
      {/* Playful Floating Stickers */}
      <div className="absolute top-6 left-4 sm:left-12 text-3xl sm:text-4xl animate-float-slow select-none pointer-events-none opacity-80">
        🚌
      </div>
      <div className="absolute top-12 right-6 sm:right-16 text-3xl sm:text-4xl animate-wiggle select-none pointer-events-none opacity-80">
        🌴
      </div>
      <div className="absolute bottom-6 left-8 sm:left-24 text-3xl sm:text-4xl animate-bounce select-none pointer-events-none opacity-70">
        ☕
      </div>
      <div className="absolute bottom-10 right-8 sm:right-28 text-3xl sm:text-4xl animate-float-slow select-none pointer-events-none opacity-75">
        🤪
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* College Logo & Name */}
        <div className="mb-6 flex flex-col items-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white p-1.5 border-4 border-slate-900 shadow-comic-lg mb-3 overflow-hidden hover:scale-105 transition-transform duration-300">
            <img
              src={`${import.meta.env.BASE_URL}college-logo.png`}
              alt="টঙ্গী সরকারি কলেজ, গাজীপুর"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            টঙ্গী সরকারি কলেজ, গাজীপুর
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 font-sans tracking-wide">
            Tongi Govt. College, Gazipur
          </p>
        </div>

        {/* Department Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500 border-2 border-slate-900 text-white font-bold text-xs sm:text-sm shadow-comic mb-6 hover:scale-105 transition-transform cursor-pointer">
          <span className="text-base">🕌</span>
          <span>ইসলামের ইতিহাস ও সংস্কৃতি বিভাগ</span>
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
        </div>

        {/* Big Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-tight">
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-red-500 to-rose-600 drop-shadow-sm">
              পাগলা ব্যাস
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-4 sm:h-6 bg-amber-300 -z-0 rotate-1 rounded-sm"></span>
          </span>
          <span className="block mt-2 sm:mt-3 text-3xl sm:text-5xl md:text-6xl text-slate-900">
            ২০২৪–২০২৫ 🎓
          </span>
        </h1>

        {/* Funny Taglines */}
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-2xl font-bold text-slate-800 leading-relaxed bg-white/80 backdrop-blur-xs py-3 px-6 rounded-2xl border-2 border-slate-900 shadow-comic">
          &ldquo;পড়াশোনায় মন নাই, কিন্তু ট্যুরে সবার আগে ভাই!&rdquo; 🚌💨
          <span className="block text-xs sm:text-sm font-semibold text-rose-600 mt-1">
            (ক্লাসে উপস্থিতি ০%, তবে ট্যুরে ১০০% হাজিরা কনফার্ম!)
          </span>
        </p>

        {/* Interactive Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#friends"
            onClick={() => playSound('pop')}
            className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 border-3 border-slate-900 text-slate-950 font-black text-sm sm:text-base shadow-comic-lg hover:shadow-comic transition-all active:translate-y-1 flex items-center gap-2"
          >
            <span>পাগলামির গ্যাং দেখো 🤪</span>
          </a>

          <a
            href="#explore-bangladesh"
            onClick={() => playSound('pop')}
            className="px-6 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 border-3 border-slate-900 text-slate-950 font-black text-sm sm:text-base shadow-comic-lg hover:shadow-comic transition-all active:translate-y-1 flex items-center gap-2"
          >
            <Compass className="w-5 h-5" />
            <span>বাংলাদেশ ঘুরে দেখি 🇧🇩</span>
          </a>

          <button
            onClick={handleFunClick}
            className="px-5 py-3.5 rounded-2xl bg-rose-400 hover:bg-rose-300 border-3 border-slate-900 text-slate-950 font-black text-sm sm:text-base shadow-comic-lg hover:shadow-comic transition-all active:translate-y-1 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200 fill-amber-300" />
            <span>জয় পাগলা ব্যাস! 💥</span>
          </button>
        </div>

        {/* Funny Neo-Brutalist Badges / Live Batch Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="p-3.5 bg-yellow-200/90 rounded-2xl border-2 border-slate-900 shadow-comic flex flex-col items-center">
            <span className="text-2xl mb-1">😴</span>
            <span className="text-xs text-slate-700 font-bold">ক্লাসে ঘুম লেভেল</span>
            <span className="text-base sm:text-lg font-black text-slate-900">প্রো ম্যাক্স ১০০%</span>
          </div>

          <div className="p-3.5 bg-sky-200/90 rounded-2xl border-2 border-slate-900 shadow-comic flex flex-col items-center">
            <span className="text-2xl mb-1">🚌</span>
            <span className="text-xs text-slate-700 font-bold">ট্যুরের আকাঙ্ক্ষা</span>
            <span className="text-base sm:text-lg font-black text-slate-900">৯৯৯+ ট্রিপ</span>
          </div>

          <div className="p-3.5 bg-orange-200/90 rounded-2xl border-2 border-slate-900 shadow-comic flex flex-col items-center">
            <span className="text-2xl mb-1">☕</span>
            <span className="text-xs text-slate-700 font-bold">টং দোকানের চা</span>
            <span className="text-base sm:text-lg font-black text-slate-900">আনলিমিটেড কাপ</span>
          </div>

          <div className="p-3.5 bg-pink-200/90 rounded-2xl border-2 border-slate-900 shadow-comic flex flex-col items-center">
            <span className="text-2xl mb-1">❤️</span>
            <span className="text-xs text-slate-700 font-bold">ব্যাচের বন্ডিং</span>
            <span className="text-base sm:text-lg font-black text-slate-900">আমৃত্যু খাটি</span>
          </div>
        </div>
      </div>
    </section>
  );
};
