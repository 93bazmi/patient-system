import { InputFieldProps } from "@/types/patient";

export default function InputField({
  label,
  type,
  required,
  optional,
  icon,
  error,
  readOnly,
  disabled,
  ...props
}: InputFieldProps) {
  const hasValue = !!props.value;

  if (readOnly && type === "date") {
    const hasValue = !!props.value;
    const formatDate = (date: string) => {
      if (!date) return "Not yet filled out.";
      return new Date(date).toLocaleDateString("en-GB"); // 28/04/2026
    };

    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600 font-medium">
          {label}
          {optional && (
            <span className="text-gray-400 ml-1 text-xs">({optional})</span>
          )}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          <div
            tabIndex={0}
            className={`w-full px-3 py-2 rounded-lg cursor-default transition
focus:ring-2 focus:ring-blue-200 focus:outline-none focus:bg-white ${
              icon ? "pl-12" : ""
            } ${
              hasValue
                ? "bg-blue-50 text-gray-700"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {formatDate(props.value)}
          </div>
        </div>

        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 font-medium">
        {label}
        {optional && (
          <span className="text-gray-400 ml-1 text-xs">({optional})</span>
        )}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative ">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ">
            {icon}
          </div>
        )}

        <input
          {...props}
          type={type || "text"}
          placeholder={readOnly ? "" : props.placeholder}
          value={
            readOnly && required && !hasValue
              ? "Not yet filled out."
              : props.value
          }
          disabled={disabled}
          className={`h-11 w-full bg-blue-50 rounded-lg px-3 py-2 border 
          ${error ? "border-red-400" : "border-transparent"}
          focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none transition ${
            icon ? "pl-12" : ""
          } ${
            readOnly
              ? hasValue
                ? "bg-blue-50 text-gray-700 cursor-default caret-transparent"
                : "bg-gray-100 text-gray-400 cursor-default caret-transparent"
              : "bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-200"
          }`}
        />
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
