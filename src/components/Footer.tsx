import React from 'react';
import { Heart, ArrowUp, Sparkles, Smile, Globe, ExternalLink } from 'lucide-react';
import { playSound } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playSound('pop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white border-t-4 border-slate-950 py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* College Official Info Card */}
        <div className="bg-slate-800/90 rounded-2xl border-2 border-slate-700 p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border-2 border-amber-400 shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}college-logo.png`}
                alt="টঙ্গী সরকারি কলেজ"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-white">
                টঙ্গী সরকারি কলেজ, গাজীপুর
              </h4>
              <p className="text-xs text-slate-300 font-medium">
                Tongi Govt. College, Gazipur | ইসলামের ইতিহাস ও সংস্কৃতি বিভাগ
              </p>
            </div>
          </div>

          <a
            href="https://tgco.edu.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-black text-xs flex items-center gap-1.5 transition-colors shadow-sm shrink-0"
          >
            <Globe className="w-4 h-4" />
            <span>অফিসিয়াল ওয়েবসাইট</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Brand info */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-3xl">🤪</span>
              <span className="text-2xl font-black text-amber-400 font-sans">
                Crazy Batch ২০২৪-২০২৫
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              টঙ্গী সরকারি কলেজ | ইসলামের ইতিহাস ও সংস্কৃতি বিভাগ | ক্যাম্পাস ও ট্যুরের অন্তহীন আনন্দ
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
          © ২০২৪–২০২৫ Crazy Batch | সর্বস্বত্ব ট্যুর ও আড্ডায় সংরক্ষিত 🚌✨
        </div>
      </div>
    </footer>
  );
};
