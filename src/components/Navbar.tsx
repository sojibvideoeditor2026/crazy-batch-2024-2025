import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, UserPlus } from 'lucide-react';
import { playSound, toggleMute, getMuteState } from '../utils/sound';

interface NavbarProps {
  onOpenAddFriend: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAddFriend }) => {
  const [isMuted, setIsMuted] = useState(getMuteState());

  const handleMuteToggle = () => {
    const muted = toggleMute();
    setIsMuted(muted);
    if (!muted) {
      playSound('pop');
    }
  };

  const triggerConfetti = () => {
    playSound('cheer');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.15 },
      colors: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-amber-400 border-b-4 border-slate-900 shadow-sm select-none">
      {/* উপরের সারি: লোগো + পাগলা ব্যাস ২৪-২৫ (বামে) এবং একশনে তিনটি বাটন (ডানে) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* লোগো ও টাইটেল (এক লাইনে, কোনো লাইন ব্রেক নেই) */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl sm:rounded-2xl border-2 border-slate-900 flex items-center justify-center text-xl sm:text-2xl shadow-comic group-hover:rotate-6 transition-transform shrink-0">
              🤪
            </div>
            <img
              src={`${import.meta.env.BASE_URL}college-logo.png`}
              alt="টঙ্গী সরকারি কলেজ"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-contain p-0.5 border-2 border-slate-900 shadow-2xs shrink-0 bg-white"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight whitespace-nowrap">
                  পাগলা ব্যাস
                </span>
                <span className="bg-slate-900 text-amber-300 text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider whitespace-nowrap">
                  ২৪-২৫
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-800 -mt-0.5 flex items-center gap-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse shrink-0"></span>
                <span className="font-extrabold text-slate-900 whitespace-nowrap">টঙ্গী সরকারি কলেজ, গাজীপুর</span>
              </p>
            </div>
          </a>

          {/* ডানের তিনটি বাটন (পাগলামি, সাউন্ড, বন্ধু যোগ) - ছোট ও এক লাইনে */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* পাগলামি বাটন */}
            <button
              onClick={triggerConfetti}
              title="আনন্দ উৎসব"
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-white hover:bg-amber-100 border-2 border-slate-900 text-slate-900 text-xs font-black shadow-comic active:translate-y-0.5 transition-transform whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">পাগলামি 🎉</span>
              <span className="sm:hidden whitespace-nowrap">🎉</span>
            </button>

            {/* সাউন্ড সুইচ */}
            <button
              onClick={handleMuteToggle}
              className={`p-1.5 sm:p-2 rounded-xl border-2 border-slate-900 shadow-comic transition-all active:translate-y-0.5 ${
                isMuted
                  ? 'bg-slate-200 text-slate-600'
                  : 'bg-emerald-400 text-slate-950 font-bold'
              }`}
              title={isMuted ? 'সাউন্ড চালু করুন' : 'সাউন্ড বন্ধ করুন'}
              aria-label="সাউন্ড সুইচ"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
            </button>

            {/* বন্ধু যোগ বাটন (মোবাইলে শুধু আইকন, বড় স্ক্রিনে লেখা সহ) */}
            <button
              onClick={() => {
                playSound('pop');
                onOpenAddFriend();
              }}
              title="নতুন বন্ধু যোগ করুন"
              className="px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border-2 border-slate-900 text-xs font-black flex items-center gap-1 shadow-comic active:translate-y-0.5 transition-transform whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">বন্ধু যোগ</span>
            </button>
          </div>
        </div>
      </div>

      {/* নিচের সারি: হলুদ ব্যাকগ্রাউন্ডে মেনুর আলাদা একটি সারি, আড়াআড়ি স্ক্রলযোগ্য, স্ক্রলবার লুকানো */}
      <div className="bg-amber-300/80 border-t-2 border-slate-900/30">
        <div className="max-w-7xl mx-auto px-2 sm:px-6">
          <nav className="flex items-center gap-1 sm:gap-2 py-1.5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-xs sm:text-[13px] font-black text-slate-900">
            <a
              href="#about"
              className="px-2.5 py-1 rounded-lg hover:bg-white text-slate-900 transition-colors whitespace-nowrap shrink-0 active:scale-95"
            >
              আমাদের কথা
            </a>
            <a
              href="#teachers"
              className="px-2.5 py-1 rounded-lg hover:bg-white text-indigo-950 font-black transition-colors whitespace-nowrap shrink-0 active:scale-95"
            >
              প্রিয় স্যার
            </a>
            <a
              href="#cr"
              className="px-2.5 py-1 rounded-lg hover:bg-white text-rose-950 font-black transition-colors whitespace-nowrap shrink-0 active:scale-95"
            >
              সিআর জোন
            </a>
            <a
              href="#friends"
              className="px-2.5 py-1 rounded-lg hover:bg-white text-slate-900 transition-colors whitespace-nowrap shrink-0 active:scale-95"
            >
              বন্ধু বাহিনী
            </a>
            <a
              href="#female-friends"
              className="px-2.5 py-1 rounded-lg hover:bg-white text-slate-900 transition-colors whitespace-nowrap shrink-0 active:scale-95"
            >
              বান্ধবী বাহিনী
            </a>
            <a
              href="#gallery"
              className="px-2.5 py-1 rounded-lg hover:bg-white text-purple-950 font-black transition-colors whitespace-nowrap shrink-0 active:scale-95 flex items-center gap-1 bg-purple-100/60"
            >
              <span>ফটো গ্যালারি 📸</span>
            </a>
            <a
              href="#islamic-spain"
              className="px-2.5 py-1 rounded-lg hover:bg-white text-amber-950 font-black transition-colors whitespace-nowrap shrink-0 active:scale-95 flex items-center gap-1"
            >
              <span>স্পেন ও ইতিহাস 🕌</span>
            </a>
            <a
              href="#prophet-seerah"
              className="px-2.5 py-1 rounded-lg hover:bg-white text-emerald-950 font-black transition-colors whitespace-nowrap shrink-0 active:scale-95 flex items-center gap-1 bg-emerald-100/50"
            >
              <span>নবীজির জীবনী ﷺ 🕌</span>
            </a>
            <a
              href="#ict-guide"
              className="px-2.5 py-1 rounded-lg hover:bg-white text-sky-950 font-black transition-colors whitespace-nowrap shrink-0 active:scale-95 flex items-center gap-1"
            >
              <span>আইসিটি ভয় দূর 💻</span>
            </a>
            <a
              href="#explore-bangladesh"
              className="px-2.5 py-1 rounded-lg hover:bg-white text-emerald-950 font-black transition-colors whitespace-nowrap shrink-0 active:scale-95"
            >
              ঘুরে দেখি
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
