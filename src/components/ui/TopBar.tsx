"use client";

import { Wifi, WifiOff, ArrowLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  connected?: boolean;
  showBack?: boolean;
  rightSlot?: React.ReactNode;
  backHref?: string;
};

export default function TopBar({
  title,
  connected = false,
  showBack = false,
  backHref = "/room",
  rightSlot,
}: Props) {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-300 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>

          <span className="font-semibold text-gray-800 text-sm sm:text-base">
            {title}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Connection */}
          {/* <div
            className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border ${
              connected
                ? "bg-emerald-50 text-emerald-400 border-emerald-200"
                : "bg-red-50 text-red-400 border-red-200"
            }`}
          >
            {connected ? (
              <Wifi className="w-3 h-3" />
            ) : (
              <WifiOff className="w-3 h-3" />
            )}
            <span className="hidden sm:inline">
              {connected ? "Connected" : "Disconnected"}
            </span>
          </div> */}

          {/* Back */}
          {showBack && (
            <button
              onClick={() => router.push(backHref)}
              className="flex items-center gap-2 text-xs sm:text-sm px-3 py-1.5 rounded-lg 
               bg-gray-100 text-gray-600 
               hover:bg-gray-200 hover:text-gray-600 
               transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to select room</span>
            </button>
          )}

          {rightSlot}
        </div>
      </div>
    </header>
  );
}
