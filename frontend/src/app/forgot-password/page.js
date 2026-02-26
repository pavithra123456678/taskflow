"use client";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;

    setLoading(true);
    try {
      // call backend
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api") + "/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // It's OK to get generic response; show submitted screen anyway
      setSubmitted(true);
    } catch (err) {
      // keep UX simple — show submitted and let user check email
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: 'radial-gradient(ellipse at top left, #0f172a 0%, #020617 60%)' }}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="theme-toggle fixed top-5 right-5 p-2 rounded-lg z-10 transition hover:bg-(--input-bg)"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <div className="w-full max-w-lg px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2 text-white">TaskFlow</h1>
          <p className="text-sm text-gray-300">Reset your password</p>
        </div>
        <div className="mx-auto p-8 rounded-2xl shadow-2xl animate-fade-in-up" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}>
          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white">Forgot password?</h2>
                <p className="text-sm mt-2 text-gray-300">No worries. Enter your email and we'll send you a reset link.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full p-3 border rounded-lg placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    style={{
                      background: "var(--input-bg)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" disabled={loading || !email.includes("@")} className="w-full py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 text-white">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4 animate-fade-in-up">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-white">Check your email</h2>
              <p className="text-sm mb-1 text-gray-300">We sent a password reset link to</p>
              <p className="text-sm font-medium text-blue-400 mb-6">{email}</p>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                Didn&apos;t receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  try another email
                </button>
              </p>
              <p className="text-[11px] px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400/70 mb-2">Email sent — check your inbox.</p>
            </div>
          )}

          <div className="text-center mt-6 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
            <Link
              href="/login"
              className="text-sm inline-flex items-center gap-1.5 transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
