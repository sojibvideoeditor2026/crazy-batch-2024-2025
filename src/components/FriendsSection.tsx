import React, { useState, useEffect } from 'react';
import { Camera, Search, UserPlus, Heart, Laugh, Coffee, RotateCcw, Sparkles } from 'lucide-react';
import { Friend, INITIAL_FRIENDS } from '../data/friends';
import { PhotoUploadModal } from './PhotoUploadModal';
import { playSound } from '../utils/sound';

interface FriendsSectionProps {
  onOpenAddFriend: () => void;
  friendsList: Friend[];
  onUpdatePhoto: (id: string, newPhoto: string) => void;
  onUpdateLikes: (id: string) => void;
  onResetDefault: () => void;
}

// Helper component for Friend card photo with multi-extension sequential fallback (.jpg -> .jpeg -> .png -> .webp -> initials placeholder)
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

const FriendCardPhoto: React.FC<{
  friend: Friend;
  isGolden?: boolean;
}> = ({ friend, isGolden }) => {
  // If friend has an explicit custom URL (like blob:, data:, or external), try it directly
  // Otherwise build candidate URLs from slug or photoUrl
  const slug = friend.slug;
  const baseUrl = import.meta.env.BASE_URL;

  // Build the list of fallback image sources
  const candidateUrls = React.useMemo(() => {
    // If user uploaded a custom image (e.g. data: or blob:), prioritize that URL
    if (friend.photoUrl && (friend.photoUrl.startsWith('data:') || friend.photoUrl.startsWith('blob:'))) {
      return [friend.photoUrl];
    }

    if (slug) {
      const urls: string[] = [];
      EXTENSIONS.forEach((ext) => urls.push(`${baseUrl}photos/${slug}${ext}`));
      EXTENSIONS.forEach((ext) => urls.push(`${baseUrl}${slug}${ext}`));
      return urls;
    }

    if (friend.photoUrl) {
      // If photoUrl has a known extension, try replacing or trying the full extension list
      const matched = friend.photoUrl.match(/^(.*)\.(jpg|jpeg|png|webp)$/i);
      if (matched) {
        const basePath = matched[1];
        return EXTENSIONS.map((ext) => `${basePath}${ext}`);
      }
      return [friend.photoUrl];
    }

    return [];
  }, [slug, friend.photoUrl, baseUrl]);

  const [attemptIndex, setAttemptIndex] = useState(0);

  // Reset when candidate URLs change (e.g. friend or photo update)
  useEffect(() => {
    setAttemptIndex(0);
  }, [candidateUrls]);

  const currentSrc = attemptIndex < candidateUrls.length ? candidateUrls[attemptIndex] : null;

  const handleImageError = () => {
    // Move to next candidate extension (.jpg -> .jpeg -> .png -> .webp)
    setAttemptIndex((prev) => prev + 1);
  };

  // Extract clean 2-letter initials
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(friend.name);

  return (
    <div
      className={`w-32 h-32 rounded-2xl overflow-hidden shadow-comic group-hover:scale-105 transition-transform duration-200 flex items-center justify-center ${
        isGolden
          ? 'border-4 border-slate-900 bg-amber-200 ring-2 ring-amber-400'
          : 'border-3 border-slate-900 bg-slate-900'
      }`}
    >
      {currentSrc ? (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={friend.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div
          className={`w-full h-full flex flex-col items-center justify-center p-2 select-none text-center ${
            isGolden
              ? 'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-black'
              : 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white font-black'
          }`}
        >
          <span
            className={`text-3xl sm:text-4xl font-black tracking-widest ${
              isGolden ? 'text-slate-950 drop-shadow-xs' : 'text-amber-400'
            }`}
          >
            {initials}
          </span>
          <span
            className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full line-clamp-1 border ${
              isGolden
                ? 'bg-slate-950 text-amber-300 border-amber-300/40'
                : 'bg-slate-800 text-amber-200 border-slate-700'
            }`}
          >
            {friend.banglaName || friend.name}
          </span>
        </div>
      )}
    </div>
  );
};

export const FriendsSection: React.FC<FriendsSectionProps> = ({
  onOpenAddFriend,
  friendsList,
  onUpdatePhoto,
  onUpdateLikes,
  onResetDefault,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('সবাই');
  const [activePhotoFriend, setActivePhotoFriend] = useState<Friend | null>(null);

  // Filter friends based on query and tag
  const filteredFriends = friendsList.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.banglaName.includes(searchQuery) ||
      f.role.includes(searchQuery) ||
      f.funnyLine.includes(searchQuery);

    const matchesTag =
      selectedTag === 'সবাই' ||
      f.tags.some((t) => t.includes(selectedTag)) ||
      (selectedTag === 'ট্যুর' && (f.role.includes('ট্যুর') || f.funnyLine.includes('ট্যুর'))) ||
      (selectedTag === 'চা' && (f.role.includes('চা') || f.tags.includes('চা খোর'))) ||
      (selectedTag === 'ব্যাকবেঞ্চার' && (f.role.includes('ব্যাকবেঞ্চ') || f.tags.includes('ব্যাকবেঞ্চার')));

    return matchesSearch && matchesTag;
  });

  return (
    <section id="friends" className="py-14 sm:py-20 bg-amber-100/50 border-b-4 border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500 border-2 border-slate-900 text-white font-black text-xs uppercase shadow-comic mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            পাগলা গ্যাং ডিরেক্টরি
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            আমাদের আজব <span className="text-amber-600 underline decoration-slate-900">বন্ধু বাহিনী</span> 🤪
          </h2>
          <p className="mt-3 text-slate-700 font-bold text-sm sm:text-base">
            {friendsList.length} জন অদ্বিতীয় রত্ন! প্রত্যেকের পাগলামি নিজ গুণে খাঁটি ও অতুলনীয়।
          </p>
        </div>

        {/* Search, Filter & Action Bar */}
        <div className="bg-white rounded-3xl border-3 border-slate-900 p-4 sm:p-5 shadow-comic-lg mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="নাম বা খেতাব দিয়ে খুঁজুন..."
                className="w-full pl-10 pr-4 py-2 text-sm border-2 border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 font-sans"
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

            {/* Buttons: Add Friend + Reset */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onOpenAddFriend}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 border-2 border-slate-900 text-slate-950 font-black text-xs shadow-comic active:translate-y-0.5 flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>নতুন বন্ধু যোগ করুন</span>
              </button>

              <button
                type="button"
                onClick={onResetDefault}
                title="মূল তালিকায় ফিরুন"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Filter Categories */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-slate-100 text-xs font-bold">
            <span className="text-slate-500 mr-1">ফিল্টার:</span>
            {[
              { id: 'সবাই', label: `সবাই (${friendsList.length})` },
              { id: 'ট্যুর', label: 'ট্যুর পাগল 🚌' },
              { id: 'চা', label: 'চা খোর গ্যাং ☕' },
              { id: 'ব্যাকবেঞ্চার', label: 'ব্যাকবেঞ্চার 🎙️' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedTag(cat.id);
                  playSound('pop');
                }}
                className={`px-3 py-1 rounded-xl transition-all border ${
                  selectedTag === cat.id
                    ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-comic font-black'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Friend Cards Grid */}
        {filteredFriends.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border-3 border-dashed border-slate-300">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-lg font-black text-slate-800">কোনো বন্ধু খুঁজে পাওয়া যায়নি!</p>
            <p className="text-xs text-slate-500 mt-1">ভিন্ন নাম দিয়ে অনুসন্ধান করুন অথবা নতুন বন্ধু যোগ করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFriends.map((friend) => {
              const isGolden = !!friend.isGolden;
              return (
                <div
                  key={friend.id}
                  className={`${
                    isGolden
                      ? 'bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-200 border-4 border-amber-500 shadow-comic-lg ring-4 ring-amber-300/80 hover:-translate-y-2'
                      : 'bg-white border-3 border-slate-900 shadow-comic hover:-translate-y-1.5'
                  } rounded-3xl transition-all flex flex-col justify-between overflow-hidden group relative`}
                >
                  {/* Golden Top Ribbon */}
                  {isGolden && (
                    <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 text-[11px] font-black uppercase text-center py-1.5 border-b-2 border-slate-900 flex items-center justify-center gap-1 tracking-wide shadow-xs">
                      <span>👑</span>
                      <span>ওয়েবসাইট মেকার ও বিশেষ মেম্বার</span>
                      <span>✨</span>
                    </div>
                  )}

                  {/* Card Top: Photo & Badges */}
                  <div className="p-4 sm:p-5 pb-0 flex flex-col items-center">
                    <div className="relative mb-3">
                      <FriendCardPhoto friend={friend} isGolden={isGolden} />

                      {/* Emoji badge */}
                      <div
                        className={`absolute -top-2.5 -right-2.5 w-8 h-8 rounded-xl border-2 border-slate-900 flex items-center justify-center text-base shadow-comic ${
                          isGolden ? 'bg-amber-400 animate-bounce' : 'bg-amber-300'
                        }`}
                      >
                        {friend.badgeEmoji}
                      </div>

                      {/* Photo upload/URL trigger */}
                      <button
                        type="button"
                        onClick={() => {
                          playSound('pop');
                          setActivePhotoFriend(friend);
                        }}
                        className="absolute -bottom-2 -right-2 bg-slate-900 hover:bg-slate-800 text-white p-1.5 rounded-xl border-2 border-white shadow-comic text-xs flex items-center gap-1 active:scale-95 transition-transform"
                        title="ছবি আপলোড বা লিংক পরিবর্তন করুন"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-300" />
                        <span className="text-[10px] font-bold">ছবি</span>
                      </button>
                    </div>

                    {/* Name & Titles */}
                    <div className="text-center w-full">
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 line-clamp-1">
                        {friend.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-600">
                        ({friend.banglaName})
                      </p>

                      {/* Role Title */}
                      <div
                        className={`mt-2 inline-block px-2.5 py-1 rounded-xl text-xs font-extrabold ${
                          isGolden
                            ? 'bg-amber-400 text-slate-950 border-2 border-slate-900 shadow-xs'
                            : 'bg-amber-100 border border-amber-300 text-amber-900'
                        }`}
                      >
                        {friend.role}
                      </div>

                      {/* Subtitle / Bio (e.g. for Sojib Rana) */}
                      {friend.subtitle && (
                        <p className="mt-1.5 text-[11px] font-black text-amber-900 bg-white/90 border border-amber-400 rounded-lg px-2 py-0.5 inline-block shadow-2xs">
                          {friend.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Funny Bangla Punchline Box */}
                  <div className="p-4 sm:p-5 pt-3 flex-1 flex flex-col justify-between">
                    <div
                      className={`p-3 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed italic text-center ${
                        isGolden
                          ? 'bg-white/90 border-2 border-amber-400 text-slate-900 font-bold shadow-xs'
                          : 'bg-amber-50 border-2 border-amber-200/80 text-slate-800'
                      }`}
                    >
                      &ldquo;{friend.funnyLine}&rdquo;
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 justify-center mt-3">
                      {friend.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                            isGolden
                              ? 'bg-amber-200/80 text-slate-900 border-amber-400 font-black'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Reaction / Like Button */}
                    <div className="mt-4 pt-3 border-t-2 border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          playSound('boing');
                          onUpdateLikes(friend.id);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-colors active:scale-95 ${
                          isGolden
                            ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-900 shadow-xs'
                            : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                        }`}
                      >
                        <Laugh className={`w-4 h-4 ${isGolden ? 'text-slate-950' : 'text-rose-500'}`} />
                        <span>{isGolden ? 'স্যালুট/হাহা' : 'হাহা'} {friend.likes || 0}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playSound('pop');
                          setActivePhotoFriend(friend);
                        }}
                        className="text-[11px] font-bold text-amber-700 hover:text-amber-900 underline"
                      >
                        ছবি পরিবর্তন
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Photo Upload Modal for selected friend */}
      {activePhotoFriend && (
        <PhotoUploadModal
          isOpen={!!activePhotoFriend}
          onClose={() => setActivePhotoFriend(null)}
          personName={activePhotoFriend.name}
          currentPhoto={activePhotoFriend.photoUrl}
          onSavePhoto={(newUrl) => onUpdatePhoto(activePhotoFriend.id, newUrl)}
        />
      )}
    </section>
  );
};
