"use client";

import { useState, useEffect, useRef } from "react";
import { User, Lock, Bell, Save, Loader2, Camera, Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Profile State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarBase64, setAvatarBase64] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState({
    weeklyTips: true,
    productUpdates: false,
    accountActivity: true,
  });

  const { data, isLoading } = useSWR(status === "authenticated" ? "/api/user/profile" : null, fetcher, {
    revalidateOnFocus: false, // Don't wipe form state on window focus
  });

  useEffect(() => {
    if (data?.user && !initialized) {
      const nameParts = data.user.name?.split(" ") || ["", ""];
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setEmail(data.user.email || "");
      setAvatarBase64(data.user.image || "");
      if (data.user.notifications) {
        setNotifications(data.user.notifications);
      }
      setInitialized(true);
    }
  }, [data, initialized]);


  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showMessage("error", "Image must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, image: avatarBase64 }),
      });
      if (res.ok) {
        showMessage("success", "Profile updated successfully!");
        update({ name: `${firstName} ${lastName}`.trim() });
      } else {
        const data = await res.json();
        showMessage("error", data.error || "Failed to update profile.");
      }
    } catch (e) {
      showMessage("error", "An error occurred while saving.");
    }
    setIsSaving(false);
  };

  const handleSecuritySave = async () => {
    if (newPassword !== confirmPassword) {
      showMessage("error", "New passwords do not match.");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        showMessage("success", "Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showMessage("error", data.error || "Failed to change password.");
      }
    } catch (e: any) {
      console.error("Failed to save security:", e);
      showMessage("error", e.message || "An error occurred while saving.");
    }
    setIsSaving(false);
  };

  const handleNotificationsSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notifications),
      });
      if (res.ok) {
        showMessage("success", "Notification preferences saved!");
      } else {
        showMessage("error", "Failed to save preferences.");
      }
    } catch (e) {
      showMessage("error", "An error occurred while saving.");
    }
    setIsSaving(false);
  };

  if (isLoading || !initialized) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-pulse px-4 pt-6 pb-32 md:pb-8 md:p-8">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="flex gap-3">
          <div className="h-11 bg-slate-100 rounded-xl flex-1"></div>
          <div className="h-11 bg-slate-100 rounded-xl flex-1"></div>
        </div>
        <div className="h-36 bg-slate-100 rounded-2xl w-full"></div>
        <div className="h-11 bg-slate-100 rounded-xl w-full"></div>
        <div className="h-11 bg-slate-100 rounded-xl w-full"></div>
        <div className="h-11 bg-slate-100 rounded-xl w-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl md:max-w-4xl mx-auto px-4 pt-6 pb-32 md:pb-10 md:px-8">

      {/* Page title — single clean header for both mobile and desktop */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 md:text-slate-600 text-sm md:text-base mt-1">Manage your account settings and preferences.</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* ── Tab Navigation ── */}
        <aside className="w-full md:w-64 flex-shrink-0">
          {/* Mobile: pill tabs with animated indicator */}
          <div className="md:hidden relative bg-white border border-slate-200 rounded-2xl p-1.5 flex gap-1 shadow-sm">
            {[
              { id: "profile", icon: <User className="w-4 h-4" />, label: "Profile" },
              { id: "security", icon: <Lock className="w-4 h-4" />, label: "Security" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop: sidebar list */}
          <div className="hidden md:flex flex-col space-y-1">
            {[
              { id: "profile", icon: <User className="w-4 h-4" />, label: "Profile" },
              { id: "security", icon: <Lock className="w-4 h-4" />, label: "Security" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </aside>

        {/* ── Settings Content ── */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-sm">
          
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Profile Information</h2>
                <p className="text-sm text-slate-500 mt-1">Update your account&apos;s profile information and email address.</p>
              </div>
              
              <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
                <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-2xl font-bold overflow-hidden relative group shrink-0">
                  {avatarBase64 ? (
                    <img src={avatarBase64} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    session?.user?.name?.charAt(0) || "U"
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarChange} />
                  <Button variant="outline" className="text-sm h-9 rounded-lg" onClick={() => fileInputRef.current?.click()}>Change Avatar</Button>
                  {avatarBase64 && (
                    <Button variant="ghost" className="text-sm h-9 rounded-lg text-red-500" onClick={() => setAvatarBase64("")}>Remove</Button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-11 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={handleProfileSave} disabled={isSaving} className="bg-slate-900 hover:bg-black text-white h-11 px-6 rounded-xl shadow-md">
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Update Password</h2>
                <p className="text-sm text-slate-500 mt-1">Ensure your account is using a long, random password to stay secure.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password</Label>
                  <div className="relative">
                    <Input id="current_password" type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="h-11 rounded-xl pr-10" />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none">
                      {showCurrentPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <div className="relative">
                    <Input id="new_password" type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-11 rounded-xl pr-10" />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none">
                      {showNewPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <div className="relative">
                    <Input id="confirm_password" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-11 rounded-xl pr-10" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none">
                      {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSecuritySave} disabled={isSaving} className="bg-slate-900 hover:bg-black text-white h-11 px-6 rounded-xl shadow-md">
                   {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Update Password"}
                </Button>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}
