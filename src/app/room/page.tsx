"use client";

import { useRouter } from "next/navigation";
import { DoorOpen } from "lucide-react";

const rooms = ["A", "B"];

export default function SelectRoomPage() {
  const router = useRouter();

  const handleSelect = (room: string) => {
    router.push(`/room/${room}`);
  };

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center px-10 py-10">
      <div className="w-full max-w-5xl">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-600">
            Please select a room
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => handleSelect(room)}
              className="group w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-80 rounded-3xl bg-white border border-gray-200 flex flex-col items-center justify-center gap-4 transition hover:shadow-md active:scale-[0.98] "
            >
              {/* Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition">
                <DoorOpen className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-400" />
              </div>

              {/* Text */}
              <span className="text-xl sm:text-2xl font-semibold text-gray-600 ">
                Room {room}
              </span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
