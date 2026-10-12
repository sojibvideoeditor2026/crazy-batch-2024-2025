export interface Teacher {
  id: string;
  name: string;
  designation: string;
  quoteOrLine: string;
  photoUrl: string;
  slug: string;
  isHeadOfDepartment?: boolean;
  isSpecialNamingSir?: boolean;
  specialBadge: string;
}

/**
 * ========================================================================
 * 👉 আমাদের প্রিয় স্যারগণের তথ্য:
 * ========================================================================
 */
export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: "rahat-billa-lashkar",
    slug: "rahat-billa-lashkar",
    name: "Prof. Rahat Billa Lashkar",
    designation: "বিভাগীয় প্রধান (Head of Department), ইসলামের ইতিহাস ও সংস্কৃতি বিভাগ",
    quoteOrLine: "বিভাগীয় অভিভাবক হিসেবে যাঁর সুবিশাল প্রজ্ঞা, সুচারু দিকনির্দেশনা ও অপরিসীম স্নেহ আমাদের চলার পথের চিরন্তন পাথেয়।",
    photoUrl: `${import.meta.env.BASE_URL}photos/rahat-billa-lashkar.jpg`,
    isHeadOfDepartment: true,
    specialBadge: "বিভাগীয় প্রধান 🎓",
  },
  {
    id: "dip-parvez-sir",
    slug: "dip-parvez-sir",
    name: "Dip Parvez Sir",
    designation: "সম্মানিত শিক্ষক, ইসলামের ইতিহাস ও সংস্কৃতি",
    quoteOrLine: "আমাদের মাত্রাতিরিক্ত পাগলামি আর হাসাহাসি দেখে ভালোবেসে যিনি এই ঐতিহাসিক নাম দিয়েছেন—যাঁর একটি ডাকেই পুরো ব্যাস সাইজ!",
    photoUrl: `${import.meta.env.BASE_URL}photos/dip-parvez-sir.jpg`,
    isSpecialNamingSir: true,
    specialBadge: "যে স্যার আমাদের নাম দিয়েছেন 'পাগলা ব্যাস' 😄",
  },
  {
    id: "samrat-sir",
    slug: "samrat-sir",
    name: "Samrat Sir",
    designation: "সম্মানিত শিক্ষক, ইসলামের ইতিহাস ও সংস্কৃতি",
    quoteOrLine: "ক্লাসের পড়াশোনা থেকে শুরু করে আড্ডা আর ট্যুর—যাঁর স্নেহময় উপস্থিতি আর হাসিমুখ পুরো ব্যাসের সবচেয়ে বড় অনুপ্রেরণা!",
    photoUrl: `${import.meta.env.BASE_URL}photos/samrat-sir.jpg`,
    isSpecialNamingSir: false,
    specialBadge: "আমাদের প্রিয় স্যার ❤️",
  },
  {
    id: "ashraf-ali",
    slug: "ashraf-ali",
    name: "Prof. Ashraf Ali",
    designation: "সম্মানিত শিক্ষক, ইসলামের ইতিহাস ও সংস্কৃতি বিভাগ",
    quoteOrLine: "যাঁর প্রজ্ঞাময় পাঠদান ও সদয় স্নেহ আমাদের জ্ঞানার্জনের পথকে করেছে সমৃদ্ধ ও আলোকিত।",
    photoUrl: `${import.meta.env.BASE_URL}photos/ashraf-ali.jpg`,
    specialBadge: "সম্মানিত শিক্ষক 🎓",
  },
  {
    id: "sharif-hassan",
    slug: "sharif-hassan",
    name: "Prof. Sharif Hassan",
    designation: "সম্মানিত শিক্ষক, ইসলামের ইতিহাস ও সংস্কৃতি বিভাগ",
    quoteOrLine: "যাঁর অমায়িক ব্যক্তিত্ব, আদর্শিক শিক্ষাদান ও আন্তরিক স্নেহ শিক্ষার্থীদের হৃদয়ে চিরভাস্বর।",
    photoUrl: `${import.meta.env.BASE_URL}photos/sharif-hassan.jpg`,
    specialBadge: "সম্মানিত শিক্ষক 🎓",
  },
];
