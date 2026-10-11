export interface Teacher {
  id: string;
  name: string;
  designation: string;
  quoteOrLine: string;
  photoUrl: string;
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
    id: "dip-parvez-sir",
    name: "Dip Parvez Sir",
    designation: "সম্মানিত শিক্ষক, ইসলামের ইতিহাস ও সংস্কৃতি",
    quoteOrLine: "আমাদের মাত্রাতিরিক্ত পাগলামি আর হাসাহাসি দেখে ভালোবেসে যিনি এই ঐতিহাসিক নাম দিয়েছেন—যাঁর একটি ডাকেই পুরো ব্যাস সাইজ!",
    photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    isSpecialNamingSir: true,
    specialBadge: "যে স্যার আমাদের নাম দিয়েছেন 'পাগলা ব্যাস' 😄",
  },
  {
    id: "samrat-sir",
    name: "Samrat Sir",
    designation: "সম্মানিত শিক্ষক, ইসলামের ইতিহাস ও সংস্কৃতি",
    quoteOrLine: "ক্লাসের পড়াশোনা থেকে শুরু করে আড্ডা আর ট্যুর—যাঁর স্নেহময় উপস্থিতি আর হাসিমুখ পুরো ব্যাসের সবচেয়ে বড় অনুপ্রেরণা!",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    isSpecialNamingSir: false,
    specialBadge: "আমাদের প্রিয় স্যার ❤️",
  },
];
