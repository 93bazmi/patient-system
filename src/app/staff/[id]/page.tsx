"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { PatientFormType, PatientStatus } from "@/types/patient";
import { staffSocket } from "@/lib/socket";
import PatientForm from "@/components/patient/PatientForm";
import Popup from "@/components/ui/Popup";
import {
  Keyboard,
  CheckCircle2,
  Clock,
  User,
  CircleCheckBig,
} from "lucide-react";
import TopBar from "@/components/ui/TopBar";

const emptyForm: PatientFormType = {
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
};

const statusConfig: Record<
  PatientStatus,
  {
    label: string;
    message: string;
    icon: React.ReactNode;
    badge: string;
    dot: string;
  }
> = {
  inactive: {
    label: "Inactive",
    message: "No activity",
    icon: <Clock className="w-4 h-4" />,
    badge: "bg-gray-100 text-gray-500 border-gray-200",
    dot: "bg-gray-400",
  },
  idle: {
    label: "Idle",
    message: "Opened form",
    icon: <User className="w-4 h-4" />,
    badge: "bg-yellow-50 text-yellow-500 border-yellow-200",
    dot: "bg-yellow-400",
  },
  typing: {
    label: "Typing",
    message: "Filling form...",
    icon: <Keyboard className="w-4 h-4" />,
    badge: "bg-blue-50 text-blue-400 border-blue-200",
    dot: "bg-blue-500",
  },
  submitted: {
    label: "Submitted",
    message: "Form submitted",
    icon: <CheckCircle2 className="w-4 h-4" />,
    badge: "bg-emerald-50 text-emerald-400 border-emerald-200",
    dot: "bg-emerald-500 animate-pulse",
  },
};

export default function StaffView() {
  const params = useParams();
  const roomId = params.id as string;

  const [data, setData] = useState<PatientFormType | null>(null);
  const [status, setStatus] = useState<PatientStatus>("inactive");
  const [serving, setServing] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const displayData = data ?? emptyForm;
  const cfg = statusConfig[status];
  const [, forceUpdate] = useState({});

  const [mounted, setMounted] = useState(false);
  const connected = mounted ? staffSocket.connected : false;

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    staffSocket.connect();

    const update = () => forceUpdate({});

    staffSocket.on("connect", () => {
      update();

      staffSocket.emit("join-room", roomId);
    });

    staffSocket.on("disconnect", update);

    const handleData = (incoming: PatientFormType) => setData(incoming);

    const handleStatus = (s: PatientStatus) => {
      setStatus(s);

      if (s === "inactive") {
        setData(null);
      }

      if (s === "submitted") {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    };

    staffSocket.on("data", handleData);
    staffSocket.on("status", handleStatus);

    staffSocket.on("serving", setServing);

    return () => {
      staffSocket.off("connect");
      staffSocket.off("disconnect");
      staffSocket.off("data", handleData);
      staffSocket.off("status", handleStatus);
      staffSocket.off("serving", setServing);
    };
  }, [roomId]);

  const handleComplete = () => {
    staffSocket.emit("complete", roomId);

    setStatus("inactive");
    setData(null);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Top Bar */}
      <TopBar
        title={`Staff Dashboard (Room ${roomId})`}
        connected={connected}
        rightSlot={
          <button
            onClick={handleComplete}
            disabled={status !== "submitted"}
            className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-emerald-500 text-white disabled:bg-gray-300 hover:bg-emerald-600 transition"
          >
            <span>COMPLETE</span>
            <CircleCheckBig className="w-4 h-4" />
          </button>
        }
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            <h2 className="text-sm font-medium text-gray-700">
              Patient Information
            </h2>

            <span
              className={`ml-auto text-xs px-2 py-0.5 rounded-full flex items-center gap-1 border ${cfg.badge}`}
            >
              {cfg.icon}
              {status === "inactive" && "No activity"}
              {status === "idle" && "Opened form"}
              {status === "typing" && "Filling form..."}
              {status === "submitted" && "Form submitted"}
            </span>
          </div>

          <div className="p-5">
            <PatientForm data={displayData} readOnly />
          </div>
        </div>
      </main>

      <Popup
        show={showPopup}
        type="success"
        message="Patient submitted the form ✅"
        onClose={() => setShowPopup(false)}
        variant="toast"
      />
    </div>
  );
}
