import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: [
      process.env.NEXT_PUBLIC_BASE_URL,
      process.env.NEXT_PUBLIC_VERCEL_URL,
    ],
  },
});

const patientNs = io.of("/patient");
const staffNs = io.of("/staff");

patientNs.on("connection", (socket) => {
  console.log("Patient connected:", socket.id);

  let timer;

  // ส่งข้อมูลไป staff ทุกครั้งที่มีการอัพเดตจาก patient
  socket.on("update", (data) => {
    staffNs.emit("data", data);
  });

  // ส่ง status ไป staff ทุกครั้งที่ patient มีการเปลี่ยนแปลงสถานะ
  socket.on("status", (status) => {
    console.log("STATUS:", status);

    staffNs.emit("status", status);

    if (status === "typing") {
      clearTimeout(timer);

      timer = setTimeout(() => {
        staffNs.emit("status", "idle");
      }, 10000);
    }
  });

  // เช็คว่ามี staff ออนไลน์อยู่หรือไม่
  socket.on("check:staff", (callback) => {
    const staffOnline = staffNs.sockets.size > 0;
    callback(staffOnline);
  });

  socket.on("disconnect", () => {
    console.log("Patient disconnected");

    clearTimeout(timer);

    staffNs.emit("status", "inactive");
    staffNs.emit("data", null);
  });
});

staffNs.on("connection", (socket) => {
  console.log("Staff connected:", socket.id);
});

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
