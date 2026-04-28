import { SectionProps } from "@/types/form";

export default function Section({ title, icon, children }: SectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 font-semibold text-gray-700">
        <span className="text-blue-400 w-5 h-5">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}
