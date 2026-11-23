"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const value = new URLSearchParams(window.location.hash.slice(1)).get("token");
    if (value) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    queueMicrotask(() => {
      setToken(value);
      setReady(true);
    });
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (token && password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      const response = await fetch(token ? "/api/auth/reset-password" : "/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token ? { token, password } : { email }),
      });
      const result = await response.json() as { message?: string; error?: string };
      if (!response.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        return;
      }
      setMessage(result.message || "Check your email for the next step.");
      if (token) {
        setToken(null);
        setPassword("");
        setConfirmPassword("");
      }
    } catch {
      setError("The request could not be completed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout>
      <main className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">{token ? "Choose a new password" : "Reset your password"}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {token ? "This link can be used once and expires after 30 minutes." : "Enter the email for your password account. We will send a one-use link if that account exists."}
        </p>
        {ready && !message && (
          <form onSubmit={submit} className="mt-6 space-y-4">
            {token ? <>
              <label className="block text-sm font-medium text-slate-700">New password
                <input type="password" autoComplete="new-password" minLength={8} maxLength={128} required value={password} onChange={event => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
              </label>
              <label className="block text-sm font-medium text-slate-700">Confirm new password
                <input type="password" autoComplete="new-password" minLength={8} maxLength={128} required value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
              </label>
            </> : <label className="block text-sm font-medium text-slate-700">Email address
              <input type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </label>}
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={busy} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
              {busy ? "Please wait..." : token ? "Update password" : "Send reset link"}
            </button>
          </form>
        )}
        {message && <p role="status" className="mt-6 rounded-lg bg-green-50 p-3 text-sm text-green-800">{message}</p>}
        <p className="mt-6 text-sm text-slate-600">Signed up with Google? Use <Link href="/login" className="font-semibold text-blue-700 hover:underline">Continue with Google</Link> instead.</p>
        <Link href="/login" className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline">Back to sign in</Link>
      </main>
    </AuthLayout>
  );
}
