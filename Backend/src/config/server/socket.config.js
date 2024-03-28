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
  socket.on("newMessageClient", (message) => {
    fetch("http://localhost:8080/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return socket.emit("errorServer", data.error);

        socketServer.emit("messageCreatedServer", data.messageCreated);
      })
      .catch((err) => {
        logger.error(err);
      });
  });
});

export default socketServer
