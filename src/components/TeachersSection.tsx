import React, { useState } from 'react';
import { GraduationCap, Camera, Sparkles, Heart, Award, HeartHandshake, Crown } from 'lucide-react';
import { Teacher } from '../data/teachers';
import { PhotoUploadModal } from './PhotoUploadModal';
import { playSound } from '../utils/sound';

interface TeachersSectionProps {
  teachersList: Teacher[];
  onUpdatePhoto: (id: string, newPhoto: string) => void;
}

export const TeachersSection: React.FC<TeachersSectionProps> = ({
  teachersList,
  onUpdatePhoto,
}) => {
  const [activePhotoTeacher, setActivePhotoTeacher] = useState<Teacher | null>(null);
  const [respectCounts, setRespectCounts] = useState<{ [key: string]: number }>({});

  const handleRespect = (id: string) => {
    playSound('ding');
    setRespectCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const getFallbackPlaceholder = (name: string, isHead = false) => {
    const bg = isHead ? 'b45309,d97706' : '1e293b,334155';
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=${bg}&textColor=ffffff&fontSize=42&fontWeight=700`;
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
                  <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl border-4 border-slate-900 bg-amber-200 ring-4 ring-amber-400/80 overflow-hidden shadow-comic group-hover:scale-105 transition-transform duration-200">
                    <img
                      src={headTeacher.photoUrl}
                      alt={headTeacher.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getFallbackPlaceholder(headTeacher.name, true);
                      }}
                    />
                  </div>

                  {/* Golden Badge Icon */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-2xl shadow-comic animate-wiggle">
                    👑
                  </div>

                  {/* Change/Add Photo Button */}
                  <button
                    type="button"
                    onClick={() => {
                      playSound('pop');
                      setActivePhotoTeacher(headTeacher);
                    }}
                    className="absolute -bottom-2.5 -right-2.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl border-2 border-white shadow-comic text-xs flex items-center gap-1.5 active:scale-95 transition-transform"
                    title="বিভাগীয় প্রধান স্যারের ছবি দিন বা পরিবর্তন করুন"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-xs font-bold">ছবি দিন</span>
                  </button>
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

                {/* Actions */}
                <div className="mt-6 pt-4 border-t-2 border-amber-300/80 w-full flex items-center justify-between max-w-xl">
                  <button
                    type="button"
                    onClick={() => handleRespect(headTeacher.id)}
                    className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black shadow-comic active:translate-y-0.5 flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-900 transition-all"
                  >
                    <HeartHandshake className="w-4 h-4 text-slate-950" />
                    <span>শ্রদ্ধা ও সালাম {respectCounts[headTeacher.id] ? `(${respectCounts[headTeacher.id]})` : ''}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playSound('pop');
                      setActivePhotoTeacher(headTeacher);
                    }}
                    className="text-xs sm:text-sm font-bold text-amber-900 hover:text-black underline"
                  >
                    ছবি পরিবর্তন
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
                    <div
                      className={`overflow-hidden shadow-comic group-hover:scale-105 transition-transform duration-200 rounded-3xl ${
                        isSpecial
                          ? 'w-44 h-44 sm:w-48 sm:h-48 border-4 border-slate-900 bg-amber-200 ring-2 ring-amber-400'
                          : 'w-36 h-36 sm:w-40 sm:h-40 border-3 border-slate-900 bg-slate-100'
                      }`}
                    >
                      <img
                        src={teacher.photoUrl}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getFallbackPlaceholder(teacher.name, isSpecial);
                        }}
                      />
                    </div>

                    {/* Cap Icon badge */}
                    <div
                      className={`absolute -top-3 -right-3 w-10 h-10 rounded-xl border-2 border-slate-900 flex items-center justify-center text-xl shadow-comic ${
                        isSpecial ? 'bg-amber-400 animate-wiggle' : 'bg-indigo-300'
                      }`}
                    >
                      🎓
                    </div>

                    {/* Change Photo Button */}
                    <button
                      type="button"
                      onClick={() => {
                        playSound('pop');
                        setActivePhotoTeacher(teacher);
                      }}
                      className="absolute -bottom-2 -right-2 bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-xl border-2 border-white shadow-comic text-xs flex items-center gap-1 active:scale-95 transition-transform"
                      title="স্যারের ছবি দিন বা পরিবর্তন করুন"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-300" />
                      <span className="text-[10px] font-bold">ছবি দিন</span>
                    </button>
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
                  <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleRespect(teacher.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-black shadow-xs active:translate-y-0.5 flex items-center gap-1.5 transition-all ${
                        isSpecial
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-900'
                          : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-2 border-slate-900'
                      }`}
                    >
                      <HeartHandshake className="w-4 h-4" />
                      <span>শ্রদ্ধা ও সালাম {respect > 0 ? `(${respect})` : ''}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playSound('pop');
                        setActivePhotoTeacher(teacher);
                      }}
                      className="text-xs font-bold text-amber-700 hover:text-amber-900 underline"
                    >
                      ছবি পরিবর্তন
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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

      {/* Photo Upload Modal for selected teacher */}
      {activePhotoTeacher && (
        <PhotoUploadModal
          isOpen={!!activePhotoTeacher}
          onClose={() => setActivePhotoTeacher(null)}
          personName={activePhotoTeacher.name}
          currentPhoto={activePhotoTeacher.photoUrl}
          onSavePhoto={(newUrl) => onUpdatePhoto(activePhotoTeacher.id, newUrl)}
        />
      )}
    </section>
  );
};
