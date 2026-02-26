"use client";
import { useState } from "react";
import { registerUser } from "../../services/api";
import { useRouter } from "next/navigation";
import { useTheme } from "../../context/ThemeContext";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);

    // Live-clear errors as user types
    const newErrors = { ...errors };
    if (field === "name" && value.trim()) delete newErrors.name;
    if (field === "email" && value.includes("@")) delete newErrors.email;
    if (field === "password" && passwordRegex.test(value)) delete newErrors.password;
    setErrors(newErrors);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Min 6 chars, 1 uppercase & 1 number required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const data = await registerUser(form);

    setLoading(false);

    if (data.message === "User registered successfully") {
      router.push("/login");
    } else {
      setErrors({ server: data.message });
    }
  };

  const isFormValid =
    form.name &&
    form.email &&
    form.password &&
    Object.keys(errors).length === 0;

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
          <p style={{ color: "var(--text-secondary)" }}>Create your account to get started</p>
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
            Create Account
          </h2>

          {errors.server && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg mb-4">
              {errors.server}
            </div>
          )}

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 border rounded-lg placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              style={{
                background: "var(--input-bg)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
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
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters"
                className="w-full p-3 pr-11 border rounded-lg placeholder-(--text-muted) focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                style={{
                  background: "var(--input-bg)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
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
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password}
              </p>
            )}
            {form.password.length > 0 && (
              <div className="mt-3 space-y-1.5">
                <p className={`text-xs flex items-center gap-2 transition-all duration-300 ${
                  form.password.length >= 6 ? "text-emerald-400" : "text-gray-500"
                }`}>
                  <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] transition-all duration-300 ${
                    form.password.length >= 6 ? "bg-emerald-500/20" : "bg-gray-500/20"
                  }`}>{form.password.length >= 6 ? "\u2713" : "\u25CB"}</span> 6+ characters
                </p>
                <p className={`text-xs flex items-center gap-2 transition-all duration-300 ${
                  /[A-Z]/.test(form.password) ? "text-emerald-400" : "text-gray-500"
                }`}>
                  <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] transition-all duration-300 ${
                    /[A-Z]/.test(form.password) ? "bg-emerald-500/20" : "bg-gray-500/20"
                  }`}>{/[A-Z]/.test(form.password) ? "\u2713" : "\u25CB"}</span> 1 uppercase letter
                </p>
                <p className={`text-xs flex items-center gap-2 transition-all duration-300 ${
                  /\d/.test(form.password) ? "text-emerald-400" : "text-gray-500"
                }`}>
                  <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] transition-all duration-300 ${
                    /\d/.test(form.password) ? "bg-emerald-500/20" : "bg-gray-500/20"
                  }`}>{/\d/.test(form.password) ? "\u2713" : "\u25CB"}</span> 1 number
                </p>
              </div>
            )}
          </div>

          <button
            disabled={!isFormValid || loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-sm text-center mt-6" style={{ color: "var(--text-secondary)" }}>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
