/**
 * ফটো গ্যালারি ডেটা ফাইল (Gallery Data)
 * 
 * 📸 নতুন ছবি যোগ করার সহজ নিয়ম:
 * ১. আপনার ছবিটি `public/gallery/` ফোল্ডারে পেস্ট করুন (যেমন: `my-photo.jpg`)
 * ২. নিচের `galleryPhotos` অ্যারেতে নতুন একটি আইটেম যোগ করুন:
 *    {
 *      id: 'photo-new-1',
 *      file: 'my-photo.jpg',
 *      caption: 'আপনার পছন্দের বাংলা ক্যাপশন ✨',
 *      album: 'tour', // 'tour' (ট্যুর 🚌) | 'class' (ক্লাস 📚) | 'fun' (পাগলামি 🎉)
 *      date: '১৫ মার্চ ২০২৪',
 *      location: 'স্থানের নাম (ঐচ্ছিক)'
 *    }
 */

export type AlbumType = 'tour' | 'class' | 'fun';

export interface GalleryPhoto {
  id: string;
  file: string;
  caption: string;
  album: AlbumType;
  date: string;
  location?: string;
  photographer?: string;
}

export const albumCategories: { id: 'all' | AlbumType; label: string; icon: string; color: string }[] = [
  { id: 'all', label: 'সব ছবি', icon: '🖼️', color: 'bg-amber-500 text-white' },
  { id: 'tour', label: 'ট্যুর', icon: '🚌', color: 'bg-emerald-600 text-white' },
  { id: 'class', label: 'ক্লাস', icon: '📚', color: 'bg-blue-600 text-white' },
  { id: 'fun', label: 'পাগলামি', icon: '🎉', color: 'bg-purple-600 text-white' },
];

export const galleryPhotos: GalleryPhoto[] = [
  // --- ট্যুর 🚌 অ্যালবাম ---
  {
    id: 'tour-1',
    file: 'tour-sylhet-jaflong.jpg',
    caption: 'সিলেটের জাফলং ও চা বাগানের অপরূপ সবুজে বন্ধুরা 🍃',
    album: 'tour',
    date: '১০ ফেব্রুয়ারি ২০২৪',
    location: 'জাফলং ও শ্রীমঙ্গল, সিলেট',
  },
  {
    id: 'tour-2',
    file: 'tour-coxsbazar-beach.jpg',
    caption: 'কক্সবাজার সমুদ্র সৈকত ও সূর্যাস্তের সোনালি আলো 🌊',
    album: 'tour',
    date: '২৫ ডিসেম্বর ২০২৩',
    location: 'ইনানী ও কলাতলী, কক্সবাজার',
  },
  {
    id: 'tour-3',
    file: 'tour-sajek-valley.jpg',
    caption: 'মেঘের রাজ্য সাজেক ভ্যালি—পাহাড়ের চূড়ায় সকালের আড্ডা ☁️',
    album: 'tour',
    date: '১৮ নভেম্বর ২০২৩',
    location: 'রুইলুই পাড়া, সাজেক ভ্যালি',
  },
  {
    id: 'tour-4',
    file: 'tour-kuakata-sunrise.jpg',
    caption: 'কুয়াকাটা সাগরকন্যায় একই সৈকতে সূর্যোদয় ও বন্ধুদের উচ্ছ্বাস 🌅',
    album: 'tour',
    date: '২০ জানুয়ারি ২০২৪',
    location: 'কুয়াকাটা সৈকত, পটুয়াখালী',
  },

  // --- ক্লাস 📚 অ্যালবাম ---
  {
    id: 'class-1',
    file: 'class-lab-presentation.jpg',
    caption: 'কম্পিউটার ল্যাবে আইসিটি প্রজেক্ট প্রেজেন্টেশন ও অ্যাসাইনমেন্ট যুদ্ধ 💻',
    album: 'class',
    date: '১২ অক্টোবর ২০২৩',
    location: 'কম্পিউটার ল্যাব-২, কলেজ ভবন',
  },
  {
    id: 'class-2',
    file: 'class-library-group-study.jpg',
    caption: 'পরীক্ষার আগের রাতে লাইব্রেরিতে জোরকদমে গ্রুপ স্টাডি 📖',
    album: 'class',
    date: '০৩ সেপ্টেম্বর ২০২৩',
    location: 'কলেজ কেন্দ্রীয় লাইব্রেরি',
  },
  {
    id: 'class-3',
    file: 'class-farewell-stage.jpg',
    caption: 'রুম ডেকোরেশন ও ফেয়ারওয়েল অনুষ্ঠানের রিহার্সাল মুহূর্ত 🎈',
    album: 'class',
    date: '১৫ জানুয়ারি ২০২৪',
    location: 'অডিটোরিয়াম ও রুম ২০৪',
  },
  {
    id: 'class-4',
    file: 'class-seminar-hall.jpg',
    caption: 'সম্মানিত স্যারদের মূল্যবান উপদেশ ও শিক্ষণীয় সেমিনার 🎓',
    album: 'class',
    date: '২২ আগস্ট ২০২৩',
    location: 'কলেজ কনফারেন্স হল',
  },

  // --- পাগলামি 🎉 অ্যালবাম ---
  {
    id: 'fun-1',
    file: 'fun-canteen-singara.jpg',
    caption: 'ক্যান্টিনের গরম সিঙ্গাড়া আর শেষ কাপ চায়ের ঝগড়া ☕',
    album: 'fun',
    date: '২৮ নভেম্বর ২০২৩',
    location: 'কলেজ ক্যান্টিনের প্রিয় কোণ',
  },
  {
    id: 'fun-2',
    file: 'fun-rain-football.jpg',
    caption: 'মুষলধারে বৃষ্টিতে ভিজে কাদা মাখা ফুটবল টুর্নামেন্ট ⚽🌧️',
    album: 'fun',
    date: '০৮ জুলাই ২০২৩',
    location: 'কলেজ খেলার মাঠ',
  },
  {
    id: 'fun-3',
    file: 'fun-group-selfie.jpg',
    caption: 'এক ফ্রেমে পুরো ব্যাচের শত শত হাসিমুখ ও পাগলামির সেলফি 🤳',
    album: 'fun',
    date: '১৪ ফেব্রুয়ারি ২০২৪',
    location: 'কলেজ প্রাঙ্গণের বকুলতলা',
  },
  {
    id: 'fun-4',
    file: 'fun-picnic-barbecue.jpg',
    caption: 'বনভোজনে বারবিকিউ পার্টি ও বন্ধুদের গিটার-গানের আসর 🎸🔥',
    album: 'fun',
    date: '০২ ফেব্রুয়ারি ২০২৪',
    location: 'বার্ষিক পিকনিক স্পট',
  },
];
