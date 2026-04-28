"use client";

import { useEffect } from "react";
import { Check, XCircle, Info } from "lucide-react";

type PopupProps = {
  message: string;
  type?: "success" | "error" | "info";
  show: boolean;
  onClose: () => void;
  variant?: "toast" | "modal";
};

export default function Popup({
  message,
  type = "info",
  show,
  onClose,
  variant = "toast",
}: PopupProps) {
  useEffect(() => {
    if (show && variant === "toast") {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, variant, onClose]);

  if (!show) return null;

  const config = {
    success: {
      icon: <Check className="w-12 h-12 text-green-500" />,
      title: "Success",
      bg: "bg-green-100",
    },
    error: {
      icon: <XCircle className="w-12 h-12 text-red-500" />,
      title: "Cannot submit",
      bg: "bg-red-100",
    },
    info: {
      icon: <Info className="w-12 h-12 text-blue-500" />,
      title: "Info",
      bg: "bg-blue-100",
    },
  };

  const { icon, title, bg } = config[type];

  if (variant === "toast") {
    return (
      <div className="fixed top-4 right-4 z-50 w-[90%] sm:w-auto max-w-sm">
        <div className="flex items-start justify-between gap-3 border-l-4 bg-white rounded-lg shadow-md px-4 py-3 border-green-400 animate-slide-in">
          <p className="text-sm text-gray-700">{message}</p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* modal */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 text-center animate-fade-in">
        {/* icon */}
        <div className="flex justify-center mb-4">
          <div className={`rounded-full p-3 ${bg}`}>{icon}</div>
        </div>

        {/* title */}
        <h2 className="text-lg font-semibold text-gray-700 mb-1">{title}</h2>

        {/* message */}
        <p className="text-sm text-gray-500 mb-5">{message}</p>

        {/* button */}
        <button
          onClick={onClose}
          className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
