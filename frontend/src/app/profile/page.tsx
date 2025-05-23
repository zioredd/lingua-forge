"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { UserProfile } from "@/../../shared/types";

import ProfileSidebar from "@/components/ProfileSidebar";
import {
  FaUserFriends,
  FaMedal,
  FaFire,
  FaCrown,
  FaTrophy,
  FaUserPlus,
  FaUsers,
  FaHeart,
  FaCamera,
  FaPen,
} from "react-icons/fa";
import { getUserProfile } from "@/services/user";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<UserProfile>>({});

  // Image picker state
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Banner picker handler
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBannerPreview(url);
      // Optionally: setForm({ ...form, bannerUrl: url }) or upload here
    }
  };

  // Avatar picker handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      // Optionally: setForm({ ...form, avatarUrl: url }) or upload here
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      console.log(document.cookie);
      setLoading(true);
      setError(null);
      try {
        const data = await getUserProfile();
        if (!data) {
          throw new Error("Failed to fetch profile");
        }
        setProfile(data);
        setForm({
          name: data.name,
          avatarUrl: data.avatarUrl,
          bio: data.bio,
          targetLanguage: data.targetLanguage,
          dailyXpGoal: data.dailyXpGoal,
        });
        console.log("Profile data:", data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!profile)
    return <div className="text-center mt-8">Profile not found.</div>;

  return (
    <div className="flex min-h-screen bg-[#131f24] text-white">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <ProfileSidebar />
      </div>

      {/* Main content area: center main, right widgets */}
      <div className="flex-1 flex flex-col lg:flex-row justify-center gap-8 p-8 max-w-[1400px] mx-auto">
        {/* Centered main section */}
        <div className="w-full lg:max-w-2xl flex flex-col gap-8">
          {/* Profile Duolingo-style banner with image picker */}
          <div
            className="relative w-full rounded-3xl h-56 mb-24 group"
            style={{ backgroundColor: "#eca85e" }}
          >
            {/* Banner image preview (if any) */}
            {bannerPreview && (
              <Image
                src={bannerPreview}
                alt="Banner Preview"
                fill
                className="object-cover w-full h-full rounded-3xl"
                style={{ zIndex: 1 }}
              />
            )}
            {/* Banner image picker button */}
            <label className="absolute top-4 left-6 z-20 cursor-pointer bg-black/40 hover:bg-black/60 transition-colors p-2 rounded-full flex items-center justify-center group/banner">
              <FaCamera className="text-white text-xl" />
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="hidden"
              />
            </label>
            {/* Edit profile button */}
            <button
              className="absolute top-4 right-6 bg-[#f1c27d] hover:bg-[#ffe0b2] text-[#232c3b] p-3 rounded-2xl shadow-lg border border-[#c98d3e] z-20"
              title="Edit profile"
            >
              <FaUserPlus size={24} />
            </button>
            <div className="absolute left-8 -bottom-24 w-36 h-36 rounded-full overflow-hidden border-4 border-[#232c3b] shadow-xl flex items-center justify-center bg-[#232c3b] z-20">
              <Image
                src={
                  avatarPreview || profile.avatarUrl || "/default-avatar.png"
                }
                alt="Avatar"
                width={144}
                height={144}
                className="object-cover w-full h-full"
              />
              {/* Avatar edit button - always visible, yellow, with pencil icon, perfectly positioned */}
              <label className="absolute bottom-0 right-0 w-12 h-12 bg-[#f4d35e] border-4 border-black shadow-lg rounded-full flex items-center justify-center cursor-pointer z-30 transition hover:scale-105 translate-x-1/4 translate-y-1/4">
                <FaPen className="text-[#232c3b] text-xl" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* User info below banner, add left margin to avoid avatar overlap */}
          <div className="flex flex-row items-center justify-between w-full px-2 mt-12">
            <div>
              <h2 className="text-3xl font-bold mb-0">
                {profile.name || "No Name"}
              </h2>
              <div className="text-[#6c7a89] text-lg mb-1">
                {profile.email.split("@")[0]}
              </div>
              <div className="text-white text-md mb-2">
                Joined{" "}
                {new Date(profile.createdAt).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="flex gap-6 mb-2">
                <span className="text-blue-400 font-bold">0 Following</span>
                <span className="text-blue-400 font-bold">0 Followers</span>
              </div>
            </div>
            {/* Language flags bottom right */}
            <div className="flex gap-2 pb-2 self-end">
              <span className="inline-flex items-center px-2 py-1 bg-[#ff4b4b] rounded-lg text-white text-lg">
                <span className="mr-1">🇪🇸</span>
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-[#7ed957] rounded-lg text-white text-lg">
                <span className="mr-1">🇧🇷</span>
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-[#4b9fff] rounded-lg text-white text-lg">
                <span className="mr-1">🇫🇷</span>
              </span>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-[#232c3b] rounded-2xl shadow p-6">
            <h3 className="font-bold text-xl mb-4">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#181f2a] rounded-xl p-4 flex flex-col items-center min-w-[140px]">
                <FaFire className="text-yellow-400 text-2xl mb-1" />
                <div className="font-bold text-lg">{profile.streak ?? 0}</div>
                <div className="text-xs text-gray-400">Day streak</div>
              </div>
              <div className="bg-[#181f2a] rounded-xl p-4 flex flex-col items-center min-w-[140px]">
                <FaMedal className="text-yellow-400 text-2xl mb-1" />
                <div className="font-bold text-lg">{profile.xp ?? 0}</div>
                <div className="text-xs text-gray-400">Total XP</div>
              </div>
              <div className="bg-[#181f2a] rounded-xl p-4 flex flex-col items-center min-w-[140px]">
                <FaCrown className="text-blue-400 text-2xl mb-1" />
                <div className="font-bold text-lg">Sapphire</div>
                <div className="text-xs text-gray-400">Current league</div>
              </div>
              <div className="bg-[#181f2a] rounded-xl p-4 flex flex-col items-center min-w-[140px]">
                <FaTrophy className="text-green-400 text-2xl mb-1" />
                <div className="font-bold text-lg">1</div>
                <div className="text-xs text-gray-400">Top 3 finishes</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-[#232c3b] rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl">Achievements</h3>
              <a href="#" className="text-blue-400 text-sm hover:underline">
                VIEW ALL
              </a>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {/* Placeholder badges */}
              <div className="bg-[#181f2a] rounded-xl p-4 flex flex-col items-center">
                <FaMedal className="text-yellow-400 text-2xl mb-1" />
                <span className="text-xs text-gray-400">Wildfire</span>
              </div>
              <div className="bg-[#181f2a] rounded-xl p-4 flex flex-col items-center">
                <FaMedal className="text-yellow-400 text-2xl mb-1" />
                <span className="text-xs text-gray-400">Sharpshooter</span>
              </div>
              <div className="bg-[#181f2a] rounded-xl p-4 flex flex-col items-center">
                <FaMedal className="text-yellow-400 text-2xl mb-1" />
                <span className="text-xs text-gray-400">Champion</span>
              </div>
              <div className="bg-[#181f2a] rounded-xl p-4 flex flex-col items-center">
                <FaMedal className="text-yellow-400 text-2xl mb-1" />
                <span className="text-xs text-gray-400">Streaker</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right widgets: status bar + followers, add friends */}
        <div className="hidden lg:flex flex-col w-[340px] gap-8">
          {/* Status bar */}
          <div className="flex items-center justify-between px-2 py-2">
            {/* Flag */}
            <span className="inline-flex items-center justify-center w-12 h-10 bg-white rounded-lg shadow border-2 border-[#f4d35e]">
              <span className="text-2xl">🇪🇸</span>
            </span>
            {/* Streak */}
            <span className="flex items-center gap-1 text-gray-400 text-lg font-bold">
              <FaFire className="text-2xl" />
              <span className="ml-1">0</span>
            </span>
            {/* Gems */}
            <span className="flex items-center gap-1 text-sky-400 text-lg font-bold">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="14,3 25,10 22,25 6,25 3,10"
                  fill="#1fb6ff"
                  stroke="#1fb6ff"
                  strokeWidth="2"
                />
                <polygon
                  points="14,6 23,11 21,23 7,23 5,11"
                  fill="#fff"
                  fillOpacity="0.3"
                />
              </svg>
              <span className="ml-1">536</span>
            </span>
            {/* Hearts */}
            <span className="flex items-center gap-1 text-red-400 text-lg font-bold">
              <FaHeart className="text-2xl" />
              <span className="ml-1">5</span>
            </span>
          </div>
          {/* Followers/Following Widget */}
          <div className="bg-[#232c3b] rounded-2xl shadow p-6">
            <div className="flex justify-between mb-2 border-b border-[#181f2a] pb-2">
              <span className="font-bold text-blue-300 cursor-pointer">
                FOLLOWING
              </span>
              <span className="font-bold text-gray-400 cursor-pointer">
                FOLLOWERS
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              {/* Placeholder avatars */}
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className="inline-block w-8 h-8 bg-gray-500 rounded-full border-2 border-[#232c3b]"
                  />
                ))}
              </div>
            </div>
            <div className="text-xs text-gray-400 text-center mb-2">
              Learning is more fun and effective when you connect with others.
            </div>
          </div>

          {/* Add Friends Widget */}
          <div className="bg-[#232c3b] rounded-2xl shadow p-6 flex flex-col gap-4">
            <div className="font-bold mb-2">Add friends</div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold">
              <FaUserFriends /> Find friends
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold">
              <FaUsers /> Invite friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
