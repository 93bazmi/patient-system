"use client";

import React from "react";

import {
  User,
  Phone,
  Globe,
  Mail,
  MapPin,
  HeartPulse,
  CalendarDays,
  Languages,
  Siren,
  HandHeart,
  Notebook,
  FileText,
} from "lucide-react";

import Section from "@/components/form/Section";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import { validatePatient } from "@/lib/validation/patient";
import type { PatientFormType } from "@/types/patient";
import { useScrollToError } from "@/hook/useScrollToError";

type Props = {
  data: PatientFormType;
  onChange?: (data: PatientFormType) => void;
  onSubmit?: () => void;
  readOnly?: boolean;
  disabled?: boolean;
};

export default function PatientForm({
  data,
  onChange,
  onSubmit,
  readOnly = false,
}: Props) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { register, scrollToError } = useScrollToError();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (!onChange) return;

    const updated = {
      ...data,
      [e.target.name]: e.target.value,
    };

    onChange(updated);
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!onChange) return;

    const updated = { ...data, [name]: value };
    onChange(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validatePatient(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];

      requestAnimationFrame(() => {
        scrollToError(firstErrorField);
      });

      return;
    }

    onSubmit?.();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      {/* Header */}{" "}
      <div className="flex items-center justify-center gap-2 text-blue-400 font-semibold text-2xl py-4">
        {" "}
        <HeartPulse className="w-8 h-8" />
        Patient Form{" "}
      </div>
      <form noValidate onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Section title="Personal Information" icon={<User />}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <InputField
              label="First Name"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              error={errors.firstName}
              ref={register("firstName")}
              required
              readOnly={readOnly}
            />
            <InputField
              label="Middle Name"
              optional="optional"
              name="middleName"
              value={data.middleName}
              onChange={handleChange}
              error={errors.middleName}
              ref={register("middleName")}
              readOnly={readOnly}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              error={errors.lastName}
              ref={register("lastName")}
              required
              readOnly={readOnly}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              icon={<CalendarDays />}
              label="Date of Birth"
              name="dob"
              type="date"
              value={data.dob}
              onChange={handleChange}
              error={errors.dob}
              ref={register("dob")}
              required
              readOnly={readOnly}
            />
            <SelectField
              label="Gender"
              name="gender"
              value={data.gender}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              onChange={(val) => handleSelectChange("gender", val)}
              error={errors.gender}
              ref={register("gender")}
              required
              readOnly={readOnly}
            />
          </div>
        </Section>

        {/* Contact Information */}
        <Section title="Contact Information" icon={<Notebook />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              icon={<Phone />}
              label="Phone"
              placeholder="e.g. 0827702890"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              error={errors.phone}
              ref={register("phone")}
              required
              readOnly={readOnly}
            />
            <InputField
              icon={<Mail />}
              label="Email"
              optional="if applicable"
              placeholder="e.g. name@example.com"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
              ref={register("email")}
              readOnly={readOnly}
            />
          </div>

          <InputField
            icon={<MapPin />}
            label="Address"
            name="address"
            placeholder="e.g. 123 Main St, City, Province"
            value={data.address}
            onChange={handleChange}
            error={errors.address}
            ref={register("address")}
            required
            readOnly={readOnly}
          />
        </Section>

        {/* Additional Info */}
        <Section title="Additional Info" icon={<FileText />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Preferred Language"
              icon={<Languages />}
              name="language"
              value={data.language}
              onChange={handleChange}
              error={errors.language}
              ref={register("language")}
              required
              readOnly={readOnly}
            />
            <InputField
              label="Nationality"
              icon={<Globe />}
              name="nationality"
              value={data.nationality}
              onChange={handleChange}
              error={errors.nationality}
              ref={register("nationality")}
              required
              readOnly={readOnly}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Emergency Contact"
              icon={<Siren />}
              optional="optional: name and relationship"
              name="emergency"
              value={data.emergency}
              onChange={handleChange}
              error={errors.emergency}
              ref={register("emergency")}
              readOnly={readOnly}
            />
            <InputField
              label="Religion"
              icon={<HandHeart />}
              optional="optional"
              name="religion"
              value={data.religion}
              onChange={handleChange}
              error={errors.religion}
              ref={register("religion")}
              readOnly={readOnly}
            />
          </div>
        </Section>

        {/* Submit */}
        {!readOnly && (
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-400 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-500 transition"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
