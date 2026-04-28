import { io } from "socket.io-client";

export const staffSocket = io("http://localhost:3001/staff", {
  autoConnect: false,
});