"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <AuthLayout>
      <div className="animate-fade-in-up w-full rounded-3xl bg-white p-[clamp(1.25rem,2.5vh,2rem)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 sm:p-[clamp(1.5rem,3vh,2.5rem)]">
        <div className="mb-[clamp(1rem,2.5vh,2rem)] space-y-[clamp(0.25rem,0.5vh,0.5rem)] text-center">
          <h2 className="text-[clamp(1.5rem,3.5vh,1.875rem)] font-extrabold tracking-tight text-slate-900">Welcome back</h2>
          <p className="text-[clamp(0.75rem,1.5vh,0.875rem)] font-medium text-slate-500">Sign in to continue building your professional resume.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-[clamp(0.75rem,1.5vh,1.25rem)]">
          {error && (
            <div className="animate-scale-in rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600 ring-1 ring-inset ring-red-500/20">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="email" className="text-[clamp(0.75rem,1.5vh,0.875rem)] font-bold text-slate-700">Email</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Mail className="h-[clamp(1rem,2vh,1.25rem)] w-[clamp(1rem,2vh,1.25rem)]" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-[clamp(0.6rem,1.5vh,0.875rem)] pl-10 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-[clamp(0.75rem,1.5vh,0.875rem)] font-bold text-slate-700">Password</label>
              <Link href="/forgot-password" className="text-[clamp(0.7rem,1.4vh,0.875rem)] font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock className="h-[clamp(1rem,2vh,1.25rem)] w-[clamp(1rem,2vh,1.25rem)]" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-xl border-0 py-[clamp(0.6rem,1.5vh,0.875rem)] pl-10 pr-12 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 group relative flex w-full justify-center rounded-xl bg-blue-600 px-4 py-[clamp(0.6rem,1.5vh,0.875rem)] text-[clamp(0.875rem,1.5vh,1rem)] font-bold text-white shadow-sm hover:bg-blue-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:hover:bg-blue-600 transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="mt-[clamp(1.5rem,3vh,2rem)]">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm font-medium leading-6">
              <span className="bg-white px-4 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-[clamp(1rem,2vh,1.5rem)]">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-[clamp(0.5rem,1.5vh,0.75rem)] text-sm font-bold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:ring-slate-300 transition-all active:scale-[0.98]"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>
        </div>

        <div className="mt-[clamp(1.5rem,3vh,2rem)] text-center text-xs sm:text-sm text-slate-500">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
            Create one
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
