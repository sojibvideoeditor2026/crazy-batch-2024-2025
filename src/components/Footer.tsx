import React from 'react';
import { Heart, ArrowUp, Sparkles, Smile } from 'lucide-react';
import { playSound } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playSound('pop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white border-t-4 border-slate-950 py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Brand info */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-3xl">🤪</span>
              <span className="text-2xl font-black text-amber-400">
                পাগলা ব্যাস ২০২৪-২০২৫
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              ইসলামের ইতিহাস ও সংস্কৃতি বিভাগ | ক্যাম্পাস ও ট্যুরের অন্তহীন আনন্দ
            </p>
          </div>

          {/* Quick jump to top */}
          <button
            onClick={scrollToTop}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl border-2 border-white shadow-comic font-black text-xs flex items-center gap-2 active:translate-y-0.5 transition-all"
          >
            <span>উপরে চলুন</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400 text-center sm:text-left">
          {/* Required Credit: "Made by Sojib Rana" */}
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-200">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline animate-pulse" />
            <span>and পাগলামি by</span>
            <span className="text-amber-400 font-black text-base underline decoration-rose-500 decoration-wavy">
              Sojib Rana
            </span>
          </div>

          <div className="text-[11px] text-slate-400 max-w-md">
            ⚠️ দ্রষ্টব্য: এই ওয়েবসাইটের সব মজার ডায়লগ ও ক্যাপশন আমাদের পারস্পরিক ভালোবাসার প্রকাশ। কোনো অফেন্স নেওয়ার সুযোগ নেই! 😂
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-slate-400">
          © ২০২৪–২০২৫ পাগলা ব্যাস | সর্বস্বত্ব ট্যুর ও আড্ডায় সংরক্ষিত 🚌✨
        </div>
      </div>
    </footer>
  );
};
