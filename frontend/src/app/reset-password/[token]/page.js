"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return;
    setLoading(true);
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api") + 
        "/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message || 'Password reset successful' });
        setTimeout(() => router.push('/login'), 1500);
      } else {
        setMessage({ type: 'error', text: data.message || 'Reset failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: 'radial-gradient(ellipse at top left, #0f172a 0%, #020617 60%)' }}>
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}>
        <h2 className="text-2xl font-semibold mb-4 text-white">Reset password</h2>
        {message && (
          <div className={`mb-4 text-sm ${message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-200">New password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded bg-white/6 border border-white/8 text-white" />
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
            {loading ? 'Resetting…' : 'Reset password'}
          </button>
        </form>

        <div className="mt-4 text-sm">
          <Link href="/login" className="text-blue-400">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}
