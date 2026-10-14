import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { FemaleFriend, DEFAULT_FEMALE_AVATAR } from '../data/femaleFriends';

interface FemaleFriendsSectionProps {
  femaleFriendsList: FemaleFriend[];
}

export const FemaleFriendsSection: React.FC<FemaleFriendsSectionProps> = ({
  femaleFriendsList,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = femaleFriendsList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.quote.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="female-friends" className="py-16 sm:py-24 bg-slate-950 text-white border-b-4 border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-200 font-semibold text-xs tracking-wider uppercase mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            ইসলামের ইতিহাস ও সংস্কৃতি
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            বান্ধবী বাহিনী 👩‍🎓
          </h2>
          <p className="mt-3 text-zinc-400 font-medium text-sm sm:text-base">
            আমাদের ব্যাচের সম্মানিত সহপাঠী ও বান্ধবীগণ ({femaleFriendsList.length} জন)
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="নাম বা ব্যাজ দিয়ে খুঁজুন..."
              className="w-full bg-zinc-900 text-white placeholder-zinc-500 pl-11 pr-4 py-3 text-sm rounded-2xl border-2 border-zinc-800 focus:outline-none focus:border-amber-400/50 transition-colors shadow-inner font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500 hover:text-zinc-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Grid of Dignified Black Cards with Gold Accents */}
        {filteredList.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/50 rounded-3xl border border-zinc-800">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-base font-bold text-zinc-300">কোনো নাম খুঁজে পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filteredList.map((friend) => (
              <div
                key={friend.id}
                className="bg-gradient-to-b from-zinc-900/90 to-black rounded-2xl border border-zinc-800/90 hover:border-amber-400/50 p-4 transition-all duration-300 flex flex-col items-center group shadow-md hover:shadow-amber-500/5 hover:-translate-y-1 relative"
              >
                {/* Photo Placeholder & Avatar Frame */}
                <div className="relative mb-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-zinc-800 group-hover:border-amber-400/40 transition-colors flex items-center justify-center shadow-inner">
                    <img
                      src={DEFAULT_FEMALE_AVATAR}
                      alt={friend.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback initials if static image fails
                        const initials = friend.name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || '👧';
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-zinc-800 text-amber-200 font-bold text-xl select-none">${initials}</div>`;
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Golden Name */}
                <div className="text-center w-full px-1 flex-1 flex flex-col items-center">
                  <h3 className="text-sm sm:text-base font-bold text-amber-200 group-hover:text-amber-300 tracking-wide line-clamp-2 leading-snug transition-colors">
                    {friend.name}
                  </h3>

                  {/* Badge */}
                  <div className="mt-1.5 flex justify-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-900 border border-amber-500/20 text-amber-300/95 shadow-sm">
                      {friend.badge}
                    </span>
                  </div>

                  {/* Poetic & Dignified Line */}
                  <div className="mt-2.5 pt-2 border-t border-zinc-800/80 w-full text-center">
                    <p className="text-[12px] sm:text-[13px] text-zinc-300 font-normal leading-relaxed italic">
                      "{friend.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
