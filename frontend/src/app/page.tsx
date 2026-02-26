import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ background: "linear-gradient(to bottom right, var(--gradient-from), var(--gradient-via), var(--gradient-to))" }}>
      {/* Navigation */}
      <nav className="border-b backdrop-blur-md" style={{ borderColor: "var(--border-color)", background: "var(--bg-nav)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            TaskFlow
          </h1>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="text-sm border px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
              style={{ color: "var(--text-secondary)", borderColor: "var(--border-color)" }}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Built for productivity
          </div>

          <h2 className="text-5xl sm:text-6xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ color: "var(--text-primary)" }}>
            Manage your tasks{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
              effortlessly
            </span>
          </h2>

          <p className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            A modern, scalable task management app with secure authentication,
            real-time CRUD operations, AI-powered suggestions, pagination, and a
            beautiful dashboard — all built with Next.js and Node.js.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 ease-in-out hover:scale-105 text-base shadow-lg shadow-blue-500/25"
            >
              Start for Free
            </Link>
            <Link
              href="/login"
              className="border px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 ease-in-out hover:scale-105 text-base"
              style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
            >
              Sign In
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20">
            <div className="bg-white/5 backdrop-blur-md border rounded-xl p-6 text-left cursor-default animate-fade-in-up transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/40" style={{ borderColor: "var(--border-color)" }}>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Secure Auth</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>JWT-based authentication with rate limiting and password validation</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border rounded-xl p-6 text-left cursor-default animate-fade-in-up transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/40" style={{ borderColor: "var(--border-color)", animationDelay: "80ms" }}>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Optimistic CRUD</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Instant UI updates with automatic rollback on failure</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border rounded-xl p-6 text-left cursor-default animate-fade-in-up transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/40" style={{ borderColor: "var(--border-color)", animationDelay: "160ms" }}>
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>AI Suggestions</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Smart task categorization and productivity tips powered by AI</p>
            </div>
          </div>

          {/* Mock Dashboard Preview */}
          <div className="mt-16 mb-8 relative">
            {/* Premium glow effect */}
            <div className="absolute -inset-1 bg-blue-500/20 blur-2xl opacity-30 rounded-3xl"></div>
            <div className="relative border rounded-2xl p-1 shadow-2xl shadow-blue-500/5" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg-primary)" }}>
                {/* Mock browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "var(--border-color)" }}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/60"></div>
                  </div>
                  <div className="flex-1 ml-3">
                    <div className="rounded-md px-3 py-1 text-xs max-w-xs mx-auto text-center flex items-center justify-center gap-1.5" style={{ background: "var(--input-bg)", color: "var(--text-muted)" }}>
                      <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                      <span>https://app.taskflow.io/dashboard</span>
                    </div>
                  </div>
                </div>
                {/* Mock dashboard content */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="rounded-lg p-3 bg-white/5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg cursor-default">
                      <p className="text-[10px] uppercase" style={{ color: "var(--text-muted)" }}>Total</p>
                      <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>12</p>
                    </div>
                    <div className="rounded-lg p-3 bg-white/5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg cursor-default">
                      <p className="text-[10px] text-yellow-400 uppercase">Pending</p>
                      <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>5</p>
                    </div>
                    <div className="rounded-lg p-3 bg-white/5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg cursor-default">
                      <p className="text-[10px] text-emerald-400 uppercase">Done</p>
                      <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>7</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-lg p-3 flex items-center gap-3 bg-white/5 border border-white/5 transition-all duration-300 ease-in-out hover:bg-white/10 hover:border-blue-400/40 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm line-through" style={{ color: "var(--text-muted)" }}>Set up project structure</span>
                      <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">completed</span>
                    </div>
                    <div className="rounded-lg p-3 flex items-center gap-3 bg-white/5 border border-white/5 transition-all duration-300 ease-in-out hover:bg-white/10 hover:border-blue-400/40 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-500"></div>
                      <span className="text-sm" style={{ color: "var(--text-primary)" }}>Build authentication flow</span>
                      <span className="ai-pulse ml-2 text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">🐛 Debug</span>
                      <span className="ml-auto text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">pending</span>
                    </div>
                    <div className="rounded-lg p-3 flex items-center gap-3 bg-white/5 border border-white/5 transition-all duration-300 ease-in-out hover:bg-white/10 hover:border-blue-400/40 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-500"></div>
                      <span className="text-sm" style={{ color: "var(--text-primary)" }}>Deploy to production</span>
                      <span className="ai-pulse ml-2 text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">🚀 Deploy</span>
                      <span className="ml-auto text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm mt-4" style={{ color: "var(--text-muted)" }}>Your dashboard — clean, fast, and AI-assisted</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm" style={{ borderColor: "var(--border-color)", color: "var(--text-muted)" }}>
        Built with Next.js, Express, MongoDB & Tailwind CSS — with AI-powered task suggestions
      </footer>
    </div>
  );
}
