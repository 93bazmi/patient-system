import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  let timer;

  socket.on("patient:update", (data) => {
    socket.broadcast.emit("patient:data", data);
  });

  socket.on("patient:status", (status) => {
    console.log("STATUS:", status);

    socket.broadcast.emit("patient:status", status);

    if (status === "active") {
      clearTimeout(timer);

      timer = setTimeout(() => {
        io.emit("patient:status", "inactive");
      }, 5000);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");

    clearTimeout(timer);
    io.emit("patient:status", "inactive");
    io.emit("patient:data", null);
  });
});

httpServer.listen(3001, () => {
  console.log("Socket server running on http://localhost:3001");
});
