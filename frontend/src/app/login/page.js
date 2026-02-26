"use client";
import { useState } from "react";
import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const data = await loginUser(form);
    setLoading(false);

    if (data.token) {
      login(data);
      router.push("/dashboard");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center transition-colors duration-300"
      style={{
        background: `linear-gradient(to bottom right, var(--gradient-from), var(--gradient-via), var(--gradient-to))`,
      }}
    >
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

      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>TaskFlow</h1>
          <p style={{ color: "var(--text-secondary)" }}>Sign in to manage your tasks</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg border p-8 rounded-2xl shadow-2xl animate-fade-in-up"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--text-primary)" }}>
            Welcome Back
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border rounded-lg placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              style={{
                background: "var(--input-bg)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-3 pr-11 border rounded-lg placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                style={{
                  background: "var(--input-bg)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors hover:bg-white/10"
                style={{ color: "var(--text-muted)" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 disabled:bg-blue-600/50 disabled:hover:scale-100 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-sm text-center mt-6" style={{ color: "var(--text-secondary)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
