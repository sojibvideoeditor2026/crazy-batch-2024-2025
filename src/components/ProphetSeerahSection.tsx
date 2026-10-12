import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Heart,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldCheck,
  Scale,
  Feather,
  Users,
  Lightbulb,
  ExternalLink,
  Flame,
  Moon,
  Shield,
  ScrollText,
  Navigation,
  Swords,
  Crown,
  HeartHandshake
} from 'lucide-react';
import {
  SEERAH_TIMELINE,
  PROPHET_QUALITIES,
  SEERAH_LIFE_LESSONS,
  SEERAH_QUIZ_QUESTIONS,
  SeerahChapter,
  ProphetQuality,
  LifeLesson
} from '../data/prophetSeerahData';
import { playSound } from '../utils/sound';

export const ProphetSeerahSection: React.FC = () => {
  // Timeline accordion state (open chapters)
  const [expandedChapterId, setExpandedChapterId] = useState<string>('birth-childhood');

  // Character Tab State
  const [selectedQualityId, setSelectedQualityId] = useState<string>(PROPHET_QUALITIES[0].id);

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Toggle chapter expansion
  const toggleChapter = (id: string) => {
    playSound('pop');
    setExpandedChapterId((prev) => (prev === id ? '' : id));
  };

  // Select Quality Tab
  const handleSelectQuality = (id: string) => {
    playSound('pop');
    setSelectedQualityId(id);
  };

  // Handle Quiz answer
  const handleQuizAnswer = (qId: number, optionIdx: number) => {
    if (userAnswers[qId] !== undefined) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));

    const isCorrect = optionIdx === SEERAH_QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
    if (isCorrect) {
      playSound('pop');
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < SEERAH_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      playSound('cheer');
    }
  };

  const handleRestartQuiz = () => {
    setUserAnswers({});
    setCurrentQuizIndex(0);
    setQuizFinished(false);
  };

  // Quiz Score
  const score = Object.entries(userAnswers).reduce((acc, [qId, ansIdx]) => {
    const q = SEERAH_QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    if (q && q.correctIndex === ansIdx) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const activeQuality = PROPHET_QUALITIES.find((q) => q.id === selectedQualityId) || PROPHET_QUALITIES[0];
  const currentQ = SEERAH_QUIZ_QUESTIONS[currentQuizIndex];
  const hasAnsweredCurrentQ = userAnswers[currentQ?.id] !== undefined;

  // Icon mapping for quality
  const renderQualityIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Heart':
        return <Heart className="w-5 h-5" />;
      case 'Feather':
        return <Feather className="w-5 h-5" />;
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  // Icon mapping for timeline chapter
  const renderChapterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon':
        return <Moon className="w-4 h-4 text-emerald-300" />;
      case 'Shield':
        return <Shield className="w-4 h-4 text-amber-300" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-300" />;
      case 'Flame':
        return <Flame className="w-4 h-4 text-rose-300" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-sky-300" />;
      case 'Navigation':
        return <Navigation className="w-4 h-4 text-emerald-300" />;
      case 'Scale':
        return <Scale className="w-4 h-4 text-amber-300" />;
      case 'Swords':
        return <Swords className="w-4 h-4 text-amber-300" />;
      case 'ScrollText':
        return <ScrollText className="w-4 h-4 text-yellow-300" />;
      case 'Crown':
        return <Crown className="w-4 h-4 text-amber-300" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4 text-emerald-300" />;
      default:
        return <BookOpen className="w-4 h-4 text-amber-300" />;
    }
  };

  return (
    <section
      id="prophet-seerah"
      className="py-16 sm:py-24 bg-[#06241a] text-slate-100 border-b-4 border-slate-900 relative overflow-hidden font-['Hind_Siliguri',sans-serif]"
    >
      {/* ইসলামিক ঐতিহ্যবাহী নকশা ব্যাকগ্রাউন্ড প্যাটার্ন */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* সেকশন হেডার: শান্ত, মর্যাদাপূর্ণ ও ইসলামিক আবহ */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-amber-400/50 text-amber-300 font-semibold text-xs sm:text-sm tracking-wider shadow-md mb-4">
            <span className="text-amber-400">﷽</span>
            <span>রাহমাতুল্লিল আলামীন • মানবতার মুক্তির দিশারী</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-amber-100 tracking-tight drop-shadow-sm flex items-center justify-center gap-3 flex-wrap">
            <span>প্রিয় নবী হযরত মুহাম্মদ ﷺ-এর পবিত্র জীবনী</span>
            <span className="text-amber-400 text-3xl sm:text-4xl">🕌</span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4 rounded-full" />

          <p className="text-sm sm:text-base font-normal text-emerald-100/90 leading-relaxed max-w-2xl mx-auto">
            "নিশ্চয়ই আল্লাহর রাসূলের জীবনে তোমাদের জন্য রয়েছে সর্বোত্তম আদর্শ।" — <span className="text-amber-300 font-medium">সূরা আল-আহযাব: ২১</span>
            <br />
            তিমির রাত্রি ভেদ করে জাহিলিয়্যাতের আঁধার মুছে একত্ববাদ, সুবিচার ও অপার ক্ষমার এক চিরন্তন আলো জ্বালিয়েছিলেন প্রিয় নবী মুহাম্মদ মোস্তফা ﷺ।
          </p>

          {/* দ্রুত জাম্প বাটন */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <a
              href="#seerah-timeline"
              className="px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-800 border border-amber-400/40 text-amber-200 text-xs font-semibold transition-colors"
            >
              📅 জীবনীর সময়রেখা (১১ পর্ব)
            </a>
            <a
              href="#seerah-character"
              className="px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-800 border border-amber-400/40 text-amber-200 text-xs font-semibold transition-colors"
            >
              🌿 চরিত্রের সৌন্দর্য
            </a>
            <a
              href="#seerah-lessons"
              className="px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-800 border border-amber-400/40 text-amber-200 text-xs font-semibold transition-colors"
            >
              💡 আজকের জীবনের শিক্ষা
            </a>
            <a
              href="#seerah-quiz"
              className="px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-800 border border-amber-400/40 text-amber-200 text-xs font-semibold transition-colors"
            >
              ✨ সম্মানজনক কুইজ
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ১. সময়রেখা (টাইমলাইন) আকারে জীবনীর পর্ব */}
        {/* ========================================================= */}
        <div id="seerah-timeline" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-3 mb-8 border-b border-amber-500/20 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-amber-200 tracking-tight">
                পবিত্র জীবনীর ঐতিহাসিক সময়রেখা (৫৭০ – ৬৩২ খ্রিষ্টাব্দ)
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80">
                মক্কার শুভাগমন থেকে বিদায় হজের ভাষণ ও প্রিয় রবের সান্নিধ্যে গমন — ক্লিক করে প্রতিটি পর্বের বিস্তারিত জানুন
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {SEERAH_TIMELINE.map((chapter: SeerahChapter, idx: number) => {
              const isExpanded = expandedChapterId === chapter.id;

              return (
                <div
                  key={chapter.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#093526] border-amber-400/70 shadow-lg shadow-emerald-950/50'
                      : 'bg-[#062c1f]/80 hover:bg-[#083324] border-emerald-800/60 hover:border-amber-400/30'
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 focus:outline-none"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-950 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-inner">
                        {renderChapterIcon(chapter.icon)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                            পর্ব {idx + 1} • {chapter.period}
                          </span>
                          <span className="text-[11px] text-emerald-300/70 font-mono hidden sm:inline">
                            {chapter.keyEventDate}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-amber-100 truncate">
                          {chapter.title}
                        </h4>
                      </div>
                    </div>

                    <div className="shrink-0 p-1 rounded-lg bg-emerald-950/60 text-amber-300 border border-emerald-700/50">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* Accordion Expanded Body */}
                  {isExpanded && (
                    <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-emerald-800/40 space-y-5 text-sm">
                      {/* সংক্ষিপ্ত সারসংক্ষেপ */}
                      <p className="text-emerald-100/90 leading-relaxed bg-[#052118] p-4 rounded-xl border border-emerald-800/50 font-normal">
                        {chapter.summary}
                      </p>

                      {/* প্রধান ঘটনাবলী (বুলেট পয়েন্ট) */}
                      <div>
                        <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          প্রধান মাইলফলক ও ঘটনাবলী:
                        </h5>
                        <ul className="space-y-2">
                          {chapter.highlights.map((h, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5 text-slate-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                              <span className="leading-snug">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* বিস্তারিত ইতিহাস বিবরণ */}
                      <div className="space-y-2 pt-2 border-t border-emerald-800/30 text-emerald-200/80 leading-relaxed">
                        {chapter.detailedContent.map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}
                      </div>

                      {/* এই পর্ব থেকে শিক্ষা */}
                      <div className="p-3.5 sm:p-4 rounded-xl bg-amber-950/40 border border-amber-400/40 flex items-start gap-3">
                        <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 shrink-0 mt-0.5">
                          <Lightbulb className="w-4 h-4 text-amber-300" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-amber-300 block mb-0.5">
                            এই পর্ব থেকে আমাদের আত্মিক শিক্ষা:
                          </span>
                          <p className="text-xs sm:text-sm text-amber-100/90 font-medium leading-relaxed">
                            {chapter.reflectionLesson}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* ২. "তাঁর চরিত্রের সৌন্দর্য" (The Beauty of His Character) */}
        {/* ========================================================= */}
        <div id="seerah-character" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-3 mb-8 border-b border-amber-500/20 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-amber-200 tracking-tight">
                তাঁর চরিত্রের অনন্য সৌন্দর্য ও আখলাক
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80">
                "তাঁর চরিত্র ছিল স্বয়ং আল-কুরআন" — হযরত আয়িশা (রা.)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* বামে: গুণের তালিকা (Tabs) */}
            <div className="lg:col-span-5 space-y-2.5">
              {PROPHET_QUALITIES.map((q) => {
                const isActive = q.id === selectedQualityId;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuality(q.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md translate-x-1'
                        : 'bg-[#083022] hover:bg-[#0c3c2b] text-emerald-100 border-emerald-800/60 font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg ${
                          isActive ? 'bg-slate-900 text-amber-400' : 'bg-emerald-950 text-amber-300'
                        }`}
                      >
                        {renderQualityIcon(q.iconName)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold truncate">{q.quality}</div>
                        <div
                          className={`text-xs ${
                            isActive ? 'text-slate-800 font-medium' : 'text-emerald-300/70'
                          }`}
                        >
                          {q.titleBangla}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ডানে: নির্বাচিত গুণের বিস্তারিত কার্ড */}
            <div className="lg:col-span-7 bg-[#093526] border-2 border-amber-400/50 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between gap-2 border-b border-emerald-800/60 pb-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-lg sm:text-xl">
                  {renderQualityIcon(activeQuality.iconName)}
                  <span>{activeQuality.quality}</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-200 border border-emerald-700 font-mono">
                  আখলাক
                </span>
              </div>

              {/* কুরআন / হাদিসের বাণী */}
              <div className="p-4 rounded-xl bg-[#052118] border-l-4 border-amber-400 text-amber-100 space-y-1.5">
                <p className="text-sm sm:text-base font-medium italic leading-relaxed">
                  "{activeQuality.quranicOrHadithQuote}"
                </p>
                <div className="text-right text-xs font-semibold text-amber-300">
                  — {activeQuality.quoteSource}
                </div>
              </div>

              {/* ঐতিহাসিক সত্য ঘটনা */}
              <div>
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  ঐতিহাসিক উজ্জ্বল নজির ও ঘটনা:
                </h5>
                <p className="text-sm text-slate-200 leading-relaxed font-normal bg-black/20 p-4 rounded-xl border border-emerald-800/40">
                  {activeQuality.incidentStory}
                </p>
              </div>

              {/* আমাদের করণীয় */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-100">
                  <span className="font-bold text-amber-300">আমাদের জীবনে প্রয়োগ: </span>
                  {activeQuality.takeaway}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ৩. জীবন থেকে শিক্ষা ও আজকের সমাজে প্রাসঙ্গিকতা */}
        {/* ========================================================= */}
        <div id="seerah-lessons" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-3 mb-8 border-b border-amber-500/20 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-amber-200 tracking-tight">
                সিরাত থেকে শিক্ষা: আজকের ক্যাম্পাস ও বাস্তব জীবনের পাথেয়
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80">
                শুধুমাত্র ইতিহাস জানা নয়; নবীজি ﷺ-এর জীবন থেকে আমাদের চরিত্র ও ব্যবহার গঠনের ৫টি বাস্তব পদক্ষেপ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SEERAH_LIFE_LESSONS.map((lesson: LifeLesson) => (
              <div
                key={lesson.id}
                className="bg-[#072d20] border border-emerald-800/60 hover:border-amber-400/50 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/80"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-400/15 text-amber-300 border border-amber-400/30">
                      {lesson.category}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <h4 className="text-base font-bold text-amber-100 mb-2">
                    {lesson.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-4 font-normal">
                    {lesson.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#041a13] border border-amber-400/20 text-xs text-amber-200/90">
                  <span className="font-bold text-amber-300 block mb-0.5">বাস্তব প্রয়োগ:</span>
                  {lesson.practicalAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* ৪. সম্মানজনক ৫ প্রশ্নের ছোট কুইজ */}
        {/* ========================================================= */}
        <div id="seerah-quiz" className="scroll-mt-24">
          <div className="max-w-2xl mx-auto bg-[#083022] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-emerald-800/60 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-amber-200">
                    সম্মানজনক সিরাত জ্ঞান কুইজ
                  </h3>
                  <p className="text-xs text-emerald-200/80">
                    ৫টি প্রশ্নের মাধ্যমে আপনার অর্জিত জ্ঞান যাচাই করুন
                  </p>
                </div>
              </div>
              <div className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-950 text-amber-300 border border-emerald-700">
                {currentQuizIndex + 1} / {SEERAH_QUIZ_QUESTIONS.length}
              </div>
            </div>

            {!quizFinished ? (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-amber-300 mb-1 block">
                    প্রশ্ন {currentQ.id}:
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                    {currentQ.question}
                  </h4>
                </div>

                {/* অপশনসমূহ */}
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = userAnswers[currentQ.id] === idx;
                    const isCorrect = idx === currentQ.correctIndex;
                    const answered = userAnswers[currentQ.id] !== undefined;

                    let btnStyle = 'bg-[#052118] hover:bg-[#072a1e] border-emerald-800/70 text-slate-200';

                    if (answered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-900 border-emerald-400 text-emerald-100 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                      } else {
                        btnStyle = 'bg-[#052118]/50 border-emerald-900/40 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={answered}
                        onClick={() => handleQuizAnswer(currentQ.id, idx)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-xs sm:text-sm ${btnStyle}`}
                      >
                        <span className="flex-1">{option}</span>
                        {answered && (
                          <div className="shrink-0">
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-rose-400" />
                            ) : null}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* সঠিক উত্তর ব্যাখ্যা */}
                {hasAnsweredCurrentQ && (
                  <div className="p-4 rounded-xl bg-[#041a13] border border-amber-400/40 text-xs sm:text-sm text-amber-100 animate-fadeIn space-y-1">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      ঐতিহাসিক ব্যাখ্যা:
                    </div>
                    <p className="leading-relaxed font-normal">{currentQ.explanation}</p>
                  </div>
                )}

                {/* পরবর্তী বাটন */}
                {hasAnsweredCurrentQ && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextQuiz}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
                    >
                      <span>
                        {currentQuizIndex < SEERAH_QUIZ_QUESTIONS.length - 1
                          ? 'পরবর্তী প্রশ্ন'
                          : 'ফলাফল দেখুন'}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* কুইজ সমাপ্তি কার্ড */
              <div className="text-center py-6 space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
                  🏆
                </div>

                <div>
                  <h4 className="text-2xl font-black text-amber-200 mb-1">
                    মাশাআল্লাহ! কুইজ সম্পন্ন হয়েছে
                  </h4>
                  <p className="text-sm text-emerald-200">
                    আপনার অর্জিত স্কোর: <span className="font-bold text-amber-300 text-lg">{score}</span> / {SEERAH_QUIZ_QUESTIONS.length}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#052118] border border-emerald-800 text-xs sm:text-sm text-emerald-100 max-w-md mx-auto leading-relaxed">
                  {score >= 4
                    ? 'চমৎকার! প্রিয় নবী ﷺ-এর পবিত্র জীবনী সম্পর্কে আপনার জ্ঞান অত্যন্ত সমৃদ্ধ ও অনুপ্রেরণাদায়ী।'
                    : 'ধন্যবাদ! সিরাতের প্রতিটি ঘটনা থেকে শিক্ষা নিয়ে আমাদের চরিত্র ও কর্মজীবন সুন্দর করার চেষ্টা করি।'}
                </div>

                <button
                  onClick={handleRestartQuiz}
                  className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 border border-amber-400/50 text-amber-200 font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>পুনরায় কুইজ দিন</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* শেষ দোয়া ও বার্তা */}
        <div className="text-center mt-16 pt-8 border-t border-emerald-900/60">
          <p className="text-xs sm:text-sm text-emerald-200/80 font-serif italic">
            اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ
          </p>
          <p className="text-xs text-amber-300/80 mt-1 font-medium">
            "হে আল্লাহ! আপনি মুহাম্মদ ﷺ ও তাঁর পরিবারের ওপর রহমত ও শান্তি বর্ষণ করুন।"
          </p>
        </div>
      </div>
    </section>
  );
};
