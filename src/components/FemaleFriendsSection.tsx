import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { FemaleFriend, DEFAULT_FEMALE_AVATAR } from '../data/femaleFriends';

interface FemaleFriendsSectionProps {
  femaleFriendsList: FemaleFriend[];
}

export const FemaleFriendsSection: React.FC<FemaleFriendsSectionProps> = ({
  femaleFriendsList,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = femaleFriendsList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="female-friends" className="py-16 sm:py-24 bg-slate-950 text-white border-b-4 border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 font-semibold text-xs tracking-wider uppercase mb-3 shadow-md">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            ইসলামের ইতিহাস ও সংস্কৃতি
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            বান্ধবী বাহিনী 👩‍🎓
          </h2>
          <p className="mt-3 text-zinc-400 font-medium text-sm sm:text-base">
            আমাদের ব্যাসের সম্মানিত সহপাঠী ও বান্ধবীগণ ({femaleFriendsList.length} জন)
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
              placeholder="নাম দিয়ে খুঁজুন..."
              className="w-full bg-zinc-900 text-white placeholder-zinc-500 pl-11 pr-4 py-3 text-sm rounded-2xl border-2 border-zinc-800 focus:outline-none focus:border-zinc-500 transition-colors shadow-inner font-sans"
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

        {/* Grid of Clean Black Cards */}
        {filteredList.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/50 rounded-3xl border border-zinc-800">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-base font-bold text-zinc-300">কোনো নাম খুঁজে পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredList.map((friend) => (
              <div
                key={friend.id}
                className="bg-black/90 hover:bg-black rounded-2xl border-2 border-zinc-800 hover:border-zinc-600 p-4 transition-all duration-300 flex flex-col items-center group shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                {/* Photo Placeholder & Avatar Frame */}
                <div className="relative mb-3.5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-zinc-700 group-hover:border-zinc-500 transition-colors flex items-center justify-center">
                    <img
                      src={DEFAULT_FEMALE_AVATAR}
                      alt={friend.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback initials if static image fails
                        const initials = friend.name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || '👧';
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-200 font-bold text-xl select-none">${initials}</div>`;
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Name Only (White text, pure & clean) */}
                <div className="text-center w-full px-1">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide line-clamp-2 leading-snug group-hover:text-zinc-100 transition-colors">
                    {friend.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
