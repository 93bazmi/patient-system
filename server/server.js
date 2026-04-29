import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";

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

const roomPresence = new Map();
const staffPresence = new Map();

// ---------------- PATIENT ----------------

patientNs.on("connection", (socket) => {
  console.log("Patient connected:", socket.id);

  let timer;

  socket.on("join-room", (roomId) => {
    console.log("JOIN ROOM:", roomId);
    socket.join(roomId);

    socket.data.roomId = roomId;

    const count = (roomPresence.get(roomId) || 0) + 1;
    roomPresence.set(roomId, count);

    staffNs.to(roomId).emit("presence", true);
  });

  socket.on("update", ({ data }) => {
    const roomId = socket.data.roomId;
    if (!roomId) return;

    staffNs.to(roomId).emit("data", data);
  });

  socket.on("status", ({ status }) => {
    const roomId = socket.data.roomId;
    if (!roomId) return;

    staffNs.to(roomId).emit("status", status);

    if (status === "typing") {
      clearTimeout(timer);

      timer = setTimeout(() => {
        staffNs.to(roomId).emit("status", "idle");
      }, 10000);
    }
  });

  socket.on("submit", ({ data }) => {
    const roomId = socket.data.roomId;

    if (!roomId) return;

    const hasStaff = (staffPresence.get(roomId) || 0) > 0;

    if (!hasStaff) {
      socket.emit("error-submit", "NO_STAFF");
      return;
    }

    staffNs.to(roomId).emit("data", data);
    staffNs.to(roomId).emit("status", "submitted");

    socket.emit("submit-success");
  });

  socket.on("disconnect", () => {
    const roomId = socket.data.roomId;

    if (!roomId) return;

    const count = (roomPresence.get(roomId) || 1) - 1;

    if (count <= 0) {
      roomPresence.delete(roomId);

      staffNs.to(roomId).emit("presence", false);
      staffNs.to(roomId).emit("status", "inactive");
      staffNs.to(roomId).emit("data", null);
    } else {
      roomPresence.set(roomId, count);
    }

    console.log("DISCONNECT DATA:", socket.data);

    console.log("disconnect room:", roomId);
  });
});

// ---------------- STAFF ----------------

staffNs.on("connection", (socket) => {
  console.log("Staff connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log("JOIN ROOM:", roomId);

    socket.data.roomId = roomId;

    const count = (staffPresence.get(roomId) || 0) + 1;
    staffPresence.set(roomId, count);
  });

  socket.on("complete", (roomId) => {
    console.log("Complete room:", roomId);
    staffNs.to(roomId).emit("status", "inactive");
    staffNs.to(roomId).emit("data", null);

    patientNs.to(roomId).emit("reset");
  });

  socket.on("disconnect", () => {
    const roomId = socket.data.roomId;

    if (!roomId) return;

    const count = (staffPresence.get(roomId) || 1) - 1;

    if (count <= 0) {
      staffPresence.delete(roomId);
    } else {
      staffPresence.set(roomId, count);
    }

    console.log("disconnect room:", roomId);
  });
});

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
