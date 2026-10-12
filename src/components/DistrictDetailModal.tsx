import React from 'react';
import { X, MapPin, Calendar, Compass, Utensils, Plane, Check, Users, Sparkles } from 'lucide-react';
import { District } from '../data/districts';
import { playSound } from '../utils/sound';

interface DistrictDetailModalProps {
  district: District | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export const DistrictDetailModal: React.FC<DistrictDetailModalProps> = ({
  district,
  onClose,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!district) return null;

  const ethnic = district.ethnicGroupInfo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border-4 border-slate-900 shadow-comic-lg max-w-xl w-full p-5 sm:p-7 relative max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b-2 border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 font-extrabold text-xs mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{district.division} বিভাগ</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {district.name}{' '}
              <span className="text-sm sm:text-base font-bold text-slate-500 font-sans">
                ({district.nameEn})
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Short Description */}
        <p className="mt-3.5 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
          {district.shortDesc}
        </p>

        {/* Detailed Sections */}
        <div className="mt-5 space-y-4">
          {/* Top Sights */}
          <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-200">
            <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
              <Compass className="w-4 h-4 text-amber-700" />
              দেখার মতো প্রধান জায়গা
            </h4>
            <div className="flex flex-wrap gap-2">
              {district.spots.map((spot, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white border border-amber-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl shadow-2xs"
                >
                  📍 {spot}
                </span>
              ))}
            </div>
          </div>

          {/* Ethnic Community / Culture Section */}
          {ethnic && (
            ethnic.hasEthnicCommunity && ethnic.communityNames.length > 0 ? (
              <div className="p-4 bg-emerald-50/90 rounded-2xl border-2 border-emerald-300 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-700" />
                    ক্ষুদ্র নৃগোষ্ঠী ও ঐতিহ্যবাহী সংস্কৃতি 🌿
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900 text-[10px] font-black">
                    {ethnic.communityNames.length}টি সম্প্রদায়
                  </span>
                </div>

                {/* Community Tags */}
                <div>
                  <span className="text-[11px] font-bold text-emerald-900 block mb-1.5">
                    বসবাসকারী ক্ষুদ্র নৃগোষ্ঠী:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ethnic.communityNames.map((community, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white border border-emerald-300 text-emerald-950 text-xs font-black rounded-lg shadow-2xs"
                      >
                        🌱 {community}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cultural Note */}
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed bg-white/70 p-2.5 rounded-xl border border-emerald-200">
                  {ethnic.cultureNote}
                </p>

                {/* Festivals if present */}
                {ethnic.festivals && ethnic.festivals.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-emerald-900 block mb-1">
                      🎋 প্রধান উৎসব:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ethnic.festivals.map((fest, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-md"
                        >
                          ✨ {fest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Traditional Crafts if present */}
                {ethnic.traditionalCrafts && (
                  <div className="text-xs text-emerald-950">
                    <strong className="text-emerald-900">🧵 পোশাক ও হস্তশিল্প: </strong>
                    <span className="font-medium">{ethnic.traditionalCrafts}</span>
                  </div>
                )}
              </div>
            ) : (
              /* Cultural note for districts without ethnic groups */
              <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-300 space-y-1.5">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  ঐতিহ্য ও লোকসংস্কৃতি 🏛️
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {ethnic.cultureNote}
                </p>
              </div>
            )
          )}

          {/* Best Time */}
          <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-200">
            <h4 className="text-xs font-black text-sky-950 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Calendar className="w-4 h-4 text-sky-700" />
              ঘোরার সেরা সময়
            </h4>
            <p className="text-sm font-bold text-slate-800">
              {district.bestTime}
            </p>
          </div>

          {/* How to Reach */}
          <div className="p-4 bg-indigo-50 rounded-2xl border-2 border-indigo-200">
            <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Plane className="w-4 h-4 text-indigo-700" />
              কীভাবে যাবেন
            </h4>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {district.howToReach}
            </p>
          </div>

          {/* Famous Food */}
          <div className="p-4 bg-rose-50 rounded-2xl border-2 border-rose-200">
            <h4 className="text-xs font-black text-rose-950 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Utensils className="w-4 h-4 text-rose-700" />
              বিখ্যাত খাবার ও কী খাবেন
            </h4>
            <p className="text-sm font-bold text-rose-950">
              {district.famousFood}
            </p>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="mt-6 pt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
          >
            বন্ধ করুন
          </button>

          <button
            type="button"
            onClick={() => {
              playSound(isWishlisted ? 'pop' : 'cheer');
              onToggleWishlist(district.id);
            }}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl border-2 border-slate-900 text-xs font-black flex items-center justify-center gap-2 shadow-comic transition-all active:translate-y-0.5 ${
              isWishlisted
                ? 'bg-emerald-400 text-slate-950'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
            }`}
          >
            {isWishlisted ? (
              <>
                <Check className="w-4 h-4" />
                <span>ট্রিপ লিস্টে যুক্ত আছে</span>
              </>
            ) : (
              <>
                <Plane className="w-4 h-4" />
                <span>আমাদের ট্রিপ লিস্টে যোগ করো ✈️</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
