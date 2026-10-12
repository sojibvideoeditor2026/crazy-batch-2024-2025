import React, { useState } from 'react';
import {
  Laptop,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Command,
  Lightbulb,
  MousePointer,
  AlertTriangle,
  Send,
  RotateCcw,
  Award,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Info,
  Layers,
  Filter,
  MessageSquarePlus,
  BookOpen
} from 'lucide-react';
import {
  ICT_TOPICS_DATA,
  ICT_QUIZ_QUESTIONS,
  ICT_FAQ_ITEMS,
  DetailedIctTopic,
  IctGuideStep,
  IctQuizQuestion,
  IctFaqItem,
  DifficultyLevel
} from '../data/ictGuideData';
import { playSound } from '../utils/sound';
import { IctTopicOutputPreview } from './IctTopicOutputPreview';

export const IctFearRemoverSection: React.FC = () => {
  // Category & Difficulty Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('সবগুলো');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('সব');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(ICT_TOPICS_DATA[0].id);

  // FAQ Accordion
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Quiz states
  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Ask Friends Help Form (UI only, non-persisted as requested)
  const [friendQuestion, setFriendQuestion] = useState('');
  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  const categories = ['সবগুলো', 'বেসিক', 'অফিস টুলস', 'ক্যারিয়ার ও ইমেইল', 'ইন্টারনেট ও নিরাপত্তা'];

  // Filtered Topics
  const filteredTopics = ICT_TOPICS_DATA.filter((topic) => {
    const matchesCategory = selectedCategory === 'সবগুলো' || topic.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'সব' || topic.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  // Current active topic (fall back if current filtered list doesn't have it)
  const activeTopic =
    ICT_TOPICS_DATA.find((t) => t.id === selectedTopicId) ||
    filteredTopics[0] ||
    ICT_TOPICS_DATA[0];

  const toggleFaq = (id: string) => {
    playSound('pop');
    setExpandedFaq((prev) => (prev === id ? null : id));
  };

  // Quiz handlers
  const handleSelectQuizOption = (qId: number, optIdx: number) => {
    if (quizAnswers[qId] !== undefined) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setShowExplanation(true);

    const isCorrect = optIdx === ICT_QUIZ_QUESTIONS[quizQuestionIdx].correctIndex;
    if (isCorrect) {
      playSound('pop');
    }
  };

  const handleNextQuizQuestion = () => {
    setShowExplanation(false);
    if (quizQuestionIdx < ICT_QUIZ_QUESTIONS.length - 1) {
      setQuizQuestionIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      playSound('cheer');
    }
  };

  const handleRestartQuiz = () => {
    setQuizAnswers({});
    setQuizQuestionIdx(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const quizScore = Object.entries(quizAnswers).reduce((acc, [qId, ansIdx]) => {
    const q = ICT_QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    if (q && q.correctIndex === ansIdx) return acc + 1;
    return acc;
  }, 0);

  const currentQ = ICT_QUIZ_QUESTIONS[quizQuestionIdx];
  const answeredCurrent = quizAnswers[currentQ?.id] !== undefined;

  // Ask Friends Help Form submit
  const handleAskHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendQuestion.trim()) return;
    playSound('cheer');
    setQuestionSubmitted(true);
  };

  return (
    <section
      id="ict-guide"
      className="py-16 sm:py-24 bg-sky-50/90 border-b-4 border-slate-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500 border-2 border-slate-900 text-white font-black text-xs uppercase shadow-comic mb-3 animate-pulse-pop">
            <Laptop className="w-4 h-4 text-yellow-300" />
            <span>প্র্যাকটিক্যাল আইসিটি গাইড • চাকরি ও জীবনের দক্ষতা</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-3 flex-wrap">
            <span>আইসিটি ভয় দূর করি</span>
            <span className="text-3xl sm:text-4xl">💻</span>
          </h2>

          <div className="w-24 h-1.5 bg-slate-900 mx-auto my-4 rounded-full" />

          <p className="text-sm sm:text-base font-bold text-slate-700 leading-relaxed max-w-2xl mx-auto">
            কম্পিউটার কোনো আতঙ্কের নাম নয়; সঠিক কায়দা জানলে এটি আপনার সবচেয়ে বাধ্য ও বিশ্বস্ত বন্ধু!
          </p>
        </div>

        {/* ============================================================== */}
        {/* শুরুতে হাইলাইটেড নোট কার্ড (Required in user prompt) */}
        {/* ============================================================== */}
        <div className="max-w-4xl mx-auto mb-12 transform hover:scale-[1.01] transition-transform">
          <div className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-200 border-4 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-comic-lg relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-15 select-none pointer-events-none">
              🎓
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-300 flex items-center justify-center text-2xl font-black shrink-0 shadow-sm">
                💡
              </div>
              <div>
                <span className="inline-block px-3 py-0.5 rounded-full bg-slate-900 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
                  বাস্তব সত্য ও অনুপ্রেরণা
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-slate-950 leading-snug">
                  "আইসিটি কম্পিউটারের বিষয়, খাতার না! 😄 কিন্তু আমাদের পরীক্ষা হয়েছে খাতায়। তাই আসুন কম্পিউটারের কাজগুলো সত্যিকারভাবে শিখি, যা চাকরি ও জীবনে কাজে লাগবে।"
                </h3>
                <p className="text-xs sm:text-sm font-extrabold text-slate-800 mt-2">
                  — ইসলামের ইতিহাস ও সংস্কৃতি বিভাগ, পাগলা ব্যাচ ২০২৪-২৫
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ফিল্টার বার: ক্যাটাগরি ও কঠিনতার স্তর */}
        {/* ============================================================== */}
        <div className="bg-white rounded-2xl border-2 border-slate-900 p-4 sm:p-5 shadow-comic mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* ক্যাটাগরি ফিল্টার */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
            <span className="text-xs font-black text-slate-700 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> বিষয়:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playSound('pop');
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-black whitespace-nowrap transition-all shadow-comic active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-amber-300'
                    : 'bg-amber-50 hover:bg-amber-100 text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* কঠিনতার স্তর ফিল্টার */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-black text-slate-700">কঠিনতা:</span>
            {['সব', 'সহজ', 'মাঝারি'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  playSound('pop');
                  setSelectedDifficulty(lvl);
                }}
                className={`px-2.5 py-1 rounded-xl border-2 border-slate-900 text-xs font-black transition-all shadow-comic ${
                  selectedDifficulty === lvl
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-800'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* ১০টি টপিকের স্ক্রলেবল ট্যাব বাটন তালিকা */}
        {/* ============================================================== */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {filteredTopics.map((topic: DetailedIctTopic) => {
            const isSelected = topic.id === activeTopic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  playSound('pop');
                  setSelectedTopicId(topic.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border-2 border-slate-900 font-black text-xs sm:text-sm whitespace-nowrap transition-all shadow-comic shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-slate-900 text-amber-300 -translate-y-1'
                    : 'bg-white hover:bg-amber-100 text-slate-900'
                }`}
              >
                <span className="text-base">{topic.iconEmoji}</span>
                <span>{topic.topicNumber}. {topic.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md border ${
                    topic.difficulty === 'সহজ'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}
                >
                  {topic.difficulty}
                </span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* নির্বাচিত টপিকের বিস্তারিত মাস্টার কার্ড */}
        {/* ============================================================== */}
        <div className="bg-white rounded-3xl border-4 border-slate-900 shadow-comic-lg overflow-hidden mb-16">
          {/* কার্ডের হেডার */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-sky-100 via-indigo-50 to-amber-50 border-b-4 border-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-black bg-slate-900 text-amber-300 border-2 border-slate-900">
                  টপিক #{activeTopic.topicNumber}
                </span>
                <span className="px-3 py-1 rounded-xl text-xs font-black bg-white border-2 border-slate-900 text-slate-800">
                  {activeTopic.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-black border-2 border-slate-900 ${
                    activeTopic.difficulty === 'সহজ'
                      ? 'bg-emerald-400 text-slate-950'
                      : 'bg-amber-400 text-slate-950'
                  }`}
                >
                  কঠিনতা: {activeTopic.difficulty}
                </span>
              </div>
              <span className="text-3xl">{activeTopic.iconEmoji}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 mb-2">
              {activeTopic.title}
            </h3>

            <p className="text-xs sm:text-base font-extrabold text-indigo-950 mb-1">
              {activeTopic.funnySubtitle}
            </p>

            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              {activeTopic.summary}
            </p>
          </div>

          {/* ধাপে ধাপে নির্দেশিকা (Steps) */}
          <div className="p-6 sm:p-8 space-y-6">
            <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>ধাপে ধাপে বাস্তব গাইড (১, ২, ৩...)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTopic.steps.map((step: IctGuideStep) => (
                <div
                  key={step.stepNumber}
                  className="bg-amber-50/70 rounded-2xl border-2 border-slate-900 p-5 shadow-comic flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-300 font-black flex items-center justify-center text-sm shadow-sm shrink-0">
                        {step.stepNumber}
                      </div>
                      <h5 className="text-base font-black text-slate-900">
                        {step.stepTitle}
                      </h5>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed mb-3 whitespace-pre-line">
                      {step.instruction}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t-2 border-slate-900/10 text-xs">
                    {step.shortcut && (
                      <div className="flex items-center gap-2 font-black text-indigo-900 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg">
                        <Command className="w-3.5 h-3.5 shrink-0" />
                        <span>শর্টকাট: <span className="bg-white px-1.5 py-0.5 rounded border border-indigo-300 font-mono text-[11px]">{step.shortcut}</span></span>
                      </div>
                    )}

                    {step.proTip && (
                      <div className="flex items-start gap-1.5 text-slate-600 font-medium">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{step.proTip}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ভুল যা সবাই করে (Common Mistake Warning Box) */}
            <div className="mt-8 p-5 rounded-2xl bg-rose-50 border-2 border-rose-500 shadow-comic flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-black text-rose-800 uppercase tracking-wider block mb-1">
                  সতর্কতা ও সাধারণ ভুল
                </span>
                <p className="text-xs sm:text-sm font-bold text-rose-950 leading-relaxed">
                  {activeTopic.commonMistake}
                </p>
              </div>
            </div>

            {/* বোনাস টিপস */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-300 border-2 border-slate-900 font-black text-xs sm:text-sm text-slate-900 shadow-comic flex items-center gap-3">
              <span className="text-xl">🌟</span>
              <span>{activeTopic.bonusAdvice}</span>
            </div>

            {/* ফলাফল দেখো ✨ (কাজ শেষের চূড়ান্ত আউটপুট ও Before/After) */}
            <IctTopicOutputPreview topicId={activeTopic.id} />
          </div>
        </div>

        {/* ============================================================== */}
        {/* সেকশন ৫: ৫ প্রশ্নের ছোট কুইজ ("তুমি কি আইসিটি পাস?") */}
        {/* ============================================================== */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 border-2 border-slate-900 font-bold shadow-comic">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                তুমি কি আইসিটি পাস? 🎓 (৫ প্রশ্নের মেধা যাচাই)
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                কম্পিউটারের বাস্তবিক প্রয়োগ নিয়ে ঝটপট উত্তর দিয়ে নিজের স্কোর দেখুন!
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-white border-4 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-comic-lg relative">
            {!quizFinished ? (
              <div>
                <div className="flex items-center justify-between text-xs font-black text-slate-800 mb-2">
                  <span>প্রশ্ন {quizQuestionIdx + 1} এর {ICT_QUIZ_QUESTIONS.length}</span>
                  <span className="bg-amber-300 px-2 py-0.5 rounded-lg border border-slate-900">
                    স্কোর: {quizScore}
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-900 mb-6">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-300"
                    style={{ width: `${((quizQuestionIdx + 1) / ICT_QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <h4 className="text-base sm:text-lg font-black text-slate-900 mb-5 leading-snug">
                  {currentQ.question}
                </h4>

                <div className="space-y-3 mb-6">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = quizAnswers[currentQ.id] === oIdx;
                    const isCorrect = oIdx === currentQ.correctIndex;
                    let btnStyle = 'bg-white hover:bg-amber-50 border-slate-900 text-slate-900';

                    if (answeredCurrent) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-100 border-emerald-600 text-emerald-950 font-black';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-100 border-rose-600 text-rose-950 font-black';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-300 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={answeredCurrent}
                        onClick={() => handleSelectQuizOption(currentQ.id, oIdx)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-xs sm:text-sm shadow-sm ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-xl bg-slate-900 text-amber-300 flex items-center justify-center text-xs font-black shrink-0">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="font-bold">{opt}</span>
                        </div>
                        {answeredCurrent && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {answeredCurrent && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="p-4 rounded-2xl bg-amber-100 border-2 border-slate-900 text-xs sm:text-sm text-slate-900 mb-6 shadow-sm">
                    <div className="font-black flex items-center gap-1.5 mb-1 text-slate-900">
                      <Info className="w-4 h-4 text-amber-600" /> সঠিক ব্যাখ্যা:
                    </div>
                    <p className="font-semibold text-slate-800">{currentQ.explanation}</p>
                  </div>
                )}

                {answeredCurrent && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-black text-sm flex items-center gap-2 shadow-comic transition-all active:scale-95 border-2 border-slate-900"
                    >
                      <span>
                        {quizQuestionIdx < ICT_QUIZ_QUESTIONS.length - 1 ? 'পরবর্তী প্রশ্ন' : 'ফলাফল দেখুন'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 border-2 border-slate-900 text-slate-950 flex items-center justify-center text-3xl font-black mb-4 shadow-comic">
                  🏆
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-2">
                  কুইজ শেষ! আপনি বাস্তব আইসিটি পারদর্শী!
                </h4>
                <p className="text-base text-emerald-700 font-black mb-4">
                  আপনার অর্জিত স্কোর: {quizScore} / {ICT_QUIZ_QUESTIONS.length}
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-700 max-w-md mx-auto mb-6">
                  {quizScore === 5
                    ? 'চমৎকার! আপনি কম্পিউটার ও অফিস টাস্কে পূর্ণ ১০০% আত্মবিশ্বাসী! 🌟'
                    : quizScore >= 3
                    ? 'বেশ ভালো ফলাফল! মৌলিক বিষয়গুলোতে আপনি বেশ পাকা! 👏'
                    : 'ভালো প্রচেষ্টা! গাইড কার্ডগুলো আরেকবার রিডিং পড়ে পরীক্ষা দিন, পুরো নম্বর পাবেন! 📚'}
                </p>
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm inline-flex items-center gap-2 shadow-comic transition-all active:scale-95 border-2 border-slate-900"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>পুনরায় কুইজ দিন</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* সেকশন ৬: FAQ ("কম্পিউটার ভেঙে গেলে কি হবে? 😄") */}
        {/* ============================================================== */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 border-2 border-slate-900 font-bold shadow-comic">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                FAQ: কম্পিউটার ভেঙে গেলে কী হবে? 😄
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                কম্পিউটার নিয়ে মনের যত অহেতুক ডর-ভয় ও বিভ্রান্তি দূর করার প্রশ্নোত্তর
              </p>
            </div>
          </div>

          <div className="space-y-3.5 max-w-4xl mx-auto">
            {ICT_FAQ_ITEMS.map((faq: IctFaqItem) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border-2 border-slate-900 shadow-comic overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-black text-slate-900 text-sm sm:text-base hover:bg-amber-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-amber-500">❓</span>
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-700 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t-2 border-slate-900/10 bg-amber-50/50">
                      <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed mb-3">
                        {faq.answer}
                      </p>
                      <div className="inline-block px-3 py-1 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-black">
                        {faq.funReaction}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* সেকশন ৭: "বন্ধুদের সাহায্য চাও" বাটন ও ফর্ম (UI Only) */}
        {/* ============================================================== */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-900 to-slate-950 border-4 border-slate-900 rounded-3xl p-6 sm:p-8 shadow-comic-lg text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-xl font-black shadow-comic shrink-0">
              🤝
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-amber-300">
                বন্ধুদের সাহায্য চাও
              </h4>
              <p className="text-xs text-slate-300 font-medium">
                কোনো সফটওয়্যার বা অ্যাসাইনমেন্টের সমস্যা আটকে গেছেন? এখানে লিখে জানান!
              </p>
            </div>
          </div>

          {!questionSubmitted ? (
            <form onSubmit={handleAskHelpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-200 mb-1.5">
                  তোমার আইসিটি প্রশ্ন বা কী শিখতে চাও তা লিখো:
                </label>
                <textarea
                  rows={3}
                  value={friendQuestion}
                  onChange={(e) => setFriendQuestion(e.target.value)}
                  placeholder="যেমন: ভাইয়া, এক্সেলে মার্কশিট বানাতে পারছি না, কেউ একটু বুঝিয়ে দেবে?"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-semibold resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                <span className="text-[11px] text-amber-200/80 font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> পাগলা ব্যাচের যে কেউ সাহায্য করতে প্রস্তুত!
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-comic transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>সাহায্য পোস্ট করুন</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-950/80 border-2 border-emerald-400 text-center animate-fadeIn">
              <div className="text-3xl mb-2">🎉</div>
              <h5 className="text-lg font-black text-emerald-300 mb-1">
                প্রশ্নটি সফলভাবে পাঠানো হয়েছে!
              </h5>
              <p className="text-xs text-slate-200 mb-4 font-medium">
                "{friendQuestion}" — ব্যাচের বন্ধুরা এটি দেখতে পাবে এবং ক্লাসরুমে সমাধান করে দেবে!
              </p>
              <button
                onClick={() => {
                  setFriendQuestion('');
                  setQuestionSubmitted(false);
                }}
                className="px-4 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shadow-comic"
              >
                আরেকটি প্রশ্ন লিখুন
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
