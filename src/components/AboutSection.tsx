import React from 'react';
import { Compass, Sparkles, Heart, Quote, PartyPopper, MapPin } from 'lucide-react';
import { playSound } from '../utils/sound';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-amber-100/70 border-b-4 border-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500 border-2 border-slate-900 text-white font-black text-xs uppercase shadow-comic mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            ইতিহাসের আসল ইতিহাস
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            কেন আমাদের নাম <span className="text-rose-600 underline decoration-amber-400 decoration-wavy">"পাগলা ব্যাস"</span>?
          </h2>
          <p className="mt-3 text-slate-700 font-bold text-base sm:text-lg">
            যেখানে ক্লাসের গম্ভীর লেকচারও আমাদের হাসাহাসিতে কমেডি শো হয়ে যায়!
          </p>
        </div>

        {/* The Core Story Box */}
        <div className="bg-white rounded-3xl border-4 border-slate-900 p-6 sm:p-10 shadow-comic-lg relative overflow-hidden mb-12">
          <div className="absolute top-4 right-4 text-5xl opacity-20 pointer-events-none select-none">
            📜
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-amber-300 border-3 border-slate-900 flex-shrink-0 flex items-center justify-center text-5xl sm:text-6xl shadow-comic">
              👨‍🏫
            </div>

            <div className="space-y-4 text-slate-800">
              <div className="inline-flex items-center gap-2 bg-yellow-200 border-2 border-slate-900 px-3 py-1 rounded-xl text-xs sm:text-sm font-black text-slate-900">
                <Quote className="w-4 h-4 text-rose-600 fill-rose-500 inline" />
                স্যারের স্বরচিত উপাধি!
              </div>

              <p className="text-lg sm:text-xl font-bold leading-relaxed">
                আমাদের শ্রদ্ধেয় স্যার আদর করে ভালোবেসে আমাদের নাম দিয়েছেন{' '}
                <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-lg font-black border border-rose-300">
                  "পাগলা ব্যাস"
                </span>{' '}
                কারণ আমরা সাধারণ মানের পাগল না—একদম এক্সট্রা লেভেলের খাঁটি পাগল! 🤪
              </p>

              <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
                ক্লাসে পড়া ধরার সময় কারো মুখে রা নেই, কিন্তু যখনই ট্যুরের কথা ওঠে—তখন পুরো ক্লাস এক মুহূর্তের মধ্যে পর্যটন মন্ত্রণালয় হয়ে যায়!
                আমাদের সবচেয়ে বড় গুণ হলো, আমরা আমাদের প্রিয় স্যারদের সাথে একটার পর একটা অসাধারণ জায়গায় ঘুরে বেড়াতে অসম্ভব ভালোবাসি।
                ইতিমধ্যে বহু জায়গায় ঘুরে ফেলেছি এবং <strong>সামনে আরও দুর্দান্ত সব ট্যুর লোড হচ্ছে! 🚌💨</strong>
              </p>
            </div>
          </div>
        </div>

        {/* 3 Playful Cards Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => playSound('pop')}
            className="bg-emerald-100/90 rounded-3xl border-3 border-slate-900 p-6 shadow-comic hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-400 border-2 border-slate-900 flex items-center justify-center text-2xl shadow-comic mb-4">
              🚌
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              স্যারদের সাথে মেগা ভ্রমণ 🌴
            </h3>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed">
              ঐতিহাসিক দুর্গ হোক কিংবা সমুদ্রের গর্জন—স্যারদের পথপ্রদর্শনে ট্যুরে যাওয়া আমাদের প্রিয় কাজ। স্যারদের মজার মজার ইতিহাস কাহিনী শুনতে শুনতে রাস্তা কখন শেষ হয় টেরই পাই না!
            </p>
            <div className="mt-4 pt-3 border-t-2 border-slate-900/20 text-xs font-black text-emerald-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>এক ট্রিপ শেষ হতে না হতেই আরেকটির প্ল্যান শুরু!</span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => playSound('pop')}
            className="bg-sky-100/90 rounded-3xl border-3 border-slate-900 p-6 shadow-comic hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-400 border-2 border-slate-900 flex items-center justify-center text-2xl shadow-comic mb-4">
              ⏳
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              সামনে আসছে নতুন ট্রিপ! 🚀
            </h3>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed">
              স্যারদের সাথে নতুন নতুন জায়গায় ঘুরতে যাওয়া আমাদের ভীষণ পছন্দের। পরবর্তী ট্যুরের প্ল্যান ও বাজেট নিয়ে তোড়জোড় পুরোদমে চলছে!
            </p>
            <div className="mt-4 pt-3 border-t-2 border-slate-900/20 text-xs font-black text-sky-800 flex items-center gap-1">
              <PartyPopper className="w-3.5 h-3.5" />
              <span>ব্যাগ গোছানো প্রায় সম্পন্ন!</span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => playSound('pop')}
            className="bg-pink-100/90 rounded-3xl border-3 border-slate-900 p-6 shadow-comic hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-400 border-2 border-slate-900 flex items-center justify-center text-2xl shadow-comic mb-4">
              ☕
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              ঐতিহাসিক বন্ধুত্ব ও আড্ডা 🤝
            </h3>
            <p className="text-slate-700 text-sm font-semibold leading-relaxed">
              ইসলামের ইতিহাস ও সংস্কৃতি আমাদের বিভাগ হলেও, আমরা ক্যাম্পাসের সবচেয়ে জীবন্ত ইতিহাস। চা খাওয়ার টং আর লাস্ট বেঞ্চের হাসাহাসিই আমাদের আসল সম্পদ!
            </p>
            <div className="mt-4 pt-3 border-t-2 border-slate-900/20 text-xs font-black text-pink-800 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-600" />
              <span>একসাথে হাসবো, একসাথে ঘুরবো!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
