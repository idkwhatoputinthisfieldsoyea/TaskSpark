"use client";

import React from "react";

export default function GlobalError({ error }: { error: Error }) {
  console.error(error);
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-white text-slate-900">
          <div className="max-w-xl p-8 bg-slate-50 border border-slate-200 rounded-lg">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-sm text-slate-600">An unexpected error occurred. Please try again later.</p>
          </div>
        </div>
      </body>
    </html>
  );
}
