"use client";

import { useState, useEffect, useRef } from "react";
import {
  User, Lock, Bell, Save, Loader2, Camera, Eye, EyeOff,
  ChevronRight, ShieldCheck, BellRing, CheckCircle2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

/* ── Reusable toggle switch ────────────────────────────────────────── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${checked ? "bg-blue-600" : "bg-slate-200"}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

/* ── Password field with show/hide ────────────────────────────────── */
function PasswordField({
  id, label, value, onChange, show, onToggle,
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; show: boolean; onToggle: () => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold text-slate-700">{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 rounded-xl pr-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {show ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

/* ── Section card wrapper ──────────────────────────────────────────── */
function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {children}
    </div>
  );
}

/* ── Section header inside card ───────────────────────────────────── */
function SectionHeader({
  icon, title, description,
}: {
  icon: React.ReactNode; title: string; description: string;
}) {
  return (
    <div className="px-5 py-5 sm:px-8 sm:py-6 border-b border-slate-100 bg-slate-50/60 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
        {icon}
      </div>
      <div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════ */

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarBase64, setAvatarBase64] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState({
    weeklyTips: true,
    productUpdates: false,
    accountActivity: true,
  });

  const { data, isLoading } = useSWR(
    status === "authenticated" ? "/api/user/profile" : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (data?.user && !initialized) {
      const nameParts = data.user.name?.split(" ") || ["", ""];
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setEmail(data.user.email || "");
      setAvatarBase64(data.user.image || "");
      if (data.user.notifications) setNotifications(data.user.notifications);
      setInitialized(true);
    }
  }, [data, initialized]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showMessage("error", "Image must be less than 2MB"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setAvatarBase64(reader.result as string);
    reader.readAsDataURL(file);
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
        const d = await res.json();
        showMessage("error", d.error || "Failed to update profile.");
      }
    } catch { showMessage("error", "An error occurred while saving."); }
    setIsSaving(false);
  };

  const handleSecuritySave = async () => {
    if (newPassword !== confirmPassword) { showMessage("error", "Passwords do not match."); return; }
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const d = await res.json();
      if (res.ok) {
        showMessage("success", "Password changed successfully!");
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      } else { showMessage("error", d.error || "Failed to change password."); }
    } catch { showMessage("error", "An error occurred while saving."); }
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
      if (res.ok) showMessage("success", "Notification preferences saved!");
      else showMessage("error", "Failed to save preferences.");
    } catch { showMessage("error", "An error occurred while saving."); }
    setIsSaving(false);
  };

  const tabs = [
    { id: "profile",       label: "Profile",       icon: <User className="w-4 h-4" /> },
    { id: "security",      label: "Security",      icon: <Lock className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  ];

  /* ── Loading skeleton ────────────────────────────────────────────── */
  if (isLoading || !initialized) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-32 md:pb-10 md:px-8 animate-pulse space-y-5">
        <div className="h-8 bg-slate-200 rounded-xl w-1/3" />
        <div className="h-12 bg-slate-100 rounded-2xl" />
        <div className="h-40 bg-slate-100 rounded-2xl" />
        <div className="h-11 bg-slate-100 rounded-xl" />
        <div className="h-11 bg-slate-100 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pt-6 pb-32 md:pb-12 md:px-8 space-y-6">

      {/* ── Page Header ── */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account, security and notifications.</p>
      </div>

      {/* ── Toast Message ── */}
      {message.text && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold border ${
          message.type === "success"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-red-50 text-red-600 border-red-200"
        }`}>
          {message.type === "success"
            ? <CheckCircle2 className="w-4 h-4 shrink-0" />
            : <ShieldCheck className="w-4 h-4 shrink-0" />}
          {message.text}
        </div>
      )}

      {/* ── Tab Bar ── */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ══════════════ PROFILE TAB ══════════════ */}
      {activeTab === "profile" && (
        <div className="space-y-4">

          {/* Avatar Card */}
          <SectionCard>
            <SectionHeader
              icon={<User className="w-5 h-5" />}
              title="Profile Photo"
              description="A photo helps people recognise you."
            />
            <div className="px-5 py-6 sm:px-8 flex items-center gap-5">
              <div className="relative shrink-0 group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden border-4 border-white shadow-lg">
                  {avatarBase64
                    ? <img src={avatarBase64} alt="Avatar" className="w-full h-full object-cover" />
                    : (session?.user?.name?.charAt(0) || "U")
                  }
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="flex flex-col gap-2.5">
                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarChange} />
                <Button
                  variant="outline"
                  className="h-9 rounded-xl text-sm border-slate-200 hover:bg-slate-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-3.5 h-3.5 mr-1.5" /> Change Photo
                </Button>
                {avatarBase64 && (
                  <button
                    onClick={() => setAvatarBase64("")}
                    className="text-xs text-red-500 hover:text-red-700 font-semibold text-left transition-colors"
                  >
                    Remove photo
                  </button>
                )}
                <p className="text-xs text-slate-400">JPG, PNG or GIF · max 2 MB</p>
              </div>
            </div>
          </SectionCard>

          {/* Personal Info Card */}
          <SectionCard>
            <SectionHeader
              icon={<User className="w-5 h-5" />}
              title="Personal Information"
              description="Update your name and email address."
            />
            <div className="px-5 py-6 sm:px-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold text-slate-700">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11 rounded-xl border-slate-200"
                    placeholder="Ali"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-slate-700">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 rounded-xl border-slate-200"
                    placeholder="Hassan"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl border-slate-200"
                  placeholder="you@example.com"
                />
              </div>
              <div className="pt-2 flex justify-end">
                <Button
                  onClick={handleProfileSave}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-7 rounded-xl shadow-sm shadow-blue-600/20"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ══════════════ SECURITY TAB ══════════════ */}
      {activeTab === "security" && (
        <SectionCard>
          <SectionHeader
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Change Password"
            description="Use a long, random password to keep your account safe."
          />
          <div className="px-5 py-6 sm:px-8 space-y-5">
            <PasswordField
              id="current_password" label="Current Password"
              value={currentPassword} onChange={setCurrentPassword}
              show={showCurrent} onToggle={() => setShowCurrent(v => !v)}
            />
            <PasswordField
              id="new_password" label="New Password"
              value={newPassword} onChange={setNewPassword}
              show={showNew} onToggle={() => setShowNew(v => !v)}
            />
            <PasswordField
              id="confirm_password" label="Confirm New Password"
              value={confirmPassword} onChange={setConfirmPassword}
              show={showConfirm} onToggle={() => setShowConfirm(v => !v)}
            />

            {/* Password match indicator */}
            {newPassword && confirmPassword && (
              <div className={`flex items-center gap-2 text-sm font-medium ${newPassword === confirmPassword ? "text-emerald-600" : "text-red-500"}`}>
                {newPassword === confirmPassword
                  ? <><CheckCircle2 className="w-4 h-4" /> Passwords match</>
                  : <><ShieldCheck className="w-4 h-4" /> Passwords do not match</>
                }
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <Button
                onClick={handleSecuritySave}
                disabled={isSaving || !currentPassword || !newPassword || newPassword !== confirmPassword}
                className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-7 rounded-xl shadow-sm shadow-blue-600/20 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
                Update Password
              </Button>
            </div>
          </div>
        </SectionCard>
      )}

      {/* ══════════════ NOTIFICATIONS TAB ══════════════ */}
      {activeTab === "notifications" && (
        <SectionCard>
          <SectionHeader
            icon={<BellRing className="w-5 h-5" />}
            title="Email Notifications"
            description="Choose which emails you want to receive."
          />
          <div className="divide-y divide-slate-100">
            {[
              {
                key: "weeklyTips" as const,
                title: "Weekly Resume Tips",
                desc: "Get actionable tips to improve your resume every week.",
              },
              {
                key: "productUpdates" as const,
                title: "Product Updates",
                desc: "Stay in the loop with new features and improvements.",
              },
              {
                key: "accountActivity" as const,
                title: "Account Activity",
                desc: "Receive alerts for logins and important account changes.",
              },
            ].map(({ key, title, desc }) => (
              <div key={key} className="flex items-center justify-between px-5 py-5 sm:px-8 gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
                <Toggle
                  checked={notifications[key]}
                  onChange={(v) => setNotifications(prev => ({ ...prev, [key]: v }))}
                />
              </div>
            ))}
          </div>
          <div className="px-5 py-5 sm:px-8 border-t border-slate-100 flex justify-end">
            <Button
              onClick={handleNotificationsSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-7 rounded-xl shadow-sm shadow-blue-600/20"
            >
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Preferences
            </Button>
          </div>
        </SectionCard>
      )}

    </div>
  );
}
