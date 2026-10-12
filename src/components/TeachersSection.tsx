import React, { useState, useEffect, useMemo } from 'react';
import { GraduationCap, Sparkles, Heart, Award, HeartHandshake, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Teacher, SpecialMember, SPECIAL_MEMBERS } from '../data/teachers';
import { playSound } from '../utils/sound';

interface TeachersSectionProps {
  teachersList: Teacher[];
  specialMembersList?: SpecialMember[];
  onUpdatePhoto?: (id: string, newPhoto: string) => void;
}

// Multi-extension sequential fallback (.jpg -> .jpeg -> .png -> .webp -> initials placeholder)
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

interface SpecialMemberCardPhotoProps {
  member: SpecialMember;
}

const SpecialMemberCardPhoto: React.FC<SpecialMemberCardPhotoProps> = ({ member }) => {
  const baseUrl = import.meta.env.BASE_URL;
  const slug = member.slug;

  const candidateUrls = useMemo(() => {
    if (member.photoUrl && (member.photoUrl.startsWith('data:') || member.photoUrl.startsWith('blob:'))) {
      return [member.photoUrl];
    }

    if (slug) {
      const urls: string[] = [];
      EXTENSIONS.forEach((ext) => urls.push(`${baseUrl}photos/${slug}${ext}`));
      EXTENSIONS.forEach((ext) => urls.push(`${baseUrl}${slug}${ext}`));
      return urls;
    }

    if (member.photoUrl) {
      const matched = member.photoUrl.match(/^(.*)\.(jpg|jpeg|png|webp)$/i);
      if (matched) {
        return EXTENSIONS.map((ext) => `${matched[1]}${ext}`);
      }
      return [member.photoUrl];
    }

    return [];
  }, [slug, member.photoUrl, baseUrl]);

  const [attemptIndex, setAttemptIndex] = useState(0);

  useEffect(() => {
    setAttemptIndex(0);
  }, [candidateUrls]);

  const currentSrc = attemptIndex < candidateUrls.length ? candidateUrls[attemptIndex] : null;

  const handleImageError = () => {
    setAttemptIndex((prev) => prev + 1);
  };

  const getInitials = (name: string) => {
    const bracketMatch = name.match(/\(([^)]+)\)/);
    if (bracketMatch) {
      const parts = bracketMatch[1].trim().split(/\s+/).filter(Boolean);
      if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    }
    return 'RB';
  };

  const initials = getInitials(member.name);

  return (
    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl border-4 border-slate-900 bg-teal-100 ring-4 ring-teal-300/80 overflow-hidden shadow-comic group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
      {currentSrc ? (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={member.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-3 select-none text-center bg-gradient-to-br from-teal-900 via-slate-900 to-cyan-950 text-white font-black">
          <span className="font-black text-4xl text-teal-300 tracking-widest drop-shadow-xs">
            {initials}
          </span>
          <span className="mt-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full line-clamp-1 border bg-teal-950/90 text-teal-200 border-teal-500/50">
            {member.name}
          </span>
        </div>
      )}
    </div>
  );
};

interface TeacherCardPhotoProps {
  teacher: Teacher;
  isHead?: boolean;
  isSpecial?: boolean;
}

