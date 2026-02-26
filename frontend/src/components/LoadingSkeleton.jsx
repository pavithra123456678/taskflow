import React from 'react';

export default function LoadingSkeleton({ count = 6 }) {
  const items = Array.from({ length: count });
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {items.map((_, i) => (
        <div key={i} className="p-4 rounded-xl bg-white/6 border border-white/8">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-white/8 animate-pulse shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-3 bg-white/8 rounded w-full animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
