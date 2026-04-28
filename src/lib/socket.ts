import { io } from "socket.io-client";
const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

export const staffSocket = io(`${BASE_URL}/staff`, {
  autoConnect: false,
  transports: ["websocket"],
});

export const patientSocket = io(`${BASE_URL}/patient`, {
  autoConnect: false,
  transports: ["websocket"],
});