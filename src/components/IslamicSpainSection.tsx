import React, { useState } from 'react';
import {
  Landmark,
  Calendar,
  BookOpen,
  HelpCircle,
  Sparkles,
  MapPin,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  SPAIN_TIMELINE,
  HISTORIC_CITIES,
  FAMOUS_SCHOLARS,
  DID_YOU_KNOW_FACTS,
  SPAIN_QUIZ_QUESTIONS,
  TimelineEvent,
  IslamicSpainCity,
  IslamicScholar,
  SpainQuizQuestion
} from '../data/islamicSpainData';
import { playSound } from '../utils/sound';

export const IslamicSpainSection: React.FC = () => {
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Active City Modal / Selection
  const [activeCity, setActiveCity] = useState<IslamicSpainCity>(HISTORIC_CITIES[0]);

  const handleSelectOption = (qId: number, optionIdx: number) => {
    if (selectedAnswers[qId] !== undefined) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setShowExplanation(true);

    const isCorrect = optionIdx === SPAIN_QUIZ_QUESTIONS[currentQuestionIndex].correctIndex;
    if (isCorrect) {
      playSound('pop');
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < SPAIN_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      playSound('cheer');
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  // Calculate score
  const score = Object.entries(selectedAnswers).reduce((acc, [qId, ansIdx]) => {
    const q = SPAIN_QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    if (q && q.correctIndex === ansIdx) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const currentQ = SPAIN_QUIZ_QUESTIONS[currentQuestionIndex];
  const answeredCurrent = selectedAnswers[currentQ?.id] !== undefined;

  return (
    <section
      id="islamic-spain"
      className="py-16 sm:py-24 bg-gradient-to-b from-amber-950 via-slate-900 to-amber-950 text-slate-100 border-b-4 border-slate-900 relative overflow-hidden"
    >
      {/* Background Islamic Geometric Pattern Accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-300 font-black text-xs uppercase tracking-wider shadow-comic mb-4 animate-pulse-pop">
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>ইতিহাসের সোনালী অধ্যায় (৭১১ – ১৪৯২ খ্রিষ্টাব্দ)</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-sm flex items-center justify-center gap-3 flex-wrap">
            <span>ইসলামের ইতিহাস ও স্পেন</span>
            <span className="text-amber-400 text-4xl">🕌</span>
          </h2>

          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto my-4 rounded-full" />

          <p className="text-sm sm:text-base font-medium text-amber-100/90 leading-relaxed max-w-2xl mx-auto">
            প্রায় ৭৮১ বছরের জ্ঞান-বিজ্ঞান, দর্শন, চিকিৎসা ও স্থাপত্যের অবিস্মরণীয় সভ্যতা আন্দালুসিয়া (Al-Andalus)। ইউরোপ যখন অন্ধকারে নিমজ্জিত, কর্ডোবা ও গ্রানাডা তখন ছিল গোটা বিশ্বের বাতিঘর।
          </p>
        </div>

        {/* ============================================================== */}
        {/* অংশ ১: ঐতিহাসিক টাইমলাইন (৭১১-১৪৯২ খ্রিষ্টাব্দ) */}
        {/* ============================================================== */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 border-2 border-amber-300 font-bold shadow-comic">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-amber-300 tracking-tight">
                স্পেনে মুসলিম শাসনের ঐতিহাসিক টাইমলাইন (৭১১ – ১৪৯২)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                তারিক বিন জিয়াদের আগমন থেকে গ্রানাডার শেষ প্রতিরোধ পর্যন্ত প্রধান মাইলফলকসমূহ
              </p>
            </div>
          </div>

          <div className="relative border-l-2 sm:border-l-4 border-amber-500/40 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-10">
            {SPAIN_TIMELINE.map((item: TimelineEvent, idx: number) => (
              <div
                key={idx}
                className="relative group bg-slate-900/90 border-2 border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 sm:p-6 transition-all shadow-xl hover:-translate-y-1 hover:shadow-amber-500/10"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[35px] sm:-left-[53px] top-5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-400 border-2 sm:border-4 border-slate-950 flex items-center justify-center text-[10px] sm:text-xs font-black text-slate-950 shadow-md">
                  {idx + 1}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 font-black text-xs sm:text-sm tracking-wide">
                    {item.year}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ঐতিহাসিক ঘটনা
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors mb-2">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-slate-800 text-[11px] sm:text-xs text-amber-200/90 font-medium flex items-start gap-1.5">
                  <span className="font-bold text-amber-400 shrink-0">ঐতিহাসিক গুরুত্ব:</span>
                  <span>{item.significance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* অংশ ২: কর্ডোবা, গ্রানাডা ও সেভিলের বিশদ কার্ড */}
        {/* ============================================================== */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 border-2 border-amber-300 font-bold shadow-comic">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-amber-300 tracking-tight">
                তিন ঐতিহাসিক নগরী: কর্ডোবা, গ্রানাডা ও সেভিল
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                আন্দালুসের স্থাপত্যকলা, জ্ঞানচর্চা ও সোনালী সভ্যতার তিনটি প্রাণকেন্দ্র
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {HISTORIC_CITIES.map((city: IslamicSpainCity) => (
              <div
                key={city.id}
                className="bg-slate-900/90 rounded-2xl border-2 border-amber-500/40 hover:border-amber-400 overflow-hidden flex flex-col transition-all hover:-translate-y-1.5 shadow-2xl group"
              >
                {/* Header Banner */}
                <div className={`p-6 bg-gradient-to-r ${city.accentColor} text-white border-b-2 border-amber-500/30`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold tracking-widest text-amber-200 uppercase">
                      {city.nameEn}
                    </span>
                    <span className="text-lg font-serif text-amber-200/90" dir="rtl">
                      {city.nameAr}
                    </span>
                  </div>
                  <h4 className="text-2xl font-black tracking-tight text-white mb-1">
                    {city.nameBn}
                  </h4>
                  <p className="text-xs font-medium text-amber-100/90">
                    {city.tagline}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h5 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> প্রধান দর্শনীয় ও স্থাপত্য
                    </h5>
                    <ul className="space-y-1.5 mb-4">
                      {city.monuments.map((m, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-amber-400 text-xs mt-0.5">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>

                    <h5 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1.5">
                      ঐতিহাসিক গুরুত্ব
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {city.historicalRole}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
                    <span className="font-bold text-amber-400 block mb-0.5">🌟 সোনালী অধ্যায়ের উজ্জ্বল নিদর্শন:</span>
                    {city.goldenEraHighlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* অংশ ৩: আন্দালুসের বিখ্যাত ব্যক্তিবর্গ */}
        {/* ============================================================== */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 border-2 border-amber-300 font-bold shadow-comic">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-amber-300 tracking-tight">
                আন্দালুসের অমর দিকপাল ও চিন্তাবিদগণ
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                বিজ্ঞানী, দার্শনিক, চিকিৎসক ও সেনাপতি যাঁদের উদ্ভাবনে আলোকিত হয়েছিল গোটা বিশ্ব
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FAMOUS_SCHOLARS.map((scholar: IslamicScholar) => (
              <div
                key={scholar.id}
                className="bg-slate-900/90 rounded-2xl border-2 border-amber-500/30 hover:border-amber-400 p-5 sm:p-6 transition-all hover:-translate-y-1 shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                        {scholar.nameBn}
                      </h4>
                      <p className="text-xs text-amber-400/90 font-semibold">
                        {scholar.years}
                      </p>
                    </div>
                    <span className="text-sm font-serif text-amber-300/60" dir="rtl">
                      {scholar.nameAr}
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold">
                      {scholar.field}
                    </span>
                  </div>

                  <p className="text-xs text-amber-200 font-medium mb-2">
                    ⭐ <span className="font-bold">{scholar.knownFor}</span>
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {scholar.contribution}
                  </p>
                </div>

                {scholar.famousBook && (
                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><span className="text-amber-300 font-semibold">বিখ্যাত গ্রন্থ:</span> {scholar.famousBook}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* অংশ ৪: "আপনি কি জানতেন?" তথ্য (Did You Know?) */}
        {/* ============================================================== */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 border-2 border-amber-300 font-bold shadow-comic">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-amber-300 tracking-tight">
                আপনি কি জানতেন? (আন্দালুসের রোমাঞ্চকর তথ্য)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                ইতিহাসের পাতা থেকে নির্ভরযোগ্য ও বিস্ময়কর কিছু তথ্য
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DID_YOU_KNOW_FACTS.map((item, idx) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-amber-950/60 to-slate-900 border-2 border-amber-500/30 hover:border-amber-400/80 rounded-2xl p-5 sm:p-6 transition-all hover:scale-[1.02] shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-xs font-black">
                      #{idx + 1}
                    </span>
                    <span className="text-xl">💡</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {item.fact}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-amber-300/80 font-mono">
                  {item.sourceNote}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* অংশ ৫: ৫ প্রশ্নের ঐতিহাসিক কুইজ (Spain Quiz) */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 border-2 border-amber-300 font-bold shadow-comic">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-amber-300 tracking-tight">
                স্পেনের ইতিহাস মেধা যাচাই (৫টি সংক্ষিপ্ত প্রশ্ন)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                স্পেনের মুসলিম ঐতিহ্য নিয়ে আপনার জ্ঞান যাচাই করে দেখুন!
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-slate-900/95 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            {!quizFinished ? (
              <div>
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-2">
                  <span>প্রশ্ন {currentQuestionIndex + 1} এর {SPAIN_QUIZ_QUESTIONS.length}</span>
                  <span>স্কোর: {score} / {Object.keys(selectedAnswers).length}</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / SPAIN_QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                {/* Question Text */}
                <h4 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                  {currentQ.question}
                </h4>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[currentQ.id] === oIdx;
                    const isCorrect = oIdx === currentQ.correctIndex;
                    let btnClass = 'border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200';

                    if (answeredCurrent) {
                      if (isCorrect) {
                        btnClass = 'border-emerald-500 bg-emerald-950/80 text-emerald-200 font-bold';
                      } else if (isSelected) {
                        btnClass = 'border-rose-500 bg-rose-950/80 text-rose-200 font-bold';
                      } else {
                        btnClass = 'border-slate-800 bg-slate-900/60 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={answeredCurrent}
                        onClick={() => handleSelectOption(currentQ.id, oIdx)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-xs sm:text-sm ${btnClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-black shrink-0">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {answeredCurrent && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        {answeredCurrent && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <div className="p-4 rounded-xl bg-amber-950/50 border border-amber-500/40 text-xs sm:text-sm text-amber-200 mb-6 animate-fadeIn">
                    <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-300">
                      <Info className="w-4 h-4" /> ব্যাখ্যা:
                    </div>
                    <p>{currentQ.explanation}</p>
                  </div>
                )}

                {/* Next Button */}
                {answeredCurrent && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-comic transition-all active:scale-95"
                    >
                      <span>
                        {currentQuestionIndex < SPAIN_QUIZ_QUESTIONS.length - 1 ? 'পরবর্তী প্রশ্ন' : 'ফলাফল দেখুন'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Finished View */
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-3xl font-black mb-4 shadow-comic">
                  🏆
                </div>
                <h4 className="text-2xl font-black text-white mb-2">
                  কুইজ সম্পন্ন হয়েছে!
                </h4>
                <p className="text-base text-amber-300 font-bold mb-4">
                  আপনার মোট স্কোর: {score} / {SPAIN_QUIZ_QUESTIONS.length}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
                  {score === 5
                    ? 'অসাধারণ! আপনি স্পেনের মুসলিম ইতিহাস সম্পর্কে অত্যন্ত দক্ষ ও ওয়াকিবহাল! 🌟'
                    : score >= 3
                    ? 'বেশ ভালো করেছেন! ইতিহাসের অনেক গুরুত্বপূর্ণ তথ্য আপনার জানা আছে! 👏'
                    : 'ভালো প্রচেষ্টা! টাইমলাইন ও পণ্ডিতদের পরিচিতি আরেকবার পড়ে নিলে পূর্ণ নম্বর পাবেন! 📚'}
                </p>
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm inline-flex items-center gap-2 shadow-comic transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>পুনরায় কুইজ দিন</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
