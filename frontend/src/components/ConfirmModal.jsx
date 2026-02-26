"use client";
import { useEffect, useRef } from "react";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  const cancelRef = useRef(null);

  // Focus cancel button on mount + Escape to close
  useEffect(() => {
    cancelRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div
        className="rounded-xl shadow-2xl p-6 w-80 text-center transform transition-all duration-200 ease-out scale-95 opacity-0"
        style={{ background: "var(--modal-bg)" }}
        onAnimationEnd={() => { /* placeholder to allow animation class toggles if needed */ }}
      >
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--modal-text)" }}>Delete Task</h3>
        <p className="text-sm mb-6" style={{ color: "var(--modal-text-secondary)" }}>{message}</p>
        <div className="flex gap-3">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="btn-hover flex-1 px-4 py-2 border rounded-lg font-medium transition"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--modal-text-secondary)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-hover flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
