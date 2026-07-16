"use client";

import { useState, useEffect, useRef } from "react";
import {
  User, Lock, Save, Loader2, Camera,
  Eye, EyeOff, CheckCircle2, AlertCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/lib/utils";

/* ─── Password Input ─────────────────────────────────────────────── */
function PasswordInput({
  id, label, value, onChange, show, onToggle, placeholder = "••••••••",
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; show: boolean;
  onToggle: () => void; placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 pr-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm"
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

/* ═══════════════════════════════════════════════════════════════════ */

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const { mutate } = useSWRConfig();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarBase64, setAvatarBase64] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data, isLoading } = useSWR(
    status === "authenticated" ? "/api/user/profile" : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (data?.user && !initialized) {
      const parts = data.user.name?.split(" ") || ["", ""];
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      setEmail(data.user.email || "");
      setAvatarBase64(data.user.image || "");
      setInitialized(true);
    }
  }, [data, initialized]);

  const flash = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { flash("error", "Image must be less than 2 MB"); return; }
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
        flash("success", "Profile updated successfully!");
        mutate("/api/user/profile");
        update({ name: `${firstName} ${lastName}`.trim() });
      } else {
        const d = await res.json();
        flash("error", d.error || "Failed to update profile.");
      }
    } catch { flash("error", "Something went wrong."); }
    setIsSaving(false);
  };

  const handleSecuritySave = async () => {
    if (newPassword !== confirmPassword) { flash("error", "Passwords do not match."); return; }
    setIsSaving(true);
    try {
      const res = await fetch("/api/user/security", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const d = await res.json();
      if (res.ok) {
        flash("success", "Password changed successfully!");
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      } else { flash("error", d.error || "Failed to change password."); }
    } catch { flash("error", "Something went wrong."); }
    setIsSaving(false);
  };

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || session?.user?.name?.charAt(0) || "U";
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const passwordsMismatch = newPassword && confirmPassword && newPassword !== confirmPassword;
  const canSavePwd = currentPassword && newPassword && newPassword === confirmPassword;

  /* ─── Skeleton ──────────────────────────────────────────────────── */
  if (isLoading || !initialized) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-32 md:pb-10 md:px-8 space-y-4 animate-pulse">
        <div className="h-7 bg-slate-200 rounded-lg w-28" />
        <div className="h-12 bg-slate-100 rounded-2xl" />
        <div className="h-48 bg-slate-100 rounded-2xl" />
        <div className="h-11 bg-slate-100 rounded-xl" />
        <div className="h-11 bg-slate-100 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-5 pb-32 md:pb-12 md:px-6 space-y-5">

      {/* ── Header ── */}
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account and preferences</p>
      </div>

      {/* ── Toast ── */}
      {message.text && (
        <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border ${
          message.type === "success"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-red-50 text-red-600 border-red-200"
        }`}>
          {message.type === "success"
            ? <CheckCircle2 className="w-4 h-4 shrink-0" />
            : <AlertCircle className="w-4 h-4 shrink-0" />}
          {message.text}
        </div>
      )}

      {/* ── Tab Bar ── */}
      <div className="flex bg-slate-100 rounded-2xl p-1 gap-1">
        {[
          { id: "profile",       icon: User, label: "Profile" },
          { id: "security",      icon: Lock, label: "Security" },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {/* ══════ PROFILE ══════ */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Avatar */}
          <div className="md:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-sm h-fit">
            {/* Avatar circle */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                {avatarBase64
                  ? <img src={avatarBase64} alt="Avatar" className="w-full h-full object-cover" />
                  : initials
                }
              </div>
              {/* overlay */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-5 h-5 text-white" />
                <span className="text-white text-[10px] font-bold">Change</span>
              </button>
            </div>

            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarChange} />

            <div className="flex items-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Upload photo
              </button>
              {avatarBase64 && (
                <>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={() => setAvatarBase64("")}
                    className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
            <p className="text-xs text-slate-400 -mt-2">JPG, PNG or GIF · max 2 MB</p>
          </div>

          {/* Name + Email */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Personal Info</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">First Name</label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ali"
                  className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">Last Name</label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Hassan"
                  className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm"
              />
            </div>
            <Button
              onClick={handleProfileSave}
              disabled={isSaving}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-xl font-semibold shadow-sm"
            >
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* ══════ SECURITY ══════ */}
      {activeTab === "security" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Change Password</h3>
            <p className="text-xs text-slate-500 mt-1">Use a strong, unique password for your account.</p>
          </div>

          <div className="space-y-4">
            <PasswordInput
              id="current_pwd" label="Current Password"
              value={currentPassword} onChange={setCurrentPassword}
              show={showCurrent} onToggle={() => setShowCurrent(v => !v)}
            />
            <PasswordInput
              id="new_pwd" label="New Password"
              value={newPassword} onChange={setNewPassword}
              show={showNew} onToggle={() => setShowNew(v => !v)}
            />
            <PasswordInput
              id="confirm_pwd" label="Confirm New Password"
              value={confirmPassword} onChange={setConfirmPassword}
              show={showConfirm} onToggle={() => setShowConfirm(v => !v)}
            />
          </div>

          {/* Match indicator */}
          {(passwordsMatch || passwordsMismatch) && (
            <div className={`flex items-center gap-2 text-sm font-medium ${passwordsMatch ? "text-emerald-600" : "text-red-500"}`}>
              {passwordsMatch
                ? <><CheckCircle2 className="w-4 h-4" /> Passwords match</>
                : <><AlertCircle className="w-4 h-4" /> Passwords do not match</>
              }
            </div>
          )}

          <Button
            onClick={handleSecuritySave}
            disabled={isSaving || !canSavePwd}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-xl font-semibold shadow-sm disabled:opacity-40"
          >
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
            Update Password
          </Button>
        </div>
      )}

    </div>
  );
}
