import React, { useState } from 'react';
import { Sparkles, UserPlus, X } from 'lucide-react';
import { Friend } from '../data/friends';
import { playSound } from '../utils/sound';

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFriend: (friend: Friend) => void;
}

export const AddFriendModal: React.FC<AddFriendModalProps> = ({
  isOpen,
  onClose,
  onAddFriend,
}) => {
  const [name, setName] = useState('');
  const [banglaName, setBanglaName] = useState('');
  const [role, setRole] = useState('পাগলা মেম্বার 🤪');
  const [funnyLine, setFunnyLine] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [badgeEmoji, setBadgeEmoji] = useState('🌟');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newFriend: Friend = {
      id: 'friend-' + Date.now(),
      name: name.trim(),
      banglaName: banglaName.trim() || name.trim(),
      role: role.trim() || 'পাগলা মেম্বার 🤪',
      funnyLine: funnyLine.trim() || 'ইনি নতুন যোগ দিয়েছেন, কিন্তু পাগলামিতে কারও চেয়ে কম যান না!',
      photoUrl: photoUrl.trim() || `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(name)}`,
      badgeEmoji: badgeEmoji || '🌟',
      cardColor: 'from-amber-100 to-yellow-100 border-yellow-300',
      tags: ['নতুন পাগল', 'ব্যাচমেট'],
      likes: 1,
    };

    onAddFriend(newFriend);
    playSound('cheer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl border-4 border-slate-900 shadow-comic-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center shadow-comic">
              <UserPlus className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                নতুন বন্ধু যোগ করুন
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                পাগলা গ্যাং-এ আরেকজন খাটি পাগলকে স্বাগতম জানাই!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                বন্ধুর নাম (English) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: Tanvir Ahmed"
                className="w-full text-sm px-3 py-2 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                বাংলা নাম
              </label>
              <input
                type="text"
                value={banglaName}
                onChange={(e) => setBanglaName(e.target.value)}
                placeholder="যেমন: তানভীর আহমেদ"
                className="w-full text-sm px-3 py-2 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                মজার খেতাব বা পদবি
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="যেমন: ফুচকা খোর গ্যাং লিডার 🥟"
                className="w-full text-sm px-3 py-2 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ব্যাজ ইমোজি
              </label>
              <div className="flex gap-2">
                {['🤪', '🕶️', '☕', '🍗', '🎒', '🎸', '👑'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setBadgeEmoji(emoji)}
                    className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center text-lg ${
                      badgeEmoji === emoji ? 'border-amber-500 bg-amber-100 scale-110' : 'border-slate-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              মজার বাংলা ক্যাপশন / ডায়লগ *
            </label>
            <textarea
              required
              rows={2}
              value={funnyLine}
              onChange={(e) => setFunnyLine(e.target.value)}
              placeholder="যেমন: ক্লাসে স্যার ঢোকার সাথে সাথে বাথরুমে যাওয়ার তীব্র প্রয়োজন অনুভব করে!"
              className="w-full text-sm px-3 py-2 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ছবির লিংক (URL) অথবা খালি রাখুন
            </label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://... (খালি রাখলে কিউট কার্টুন অবতার পাবে)"
              className="w-full text-sm px-3 py-2 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 font-sans"
            />
          </div>

          <div className="pt-3 border-t-2 border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 border-2 border-slate-900 shadow-comic font-black text-xs text-slate-950 flex items-center gap-1.5 active:translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              গ্যাং-এ যুক্ত করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
