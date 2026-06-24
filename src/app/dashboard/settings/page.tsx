"use client";

import { useState, useEffect, useRef } from "react";
import { User, Lock, Bell, Save, Loader2, Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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

  // Notifications State
  const [notifications, setNotifications] = useState({
    weeklyTips: true,
    productUpdates: false,
    accountActivity: true,
  });

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            const nameParts = data.user.name?.split(" ") || ["", ""];
            setFirstName(nameParts[0] || "");
            setLastName(nameParts.slice(1).join(" ") || "");
            setEmail(data.user.email || "");
            setAvatarBase64(data.user.image || "");
            if (data.user.notifications) {
              setNotifications(data.user.notifications);
            }
          }
          setIsLoading(false);
        });
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status]);

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
        update({ name: `${firstName} ${lastName}`.trim(), image: avatarBase64 });
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
    } catch (e) {
      showMessage("error", "An error occurred while saving.");
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

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">Manage your account settings and preferences.</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-1">
          <button onClick={() => setActiveTab("profile")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === "profile" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
            <User className="w-4 h-4" /> Profile
          </button>
          <button onClick={() => setActiveTab("security")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === "security" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
            <Lock className="w-4 h-4" /> Security
          </button>
          <button onClick={() => setActiveTab("notifications")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${activeTab === "notifications" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
            <Bell className="w-4 h-4" /> Notifications
          </button>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Profile Information</h2>
                <p className="text-sm text-slate-500 mt-1">Update your account's profile information and email address.</p>
              </div>
              
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="w-20 h-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-2xl font-bold overflow-hidden relative group">
                  {avatarBase64 ? (
                    <img src={avatarBase64} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    session?.user?.name?.charAt(0) || "U"
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarChange} />
                  <Button variant="outline" className="text-sm h-9 rounded-lg" onClick={() => fileInputRef.current?.click()}>Change Avatar</Button>
                  {avatarBase64 && (
                    <Button variant="ghost" className="text-sm h-9 rounded-lg text-red-500 ml-2" onClick={() => setAvatarBase64("")}>Remove</Button>
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
                  <Input id="current_password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="h-11 rounded-xl max-w-md" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input id="new_password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-11 rounded-xl max-w-md" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input id="confirm_password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-11 rounded-xl max-w-md" />
                </div>
              </div>

              <div className="pt-4 flex justify-start">
                <Button onClick={handleSecuritySave} disabled={isSaving} className="bg-slate-900 hover:bg-black text-white h-11 px-6 rounded-xl shadow-md">
                   {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Update Password"}
                </Button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Email Notifications</h2>
                <p className="text-sm text-slate-500 mt-1">Choose what updates you want to receive.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Weekly ATS Tips</h3>
                    <p className="text-sm text-slate-500">Get strategies to beat applicant tracking systems.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input type="checkbox" className="sr-only peer" checked={notifications.weeklyTips} onChange={(e) => setNotifications({...notifications, weeklyTips: e.target.checked})} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-start justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Product Updates</h3>
                    <p className="text-sm text-slate-500">Receive news about new templates and features.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input type="checkbox" className="sr-only peer" checked={notifications.productUpdates} onChange={(e) => setNotifications({...notifications, productUpdates: e.target.checked})} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-start justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Account Activity</h3>
                    <p className="text-sm text-slate-500">Important notifications about your account security.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input type="checkbox" className="sr-only peer" checked={notifications.accountActivity} onChange={(e) => setNotifications({...notifications, accountActivity: e.target.checked})} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={handleNotificationsSave} disabled={isSaving} className="bg-slate-900 hover:bg-black text-white h-11 px-6 rounded-xl shadow-md">
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Save Preferences
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
