"use client";

import { useEffect, useState } from "react";
import { patientSocket } from "@/lib/socket";
import PatientForm from "@/components/patient/PatientForm";
import type { PatientFormType } from "@/types/patient";
import Popup from "@/components/ui/Popup";

export default function PatientPage() {
  const [form, setForm] = useState<PatientFormType>({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    language: "",
    nationality: "",
    emergency: "",
    religion: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "error">("success");

  const handleChange = (updated: PatientFormType) => {
    setForm(updated);
    patientSocket.emit("status", "typing");
  };

  const handleSubmit = () => {
    patientSocket.emit("check:staff", (isOnline: boolean) => {
      if (!isOnline) {
        setPopupType("error");
        setShowPopup(true);
        return;
      }

      patientSocket.emit("update", form);

      patientSocket.emit("submit", form);

      patientSocket.emit("status", "submitted");

      setPopupType("success");
      setShowPopup(true);
    });
  };
  useEffect(() => {
    patientSocket.connect();
    patientSocket.emit("status", "idle");

    return () => {
      patientSocket.emit("status", "inactive");
      patientSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      patientSocket.emit("update", form);
    }, 200);

    return () => clearTimeout(timer);
  }, [form]);

  useEffect(() => {
    const handleUnload = () => {
      patientSocket.emit("status", "inactive");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <PatientForm
          data={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <Popup
          show={showPopup}
          type={popupType}
          message={
            popupType === "success"
              ? "Your form has been submitted successfully"
              : "No staff available right now"
          }
          onClose={() => setShowPopup(false)}
          variant="modal"
        />
      </div>
    </main>
  );
}
