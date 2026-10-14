import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Camera,
  Image as ImageIcon,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Sparkles,
  Info,
  Copy,
  Check,
  FolderOpen,
  Filter,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { galleryPhotos, albumCategories, GalleryPhoto, AlbumType } from '../data/galleryData';
import { playSound } from '../utils/sound';

export const PhotoGallerySection: React.FC = () => {
  const [activeAlbum, setActiveAlbum] = useState<'all' | AlbumType>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Filtered photos
  const filteredPhotos = galleryPhotos.filter((item) => {
    const matchesAlbum = activeAlbum === 'all' || item.album === activeAlbum;
    const matchesQuery =
      searchQuery.trim() === '' ||
      item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.date.includes(searchQuery);
    return matchesAlbum && matchesQuery;
  });

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index: number) => {
    playSound('camera');
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    playSound('pop');
    setLightboxIndex(null);
  };

  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null || filteredPhotos.length === 0) return;
    playSound('pop');
    setLightboxIndex((prev) => ((prev! + 1) % filteredPhotos.length));
  }, [lightboxIndex, filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null || filteredPhotos.length === 0) return;
    playSound('pop');
    setLightboxIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [lightboxIndex, filteredPhotos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextPhoto, prevPhoto]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      // Swiped left -> next
      nextPhoto();
    } else if (diff < -50) {
      // Swiped right -> prev
      prevPhoto();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  // Code snippet for adding photos
  const codeSnippet = `{
  id: 'photo-${Date.now().toString().slice(-4)}',
  file: 'my-photo.jpg',
  caption: 'আপনার চমৎকার বাংলা ক্যাপশন ✨',
  album: 'tour', // 'tour' (ট্যুর 🚌) | 'class' (ক্লাস 📚) | 'fun' (পাগলামি 🎉)
  date: '১৫ মার্চ ২০২৪',
  location: 'স্থানের নাম'
},`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedSnippet(true);
    playSound('ding');
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  const getAlbumBadge = (album: AlbumType) => {
    switch (album) {
      case 'tour':
        return { label: 'ট্যুর 🚌', bg: 'bg-emerald-600 text-white border-emerald-700' };
      case 'class':
        return { label: 'ক্লাস 📚', bg: 'bg-blue-600 text-white border-blue-700' };
      case 'fun':
        return { label: 'পাগলামি 🎉', bg: 'bg-purple-600 text-white border-purple-700' };
      default:
        return { label: 'অ্যালবাম', bg: 'bg-slate-700 text-white border-slate-800' };
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-amber-50/60 border-b-4 border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 border-2 border-slate-900 text-slate-900 font-black text-xs uppercase shadow-comic mb-4">
            <Camera className="w-4 h-4 text-slate-900" />
            স্মৃতির পাতা ও ফ্রেম
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-3 flex-wrap">
            <span>ফটো গ্যালারি</span>
            <span className="text-4xl sm:text-5xl">📸</span>
          </h2>
          <p className="mt-3 text-slate-700 font-bold text-base sm:text-lg">
            ক্যাম্পাসের সোনালি দিন, ক্লাসরুমের আড্ডা, ট্যুরের রোমাঞ্চ আর এক ঝাঁক পাগলের অমলিন হাসি!
          </p>

          {/* Quick Stats & Guide Toggle */}
          <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border-2 border-slate-900 text-xs font-black text-slate-800 shadow-comic-sm">
              <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>মোট {galleryPhotos.length} টি স্মৃতি সংরক্ষিত</span>
            </div>
            <button
              onClick={() => {
                playSound('pop');
                setShowGuide(!showGuide);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border-2 border-slate-900 text-xs font-black shadow-comic-sm transition-all active:scale-95"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>{showGuide ? 'গাইড বন্ধ করুন' : 'নতুন ছবি যোগ করার নিয়ম 💡'}</span>
            </button>
          </div>
        </div>

        {/* New Photo Addition Guide Accordion */}
        {showGuide && (
          <div className="max-w-3xl mx-auto mb-10 bg-slate-900 text-amber-100 rounded-3xl border-4 border-slate-900 p-6 sm:p-8 shadow-comic-lg animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-xl shadow-comic">
                  📸
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-amber-300">
                    কীভাবে নতুন ছবি যোগ করবেন?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-bold">
                    নিচের ৩টি সহজ ধাপে আপনার ছবি সরাসরি গ্যালারিতে দেখাবে:
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm font-bold text-slate-200">
              <div className="flex items-start gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-black shrink-0 text-xs">
                  ১
                </span>
                <p>
                  আপনার ছবিটি প্রজেক্টের <code className="bg-slate-950 px-2 py-0.5 rounded text-amber-300 font-mono">public/gallery/</code> ফোল্ডারে পেস্ট করুন (যেমন: <code className="text-emerald-300 font-mono">tour-sajek.jpg</code>)।
                </p>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-black shrink-0 text-xs">
                  ২
                </span>
                <div className="flex-1">
                  <p className="mb-2">
                    <code className="bg-slate-950 px-2 py-0.5 rounded text-amber-300 font-mono">src/data/galleryData.ts</code> ফাইলের <code className="text-amber-300 font-mono">galleryPhotos</code> অ্যারেতে নিচের কোডটি কপি করে বসিয়ে দিন:
                  </p>
                  <div className="relative">
                    <pre className="bg-slate-950 text-amber-200 p-3 rounded-xl border border-slate-800 text-[11px] sm:text-xs font-mono overflow-x-auto whitespace-pre">
                      {codeSnippet}
                    </pre>
                    <button
                      onClick={handleCopySnippet}
                      className="absolute top-2 right-2 px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-black rounded-lg shadow-sm flex items-center gap-1 transition-colors"
                    >
                      {copiedSnippet ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-800" />
                          <span>কপি হয়েছে!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>কপি কোড</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="w-6 h-6 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-black shrink-0 text-xs">
                  ৩
                </span>
                <p>
                  ব্যস! সেভ করলেই সঙ্গে সঙ্গে ওয়েবসাইটে আপনার নতুন ছবি সুন্দর অ্যানিমেশন সহ প্রদর্শিত হবে।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Album Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {albumCategories.map((cat) => {
              const count =
                cat.id === 'all'
                  ? galleryPhotos.length
                  : galleryPhotos.filter((p) => p.album === cat.id).length;
              const isActive = activeAlbum === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playSound('pop');
                    setActiveAlbum(cat.id);
                  }}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shrink-0 border-3 border-slate-900 active:scale-95 ${
                    isActive
                      ? `${cat.color} shadow-comic translate-y-[-2px]`
                      : 'bg-white hover:bg-amber-100 text-slate-900 shadow-comic-sm'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                      isActive ? 'bg-black/25 text-white' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search / Filter Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ক্যাপশন বা স্থান খুঁজুন..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white border-3 border-slate-900 text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-comic-sm"
            />
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Photos Grid / Masonry Layout */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-4 border-slate-900 p-8 shadow-comic">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-100 border-2 border-slate-900 flex items-center justify-center text-3xl">
              🔍
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">কোনো ছবি পাওয়া যায়নি</h3>
            <p className="text-sm font-bold text-slate-600">
              অনুসন্ধানের শব্দ পরিবর্তন করে বা অন্য অ্যালবাম ট্যাব বেছে নিয়ে দেখুন।
            </p>
            <button
              onClick={() => {
                setActiveAlbum('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-1.5 rounded-xl bg-amber-400 border-2 border-slate-900 text-slate-900 text-xs font-black shadow-comic"
            >
              সব ছবি দেখুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo, index) => {
              const isFailed = failedImages[photo.id];
              const badge = getAlbumBadge(photo.album);
              const photoUrl = `${import.meta.env.BASE_URL}gallery/${photo.file}`;

              return (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  className="group relative bg-white rounded-3xl border-3 border-slate-900 overflow-hidden shadow-comic hover:shadow-comic-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Image / Fallback Container */}
                  <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                    {!isFailed ? (
                      <>
                        <img
                          src={photoUrl}
                          alt={photo.caption}
                          loading="lazy"
                          onError={() => handleImageError(photo.id)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-900 border-2 border-slate-900 flex items-center justify-center shadow-comic scale-90 group-hover:scale-100 transition-transform duration-300">
                            <Maximize2 className="w-5 h-5" />
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Elegant Fallback Card when file is not yet uploaded */
                      <div
                        className={`w-full h-full flex flex-col items-center justify-center p-5 text-center relative overflow-hidden ${
                          photo.album === 'tour'
                            ? 'bg-gradient-to-br from-emerald-800 via-emerald-950 to-slate-950 text-emerald-100'
                            : photo.album === 'class'
                            ? 'bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-blue-100'
                            : 'bg-gradient-to-br from-purple-900 via-fuchsia-950 to-slate-950 text-purple-100'
                        }`}
                      >
                        {/* Background subtle watermark icon */}
                        <div className="absolute -bottom-6 -right-6 text-7xl opacity-10 select-none pointer-events-none">
                          {photo.album === 'tour' ? '🚌' : photo.album === 'class' ? '📚' : '🎉'}
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
                          <Camera className="w-7 h-7 text-amber-300" />
                        </div>

                        <span className="text-xs font-black text-amber-300 tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-black/40 border border-amber-300/30 mb-2">
                          {badge.label}
                        </span>

                        <p className="text-xs font-mono text-slate-300 line-clamp-1 px-2 py-0.5 rounded bg-black/40 border border-white/10 max-w-[90%]">
                          📁 {photo.file}
                        </p>

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs font-black text-amber-300 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-amber-400 shadow-comic-sm">
                            বিস্তারিত দেখতে ক্লিক করুন 🔍
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Top Left Album Pill */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-black border-2 shadow-comic-sm ${badge.bg}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    {/* Top Right Zoom Icon on hover */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm border-2 border-slate-900 flex items-center justify-center text-slate-900 shadow-comic-sm">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Caption & Metadata Footer */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-amber-800 transition-colors">
                        {photo.caption}
                      </h4>
                    </div>

                    <div className="mt-3 pt-3 border-t-2 border-slate-100 flex items-center justify-between gap-2 text-xs font-bold text-slate-600">
                      <div className="flex items-center gap-1 shrink-0 text-slate-600">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>{photo.date}</span>
                      </div>
                      {photo.location && (
                        <div className="flex items-center gap-1 text-slate-500 line-clamp-1 text-right">
                          <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                          <span className="truncate">{photo.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Lightbox Inner Container */}
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-slate-900 rounded-3xl border-4 border-amber-400 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950 border-b-2 border-slate-800 text-white z-10">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-black border ${
                    getAlbumBadge(currentPhoto.album).bg
                  }`}
                >
                  {getAlbumBadge(currentPhoto.album).label}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-400 font-mono">
                  ছবি {lightboxIndex + 1} / {filteredPhotos.length}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-[11px] font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                  কিবোর্ড তীর (← →) দিয়ে ব্রাউজ করুন
                </span>
                <button
                  onClick={closeLightbox}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                  title="বন্ধ করুন (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Image Preview Area */}
            <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] max-h-[65vh] bg-black flex items-center justify-center p-2 overflow-hidden select-none">
              {!failedImages[currentPhoto.id] ? (
                <img
                  src={`${import.meta.env.BASE_URL}gallery/${currentPhoto.file}`}
                  alt={currentPhoto.caption}
                  className="max-h-full max-w-full object-contain rounded-xl"
                  onError={() => handleImageError(currentPhoto.id)}
                />
              ) : (
                /* Fallback preview inside modal */
                <div
                  className={`w-full max-w-xl p-8 rounded-3xl border-3 border-white/20 text-center shadow-2xl ${
                    currentPhoto.album === 'tour'
                      ? 'bg-gradient-to-br from-emerald-950 to-slate-950 text-emerald-100'
                      : currentPhoto.album === 'class'
                      ? 'bg-gradient-to-br from-blue-950 to-slate-950 text-blue-100'
                      : 'bg-gradient-to-br from-purple-950 to-slate-950 text-purple-100'
                  }`}
                >
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400/20 border-2 border-amber-400/40 flex items-center justify-center mb-4 text-amber-300">
                    <Camera className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-amber-300 mb-2">
                    {currentPhoto.caption}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 bg-black/50 px-3 py-1.5 rounded-xl border border-slate-700 inline-block mb-4">
                    📁 ফাইল পাথ: public/gallery/{currentPhoto.file}
                  </p>
                  <p className="text-xs text-slate-300 font-bold max-w-md mx-auto">
                    আপনার এই ছবিটি এখনো <code className="text-amber-300 font-mono">public/gallery/</code> ফোল্ডারে পেস্ট করা হয়নি। ফোল্ডারে ফাইলটি পেস্ট করলেই এখানে আসল ছবি দেখতে পাবেন।
                  </p>
                </div>
              )}

              {/* Prev Button */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-slate-900/80 hover:bg-amber-400 hover:text-slate-900 text-white border-2 border-white/20 flex items-center justify-center transition-all shadow-lg active:scale-95"
                  title="পূর্ববর্তী ছবি (Left Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {filteredPhotos.length > 1 && (
                <button
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl bg-slate-900/80 hover:bg-amber-400 hover:text-slate-900 text-white border-2 border-white/20 flex items-center justify-center transition-all shadow-lg active:scale-95"
                  title="পরবর্তী ছবি (Right Arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Lightbox Footer Info */}
            <div className="p-4 sm:p-6 bg-slate-950 border-t-2 border-slate-800 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-amber-300">
                    {currentPhoto.caption}
                  </h3>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400 font-bold flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      {currentPhoto.date}
                    </span>
                    {currentPhoto.location && (
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {currentPhoto.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Mobile Navigation Buttons */}
                <div className="flex items-center gap-2 sm:hidden self-end">
                  <button
                    onClick={prevPhoto}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold border border-slate-700 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> আগেরটা
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-900 text-xs font-black border border-slate-700 flex items-center gap-1"
                  >
                    পরেরটা <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
