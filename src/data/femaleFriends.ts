export interface FemaleFriend {
  id: string;
  name: string;
  badge: string;
  quote: string;
  photoUrl?: string;
}

export const DEFAULT_FEMALE_AVATAR = `${import.meta.env.BASE_URL}female-avatar.jpg`;

/**
 * =====================================================================
 * 🌸 বান্ধবী বাহিনীর সুন্দর, সম্মানজনক ও কাব্যিক লাইনের একক তালিকা:
 * আপনি চাইলে এখান থেকে যেকোনো বান্ধবীর লাইন বা ব্যাজ খুব সহজেই পরিবর্তন করতে পারেন।
 * প্রতিটি লাইন সম্পূর্ণ স্বতন্ত্র ও মর্যাদাশীল।
 * =====================================================================
 */
export const FEMALE_POETIC_QUOTES: { [key: string]: { badge: string; quote: string } } = {
  "ff-1": { badge: "🌸 হাসিমুখ", quote: "হাসিতে যার ক্লাসরুম আলোকিত আর মন সবসময় অমলিন ✨" },
  "ff-2": { badge: "🌿 শান্ত স্বভাব", quote: "কথায় নম্র, আচরণে স্নিগ্ধ এবং অন্তরে নির্মল 🍃" },
  "ff-3": { badge: "🌙 স্বপ্নবাজ", quote: "শান্ত চোখে লুকিয়ে থাকা একরাশ সুন্দর সম্ভাবনার আলো 🌟" },
  "ff-4": { badge: "💛 বন্ধুবৎসল", quote: "যার উপস্থিতি আড্ডায় নিয়ে আসে একমুঠো আন্তরিক প্রশান্তি 🌷" },
  "ff-5": { badge: "✨ সৃজনশীল", quote: "কল্পনার রঙে জীবনকে সাজিয়ে নেওয়ার অদ্ভুত সুন্দর দক্ষতা 🎨" },
  "ff-6": { badge: "🌸 হাসিমুখ", quote: "মিষ্টি কথায় সবার মন জয় করে নেওয়ার সহজাত স্বভাব 🌼" },
  "ff-7": { badge: "📚 মেধাবী", quote: "পরিশ্রম আর আত্মবিশ্বাসের মেলবন্ধনে এগিয়ে চলার দৃপ্ত শপথ 📖" },
  "ff-8": { badge: "🌿 শান্ত স্বভাব", quote: "নীরবতার মাঝেও যার ব্যক্তিত্বের এক অনন্য মুগ্ধতা প্রকাশ পায় 🕊️" },
  "ff-9": { badge: "💛 বন্ধুবৎসল", quote: "স্নিগ্ধ হাসিতে বন্ধুদের পাশে থাকার এক অপার নির্ভরতা 🌻" },
  "ff-10": { badge: "✨ সৃজনশীল", quote: "ভাবনায় নতুনত্ব আর প্রতিটি পদক্ষেপে রুচিশীলতার ছাপ 💫" },
  "ff-11": { badge: "🌙 স্বপ্নবাজ", quote: "নতুন দিগন্তে চোখ রেখে নিজের মতো করে এগিয়ে যাওয়া 🌈" },
  "ff-12": { badge: "🌿 শান্ত স্বভাব", quote: "নম্র ব্যবহার ও আন্তরিকতায় যার পরিচয় উজ্জ্বল 🍃" },
  "ff-13": { badge: "📚 মেধাবী", quote: "জ্ঞানের আলোয় নিজেকে প্রতিদিন একটু একটু করে সমৃদ্ধ করা 📚" },
  "ff-14": { badge: "🌸 হাসিমুখ", quote: "যার মুখের এক চিলতে হাসি চারপাশের পরিবেশ হালকা করে দেয় 🌸" },
  "ff-15": { badge: "💛 বন্ধুবৎসল", quote: "আন্তরিকতায় ভরপুর ও সবার প্রতি অমায়িক সহযোগিতাপূর্ণ মন 💖" },
  "ff-16": { badge: "✨ সৃজনশীল", quote: "সূক্ষ্ম চিন্তাভাবনা আর আপন সৃষ্টিশীলতায় অনন্য এক প্রাণ 🦋" },
  "ff-17": { badge: "🌙 স্বপ্নবাজ", quote: "অসীম আকাশে উড়তে চাওয়া একরাশ শুভ স্বপ্নের ধারক 🌌" },
  "ff-18": { badge: "💛 বন্ধুবৎসল", quote: "সততা আর বন্ধুত্বের বন্ধনে যার নাম সবার হৃদয়ে 🤝" },
  "ff-19": { badge: "🌿 শান্ত স্বভাব", quote: "মার্জিত কথা আর স্নিগ্ধ চাহনিতে এক অনাবিল প্রশান্তি 🌾" },
  "ff-20": { badge: "📚 মেধাবী", quote: "মনোযোগ আর একাগ্রতায় নিজের লক্ষ্যে স্থির এক ব্যক্তিত্ব 🎯" },
  "ff-21": { badge: "🌸 হাসিমুখ", quote: "প্রাণখোলা স্বভাব আর নির্মল হাসিতে সদা প্রফুল্ল এক মন 🌺" },
  "ff-22": { badge: "✨ সৃজনশীল", quote: "সাদামাটা মুহূর্তগুলোকে সুন্দর রঙে রাঙিয়ে তোলার চমৎকার গুণ 🖌️" },
  "ff-23": { badge: "🌿 শান্ত স্বভাব", quote: "ধীরস্থির পদচারণা আর গভীর আন্তরিকতায় পূর্ণ এক হৃদয় 🕊️" },
  "ff-24": { badge: "🌙 স্বপ্নবাজ", quote: "ভবিষ্যতের সুন্দর স্বপ্নে চোখ রেখে প্রতিদিন এগিয়ে যাওয়া 🌠" },
  "ff-25": { badge: "🌸 হাসিমুখ", quote: "যার মুখের হাসি যেন ভোরের প্রথম আলোকের মতো নির্মল 🌅" },
  "ff-26": { badge: "💛 বন্ধুবৎসল", quote: "সহজ-সরল অমায়িক মন আর সবাইকে আপন করে নেওয়ার গুণ 🌷" },
  "ff-27": { badge: "✨ সৃজনশীল", quote: "জোনাকির মতো আলো ছড়িয়ে অন্ধকার দূর করার দীপ্ত প্রতীক 💡" },
  "ff-28": { badge: "📚 মেধাবী", quote: "গভীর দৃষ্টিভঙ্গি আর শান্ত মননে জ্ঞানের পথ খোঁজা 📖" },
  "ff-29": { badge: "🌿 শান্ত স্বভাব", quote: "কোমল হৃদয় আর ভদ্রতার আবরণে ঘেরা এক সুন্দর রূপ 🍃" },
  "ff-30": { badge: "🌙 স্বপ্নবাজ", quote: "উঁচু লক্ষ্যের পানে অবিচল থেকে নিজের স্বপ্ন গড়ার প্রত্যয় 🧭" },
  "ff-31": { badge: "🌸 হাসিমুখ", quote: "নূরের মতো স্নিগ্ধ আলো ছড়িয়ে সবাইকে মুগ্ধ রাখা 🕯️" },
  "ff-32": { badge: "✨ সৃজনশীল", quote: "মেঘের মতো স্বাধীন আর ভাবনার বিশালতায় সমৃদ্ধ এক মন ☁️" },
  "ff-33": { badge: "💛 বন্ধুবৎসল", quote: "মুক্তোর মতো খাঁটি মন আর ভালোবাসার অকৃত্রিম প্রকাশ 🦪" },
  "ff-34": { badge: "📚 মেধাবী", quote: "মেধা ও শৃঙ্খলার চমৎকার সমন্বয়ে গড়া উজ্জ্বল এক ভবিষ্যৎ 🎓" },
  "ff-35": { badge: "🌿 শান্ত স্বভাব", quote: "শান্ত নদীটির মতো স্নিগ্ধ ধারা, যাতে নেই কোনো কোলাহল 🌊" },
  "ff-36": { badge: "🌸 হাসিমুখ", quote: "যেখানেই থাকুক, নিজের মিষ্টি উপস্থিতি দিয়ে ভরিয়ে রাখে 🌼" },
  "ff-37": { badge: "🌙 স্বপ্নবাজ", quote: "চোখে যার সম্ভাবনার ঝিলিক আর মনে নতুন আশার আলো 💫" },
  "ff-38": { badge: "💛 বন্ধুবৎসল", quote: "নিঃস্বার্থ বন্ধুত্বের হাত বাড়িয়ে সবাইকে আগলে রাখা 🌻" },
  "ff-39": { badge: "✨ সৃজনশীল", quote: "সুন্দর চিন্তার প্রকাশ আর সুনিপুণ অভিব্যক্তিতে অনন্য 🎭" },
  "ff-40": { badge: "📚 মেধাবী", quote: "নিজ যোগ্যতায় পথ তৈরি করে সামনে এগিয়ে যাওয়ার আত্মপ্রত্যয় 🌟" },
  "ff-41": { badge: "🌿 শান্ত স্বভাব", quote: "ভদ্রতা আর শালীনতার স্নিগ্ধ প্রতীক, সবার প্রিয় এক মুখ 🤍" },
  "ff-42": { badge: "🌸 হাসিমুখ", quote: "জান্নাতসম পবিত্র হাসি আর মনভুলানো স্নিগ্ধ ব্যক্তিত্ব 🌹" },
  "ff-43": { badge: "🌙 স্বপ্নবাজ", quote: "উদার আকাশকে ছুঁয়ে দেখার প্রত্যয়ে বুকভরা শুভকামনা 🌌" },
  "ff-44": { badge: "✨ সৃজনশীল", quote: "সোনার মতো খাঁটি মননে নতুন ভাবনার দীপ জ্বালিয়ে রাখা 💎" },
  "ff-45": { badge: "📚 মেধাবী", quote: "ধৈর্য ও নিষ্ঠার সাথে সফলতার প্রতিটি সিঁড়ি পার হওয়া 🧗‍♀️" },
  "ff-46": { badge: "🌿 শান্ত স্বভাব", quote: "শান্ত মনের সুবাসে চারপাশকে পবিত্র ও মধুর রাখা 🕊️" },
  "ff-47": { badge: "🌸 হাসিমুখ", quote: "প্রস্ফুটিত কুঁড়ির মতো হাসিতে যার সরলতার জয়গান 🌸" },
  "ff-48": { badge: "💛 বন্ধুবৎসল", quote: "বন্ধুর বিপদে নিঃশব্দে পাশে এসে দাঁড়ানো অকৃত্রিম সঙ্গী 🤝" },
  "ff-49": { badge: "🌙 স্বপ্নবাজ", quote: "অথৈ সম্ভাবনায় ভরা এক বুক আশা ও আগামীর শুভ ডাক 🌠" },
  "ff-50": { badge: "✨ সৃজনশীল", quote: "প্রতিটি পদক্ষেপে রুচি ও আত্মমর্যাদার সুন্দর স্বাক্ষর 🪶" },
  "ff-51": { badge: "🌸 মার্জিত স্বভাব", quote: "লাবণ্যময় ব্যক্তিত্ব আর অমায়িক ব্যবহারে সবার কাছে অত্যন্ত সম্মানিত ও প্রিয় 🌷" },
};

