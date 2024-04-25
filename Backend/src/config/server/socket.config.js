import httpServer from "./http.config.js";

import logger from "../../utils/logger.js";

import { Server } from "socket.io";

const socketServer = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

socketServer.on("connection", (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  socket.on("message", (data) => {
    fetch("http://localhost:8080/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(socket.broadcast.emit("message", data))
      .catch((err) => {
        logger.error(err);
      });
  });

  socket.on("disconnect", () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

export default socketServer;
