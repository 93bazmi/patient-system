import { io } from "socket.io-client";

export const patientSocket = io("http://localhost:3001/patient", {
  autoConnect: false,
});