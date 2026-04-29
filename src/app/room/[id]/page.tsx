"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { patientSocket } from "@/lib/socket";
import PatientForm from "@/components/patient/PatientForm";
import { emptyForm, type PatientFormType } from "@/types/patient";
import Popup from "@/components/ui/Popup";
import TopBar from "@/components/ui/TopBar";

export default function PatientPage() {
  const params = useParams();
  const roomId = params.id as string;

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

  const [serving, setServing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "error">("success");

  // ---------------- CONNECT ----------------
  useEffect(() => {
    if (!roomId) return;

    const handleConnect = () => {
      console.log("CONNECTED", roomId);

      patientSocket.emit("join-room", roomId);

      patientSocket.emit("status", {
        roomId,
        status: "idle",
      });
    };

    console.log("ROOM ID:", roomId);

    const handleReset = () => {
      setForm(emptyForm);
      setServing(false);
    };

    const handleBusy = () => {
      setPopupType("error");
      setShowPopup(true);
    };

    patientSocket.on("connect", handleConnect);
    patientSocket.on("serving", setServing);
    patientSocket.on("reset", handleReset);
    patientSocket.on("busy", handleBusy);

    if (!patientSocket.connected) {
      patientSocket.connect();
    } else {
      handleConnect();
    }

    return () => {
      patientSocket.off("connect", handleConnect);
      patientSocket.off("serving", setServing);
      patientSocket.off("reset", handleReset);
      patientSocket.off("busy", handleBusy);

      patientSocket.disconnect();
    };
  }, [roomId]);

  // ---------------- REALTIME UPDATE ----------------
  useEffect(() => {
    const timer = setTimeout(() => {
      patientSocket.emit("update", {
        roomId,
        data: form,
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [form, roomId]);

  // ---------------- CHANGE ----------------
  const handleChange = (updated: PatientFormType) => {
    setForm(updated);

    patientSocket.emit("status", {
      roomId,
      status: "typing",
    });
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = () => {
    if (serving) return;

    patientSocket.emit("submit", {
      roomId,
      data: form,
    });
  };

  useEffect(() => {
    const handleSubmitSuccess = () => {
      setPopupType("success");
      setShowPopup(true);
    };

    const handleSubmitError = (code: string) => {
      if (code === "NO_STAFF") {
        setPopupType("error");
        setShowPopup(true);
      }
    };

    patientSocket.on("submit-success", handleSubmitSuccess);
    patientSocket.on("error-submit", handleSubmitError);

    return () => {
      patientSocket.off("submit-success", handleSubmitSuccess);
      patientSocket.off("error-submit", handleSubmitError);
    };
  }, []);

  return (
    <div>
      <TopBar title={`Room ${roomId}`} showBack={true} backHref="/room" />
      <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl space-y-4">
          {/* STATUS */}
          {serving && (
            <div className="text-yellow-600 text-sm">
              กำลังให้บริการ กรุณารอสักครู่...
            </div>
          )}

          {/* FORM */}
          <PatientForm
            data={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            disabled={serving}
          />

          {/* POPUP */}
          <Popup
            show={showPopup}
            type={popupType}
            message={
              popupType === "success"
                ? "ส่งข้อมูลสำเร็จ"
                : "ไม่สามารถส่งข้อมูลได้ เนื่องจากไม่มีเจ้าหน้าที่ในห้อง"
            }
            onClose={() => setShowPopup(false)}
            variant="modal"
          />
        </div>
      </main>
    </div>
  );
}
