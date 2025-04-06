import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50 py-10 px-4">
      <div className="w-full max-w-6xl bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md p-6 sm:p-10 transition-all duration-300 ease-in-out">
        <div className="w-full h-[300px] sm:h-[500px] flex items-center justify-center overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