/**
 * =====================================================================
 * 👉 বান্ধবী বাহিনীর মূল তালিকা (৫১ জন বান্ধবী):
 * প্রতিটি কার্ডে সংরক্ষিত আছে নাম, ব্যাজ ও একক কাব্যিক লাইন।
 * =====================================================================
 */
export const FEMALE_FRIENDS_DATA: FemaleFriend[] = [
  { id: "ff-1", name: "Sumaiya Khan Karima", badge: FEMALE_POETIC_QUOTES["ff-1"].badge, quote: FEMALE_POETIC_QUOTES["ff-1"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-2", name: "Sumiya Simu", badge: FEMALE_POETIC_QUOTES["ff-2"].badge, quote: FEMALE_POETIC_QUOTES["ff-2"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-3", name: "Tanha JannAt", badge: FEMALE_POETIC_QUOTES["ff-3"].badge, quote: FEMALE_POETIC_QUOTES["ff-3"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-4", name: "Tanjina Akter Tisha", badge: FEMALE_POETIC_QUOTES["ff-4"].badge, quote: FEMALE_POETIC_QUOTES["ff-4"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-5", name: "Tisha Khan", badge: FEMALE_POETIC_QUOTES["ff-5"].badge, quote: FEMALE_POETIC_QUOTES["ff-5"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-6", name: "Tonna Tonna", badge: FEMALE_POETIC_QUOTES["ff-6"].badge, quote: FEMALE_POETIC_QUOTES["ff-6"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-7", name: "Umme Bushra Tonny", badge: FEMALE_POETIC_QUOTES["ff-7"].badge, quote: FEMALE_POETIC_QUOTES["ff-7"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-8", name: "তিবিশা তানজু", badge: FEMALE_POETIC_QUOTES["ff-8"].badge, quote: FEMALE_POETIC_QUOTES["ff-8"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-9", name: "Nuha Islam", badge: FEMALE_POETIC_QUOTES["ff-9"].badge, quote: FEMALE_POETIC_QUOTES["ff-9"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-10", name: "Nusaiba Jahan", badge: FEMALE_POETIC_QUOTES["ff-10"].badge, quote: FEMALE_POETIC_QUOTES["ff-10"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-11", name: "Oak iya Islam Shova", badge: FEMALE_POETIC_QUOTES["ff-11"].badge, quote: FEMALE_POETIC_QUOTES["ff-11"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-12", name: "Rabe Ya", badge: FEMALE_POETIC_QUOTES["ff-12"].badge, quote: FEMALE_POETIC_QUOTES["ff-12"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-13", name: "Ramisha Akter Purno", badge: FEMALE_POETIC_QUOTES["ff-13"].badge, quote: FEMALE_POETIC_QUOTES["ff-13"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-14", name: "Sabina Islam", badge: FEMALE_POETIC_QUOTES["ff-14"].badge, quote: FEMALE_POETIC_QUOTES["ff-14"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-15", name: "Sadia Hossain", badge: FEMALE_POETIC_QUOTES["ff-15"].badge, quote: FEMALE_POETIC_QUOTES["ff-15"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-16", name: "Sanji Islam", badge: FEMALE_POETIC_QUOTES["ff-16"].badge, quote: FEMALE_POETIC_QUOTES["ff-16"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-17", name: "Sara Sheikh", badge: FEMALE_POETIC_QUOTES["ff-17"].badge, quote: FEMALE_POETIC_QUOTES["ff-17"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-18", name: "Sathi Akter", badge: FEMALE_POETIC_QUOTES["ff-18"].badge, quote: FEMALE_POETIC_QUOTES["ff-18"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-19", name: "Shahanaz Shahanaz", badge: FEMALE_POETIC_QUOTES["ff-19"].badge, quote: FEMALE_POETIC_QUOTES["ff-19"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-20", name: "Shahanaz Sheikh", badge: FEMALE_POETIC_QUOTES["ff-20"].badge, quote: FEMALE_POETIC_QUOTES["ff-20"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-21", name: "Sharmin Akter Móbâsshârâ", badge: FEMALE_POETIC_QUOTES["ff-21"].badge, quote: FEMALE_POETIC_QUOTES["ff-21"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-22", name: "Sheikh Nusrat", badge: FEMALE_POETIC_QUOTES["ff-22"].badge, quote: FEMALE_POETIC_QUOTES["ff-22"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-23", name: "Sumaiya Islam", badge: FEMALE_POETIC_QUOTES["ff-23"].badge, quote: FEMALE_POETIC_QUOTES["ff-23"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-24", name: "Kakoli Pervin", badge: FEMALE_POETIC_QUOTES["ff-24"].badge, quote: FEMALE_POETIC_QUOTES["ff-24"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-25", name: "Liza Akther Liza Akther", badge: FEMALE_POETIC_QUOTES["ff-25"].badge, quote: FEMALE_POETIC_QUOTES["ff-25"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-26", name: "Lutfar Nahar Lipa", badge: FEMALE_POETIC_QUOTES["ff-26"].badge, quote: FEMALE_POETIC_QUOTES["ff-26"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-27", name: "Mahia Jonake", badge: FEMALE_POETIC_QUOTES["ff-27"].badge, quote: FEMALE_POETIC_QUOTES["ff-27"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-28", name: "Mahjabin Shakhawat", badge: FEMALE_POETIC_QUOTES["ff-28"].badge, quote: FEMALE_POETIC_QUOTES["ff-28"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-29", name: "Maida Mridha", badge: FEMALE_POETIC_QUOTES["ff-29"].badge, quote: FEMALE_POETIC_QUOTES["ff-29"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-30", name: "Maru Fa", badge: FEMALE_POETIC_QUOTES["ff-30"].badge, quote: FEMALE_POETIC_QUOTES["ff-30"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-31", name: "Masuma Noor", badge: FEMALE_POETIC_QUOTES["ff-31"].badge, quote: FEMALE_POETIC_QUOTES["ff-31"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-32", name: "Meghla Akter", badge: FEMALE_POETIC_QUOTES["ff-32"].badge, quote: FEMALE_POETIC_QUOTES["ff-32"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-33", name: "Afia Nishat Puthi", badge: FEMALE_POETIC_QUOTES["ff-33"].badge, quote: FEMALE_POETIC_QUOTES["ff-33"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-34", name: "Afiya Farzana", badge: FEMALE_POETIC_QUOTES["ff-34"].badge, quote: FEMALE_POETIC_QUOTES["ff-34"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-35", name: "Afsana Islam Meherima", badge: FEMALE_POETIC_QUOTES["ff-35"].badge, quote: FEMALE_POETIC_QUOTES["ff-35"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-36", name: "Ahammed Shimo", badge: FEMALE_POETIC_QUOTES["ff-36"].badge, quote: FEMALE_POETIC_QUOTES["ff-36"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-37", name: "Akhi Hadi", badge: FEMALE_POETIC_QUOTES["ff-37"].badge, quote: FEMALE_POETIC_QUOTES["ff-37"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-38", name: "Angel Sathi", badge: FEMALE_POETIC_QUOTES["ff-38"].badge, quote: FEMALE_POETIC_QUOTES["ff-38"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-39", name: "Arifa Akter Tamanna", badge: FEMALE_POETIC_QUOTES["ff-39"].badge, quote: FEMALE_POETIC_QUOTES["ff-39"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-40", name: "Farjana Eva", badge: FEMALE_POETIC_QUOTES["ff-40"].badge, quote: FEMALE_POETIC_QUOTES["ff-40"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-41", name: "Habiba Nasrin", badge: FEMALE_POETIC_QUOTES["ff-41"].badge, quote: FEMALE_POETIC_QUOTES["ff-41"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-42", name: "Insia Wasim Jannat", badge: FEMALE_POETIC_QUOTES["ff-42"].badge, quote: FEMALE_POETIC_QUOTES["ff-42"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-43", name: "Jannatul Ferdous Mim", badge: FEMALE_POETIC_QUOTES["ff-43"].badge, quote: FEMALE_POETIC_QUOTES["ff-43"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-44", name: "Jannatul Ferdowshi Sarna", badge: FEMALE_POETIC_QUOTES["ff-44"].badge, quote: FEMALE_POETIC_QUOTES["ff-44"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-45", name: "Jannatul Ferdus", badge: FEMALE_POETIC_QUOTES["ff-45"].badge, quote: FEMALE_POETIC_QUOTES["ff-45"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-46", name: "KA RI MA", badge: FEMALE_POETIC_QUOTES["ff-46"].badge, quote: FEMALE_POETIC_QUOTES["ff-46"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-47", name: "Maisa Ahamed Nur", badge: FEMALE_POETIC_QUOTES["ff-47"].badge, quote: FEMALE_POETIC_QUOTES["ff-47"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-48", name: "Ãriyâ Ïslãm", badge: FEMALE_POETIC_QUOTES["ff-48"].badge, quote: FEMALE_POETIC_QUOTES["ff-48"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-49", name: "Athoi Yasmin Noor", badge: FEMALE_POETIC_QUOTES["ff-49"].badge, quote: FEMALE_POETIC_QUOTES["ff-49"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-50", name: "Fahrin Jaman Jerin", badge: FEMALE_POETIC_QUOTES["ff-50"].badge, quote: FEMALE_POETIC_QUOTES["ff-50"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
  { id: "ff-51", name: "Labanno Jawjatu Rakib", badge: FEMALE_POETIC_QUOTES["ff-51"].badge, quote: FEMALE_POETIC_QUOTES["ff-51"].quote, photoUrl: DEFAULT_FEMALE_AVATAR },
];
