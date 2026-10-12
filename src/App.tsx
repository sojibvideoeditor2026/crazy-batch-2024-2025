/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TeachersSection } from './components/TeachersSection';
import { CrSection } from './components/CrSection';
import { FriendsSection } from './components/FriendsSection';
import { FemaleFriendsSection } from './components/FemaleFriendsSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { IslamicSpainSection } from './components/IslamicSpainSection';
import { ProphetSeerahSection } from './components/ProphetSeerahSection';
import { IctFearRemoverSection } from './components/IctFearRemoverSection';
import { ExploreBangladeshSection } from './components/ExploreBangladeshSection';
import { Footer } from './components/Footer';
import { AddFriendModal } from './components/AddFriendModal';
import { Friend, INITIAL_FRIENDS } from './data/friends';
import { Teacher, INITIAL_TEACHERS } from './data/teachers';
import { FemaleFriend, FEMALE_FRIENDS_DATA } from './data/femaleFriends';
import { safeGetItem, safeSetItem, safeRemoveItem } from './utils/storage';

export default function App() {
  // Clean up legacy oversized keys from localStorage to reclaim storage quota
  useEffect(() => {
    safeRemoveItem('pagla_batch_female_friends');
    safeRemoveItem('pagla_batch_friends_list');
    safeRemoveItem('pagla_batch_teachers_list');
  }, []);

  // Lightweight user customization states:
  // 1. Custom photo map: { [id: string]: photoUrl }
  const [customPhotos, setCustomPhotos] = useState<{ [id: string]: string }>(() => {
    const saved = safeGetItem('pagla_batch_custom_photos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  // 2. User-added friends list (only new friends created in the UI)
  const [addedFriends, setAddedFriends] = useState<Friend[]>(() => {
    const saved = safeGetItem('pagla_batch_added_friends');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return [];
      }
    }
    return [];
  });

  // 3. User likes count map: { [friendId: string]: number }
  const [friendLikes, setFriendLikes] = useState<{ [id: string]: number }>(() => {
    const saved = safeGetItem('pagla_batch_friend_likes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

  // Derived Teachers List (merged with custom photos)
  const teachersList = useMemo(() => {
    return INITIAL_TEACHERS.map((t) => ({
      ...t,
      photoUrl: customPhotos[t.id] || t.photoUrl,
    }));
  }, [customPhotos]);

  // Derived Female Friends List (merged with custom photos)
  const femaleFriendsList = useMemo(() => {
    return FEMALE_FRIENDS_DATA.map((f) => ({
      ...f,
      photoUrl: customPhotos[f.id] || f.photoUrl,
    }));
  }, [customPhotos]);

  // Derived Friends List (merged with added friends, custom photos & likes)
  const friendsList = useMemo(() => {
    const all = [...addedFriends, ...INITIAL_FRIENDS];
    return all.map((f) => ({
      ...f,
      photoUrl: customPhotos[f.id] || f.photoUrl,
      likes: friendLikes[f.id] !== undefined ? friendLikes[f.id] : (f.likes || 0),
    }));
  }, [addedFriends, customPhotos, friendLikes]);

  // Update a person's photo (works for friends, female friends, and teachers)
  const handleUpdatePhoto = (id: string, newPhoto: string) => {
    setCustomPhotos((prev) => {
      const updated = { ...prev, [id]: newPhoto };
      safeSetItem('pagla_batch_custom_photos', JSON.stringify(updated));
      return updated;
    });
  };

  // Update like reaction for a friend
  const handleUpdateLikes = (id: string) => {
    setFriendLikes((prev) => {
      const current = prev[id] !== undefined ? prev[id] : (INITIAL_FRIENDS.find((f) => f.id === id)?.likes || 0);
      const updated = { ...prev, [id]: current + 1 };
      safeSetItem('pagla_batch_friend_likes', JSON.stringify(updated));
      return updated;
    });
  };

  // Add a new friend from modal
  const handleAddFriend = (newFriend: Friend) => {
    setAddedFriends((prev) => {
      const updated = [newFriend, ...prev];
      safeSetItem('pagla_batch_added_friends', JSON.stringify(updated));
      return updated;
    });
  };

  // Reset to default list
  const handleResetDefault = () => {
    if (window.confirm('আপনি কি বন্ধুদের তালিকা ও ছবির কাস্টমাইজেশন রিসেট করতে চান?')) {
      setCustomPhotos({});
      setAddedFriends([]);
      setFriendLikes({});
      safeRemoveItem('pagla_batch_custom_photos');
      safeRemoveItem('pagla_batch_added_friends');
      safeRemoveItem('pagla_batch_friend_likes');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50 selection:bg-amber-300 selection:text-slate-900 font-['Hind_Siliguri',sans-serif]">
      {/* Sticky Fun Navbar */}
      <Navbar onOpenAddFriend={() => setIsAddFriendModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. About Section */}
        <AboutSection />

        {/* 3. Teachers Section ("আমাদের প্রিয় স্যারগণ 🎓") */}
        <TeachersSection
          teachersList={teachersList}
          onUpdatePhoto={handleUpdatePhoto}
        />

        {/* 4. CR Section (Highlighted VIP Card: Aporupa Mondol) */}
        <CrSection />

        {/* 5. Friends Section (35+ friends, single array, photo upload/URL) */}
        <FriendsSection
          onOpenAddFriend={() => setIsAddFriendModalOpen(true)}
          friendsList={friendsList}
          onUpdatePhoto={handleUpdatePhoto}
          onUpdateLikes={handleUpdateLikes}
          onResetDefault={handleResetDefault}
        />

        {/* 6. Female Friends Section ("বান্ধবী বাহিনী 👩🎓") */}
        <FemaleFriendsSection
          femaleFriendsList={femaleFriendsList}
        />

        {/* 6.5 Photo Gallery Section ("ফটো গ্যালারি 📸") */}
        <PhotoGallerySection />

        {/* 7. Islamic Spain Section ("ইসলামের ইতিহাস ও স্পেন 🕌") */}
        <IslamicSpainSection />

        {/* 8. Prophet's Seerah Section ("প্রিয় নবী ﷺ-এর পবিত্র জীবনী 🕌") */}
        <ProphetSeerahSection />

        {/* 9. ICT Fear Remover Section ("আইসিটি ভয় দূর করি 💻") */}
        <IctFearRemoverSection />

        {/* 10. Explore Bangladesh Section ("বাংলাদেশ ঘুরে দেখি 🇧🇩 - ৬৪ জেলা") */}
        <ExploreBangladeshSection />
      </main>

      {/* 8. Footer (Made by Sojib Rana) */}
      <Footer />

      {/* Add Friend Modal */}
      <AddFriendModal
        isOpen={isAddFriendModalOpen}
        onClose={() => setIsAddFriendModalOpen(false)}
        onAddFriend={handleAddFriend}
      />
    </div>
  );
}
