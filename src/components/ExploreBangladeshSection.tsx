import React, { useState } from 'react';
import { Search, MapPin, Calendar, Compass, Plane, Check, Sparkles, Bookmark } from 'lucide-react';
import { DISTRICTS_DATA, District, DIVISIONS } from '../data/districts';
import { DistrictDetailModal } from './DistrictDetailModal';
import { playSound } from '../utils/sound';
import { safeGetItem, safeSetItem } from '../utils/storage';

export const ExploreBangladeshSection: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<string>('সব জেলা');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [showOnlyWishlist, setShowOnlyWishlist] = useState<boolean>(false);

  // Saved Wishlist districts (persisted safely in localStorage)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = safeGetItem('pagla_batch_trip_wishlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return [];
      }
    }
    return ['coxs-bazar', 'sylhet', 'bandarban']; // Default favorite starting ideas
  });

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      safeSetItem('pagla_batch_trip_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  // Filter districts
  const filteredDistricts = DISTRICTS_DATA.filter((district) => {
    const matchesDivision =
      selectedDivision === 'সব জেলা' || district.division === selectedDivision;

    const matchesSearch =
      district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      district.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      district.spots.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesWishlist = !showOnlyWishlist || wishlist.includes(district.id);

    return matchesDivision && matchesSearch && matchesWishlist;
  });

  return (
    <section id="explore-bangladesh" className="py-16 sm:py-24 bg-amber-50/80 border-b-4 border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500 border-2 border-slate-900 text-white font-black text-xs uppercase shadow-comic mb-3 animate-pulse-pop">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>৬৪ জেলার ভ্রমণ গাইড ও ট্রিপ প্ল্যানার</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
            বাংলাদেশ ঘুরে দেখি 🇧🇩
          </h2>
          <p className="mt-3 text-slate-700 font-bold text-sm sm:text-base leading-relaxed">
            পাগলা ব্যাসের পরবর্তী ট্যুর কোথায় হবে? আটটি বিভাগের ৬৪টি জেলার সেরা জায়গাগুলো দেখুন এবং ট্রিপ লিস্টে যুক্ত করুন!
          </p>
        </div>

        {/* Search & Wishlist Toolbar */}
        <div className="bg-white rounded-3xl border-3 border-slate-900 p-4 sm:p-6 shadow-comic-lg mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="জেলার নাম বা দর্শনীয় স্থান লিখে খুঁজুন..."
                className="w-full pl-11 pr-4 py-2.5 text-sm border-2 border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Wishlist Filter Button */}
            <button
              type="button"
              onClick={() => {
                playSound('pop');
                setShowOnlyWishlist(!showOnlyWishlist);
              }}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border-2 border-slate-900 text-xs font-black flex items-center justify-center gap-2 shadow-comic transition-all active:translate-y-0.5 ${
                showOnlyWishlist
                  ? 'bg-rose-500 text-white'
                  : 'bg-amber-300 hover:bg-amber-400 text-slate-950'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${showOnlyWishlist ? 'fill-white' : ''}`} />
              <span>আমাদের ট্রিপ লিস্ট ({wishlist.length})</span>
            </button>
          </div>

          {/* Division Filter Tabs */}
          <div className="pt-3 border-t-2 border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-slate-500 mr-1">বিভাগ:</span>
            {DIVISIONS.map((division) => (
              <button
                key={division}
                type="button"
                onClick={() => {
                  setSelectedDivision(division);
                  setShowOnlyWishlist(false);
                  playSound('pop');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border ${
                  selectedDivision === division && !showOnlyWishlist
                    ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-comic scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                }`}
              >
                {division}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="mb-6 flex items-center justify-between text-xs font-bold text-slate-600 px-2">
          <span>মোট পাওয়া গেছে: <strong className="text-slate-900">{filteredDistricts.length}টি জেলা</strong></span>
          {showOnlyWishlist && (
            <span className="text-rose-600 font-black">★ শুধু বন্ধুদের পছন্দের ট্রিপ লিস্ট দেখানো হচ্ছে</span>
          )}
        </div>

        {/* Districts Grid */}
        {filteredDistricts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-3 border-dashed border-slate-300">
            <p className="text-4xl mb-2">🗺️</p>
            <p className="text-lg font-black text-slate-800">কোনো জেলা খুঁজে পাওয়া যায়নি!</p>
            <p className="text-xs text-slate-500 mt-1">অনুসন্ধান বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDistricts.map((district) => {
              const isWishlisted = wishlist.includes(district.id);

              return (
                <div
                  key={district.id}
                  className={`bg-white rounded-3xl border-3 transition-all flex flex-col justify-between overflow-hidden shadow-comic hover:-translate-y-1.5 hover:shadow-comic-lg ${
                    isWishlisted ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-900'
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                          {district.name}
                        </h3>
                        <p className="text-xs font-bold text-slate-500 font-sans">
                          {district.nameEn}
                        </p>
                      </div>

                      <span className="px-2.5 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-black rounded-lg whitespace-nowrap">
                        {district.division}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-2 line-clamp-2">
                      {district.shortDesc}
                    </p>

                    {/* Sights */}
                    <div className="mt-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                        দেখার মতো জায়গা:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {district.spots.map((spot, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            📍 {spot}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Best Time */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="text-[11px] text-slate-500">সেরা সময়:</span>
                      <span className="text-[11px] font-extrabold text-slate-800">{district.bestTime}</span>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 pt-3 border-t-2 border-slate-100 bg-slate-50/60 flex items-center gap-2">
                    {/* View Details Button */}
                    <button
                      type="button"
                      onClick={() => {
                        playSound('pop');
                        setSelectedDistrict(district);
                      }}
                      className="flex-1 py-2 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-300 text-slate-800 text-xs font-black transition-colors"
                    >
                      বিস্তারিত দেখুন 🔍
                    </button>

                    {/* Add to Trip List Button */}
                    <button
                      type="button"
                      onClick={() => {
                        playSound(isWishlisted ? 'pop' : 'cheer');
                        toggleWishlist(district.id);
                      }}
                      title={isWishlisted ? 'ট্রিপ লিস্ট থেকে সরান' : 'আমাদের ট্রিপ লিস্টে যোগ করুন'}
                      className={`px-3 py-2 rounded-xl border-2 border-slate-900 text-xs font-black transition-all active:scale-95 flex items-center gap-1 ${
                        isWishlisted
                          ? 'bg-emerald-400 text-slate-950 shadow-xs'
                          : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xs'
                      }`}
                    >
                      {isWishlisted ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span className="text-[11px]">যোগ করা আছে</span>
                        </>
                      ) : (
                        <>
                          <Plane className="w-3.5 h-3.5" />
                          <span className="text-[11px]">লিস্টে যোগ ✈️</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* District Detail Modal */}
      <DistrictDetailModal
        district={selectedDistrict}
        onClose={() => setSelectedDistrict(null)}
        isWishlisted={selectedDistrict ? wishlist.includes(selectedDistrict.id) : false}
        onToggleWishlist={toggleWishlist}
      />
    </section>
  );
};
