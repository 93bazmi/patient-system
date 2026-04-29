import { useRef } from "react";

export function useScrollToError() {
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  const register = (name: string) => (el: HTMLElement | null) => {
    fieldRefs.current[name] = el;
  };

  const scrollToError = (fieldName: string) => {
    const el = fieldRefs.current[fieldName];
    if (!el) return;

    const y =
      el.getBoundingClientRect().top + window.pageYOffset - 120;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setTimeout(() => {
      const focusTarget =
        el.querySelector("input, select, textarea") || el;

      if (focusTarget instanceof HTMLElement) {
        focusTarget.focus();
      }
    }, 300);
  };

  
  return { register, scrollToError };
}