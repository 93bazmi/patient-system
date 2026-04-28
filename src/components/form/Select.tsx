"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { SelectProps } from "@/types/form";

export default function Select({
  name,
  value,
  onChange,
  options,
  placeholder = "Select...",
  disabled,
  error,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setOpen(true);
        setHighlightIndex(0);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < options.length - 1 ? prev + 1 : prev,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[highlightIndex];
      if (opt) {
        onChange(opt.value);
        setOpen(false);
      }
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={`relative ${className ?? "w-full"}`} ref={containerRef}>
      <input type="hidden" name={name} value={value ?? ""} />
      {/* Control */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`
          relative w-full bg-blue-50 rounded-lg px-3 py-2 border pr-9 text-left
          focus:ring-2 focus:ring-blue-100 focus:outline-none focus:bg-white
          transition
          ${error ? "border-red-400" : "border-transparent"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-blue-50"}
        `}
      >
        <span className="block truncate">
          {selected?.label || (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>

        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && !disabled && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-blue-100 bg-white shadow-md max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-400">No options</div>
          ) : (
            options.map((opt, index) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                onMouseEnter={() => setHighlightIndex(index)}
                className={`
                  w-full text-left px-4 py-2 text-sm truncate
                  ${index === highlightIndex ? "bg-blue-50" : ""}
                  ${
                    opt.value === value
                      ? "bg-blue-100 text-blue-500"
                      : "text-gray-700"
                  }
                `}
              >
                {opt.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
