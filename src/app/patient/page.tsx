"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
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

  const handleSubmit = () => {
    socket.emit("patient:status", "submitted");

    setShowPopup(true);
  };

  useEffect(() => {
    socket.connect();
    socket.emit("patient:status", "idle");

    return () => {
      socket.emit("patient:status", "inactive");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit("patient:update", form);
    }, 200);

    return () => clearTimeout(timer);
  }, [form]);

  useEffect(() => {
    const handleUnload = () => {
      socket.emit("patient:status", "inactive");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <PatientForm data={form} onChange={setForm} onSubmit={handleSubmit} />
        <Popup
          show={showPopup}
          type="success"
          message="Your form has been submitted successfully"
          onClose={() => setShowPopup(false)}
          variant="modal"
        />
      </div>
    </main>
  );
}
