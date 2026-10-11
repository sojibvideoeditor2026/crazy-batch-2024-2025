import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Link as LinkIcon, Upload, X } from 'lucide-react';
import { playSound } from '../utils/sound';
import { compressImageFile } from '../utils/storage';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  personName: string;
  currentPhoto: string;
  onSavePhoto: (newUrl: string) => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  personName,
  currentPhoto,
  onSavePhoto,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState(currentPhoto);
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'avatars'>('upload');

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 256, 256, 0.75);
        setPreviewUrl(compressed);
        playSound('camera');
      } catch (err) {
        console.error('Failed to process image:', err);
      }
    }
  };

  const handleSave = () => {
    onSavePhoto(previewUrl);
    playSound('ding');
    onClose();
  };

  const presetAvatars = [
    "https://api.dicebear.com/7.x/bottts/svg?seed=" + encodeURIComponent(personName + "1"),
    "https://api.dicebear.com/7.x/adventurer/svg?seed=" + encodeURIComponent(personName + "2"),
    "https://api.dicebear.com/7.x/micah/svg?seed=" + encodeURIComponent(personName + "3"),
    "https://api.dicebear.com/7.x/fun-emoji/svg?seed=" + encodeURIComponent(personName + "4"),
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border-4 border-slate-900 shadow-comic-lg max-w-md w-full p-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
          <div>
            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
              ছবি পরিবর্তন
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              {personName} এর ছবি
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current / Preview Image */}
        <div className="my-5 flex flex-col items-center">
          <div className="w-28 h-28 rounded-2xl border-3 border-slate-900 overflow-hidden shadow-comic bg-amber-50 relative group">
            <img
              src={previewUrl}
              alt={personName}
              className="w-full h-full object-cover"
              onError={(e) => {
                // fallback if invalid image
                (e.target as HTMLImageElement).src =
                  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=" + encodeURIComponent(personName);
              }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
              প্রিভিউ
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">ফাইল আপলোড করুন, লিঙ্ক দিন অথবা কার্টুন বাছুন</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-slate-100 p-1 mb-4 border border-slate-300">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeTab === 'upload' ? 'bg-amber-400 text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            ফাইল আপলোড
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeTab === 'url' ? 'bg-amber-400 text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            ছবির লিংক (URL)
          </button>
          <button
            onClick={() => setActiveTab('avatars')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeTab === 'avatars' ? 'bg-amber-400 text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            অবতার
          </button>
        </div>

        {/* Tab contents */}
        {activeTab === 'upload' && (
          <div className="space-y-3">
            <label className="border-2 border-dashed border-amber-400 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-amber-50/50 transition-colors">
              <Camera className="w-8 h-8 text-amber-500 mb-1" />
              <span className="text-sm font-bold text-slate-800">ডিভাইস থেকে ছবি বেছে নিন</span>
              <span className="text-xs text-slate-500 mt-0.5">JPG, PNG, GIF বা WebP</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {activeTab === 'url' && (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              অনলাইন ছবির লিংক পেস্ট করুন:
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 text-sm px-3 py-2 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-amber-500 font-sans"
              />
              <button
                type="button"
                onClick={() => {
                  if (urlInput.trim()) {
                    setPreviewUrl(urlInput.trim());
                    playSound('pop');
                  }
                }}
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-3 py-2 rounded-xl text-xs"
              >
                প্রিভিউ
              </button>
            </div>
          </div>
        )}

        {activeTab === 'avatars' && (
          <div>
            <p className="text-xs font-bold text-slate-600 mb-2">মজার যেকোনো একটি অবতার নির্বাচন করুন:</p>
            <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto p-1">
              {presetAvatars.map((avatar, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPreviewUrl(avatar);
                    playSound('pop');
                  }}
                  className={`w-14 h-14 rounded-xl border-2 overflow-hidden hover:scale-105 transition-transform ${
                    previewUrl === avatar ? 'border-amber-500 ring-2 ring-amber-400' : 'border-slate-300'
                  }`}
                >
                  <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t-2 border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
          >
            বাতিল
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 border-2 border-slate-900 shadow-comic text-slate-950 font-black text-xs transition-transform active:translate-y-0.5"
          >
            ছবি সংরক্ষণ করুন ✅
          </button>
        </div>
      </div>
    </div>
  );
};
