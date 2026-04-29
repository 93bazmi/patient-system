import React, { forwardRef } from "react";
import Select from "./Select";
import { SelectFieldProps } from "@/types/form";

const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(
  (
    {
      label,
      name,
      value,
      options,
      required,
      optional,
      error,
      readOnly,
      onChange,
    },
    ref,
  ) => {
    const selected = options.find((opt) => opt.value === value);

    if (readOnly) {
      return (
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-medium">
            {label}
            {optional && (
              <span className="text-gray-400 ml-1 text-xs">({optional})</span>
            )}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <div
            ref={ref}
            tabIndex={0}
            className={`w-full px-3 py-2 rounded-lg cursor-default transition
        focus:ring-2 focus:ring-blue-200 focus:outline-none focus:bg-white ${
          selected ? "bg-blue-50 text-gray-700" : "bg-gray-100 text-gray-400"
        }`}
          >
            {selected?.label || "Not yet filled out."}
          </div>

          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      );
    }

    return (
      <div ref={ref} className="flex flex-col gap-1">
        <label className="text-sm text-gray-600 font-medium">
          {label}
          {optional && (
            <span className="text-gray-400 ml-1 text-xs">({optional})</span>
          )}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <Select
          name={name}
          value={value}
          options={options}
          onChange={onChange}
          error={error}
        />

        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";
export default SelectField;
