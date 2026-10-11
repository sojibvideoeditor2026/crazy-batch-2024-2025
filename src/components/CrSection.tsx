import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Crown, Sparkles, Award, Camera, Heart, CheckCircle2, Shield } from 'lucide-react';
import { CR_DATA, CRInfo } from '../data/friends';
import { playSound } from '../utils/sound';
import { PhotoUploadModal } from './PhotoUploadModal';
import { safeSetItem, safeGetItem } from '../utils/storage';

export const CrSection: React.FC = () => {
  const [crData, setCrData] = useState<CRInfo>(() => {
    const saved = safeGetItem('pagla_batch_cr_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return CR_DATA;
      }
    }
    return CR_DATA;
  });

  const [imgSrc, setImgSrc] = useState<string>(
    crData.photoUrl || `${import.meta.env.BASE_URL}photos/aporupa-mondol.jpg`
  );
  const [imgError, setImgError] = useState(false);

  // Sync if crData changes
  React.useEffect(() => {
    setImgSrc(crData.photoUrl || `${import.meta.env.BASE_URL}photos/aporupa-mondol.jpg`);
    setImgError(false);
  }, [crData.photoUrl]);

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [respectCount, setRespectCount] = useState<number>(() => {
    const saved = safeGetItem('pagla_batch_cr_respect');
    return saved ? parseInt(saved, 10) : 99;
  });
  const [hasSaluted, setHasSaluted] = useState(false);

  const handleSavePhoto = (newPhotoUrl: string) => {
    const updated = { ...crData, photoUrl: newPhotoUrl };
    setCrData(updated);
    safeSetItem('pagla_batch_cr_data', JSON.stringify(updated));
  };

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
          <div className="absolute -top-1 -right-1 bg-rose-500 text-white font-black text-xs sm:text-sm px-6 py-1.5 rounded-bl-2xl border-l-3 border-b-3 border-slate-900 shadow-comic flex items-center gap-1">
            <Award className="w-4 h-4 text-amber-200" />
            <span>অফিশিয়াল সিআর ২০২৪-২৫</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photo Column */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl border-4 border-slate-900 overflow-hidden shadow-comic bg-gradient-to-br from-amber-200 to-yellow-300 flex items-center justify-center">
                  {!imgError ? (
                    <img
                      src={imgSrc}
                      alt={crData.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => {
                        setImgError(true);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 font-black p-4 text-center select-none">
                      <span className="text-5xl sm:text-6xl font-extrabold tracking-wider drop-shadow-sm">
                        AM
                      </span>
                      <span className="mt-1 text-xs font-black bg-slate-900 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-200">
                        Aporupa Mondol
                      </span>
                    </div>
                  )}
                </div>

                {/* Crown overlay */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-400 rounded-2xl border-2 border-slate-900 flex items-center justify-center text-2xl shadow-comic animate-bounce">
                  👑
                </div>

                {/* Change photo button */}
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="absolute bottom-2 right-2 bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xl border-2 border-white shadow-comic text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
                  title="সিআর এর ছবি পরিবর্তন করুন"
                >
                  <Camera className="w-4 h-4 text-amber-300" />
                  <span className="text-[11px]">ছবি বদলান</span>
                </button>
              </div>

              {/* ID Badge Card */}
              <div className="mt-4 bg-white px-4 py-2 rounded-2xl border-2 border-slate-900 shadow-comic text-center w-full">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block">
                  স্টুডেন্ট আইডি
                </span>
                <span className="text-sm font-black text-rose-600 font-mono">
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

              {/* Exact Prompt Requirement Highlight:
                  "Write a short funny caption under her ID: she is always first in every task and the Principal sir's right hand."
              */}
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

      {/* Photo Upload Modal for CR */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        personName={crData.name}
        currentPhoto={crData.photoUrl}
        onSavePhoto={handleSavePhoto}
      />
    </section>
  );
};
