import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Crown, Sparkles, Award, CheckCircle2 } from 'lucide-react';
import { CR_DATA } from '../data/friends';
import { playSound } from '../utils/sound';
import { safeSetItem, safeGetItem } from '../utils/storage';

const CR_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

export const CrSection: React.FC = () => {
  const crData = CR_DATA;

  // Attempt sequentially: .jpg -> .jpeg -> .png -> .webp
  const candidatePhotos = useMemo(() => {
    const baseUrl = import.meta.env.BASE_URL;
    return CR_EXTENSIONS.map((ext) => `${baseUrl}photos/aporupa-mondol${ext}`);
  }, []);

  const [attemptIndex, setAttemptIndex] = useState(0);

  const currentCrPhoto = attemptIndex < candidatePhotos.length ? candidatePhotos[attemptIndex] : null;

  const [respectCount, setRespectCount] = useState<number>(() => {
    const saved = safeGetItem('pagla_batch_cr_respect');
    return saved ? parseInt(saved, 10) : 99;
  });
  const [hasSaluted, setHasSaluted] = useState(false);

  const handleSalute = () => {
    playSound('cheer');
    const newCount = respectCount + 1;
    setRespectCount(newCount);
    setHasSaluted(true);
    safeSetItem('pagla_batch_cr_respect', newCount.toString());

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#f59e0b', '#ec4899', '#3b82f6', '#10b981'],
    });
  };

  return (
    <section id="cr" className="py-14 sm:py-20 bg-amber-50 relative border-b-4 border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 border-2 border-slate-900 text-slate-950 font-black text-xs uppercase shadow-comic mb-3 animate-wiggle">
            <Crown className="w-4 h-4 text-amber-900" />
            ব্যাচের মধ্যমণি ও কান্ডারি
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            আমাদের সুপ্রিম সিআর জোন 👑
          </h2>
          <p className="mt-2 text-slate-600 font-bold text-sm sm:text-base">
            যাঁর একটিমাত্র কথায় পুরো ব্যাস সাইজ থাকে এবং স্যারেরাও আস্থায় রাখেন!
          </p>
        </div>

        {/* Highlighted VIP Card for CR Aporupa Mondol */}
        <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 rounded-3xl border-4 border-slate-900 p-6 sm:p-10 shadow-comic-lg relative overflow-hidden ring-4 ring-amber-300/60">
          {/* Top VIP ribbon */}
          <div className="absolute -top-1 -right-1 bg-rose-500 text-white font-black text-xs sm:text-sm px-6 py-1.5 rounded-bl-2xl border-l-3 border-b-3 border-slate-900 shadow-comic flex items-center gap-1 z-20">
            <Award className="w-4 h-4 text-amber-200" />
            <span>অফিশিয়াল সিআর ২০২৪-২৫</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-10">
            {/* Photo Column - Large Photo with Golden Border & Rich Shadow */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative group">
                {/* Golden Border Frame */}
                <div className="p-2 sm:p-2.5 bg-gradient-to-tr from-amber-500 via-amber-200 to-yellow-400 rounded-3xl sm:rounded-[2rem] shadow-2xl shadow-amber-900/30 ring-4 ring-amber-400/50 border-2 border-amber-600/50">
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-[1.3rem] sm:rounded-[1.6rem] overflow-hidden border-2 border-slate-900 bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300 flex items-center justify-center">
                    {currentCrPhoto ? (
                      <img
                        key={currentCrPhoto}
                        src={currentCrPhoto}
                        alt={crData.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        onError={() => {
                          setAttemptIndex((prev) => prev + 1);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black p-6 text-center select-none shadow-inner">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-900/10 border-2 border-amber-600/30 flex items-center justify-center shadow-inner mb-2">
                          <span className="text-5xl sm:text-6xl font-extrabold tracking-wider drop-shadow-sm font-serif">
                            AM
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm font-black bg-slate-900 text-amber-300 px-3 py-1 rounded-full border border-amber-200 shadow-xs">
                          {crData.name}
                        </span>
                        <span className="text-[11px] font-bold text-amber-950 mt-1">
                          {crData.banglaName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating Crown overlay */}
                <div className="absolute -top-3.5 -left-3.5 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-300 via-yellow-300 to-amber-500 rounded-2xl border-2 border-slate-900 flex items-center justify-center text-2xl sm:text-3xl shadow-comic animate-bounce z-10">
                  👑
                </div>

                {/* Sparkling VIP Badge */}
                <div className="absolute -bottom-2.5 -right-2.5 bg-slate-900 text-amber-300 px-3 py-1 rounded-xl border-2 border-amber-300 font-black text-[11px] sm:text-xs shadow-comic flex items-center gap-1 z-10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>কমান্ডার</span>
                </div>
              </div>

              {/* ID Badge Card */}
              <div className="mt-5 bg-white px-5 py-2.5 rounded-2xl border-2 border-slate-900 shadow-comic text-center w-full max-w-[240px]">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block">
                  স্টুডেন্ট আইডি
                </span>
                <span className="text-sm font-black text-rose-600 font-mono tracking-wide">
                  {crData.idNumber}
                </span>
              </div>
            </div>

            {/* Info Column */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <div className="inline-block px-3 py-1 bg-amber-300 border-2 border-slate-900 rounded-xl text-xs font-black text-slate-900 mb-2">
                  {crData.title}
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
                  {crData.name}
                </h3>
                <p className="text-lg font-bold text-amber-800">
                  ({crData.banglaName})
                </p>
              </div>

              {/* Highlight Caption */}
              <div className="p-4 bg-amber-200/80 rounded-2xl border-3 border-slate-900 shadow-comic">
                <p className="text-base sm:text-lg font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
                  <span>✨</span>
                  <span>{crData.caption}</span>
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1.5 leading-relaxed">
                  (She is always first in every task and the Principal sir's right hand! ক্লাসের পড়া থেকে নোটিশ—সবখানে তিনিই সেরা!)
                </p>
              </div>

              <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                {crData.details}
              </p>

              {/* Stats badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {crData.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-2.5 rounded-xl border-2 border-slate-900 text-center shadow-xs"
                  >
                    <span className="block text-[11px] font-bold text-slate-500">
                      {stat.label}
                    </span>
                    <span className="block text-xs sm:text-sm font-black text-slate-900 mt-0.5">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive Salute / Respect Button */}
              <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  type="button"
                  onClick={handleSalute}
                  className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 border-3 border-slate-900 text-slate-950 font-black text-sm shadow-comic active:translate-y-1 transition-transform flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-lg">🫡</span>
                  <span>সিআরকে স্যালুট জানাও ({respectCount})</span>
                </button>

                {hasSaluted && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-400 px-3 py-1.5 rounded-xl flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    স্যালুট গৃহীত হয়েছে!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
