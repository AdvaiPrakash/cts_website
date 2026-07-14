"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-bg-page flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-serif font-medium text-text-page">
          Sign in to Admin Console
        </h2>
        <p className="mt-2 text-xs text-text-page/60 font-sans">
          Creative Tax Solutions (CTS)
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white border border-border-subtle p-8 rounded-xl shadow-sm text-left space-y-6">
          {state?.error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold rounded-lg">
              ✕ {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4 text-xs font-semibold text-text-page/80">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="admin@cts.com"
                className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page font-sans text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-text-page/40">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-black/[0.02] border border-border-subtle rounded-lg focus:outline-none focus:border-primary text-text-page font-sans text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 rounded-lg bg-primary hover:bg-primary-hover text-text-accent-dark font-semibold text-xs tracking-wider transition-colors disabled:opacity-50 cursor-pointer border-none shadow-sm"
              >
                {isPending ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