const TeacherCardPhoto: React.FC<TeacherCardPhotoProps> = ({
  teacher,
  isHead,
  isSpecial,
}) => {
  const baseUrl = import.meta.env.BASE_URL;
  const slug = teacher.slug;

  const candidateUrls = useMemo(() => {
    // If a custom uploaded image (data: or blob:) is present, prioritize it
    if (teacher.photoUrl && (teacher.photoUrl.startsWith('data:') || teacher.photoUrl.startsWith('blob:'))) {
      return [teacher.photoUrl];
    }

    if (slug) {
      const urls: string[] = [];
      EXTENSIONS.forEach((ext) => urls.push(`${baseUrl}photos/${slug}${ext}`));
      EXTENSIONS.forEach((ext) => urls.push(`${baseUrl}${slug}${ext}`));
      return urls;
    }

    if (teacher.photoUrl) {
      const matched = teacher.photoUrl.match(/^(.*)\.(jpg|jpeg|png|webp)$/i);
      if (matched) {
        return EXTENSIONS.map((ext) => `${matched[1]}${ext}`);
      }
      return [teacher.photoUrl];
    }

    return [];
  }, [slug, teacher.photoUrl, baseUrl]);

  const [attemptIndex, setAttemptIndex] = useState(0);

  useEffect(() => {
    setAttemptIndex(0);
  }, [candidateUrls]);

  const currentSrc = attemptIndex < candidateUrls.length ? candidateUrls[attemptIndex] : null;

  const handleImageError = () => {
    // Move to next candidate extension (.jpg -> .jpeg -> .png -> .webp)
    setAttemptIndex((prev) => prev + 1);
  };

  const getInitials = (name: string) => {
    const clean = name.replace(/^(Prof\.|Dr\.|Sir|MD\.|Md\.)\s*/gi, '').trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'TR';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(teacher.name);

  const containerClasses = isHead
    ? 'w-44 h-44 sm:w-52 sm:h-52 rounded-3xl border-4 border-slate-900 bg-amber-200 ring-4 ring-amber-400/80 overflow-hidden shadow-comic group-hover:scale-105 transition-transform duration-200 flex items-center justify-center'
    : isSpecial
    ? 'w-44 h-44 sm:w-48 sm:h-48 rounded-3xl border-4 border-slate-900 bg-amber-200 ring-2 ring-amber-400 overflow-hidden shadow-comic group-hover:scale-105 transition-transform duration-200 flex items-center justify-center'
    : 'w-36 h-36 sm:w-40 sm:h-40 rounded-3xl border-3 border-slate-900 bg-slate-900 overflow-hidden shadow-comic group-hover:scale-105 transition-transform duration-200 flex items-center justify-center';

  return (
    <div className={containerClasses}>
      {currentSrc ? (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={teacher.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div
          className={`w-full h-full flex flex-col items-center justify-center p-3 select-none text-center ${
            isHead
              ? 'bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black'
              : isSpecial
              ? 'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-black'
              : 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white font-black'
          }`}
        >
          <span
            className={`font-black tracking-widest ${
              isHead
                ? 'text-4xl sm:text-5xl text-slate-950 drop-shadow-xs'
                : isSpecial
                ? 'text-4xl text-slate-950'
                : 'text-3xl text-amber-400'
            }`}
          >
            {initials}
          </span>
          <span
            className={`mt-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full line-clamp-1 border ${
              isHead || isSpecial
                ? 'bg-slate-950 text-amber-300 border-amber-300/40'
                : 'bg-slate-800 text-amber-200 border-slate-700'
            }`}
          >
            {teacher.name}
          </span>
        </div>
      )}
    </div>
  );
};

export const TeachersSection: React.FC<TeachersSectionProps> = ({
  teachersList,
  specialMembersList = SPECIAL_MEMBERS,
}) => {
  const [respectCounts, setRespectCounts] = useState<{ [key: string]: number }>({});

  const handleRespect = (id: string) => {
    playSound('ding');
    setRespectCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSpecialMemberLove = (id: string) => {
    playSound('pop');
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#0d9488', '#0284c7', '#f59e0b', '#10b981', '#ec4899'],
    });
    setRespectCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const headTeacher = teachersList.find((t) => t.isHeadOfDepartment);
  const regularTeachers = teachersList.filter((t) => !t.isHeadOfDepartment);

  return (
    <section id="teachers" className="py-14 sm:py-20 bg-amber-100/60 border-b-4 border-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-600 border-2 border-slate-900 text-white font-black text-xs uppercase shadow-comic mb-3">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            শ্রদ্ধা ও ভালোবাসার অভিভাবক
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            আমাদের <span className="text-indigo-600 underline decoration-amber-400">প্রিয় স্যারগণ</span> 🎓
          </h2>
          <p className="mt-3 text-slate-700 font-bold text-sm sm:text-base">
            যাঁদের স্নেহ, সুপরামর্শ আর অনুপ্রেরণায় আমাদের চলার পথ আলোয় উদ্ভাসিত!
          </p>
        </div>

        {/* 1. বিভাগীয় প্রধান (Head of Department) Special Golden Card - সবার উপরে */}
        {headTeacher && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="rounded-3xl bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-200 border-4 border-amber-500 shadow-comic-lg ring-4 ring-amber-300/80 overflow-hidden relative group hover:-translate-y-1.5 transition-all">
              {/* Shimmering Top Ribbon */}
              <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 text-sm sm:text-base font-black uppercase text-center py-3 px-4 border-b-3 border-slate-900 flex items-center justify-center gap-2 shadow-sm tracking-wide">
                <Crown className="w-5 h-5 text-slate-950 flex-shrink-0 animate-bounce" />
                <span>{headTeacher.specialBadge}</span>
                <Sparkles className="w-4 h-4 text-slate-950" />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-10 flex flex-col items-center">
                {/* Photo Frame */}
                <div className="relative mb-6">
                  <TeacherCardPhoto
                    teacher={headTeacher}
                    isHead={true}
                  />

                  {/* Golden Badge Icon */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-2xl shadow-comic animate-wiggle">
                    👑
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-black text-2xl sm:text-4xl text-slate-900 text-center tracking-tight">
                  {headTeacher.name}
                </h3>

                {/* Designation */}
                <p className="mt-2 text-xs sm:text-sm font-black text-amber-950 bg-amber-300/80 border-2 border-amber-500 rounded-xl px-4 py-1.5 text-center shadow-xs">
                  {headTeacher.designation}
                </p>

                {/* Respectful Line */}
                <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-white/95 border-2 border-amber-400 text-slate-900 font-bold text-center text-sm sm:text-base leading-relaxed shadow-xs max-w-xl mx-auto">
                  &ldquo;{headTeacher.quoteOrLine}&rdquo;
                </div>

                {/* Actions: শ্রদ্ধা ও সালাম */}
                <div className="mt-6 pt-4 border-t-2 border-amber-300/80 w-full flex items-center justify-center max-w-xl">
                  <button
                    type="button"
                    onClick={() => handleRespect(headTeacher.id)}
                    className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black shadow-comic active:translate-y-0.5 flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-900 transition-all hover:scale-105"
                  >
                    <HeartHandshake className="w-4 h-4 text-slate-950" />
                    <span>শ্রদ্ধা ও সালাম {respectCounts[headTeacher.id] ? `(${respectCounts[headTeacher.id]})` : ''}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. সম্মানিত শিক্ষকগণের গ্রিড (Dip Parvez Sir, Samrat Sir, Prof. Ashraf Ali, Prof. Sharif Hassan) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {regularTeachers.map((teacher) => {
            const isSpecial = !!teacher.isSpecialNamingSir;
            const respect = respectCounts[teacher.id] || 0;

            return (
              <div
                key={teacher.id}
                className={`rounded-3xl transition-all flex flex-col justify-between overflow-hidden group relative ${
                  isSpecial
                    ? 'bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-200 border-4 border-amber-500 shadow-comic-lg ring-4 ring-amber-300/80 hover:-translate-y-2'
                    : 'bg-white border-4 border-slate-900 shadow-comic hover:-translate-y-1.5'
                }`}
              >
                {/* Top Ribbon */}
                {isSpecial ? (
                  <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 text-xs sm:text-sm font-black uppercase text-center py-2.5 px-4 border-b-3 border-slate-900 flex items-center justify-center gap-2 shadow-xs tracking-wide">
                    <Award className="w-5 h-5 text-slate-950 flex-shrink-0 animate-bounce" />
                    <span>{teacher.specialBadge}</span>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                  </div>
                ) : teacher.id === 'samrat-sir' ? (
                  <div className="bg-rose-100 text-rose-800 text-xs sm:text-sm font-black uppercase text-center py-2 px-4 border-b-2 border-slate-300 flex items-center justify-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-600 fill-rose-500" />
                    <span>{teacher.specialBadge}</span>
                  </div>
                ) : (
                  <div className="bg-indigo-50 text-indigo-900 text-xs sm:text-sm font-black uppercase text-center py-2 px-4 border-b-2 border-slate-300 flex items-center justify-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-700" />
                    <span>{teacher.specialBadge}</span>
                  </div>
                )}

                {/* Card Body: Photo & Info */}
                <div className="p-6 sm:p-8 pb-2 flex flex-col items-center">
                  {/* Photo with Frame */}
                  <div className="relative mb-5">
                    <TeacherCardPhoto
                      teacher={teacher}
                      isSpecial={isSpecial}
                    />

                    {/* Cap Icon badge */}
                    <div
                      className={`absolute -top-3 -right-3 w-10 h-10 rounded-xl border-2 border-slate-900 flex items-center justify-center text-xl shadow-comic ${
                        isSpecial ? 'bg-amber-400 animate-wiggle' : 'bg-indigo-300'
                      }`}
                    >
                      🎓
                    </div>
                  </div>

                  {/* Name */}
                  <h3
                    className={`font-black text-slate-900 text-center ${
                      isSpecial ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                    }`}
                  >
                    {teacher.name}
                  </h3>

                  {/* Designation */}
                  <p className="mt-1 text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50/90 border border-indigo-200 rounded-xl px-3 py-1 text-center">
                    {teacher.designation}
                  </p>
                </div>

                {/* Respectful message / quote */}
                <div className="p-6 sm:p-8 pt-2 flex-1 flex flex-col justify-between">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed text-center my-3 ${
                      isSpecial
                        ? 'bg-white/95 border-2 border-amber-400 text-slate-900 font-bold shadow-xs'
                        : 'bg-amber-50 border-2 border-amber-200/80 text-slate-800'
                    }`}
                  >
                    &ldquo;{teacher.quoteOrLine}&rdquo;
                  </div>

                  {/* Bottom Action: Respect / সালাম */}
                  <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRespect(teacher.id)}
                      className={`w-full justify-center px-4 py-2.5 rounded-xl text-xs font-black shadow-xs active:translate-y-0.5 flex items-center gap-1.5 transition-all hover:scale-102 ${
                        isSpecial
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-900'
                          : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-2 border-slate-900'
                      }`}
                    >
                      <HeartHandshake className="w-4 h-4" />
                      <span>শ্রদ্ধা ও সালাম {respect > 0 ? `(${respect})` : ''}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. ডিপার্টমেন্টের বিশেষ সদস্য (Special Member / Office Responsibility) */}
        {specialMembersList && specialMembersList.length > 0 && (
          <div className="mt-14 max-w-2xl mx-auto">
            {/* Divider Heading */}
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="h-0.5 flex-1 bg-slate-900/20 max-w-[80px]" />
              <span className="text-xs font-black uppercase text-teal-900 tracking-wider bg-teal-100 border-2 border-slate-900 px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                ডিপার্টমেন্টের বিশেষ সদস্য
              </span>
              <div className="h-0.5 flex-1 bg-slate-900/20 max-w-[80px]" />
            </div>

            {specialMembersList.map((member) => {
              const respect = respectCounts[member.id] || 0;
              return (
                <div
                  key={member.id}
                  className="rounded-3xl bg-gradient-to-b from-teal-50 via-sky-50/60 to-slate-50 border-4 border-slate-900 shadow-comic-lg ring-4 ring-teal-300/70 overflow-hidden relative group hover:-translate-y-1.5 transition-all"
                >
                  {/* Top Ribbon */}
                  <div className="bg-gradient-to-r from-teal-700 via-cyan-800 to-teal-700 text-white text-xs sm:text-sm font-black uppercase text-center py-2.5 px-4 border-b-3 border-slate-900 flex items-center justify-center gap-2 shadow-xs tracking-wide">
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse flex-shrink-0" />
                    <span>{member.specialBadge}</span>
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse flex-shrink-0" />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-9 flex flex-col items-center">
                    {/* Photo with frame */}
                    <div className="relative mb-5">
                      <SpecialMemberCardPhoto member={member} />

                      {/* Badge Icon */}
                      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-xl shadow-comic animate-wiggle">
                        🌟
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="font-black text-2xl sm:text-3xl text-slate-900 text-center tracking-tight">
                      {member.name}
                    </h3>

                    {/* Designation / Role */}
                    <p className="mt-2 text-xs sm:text-sm font-black text-teal-900 bg-teal-100/90 border-2 border-teal-400/80 rounded-xl px-4 py-1.5 text-center shadow-xs">
                      {member.role}
                    </p>

                    {/* Respectful & Warm Message */}
                    <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-white/95 border-2 border-teal-200/90 text-slate-800 font-semibold text-center text-xs sm:text-sm leading-relaxed shadow-xs max-w-lg mx-auto">
                      &ldquo;{member.quoteOrLine}&rdquo;
                    </div>

                    {/* Bottom Action: শ্রদ্ধা ও ভালোবাসা 💛 */}
                    <div className="mt-6 pt-4 border-t-2 border-slate-200/80 w-full flex items-center justify-center max-w-lg">
                      <button
                        type="button"
                        onClick={() => handleSpecialMemberLove(member.id)}
                        className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black shadow-comic active:translate-y-0.5 flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 border-2 border-slate-900 transition-all hover:scale-105 cursor-pointer"
                      >
                        <HeartHandshake className="w-4 h-4 text-slate-950 fill-amber-500" />
                        <span>
                          শ্রদ্ধা ও ভালোবাসা 💛 {respect > 0 ? `(${respect})` : ''}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-slate-900 p-5 sm:p-7 shadow-comic-lg max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              🚌 &ldquo;স্যারদের সাথে ঘোরাঘুরিই আমাদের সবচেয়ে বড় পাগলামি!&rdquo; ❤️
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-600 mt-2">
              (ক্লাসের পড়া যতই কঠিন হোক, স্যারদের সাথে ট্যুরে যাওয়ার ডাক পড়লে আমাদের চেয়ে বাধ্য ছাত্র আর কেউ থাকে না!)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
