import React from "react";

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="max-w-xl p-8 bg-gray-900/70 border border-gray-800 rounded-lg">
            <h1 className="text-2xl font-bold mb-2">Page not found</h1>
            <p className="text-sm text-gray-300">The page you're looking for doesn't exist.</p>
          </div>
        </div>
      </body>
    </html>
  );
}
