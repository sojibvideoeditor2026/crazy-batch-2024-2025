import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  BarChart3,
  Mail,
  FileText,
  Sliders,
  ShieldCheck,
  ShieldAlert,
  Send,
  Eye,
  RefreshCw,
  Award,
  Folder,
  FolderOpen,
  Lock,
  Globe,
  UploadCloud,
  Check,
  AlertCircle,
  FileCheck,
  Bot,
  UserCheck
} from 'lucide-react';
import { playSound } from '../utils/sound';

interface IctTopicOutputPreviewProps {
  topicId: string;
}

export const IctTopicOutputPreview: React.FC<IctTopicOutputPreviewProps> = ({ topicId }) => {
  // -------------------------------------------------------------
  // 1. EXCEL INTERACTIVE MARKSHEET
  // -------------------------------------------------------------
  const [banglaScore, setBanglaScore] = useState<number>(78);
  const [englishScore, setEnglishScore] = useState<number>(65);
  const [historyScore, setHistoryScore] = useState<number>(85);
  const [ictScore, setIctScore] = useState<number>(92);

  const totalSum = Number(banglaScore || 0) + Number(englishScore || 0) + Number(historyScore || 0) + Number(ictScore || 0);
  const avgScore = Math.round((totalSum / 4) * 10) / 10;
  
  const calculateGrade = (avg: number) => {
    if (avg >= 80) return { grade: 'A+', text: 'অসাধারণ (GPA 5.00)', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
    if (avg >= 70) return { grade: 'A', text: 'চমৎকার (GPA 4.00)', color: 'text-blue-700 bg-blue-100 border-blue-300' };
    if (avg >= 60) return { grade: 'A-', text: 'ভালো (GPA 3.50)', color: 'text-indigo-700 bg-indigo-100 border-indigo-300' };
    if (avg >= 50) return { grade: 'B', text: 'মোটামুটি (GPA 3.00)', color: 'text-amber-700 bg-amber-100 border-amber-300' };
    if (avg >= 40) return { grade: 'C', text: 'উত্তীর্ণ (GPA 2.00)', color: 'text-orange-700 bg-orange-100 border-orange-300' };
    return { grade: 'F', text: 'ফেল (Fail)', color: 'text-rose-700 bg-rose-100 border-rose-300' };
  };

  const gradeInfo = calculateGrade(avgScore);

  // -------------------------------------------------------------
  // 2. LIVE INTERACTIVE CV BUILDER PREVIEW
  // -------------------------------------------------------------
  const [cvName, setCvName] = useState('সজীব রানা');
  const [cvTitle, setCvTitle] = useState('ইসলামের ইতিহাস ও সংস্কৃতি শিক্ষার্থী');
  const [cvEmail, setCvEmail] = useState('sojib.rana@gmail.com');
  const [cvPhone, setCvPhone] = useState('+880 1712-345678');
  const [cvEducation, setCvEducation] = useState('বি.এ (সম্মান), ৪র্থ বর্ষ (সেশন: ২০২০-২১)');
  const [cvSkills, setCvSkills] = useState('MS Word, Excel, গবেষণা, বাংলা ও ইংরেজি টাইপিং');
  const [cvTemplate, setCvTemplate] = useState<'modern' | 'minimal' | 'bold'>('modern');

  // -------------------------------------------------------------
  // 3. EMAIL COMPOSER & COMPARISON
  // -------------------------------------------------------------
  const [emailTo, setEmailTo] = useState('teacher.history@college.edu.bd');
  const [emailSubject, setEmailSubject] = useState('ইসলামের ইতিহাস ৪র্থ বর্ষ অ্যাসাইনমেন্ট জমা - সজীব রানা (রোল: ১০৫)');
  const [emailGreeting, setEmailGreeting] = useState('শ্রদ্ধেয় স্যার, আসসালামু আলাইকুম।');
  const [emailBody, setEmailBody] = useState('আমার স্পেনের কর্ডোবা খেলাফত বিষয়ের অ্যাসাইনমেন্টের চূড়ান্ত PDF কপিটি নিচে সংযুক্ত করা হলো। দয়া করে গ্রহণ করবেন।');
  const [showEmailComparison, setShowEmailComparison] = useState(false);

  // -------------------------------------------------------------
  // 4. PASSWORD STRENGTH CHECKER
  // -------------------------------------------------------------
  const [testPassword, setTestPassword] = useState('');

  const evaluatePassword = (pass: string) => {
    if (!pass) return { score: 0, text: 'পাসওয়ার্ড লিখুন', color: 'bg-slate-200 text-slate-600', tips: [] };
    let score = 0;
    const tips: string[] = [];

    if (pass.length >= 8) score += 25;
    else tips.push('কমপক্ষে ৮ অক্ষর লম্বা করুন');

    if (pass.length >= 12) score += 15;

    if (/[A-Z]/.test(pass)) score += 20;
    else tips.push('বড় হাতের অক্ষর (A-Z) দিন');

    if (/[0-9]/.test(pass)) score += 20;
    else tips.push('সংখ্যা (0-9) যোগ করুন');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score += 20;
    else tips.push('চিহ্ন (@, #, $) দিন');

    const finalScore = Math.min(score, 100);

    if (finalScore >= 80) return { score: finalScore, text: '💪 অত্যন্ত শক্তিশালী (Super Strong)', color: 'bg-emerald-500 text-white', tips };
    if (finalScore >= 55) return { score: finalScore, text: '🟡 মাঝারি (Moderate)', color: 'bg-amber-500 text-slate-950', tips };
    return { score: Math.max(finalScore, 15), text: '🔴 অত্যন্ত দুর্বল (Very Weak)', color: 'bg-rose-500 text-white', tips };
  };

  const passResult = evaluatePassword(testPassword);

  // -------------------------------------------------------------
  // 5. GOOGLE DRIVE PERMISSION SIMULATOR
  // -------------------------------------------------------------
  const [drivePermission, setDrivePermission] = useState<'restricted' | 'anyone'>('restricted');

  // -------------------------------------------------------------
  // 6. TELETALK JOB PHOTO RESIZER SIMULATOR
  // -------------------------------------------------------------
  const [photoWidth, setPhotoWidth] = useState(300);
  const [photoHeight, setPhotoHeight] = useState(300);
  const [signWidth, setSignWidth] = useState(300);
  const [signHeight, setSignHeight] = useState(80);

  // -------------------------------------------------------------
  // 7. DESKTOP FOLDER CLEANUP TOGGLE
  // -------------------------------------------------------------
  const [showCleanDesktop, setShowCleanDesktop] = useState(false);

  // -------------------------------------------------------------
  // 8. AI STUDY PROMPT SIMULATOR
  // -------------------------------------------------------------
  const [activeAiTab, setActiveAiTab] = useState<'bad' | 'good'>('good');

  return (
    <div className="mt-8 pt-8 border-t-4 border-slate-900 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-300 p-4 rounded-2xl border-2 border-slate-900 shadow-comic">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-300 flex items-center justify-center font-black">
            ✨
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-950 flex items-center gap-1.5">
              <span>ফলাফল দেখো ✨</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-slate-900">
                লাইভ আউটপুট
              </span>
            </h4>
            <p className="text-xs text-slate-800 font-bold">
              বাস্তবে কাজ সম্পন্ন হওয়ার পর চূড়ান্ত রূপটি কেমন দেখায় তা নিজের চোখে দেখুন (Before / After সহ)
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 border-2 border-slate-900 text-white font-black text-xs shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-100" />
          <span>✅ বাস্তব রূপ</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. TOPIC: COMPUTER BASICS & FOLDER MANAGEMENT */}
      {/* ============================================================== */}
      {topicId === 'computer-basics' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-slate-900 shadow-comic-lg text-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-wider block">
                🖥️ ডেস্কটপ ও ফাইল ব্যবস্থাপনা
              </span>
              <h5 className="text-xl sm:text-2xl font-black text-slate-900">
                অগোছালো ডেস্কটপ বনাম সাজানো ফোল্ডার স্ট্রাকচার
              </h5>
            </div>

            <button
              onClick={() => {
                playSound('pop');
                setShowCleanDesktop(!showCleanDesktop);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-comic transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{showCleanDesktop ? 'অগোছালো রূপ দেখুন (Before)' : 'সাজানো রূপ দেখুন (After)'}</span>
            </button>
          </div>

          {!showCleanDesktop ? (
            /* Before: Cluttered Desktop */
            <div className="bg-rose-50 p-5 rounded-2xl border-2 border-rose-400">
              <div className="flex items-center gap-2 text-rose-800 font-black text-sm mb-3">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>❌ অগোছালো ডেস্কটপ (বিপদে পড়ার খাঁটি উপায়)</span>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-rose-300 text-white min-h-[170px] relative overflow-hidden flex flex-wrap content-start gap-4">
                <div className="flex flex-col items-center w-14 text-center">
                  <span className="text-2xl">📄</span>
                  <span className="text-[10px] text-slate-300 truncate w-full">doc12.docx</span>
                </div>
                <div className="flex flex-col items-center w-14 text-center">
                  <span className="text-2xl">🖼️</span>
                  <span className="text-[10px] text-slate-300 truncate w-full">IMG_3849.jpg</span>
                </div>
                <div className="flex flex-col items-center w-14 text-center">
                  <span className="text-2xl">📁</span>
                  <span className="text-[10px] text-slate-300 truncate w-full">New folder (4)</span>
                </div>
                <div className="flex flex-col items-center w-14 text-center">
                  <span className="text-2xl">📄</span>
                  <span className="text-[10px] text-slate-300 truncate w-full">final_final2.pdf</span>
                </div>
                <div className="flex flex-col items-center w-14 text-center">
                  <span className="text-2xl">📄</span>
                  <span className="text-[10px] text-slate-300 truncate w-full">assignment_real.docx</span>
                </div>
                <div className="flex flex-col items-center w-14 text-center">
                  <span className="text-2xl">📊</span>
                  <span className="text-[10px] text-slate-300 truncate w-full">Book1.xlsx</span>
                </div>
                <div className="flex flex-col items-center w-14 text-center">
                  <span className="text-2xl">📁</span>
                  <span className="text-[10px] text-slate-300 truncate w-full">xyz_data</span>
                </div>
              </div>
              <p className="text-xs text-rose-900 mt-3 font-semibold">
                ⚠️ শিক্ষকের সামনে দরকারি ফাইল খুঁজতে ২০ মিনিট কেটে যাবে এবং গুরুত্বপূর্ণ নথি হারিয়ে যাওয়ার তীব্র ঝুঁকি থাকে।
              </p>
            </div>
          ) : (
            /* After: Beautiful Folder Hierarchy */
            <div className="bg-emerald-50 p-5 rounded-2xl border-2 border-emerald-500">
              <div className="flex items-center gap-2 text-emerald-800 font-black text-sm mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>✅ পরিচ্ছন্ন ও সুশৃঙ্খল ক্যাটাগরি (১ সেকেন্ডে যে কোনো ফাইল খুঁজে পাবেন)</span>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-emerald-300 text-white space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-300 pb-2 border-b border-slate-700">
                  <FolderOpen className="w-4 h-4 text-amber-400" />
                  <span>D:\History_Dept_Academic_Records\</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700 flex items-center gap-2.5">
                    <Folder className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-black text-white">01_ক্লাস_নোটস</div>
                      <div className="text-[10px] text-slate-400">১০টি PDF ফাইল</div>
                    </div>
                  </div>
                  <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700 flex items-center gap-2.5">
                    <Folder className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-black text-white">02_অ্যাসাইনমেন্ট</div>
                      <div className="text-[10px] text-slate-400">স্পেন_ইতিহাস.pdf</div>
                    </div>
                  </div>
                  <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700 flex items-center gap-2.5">
                    <Folder className="w-6 h-6 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-black text-white">03_সিভি_ও_সার্টিফিকেট</div>
                      <div className="text-[10px] text-slate-400">CV_Sojib_Rana.pdf</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-emerald-900 mt-3 font-semibold">
                🌟 শর্টকাট <strong>Ctrl + Shift + N</strong> চেপে মাত্র ৩০ সেকেন্ডে এই রকম ফোল্ডার তৈরি করে সাজিয়ে নেওয়া যায়।
              </p>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. TOPIC: MS WORD ASSIGNMENT */}
      {/* ============================================================== */}
      {topicId === 'ms-word-assignment' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-slate-900 shadow-comic-lg text-slate-900">
          <div className="mb-6">
            <span className="text-xs font-black text-blue-600 uppercase tracking-wider block">
              📝 বিফোর / আফটার তুলনা
            </span>
            <h5 className="text-xl sm:text-2xl font-black text-slate-900">
              সাধারণ এলোমেলো লেখা বনাম পেশাদার অ্যাসাইনমেন্ট
            </h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-rose-50 p-5 rounded-2xl border-2 border-rose-400 shadow-sm">
              <div className="flex items-center gap-2 text-rose-800 font-black text-sm mb-3">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>❌ সাজানো ছাড়া (Before)</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-rose-200 text-xs text-slate-600 font-sans space-y-2">
                <p className="font-normal text-left">স্পেনে মুসলিম শাসন</p>
                <p className="text-[11px] leading-tight">
                  ৭১১ সালে তারিক বিন জিয়াদ স্পেনে যান। তিনি স্পেনে গিয়ে যুদ্ধ করেন। অনেক বছর মুসলিমরা শাসন করেছিল। কর্ডোবা অনেক বড় শহর ছিল।
                </p>
                <div className="text-[10px] text-slate-400 italic">
                  [কোনো মার্জিন নেই, ছোট-বড় ফন্ট নেই, প্যারাগ্রাফ এলোমেলো, কোনো পেজ নম্বর নেই]
                </div>
              </div>
              <p className="text-xs text-rose-900 mt-3 font-semibold">
                এভাবে জমা দিলে কোনো শিক্ষক আগ্রহ নিয়ে পড়বেন না এবং পরীক্ষার গ্রেড কমে যায়।
              </p>
            </div>

            {/* After */}
            <div className="bg-emerald-50 p-5 rounded-2xl border-2 border-emerald-500 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-800 font-black text-sm mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>✅ মার্জিত ফরম্যাট (After)</span>
              </div>
              <div className="bg-white p-5 rounded-xl border-2 border-emerald-300 text-xs text-slate-800 space-y-2.5 shadow-sm">
                <div className="text-center border-b pb-2">
                  <h6 className="font-black text-sm text-slate-950">
                    স্পেনে মুসলিম শাসনের ঐতিহাসিক তাৎপর্য (৭১১–১৪৯২)
                  </h6>
                  <span className="text-[10px] text-indigo-700 font-bold">
                    উপস্থাপনায়: সজীব রানা | রোল: ১০৫ | শিক্ষাবর্ষ: ২০২০-২১
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-justify indent-4">
                  ৭১১ খ্রিষ্টাব্দে সেনাপতি <strong>তারিক বিন জিয়াদের</strong> ঐতিহাসিক অভিযানের মাধ্যমে আইবেরীয় উপদ্বীপে আন্দালুসিয়া সভ্যতার সূচনা ঘটে। কর্ডোবা খেলাফতের সময় এটি ইউরোপের সর্বপ্রধান জ্ঞান ও দর্শনের কেন্দ্রে পরিণত হয়...
                </p>
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-t pt-1 font-mono">
                  <span>A4 মাপ | ১ ইঞ্চি মার্জিন | Justify</span>
                  <span>পৃষ্ঠা নং: ০১</span>
                </div>
              </div>
              <p className="text-xs text-emerald-900 mt-3 font-semibold">
                পেশাদার মার্জিন, শিরোনাম, ভূমিকা ও পেজ নম্বর দেখে পরীক্ষক ১০-এ ৯ দিতে বাধ্য হবেন!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. TOPIC: MS EXCEL DETAILED FORMULAS */}
      {/* ============================================================== */}
      {topicId === 'ms-excel-detailed' && (
        <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 border-4 border-slate-900 shadow-comic-lg text-white">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <BarChart3 className="w-4 h-4" /> এক্সেল লাইভ ফর্মুলা ক্যালকুলেটর
              </span>
              <h5 className="text-xl font-black text-white">
                স্বয়ংক্রিয় মার্কশিট ও ফলাফল চার্ট
              </h5>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              =SUM(), =AVERAGE(), =IF()
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-6 font-medium">
            নিচের যেকোনো বিষয়ের নম্বরে ক্লিক করে পরিবর্তন করুন (যেমন: ৫০ বা ৯৫ লিখুন)। দেখুন মোট, গড় ও গ্রেড নিজে নিজে পরিবর্তিত হচ্ছে!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input & Table (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="overflow-x-auto rounded-2xl border-2 border-slate-700 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-800 text-amber-300 font-black border-b border-slate-700">
                    <tr>
                      <th className="p-3">বিষয় (Subject)</th>
                      <th className="p-3">প্রাপ্ত নম্বর (Marks)</th>
                      <th className="p-3">অবস্থা</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="p-3 font-semibold">বাংলা (Bangla)</td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={banglaScore}
                          onChange={(e) => setBanglaScore(Math.max(0, Math.min(100, Number(e.target.value))))}
                          className="w-16 px-2 py-1 bg-slate-800 text-amber-300 font-bold rounded border border-slate-600 focus:border-amber-400 outline-none"
                        />
                      </td>
                      <td className="p-3 text-emerald-400 font-bold">{banglaScore >= 40 ? '✓ পাস' : '✗ ফেল'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">ইংরেজি (English)</td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={englishScore}
                          onChange={(e) => setEnglishScore(Math.max(0, Math.min(100, Number(e.target.value))))}
                          className="w-16 px-2 py-1 bg-slate-800 text-amber-300 font-bold rounded border border-slate-600 focus:border-amber-400 outline-none"
                        />
                      </td>
                      <td className="p-3 text-emerald-400 font-bold">{englishScore >= 40 ? '✓ পাস' : '✗ ফেল'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">ইসলামের ইতিহাস (History)</td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={historyScore}
                          onChange={(e) => setHistoryScore(Math.max(0, Math.min(100, Number(e.target.value))))}
                          className="w-16 px-2 py-1 bg-slate-800 text-amber-300 font-bold rounded border border-slate-600 focus:border-amber-400 outline-none"
                        />
                      </td>
                      <td className="p-3 text-emerald-400 font-bold">{historyScore >= 40 ? '✓ পাস' : '✗ ফেল'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">আইসিটি (ICT)</td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={ictScore}
                          onChange={(e) => setIctScore(Math.max(0, Math.min(100, Number(e.target.value))))}
                          className="w-16 px-2 py-1 bg-slate-800 text-amber-300 font-bold rounded border border-slate-600 focus:border-amber-400 outline-none"
                        />
                      </td>
                      <td className="p-3 text-emerald-400 font-bold">{ictScore >= 40 ? '✓ পাস' : '✗ ফেল'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Formula calculations bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-center">
                  <div className="text-[10px] text-slate-400 font-mono">=SUM(B2:B5)</div>
                  <div className="text-xl font-black text-amber-300 mt-0.5">{totalSum}</div>
                  <div className="text-[11px] text-slate-300 font-bold">মোট নম্বর</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-center">
                  <div className="text-[10px] text-slate-400 font-mono">=AVERAGE(B2:B5)</div>
                  <div className="text-xl font-black text-cyan-300 mt-0.5">{avgScore}</div>
                  <div className="text-[11px] text-slate-300 font-bold">গড় নম্বর</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-center">
                  <div className="text-[10px] text-slate-400 font-mono">=IF(গড়&gt;=৪০)</div>
                  <div className="text-xl font-black text-emerald-300 mt-0.5">{gradeInfo.grade}</div>
                  <div className="text-[11px] text-slate-300 font-bold">চূড়ান্ত গ্রেড</div>
                </div>
              </div>
            </div>

            {/* Visual Dynamic Bar Chart (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border-2 border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-amber-400 block mb-3 uppercase tracking-wider">
                  📊 ফলাফল বার চার্ট (Insert Chart)
                </span>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>বাংলা</span>
                      <span className="text-amber-300">{banglaScore}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${banglaScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>ইংরেজি</span>
                      <span className="text-amber-300">{englishScore}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${englishScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>ইতিহাস</span>
                      <span className="text-amber-300">{historyScore}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${historyScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span>আইসিটি</span>
                      <span className="text-amber-300">{ictScore}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 transition-all duration-300" style={{ width: `${ictScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`mt-5 p-3 rounded-xl border text-center ${gradeInfo.color}`}>
                <div className="text-xs font-black uppercase">ফলাফল মূল্যায়ন</div>
                <div className="text-sm font-black">{gradeInfo.text}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. TOPIC: POWERPOINT PRESENTATION */}
      {/* ============================================================== */}
      {topicId === 'powerpoint-presentation' && (
        <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 border-4 border-slate-900 shadow-comic-lg text-white">
          <div className="mb-6">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
              📽️ প্রেজেন্টেশন ডিজাইন তুলনা
            </span>
            <h5 className="text-xl sm:text-2xl font-black text-white">
              বাজে স্লাইড বনাম সফল স্লাইড
            </h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bad Slide */}
            <div className="bg-rose-950/80 p-5 rounded-2xl border-2 border-rose-500">
              <div className="flex items-center gap-2 text-rose-400 font-black text-sm mb-3">
                <XCircle className="w-5 h-5 text-rose-400" />
                <span>❌ ভুল স্লাইড (পুরো বইয়ের পাতা কপি)</span>
              </div>
              <div className="aspect-video bg-yellow-200 text-rose-800 p-3 rounded-xl border border-rose-400 text-[10px] leading-tight overflow-hidden">
                <h6 className="font-black text-blue-800 text-xs mb-1">কর্ডোবার ইতিহাস</h6>
                <p>
                  কর্ডোবা ছিল ইউরোপের সবচেয়ে উন্নত শহর যেখানে প্রায় ৫ লক্ষ মানুষ বাস করত এবং রাতে রাস্তায় বাতি জ্বলত আর প্রচুর বই ছিল যা মানুষ পড়ত এবং আবদুর রহমান সেখানে মসজিদ বানিয়েছিলেন যা মেসকিটা নামে পরিচিত এবং সেখানে ৮৫০টি মার্বেল স্তম্ভ ছিল... (বিশাল প্যারাগ্রাফ)!
                </p>
              </div>
              <p className="text-xs text-rose-300 mt-3 font-semibold">
                ❌ ছোট ফন্ট, চোখের জন্য কষ্টদায়ক রঙ এবং দর্শক পড়ার আগেই বিরক্ত হয়ে যাবে।
              </p>
            </div>

            {/* Good Slide */}
            <div className="bg-emerald-950/80 p-5 rounded-2xl border-2 border-emerald-500">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>✅ সেরা স্লাইড (৬×৬ গোল্ডেন রুল)</span>
              </div>
              <div className="aspect-video bg-slate-950 text-white p-4 rounded-xl border-2 border-emerald-400 flex flex-col justify-between">
                <div>
                  <h6 className="font-black text-sm text-amber-300 mb-2">
                    কর্ডোবা: ইউরোপের বাতিঘর
                  </h6>
                  <ul className="space-y-1 text-xs text-slate-200">
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span> ইউরোপের প্রথম আলোকিত পাকা সড়ক
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span> ৭০টি সর্বজনীন গ্রন্থাগার
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span> মেসকিটা জামে মসজিদ (৮৫০ স্তম্ভ)
                    </li>
                  </ul>
                </div>
                <div className="text-[10px] text-slate-400 font-mono text-right">
                  পাগলা ব্যাচ প্রেজেন্টেশন
                </div>
              </div>
              <p className="text-xs text-emerald-300 mt-3 font-semibold">
                🌟 পরিচ্ছন্ন বুলেট পয়েন্ট, বড় ফন্ট—বক্তব্যের মূল সূত্র দর্শক এক সেকেন্ডে বুঝে নেবে!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. TOPIC: PROFESSIONAL CV MAKING */}
      {/* ============================================================== */}
      {topicId === 'professional-cv-making' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-slate-900 shadow-comic-lg text-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-black text-indigo-600 uppercase tracking-wider block">
                💼 লাইভ সিভি বিল্ডার
              </span>
              <h5 className="text-xl sm:text-2xl font-black text-slate-900">
                তথ্য লিখুন এবং লাইভ সিভির আউটপুট দেখুন
              </h5>
            </div>

            {/* Template Selector */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border-2 border-slate-900">
              <button
                type="button"
                onClick={() => {
                  playSound('pop');
                  setCvTemplate('modern');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  cvTemplate === 'modern' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                মডার্ন ব্লু
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('pop');
                  setCvTemplate('minimal');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  cvTemplate === 'minimal' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                মিনিমাল ব্ল্যাক
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('pop');
                  setCvTemplate('bold');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  cvTemplate === 'bold' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                এলিগেন্ট গোল্ড
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Form (5 cols) */}
            <div className="lg:col-span-5 space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
              <span className="font-black text-slate-800 text-sm block mb-1">
                ✍️ আপনার তথ্য লিখুন:
              </span>

              <div>
                <label className="font-bold text-slate-700 block mb-1">আপনার নাম:</label>
                <input
                  type="text"
                  value={cvName}
                  onChange={(e) => setCvName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">পদবী বা পরিচয়:</label>
                <input
                  type="text"
                  value={cvTitle}
                  onChange={(e) => setCvTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ইমেইল:</label>
                  <input
                    type="email"
                    value={cvEmail}
                    onChange={(e) => setCvEmail(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">মোবাইল:</label>
                  <input
                    type="text"
                    value={cvPhone}
                    onChange={(e) => setCvPhone(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">সর্বশেষ শিক্ষা:</label>
                <input
                  type="text"
                  value={cvEducation}
                  onChange={(e) => setCvEducation(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">দক্ষতাসমূহ:</label>
                <textarea
                  rows={2}
                  value={cvSkills}
                  onChange={(e) => setCvSkills(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 outline-none focus:border-slate-900 resize-none"
                />
              </div>
            </div>

            {/* Live CV Mockup Preview (7 cols) */}
            <div className="lg:col-span-7 bg-slate-100 p-2 sm:p-4 rounded-2xl border-2 border-slate-300 flex justify-center">
              <div
                className={`w-full max-w-md bg-white rounded-xl shadow-md border overflow-hidden p-6 text-slate-800 transition-all ${
                  cvTemplate === 'modern'
                    ? 'border-indigo-200 border-t-8 border-t-indigo-600'
                    : cvTemplate === 'minimal'
                    ? 'border-slate-300 border-l-8 border-l-slate-800'
                    : 'border-amber-300 border-t-8 border-t-amber-600 bg-amber-50/20'
                }`}
              >
                {/* Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                  <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-slate-400 flex items-center justify-center font-black text-slate-600 text-lg shrink-0">
                    ছবি
                  </div>
                  <div className="flex-1">
                    <h6 className="text-lg font-black text-slate-900 leading-tight">
                      {cvName || 'আপনার নাম'}
                    </h6>
                    <p className="text-xs font-bold text-indigo-700 mb-1">
                      {cvTitle || 'আপনার পদবী'}
                    </p>
                    <div className="text-[10px] text-slate-500 flex flex-wrap gap-x-3 gap-y-0.5">
                      <span>✉️ {cvEmail}</span>
                      <span>📞 {cvPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Body Sections */}
                <div className="mt-4 space-y-3.5 text-xs">
                  <div>
                    <span className="font-black text-slate-900 uppercase tracking-wider text-[11px] block border-b border-slate-100 pb-0.5 mb-1 text-indigo-900">
                      🎯 ক্যারিয়ার অবজেক্টিভ
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      ইতিহাস ও তথ্যপ্রযুক্তির সমন্বয়ে গবেষণাধর্মী কাজ ও শিক্ষাক্ষেত্রে নিষ্ঠার সাথে কাজ করতে আগ্রহী।
                    </p>
                  </div>

                  <div>
                    <span className="font-black text-slate-900 uppercase tracking-wider text-[11px] block border-b border-slate-100 pb-0.5 mb-1 text-indigo-900">
                      🎓 শিক্ষাগত যোগ্যতা
                    </span>
                    <div className="text-[11px]">
                      <span className="font-bold text-slate-800 block">{cvEducation}</span>
                      <span className="text-slate-500">সিজিপিএ: ৩.৬৫ | ১ম শ্রেণি</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-black text-slate-900 uppercase tracking-wider text-[11px] block border-b border-slate-100 pb-0.5 mb-1 text-indigo-900">
                      ⚡ মূল দক্ষতা ও কম্পিউটার স্কিল
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {cvSkills.split(',').map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold text-[10px]"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. TOPIC: SMART EMAIL GMAIL GUIDE */}
      {/* ============================================================== */}
      {topicId === 'email-gmail-guide' && (
        <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 border-4 border-slate-900 shadow-comic-lg text-white">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-black text-rose-400 uppercase tracking-wider block">
                ✉️ জিমেইল কম্পোজার
              </span>
              <h5 className="text-xl sm:text-2xl font-black text-white">
                মার্জিত ইমেইল প্রিভিউ ও ভুল-সঠিক তুলনা
              </h5>
            </div>

            <button
              onClick={() => {
                playSound('pop');
                setShowEmailComparison(!showEmailComparison);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-comic transition-all"
            >
              {showEmailComparison ? 'প্রিভিউ দেখুন' : 'ভালো বনাম খারাপ ইমেইল তুলনা'}
            </button>
          </div>

          {!showEmailComparison ? (
            /* Gmail Composer Window */
            <div className="max-w-2xl mx-auto bg-slate-950 rounded-2xl border-2 border-slate-700 shadow-2xl overflow-hidden text-xs sm:text-sm">
              {/* Fake Gmail Top Bar */}
              <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
                <span className="font-bold text-slate-200 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-400" /> New Message (নতুন ইমেইল)
                </span>
                <span className="text-slate-400 font-mono text-xs">Gmail UI</span>
              </div>

              {/* Header Fields */}
              <div className="p-4 space-y-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold w-14 shrink-0">To:</span>
                  <input
                    type="text"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    className="w-full bg-slate-900 px-2 py-1 rounded border border-slate-700 text-white font-mono text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold w-14 shrink-0">Subject:</span>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-slate-900 px-2 py-1 rounded border border-slate-700 text-white font-semibold text-xs focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <input
                  type="text"
                  value={emailGreeting}
                  onChange={(e) => setEmailGreeting(e.target.value)}
                  className="w-full bg-slate-900 px-2 py-1 rounded border border-slate-800 text-amber-300 font-bold text-xs"
                />

                <textarea
                  rows={4}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full bg-slate-900 px-2.5 py-2 rounded-lg border border-slate-800 text-slate-200 text-xs font-medium resize-none focus:border-amber-400 outline-none"
                />

                {/* Attachment Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
                  <span>📎</span>
                  <span className="text-amber-300 font-mono">Assignment_Cordoba_Roll_105.pdf</span>
                  <span className="text-[10px] text-emerald-400">(2.4 MB) ✓</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="bg-slate-900 p-3 flex items-center justify-between border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => playSound('pop')}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send (পাঠান)</span>
                </button>
                <span className="text-[11px] text-slate-400">
                  Ctrl + Enter শর্টকাট দিয়ে সেন্ড করা যায়
                </span>
              </div>
            </div>
          ) : (
            /* Good vs Bad Email Comparison */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-rose-950/70 p-5 rounded-2xl border-2 border-rose-500">
                <div className="flex items-center gap-2 text-rose-400 font-black text-sm mb-3">
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span>❌ অপেশাদার ও খারাপ ইমেইল</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-950 p-3 rounded-xl">
                  <p><span className="text-slate-500">To:</span> teacher@college.edu</p>
                  <p><span className="text-slate-500">Subject:</span> (খালি রাখা হয়েছে!)</p>
                  <p className="pt-2 text-rose-200">"স্যার, আমার ফাইলটা দেখেন।"</p>
                  <p className="text-slate-500">📎 Doc1234.docx</p>
                </div>
                <p className="text-[11px] text-rose-300 mt-3 font-semibold">
                  ⚠️ বিষয় খালি, কার রোল নাম নেই, সালাম নেই এবং অস্পষ্ট ফাইলের নাম।
                </p>
              </div>

              <div className="bg-emerald-950/70 p-5 rounded-2xl border-2 border-emerald-500">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>✅ মার্জিত ও আদর্শ ইমেইল</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-950 p-3 rounded-xl">
                  <p><span className="text-slate-500">To:</span> teacher@college.edu</p>
                  <p><span className="text-slate-500">Subject:</span> ইতিহাস অ্যাসাইনমেন্ট জমা - সজীব রানা (রোল: ১০৫)</p>
                  <p className="pt-2 text-emerald-200">"শ্রদ্ধেয় স্যার, আসসালামু আলাইকুম। আমার অ্যাসাইনমেন্টের PDF কপি সংযুক্ত করলাম।"</p>
                  <p className="text-amber-300 font-bold">📎 Assignment_History_Roll105.pdf</p>
                </div>
                <p className="text-[11px] text-emerald-300 mt-3 font-semibold">
                  🌟 শিক্ষক এক ক্লিকেই বুঝতে পারবেন কার ফাইল এবং কোনো বিভ্রান্তি থাকবে না!
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. TOPIC: GOOGLE DRIVE, DOCS & FORMS */}
      {/* ============================================================== */}
      {topicId === 'google-drive-docs-forms' && (
        <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 border-4 border-slate-900 shadow-comic-lg text-white">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-black text-cyan-400 uppercase tracking-wider block">
                ☁️ গুগল ড্রাইভ পারমিশন সিমুলেটর
              </span>
              <h5 className="text-xl sm:text-2xl font-black text-white">
                লিংক শেয়ার পারমিশন টেস্ট (শিক্ষক কী দেখতে পান?)
              </h5>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => {
                  playSound('pop');
                  setDrivePermission('restricted');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  drivePermission === 'restricted' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                🔒 Restricted (ভুল)
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('cheer');
                  setDrivePermission('anyone');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  drivePermission === 'anyone' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                🌐 Anyone with Link (সঠিক)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Permission Settings Dialog Mockup */}
            <div className="bg-slate-950 p-5 rounded-2xl border-2 border-slate-800 text-xs">
              <span className="text-amber-300 font-black text-sm block mb-3 flex items-center gap-2">
                <UploadCloud className="w-4 h-4" /> ড্রাইভ শেয়ার সেটিংস:
              </span>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 mb-4">
                <div className="text-slate-400">General access:</div>
                <div className="font-bold text-white flex items-center gap-2">
                  {drivePermission === 'restricted' ? (
                    <>
                      <Lock className="w-4 h-4 text-rose-400" />
                      <span className="text-rose-400">Restricted (শুধু আপনি ছাড়া কেউ ঢুকতে পারবে না)</span>
                    </>
                  ) : (
                    <>
                      <Globe className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Anyone with the link (লিংক পাওয়া সবাই দেখতে পাবে)</span>
                    </>
                  )}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-400 truncate">
                https://drive.google.com/file/d/1A8x9Z2kQ.../view?usp=sharing
              </div>
            </div>

            {/* Recipient / Teacher Screen Simulation */}
            <div className="p-5 rounded-2xl border-2 flex flex-col justify-between transition-all">
              {drivePermission === 'restricted' ? (
                <div className="bg-rose-950/70 p-5 rounded-xl border border-rose-500 text-rose-100 flex-1 flex flex-col justify-center items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-rose-900/80 flex items-center justify-center text-2xl mb-3 text-rose-300">
                    🚫
                  </div>
                  <h6 className="font-black text-base text-rose-300 mb-1">You need access (অনুমতি নেই)</h6>
                  <p className="text-xs text-rose-200">
                    শিক্ষক লিংকে ক্লিক করে এই বার্তা দেখতে পাচ্ছেন! ফলে তিনি আপনার অ্যাসাইনমেন্ট না দেখেই শূন্য দিতে পারেন।
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-950/70 p-5 rounded-xl border border-emerald-500 text-emerald-100 flex-1 flex flex-col justify-center items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-900/80 flex items-center justify-center text-2xl mb-3 text-emerald-300">
                    ✓
                  </div>
                  <h6 className="font-black text-base text-emerald-300 mb-1">ফাইল সরাসরি ওপেন হয়েছে!</h6>
                  <p className="text-xs text-emerald-200">
                    শিক্ষক কোনো ঝামেলা ছাড়াই এক ক্লিকে অ্যাসাইনমেন্ট দেখে পূর্ণ মূল্যায়ন করতে পারছেন।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 8. TOPIC: ONLINE JOB APPLICATION */}
      {/* ============================================================== */}
      {topicId === 'online-job-application' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-slate-900 shadow-comic-lg text-slate-900">
          <div className="mb-6">
            <span className="text-xs font-black text-emerald-600 uppercase tracking-wider block">
              🌐 সরকারি চাকরি আবেদন সিমুলেটর
            </span>
            <h5 className="text-xl sm:text-2xl font-black text-slate-900">
              টেলিটক ছবি (৩০০×৩০০) ও স্বাক্ষর (৩০০×৮০) পিক্সেল টেস্ট
            </h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photo & Sign Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 space-y-4">
              <span className="font-black text-xs text-slate-700 block uppercase tracking-wider">
                📸 ছবি ও স্বাক্ষরের মাপ পরীক্ষক
              </span>

              {/* Photo Box */}
              <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-300">
                <div
                  className="bg-slate-200 border-2 border-dashed border-slate-400 flex flex-col items-center justify-center text-[10px] text-slate-600 font-bold shrink-0 transition-all"
                  style={{ width: '80px', height: '80px' }}
                >
                  <span>300×300 px</span>
                  <span className="text-emerald-700 font-black">✓ বৈধ</span>
                </div>
                <div className="text-xs">
                  <div className="font-black text-slate-900">পাসপোর্ট সাইজ রঙিন ছবি</div>
                  <div className="text-slate-500">প্রস্থ: ৩০০ px | উচ্চতা: ৩০০ px</div>
                  <div className="text-[11px] text-emerald-700 font-bold">সর্বোচ্চ ১০০ KB (JPG)</div>
                </div>
              </div>

              {/* Signature Box */}
              <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-300">
                <div
                  className="bg-slate-200 border-2 border-dashed border-slate-400 flex flex-col items-center justify-center text-[10px] text-slate-600 font-bold shrink-0 transition-all"
                  style={{ width: '100px', height: '35px' }}
                >
                  <span className="font-serif italic text-xs">Sojib Rana</span>
                </div>
                <div className="text-xs">
                  <div className="font-black text-slate-900">স্পষ্ট স্বাক্ষর</div>
                  <div className="text-slate-500">প্রস্থ: ৩০০ px | উচ্চতা: ৮০ px</div>
                  <div className="text-[11px] text-emerald-700 font-bold">সর্বোচ্চ ৬০ KB (JPG)</div>
                </div>
              </div>
            </div>

            {/* Generated Slip Preview */}
            <div className="bg-amber-50 p-5 rounded-2xl border-2 border-slate-900 shadow-comic flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2 mb-3">
                  <span className="font-black text-xs text-slate-900">APPLICANT'S COPY MOCKUP</span>
                  <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    SUBMITTED
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-800">
                  <p><strong>Name:</strong> SOJIB RANA</p>
                  <p><strong>Post:</strong> Research Assistant (ইতিহাস ও সংস্কৃতি)</p>
                  <p><strong>User ID:</strong> BDHIST10592</p>
                  <p><strong>Fee Status:</strong> Paid via SMS (Tk. 112/-)</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-300 text-[11px] text-slate-600">
                💡 আবেদন শেষে এই কপিটি ডাউনলোড করে ২টি রঙিন প্রিন্ট নিজের কাছে সংরক্ষণ করা অপরিহার্য।
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 9. TOPIC: CYBER SECURITY & SAFETY */}
      {/* ============================================================== */}
      {topicId === 'cyber-security-safety' && (
        <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 border-4 border-slate-900 shadow-comic-lg text-white">
          <div className="mb-6">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
              🛡️ ইন্টারঅ্যাক্টিভ সিকিউরিটি মিটার
            </span>
            <h5 className="text-xl sm:text-2xl font-black text-white">
              পাসওয়ার্ডের শক্তি যাচাই (লাইভ পাসওয়ার্ড টেস্ট)
            </h5>
          </div>

          <div className="max-w-xl mx-auto space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                এখানে যেকোনো পাসওয়ার্ড লিখে পরীক্ষা করুন:
              </label>
              <input
                type="text"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                placeholder="যেমন: mypass123 বা P@gla#Batch2025"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border-2 border-slate-700 text-white font-mono text-sm focus:border-amber-400 outline-none"
              />
            </div>

            {/* Strength Meter Bar */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-slate-400">নিরাপত্তা মিটার:</span>
                <span className="font-black text-amber-300">{passResult.text}</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    passResult.score >= 80
                      ? 'bg-emerald-500'
                      : passResult.score >= 50
                      ? 'bg-amber-400'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${passResult.score}%` }}
                />
              </div>
            </div>

            {/* Suggestions / Checklist */}
            {passResult.tips.length > 0 ? (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-xs text-rose-200 space-y-1">
                <span className="font-bold block text-rose-300">শক্তিশালী করতে এগুলো যোগ করুন:</span>
                {passResult.tips.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span>⚠️</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            ) : testPassword ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-400 text-xs text-emerald-200 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-bold">
                  অভিনন্দন! আপনার পাসওয়ার্ড অত্যন্ত শক্তিশালী এবং সুরক্ষিত!
                </span>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 10. TOPIC: FREELANCING & AI STUDY */}
      {/* ============================================================== */}
      {topicId === 'freelancing-ai-study' && (
        <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 border-4 border-slate-900 shadow-comic-lg text-white">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-black text-purple-400 uppercase tracking-wider block">
                🤖 AI প্রম্পট সিমুলেটর
              </span>
              <h5 className="text-xl sm:text-2xl font-black text-white">
                সাধারণ দুর্বল প্রম্পট বনাম উচ্চমানের স্মার্ট প্রম্পট
              </h5>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => {
                  playSound('pop');
                  setActiveAiTab('bad');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  activeAiTab === 'bad' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                ❌ দুর্বল প্রম্পট
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('cheer');
                  setActiveAiTab('good');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  activeAiTab === 'good' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                ✅ স্মার্ট প্রম্পট
              </button>
            </div>
          </div>

          {activeAiTab === 'bad' ? (
            <div className="bg-rose-950/70 p-5 rounded-2xl border-2 border-rose-500 text-xs space-y-3">
              <div className="font-mono text-slate-300 bg-slate-950 p-3 rounded-xl border border-rose-800">
                <span className="text-slate-500">ইউজার প্রম্পট: </span>
                <span className="text-rose-300">"স্পেনের ইতিহাস নিয়ে কিছু বল।"</span>
              </div>
              <p className="text-rose-200">
                ⚠️ এ ধরনের অস্পষ্ট প্রম্পট দিলে AI বিশালাকার এলোমেলো ইতিহাস তুলে ধরবে, যা আপনার পরীক্ষার কোনো কাজে আসবে না।
              </p>
            </div>
          ) : (
            <div className="bg-emerald-950/70 p-5 rounded-2xl border-2 border-emerald-500 text-xs space-y-3">
              <div className="font-mono text-slate-300 bg-slate-950 p-3 rounded-xl border border-emerald-800">
                <span className="text-slate-500">ইউজার প্রম্পট: </span>
                <span className="text-emerald-300">
                  "আমি ইসলামের ইতিহাস ৪র্থ বর্ষের ছাত্র। স্পেনের কর্ডোবা খেলাফতের ৩টি প্রধান সাংস্কৃতিক অবদান ৫টি বুলেট পয়েন্টে সহজ বাংলায় তুলে ধরো।"
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-200 space-y-1.5 font-sans">
                <span className="text-amber-300 font-bold block">✨ AI-এর কাঠামোগত উত্তর:</span>
                <p>১. <strong>ইউরোপের প্রথম আলোকিত নগরী:</strong> কর্ডোবার পাকা রাস্তায় রাতের বাতি ব্যবস্থা ছিল।</p>
                <p>২. <strong>জ্ঞানের মহাকেন্দ্র:</strong> ৭০টি পাবলিক লাইব্রেরি ও আল-হাকামের ৪ লাখ পাণ্ডুলিপি।</p>
                <p>৩. <strong>চিকিৎসা ও দর্শন:</strong> ইবনে রুশদ ও আল-জাহারাবির মতো কালজয়ী চিকিৎসকদের উদ্ভাবন।</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
