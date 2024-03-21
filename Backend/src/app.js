// Importing Express and related modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

// Application configurations and utilities
import { config } from "./config/env.config.js";
import { program } from "./config/env.config.js";
import MongoSingleton from "./config/db/mongodb-singleton.js";
import __dirname from "./utils.js";

// Routers and services
import cartRouter from "./routes/carts.routes.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/products.routes.js";
import MessageExtendRouter from "./routes/custom/message.extend.routes.js";
import { messageService } from "./services/factory.js";
import mockRouter from "./routes/mock.routes.js";

const app = express();
const PORT = config.port;
const mongoURL =
  "mongodb+srv://marianobotto92:47pjMQKnnwIQOect@clustercoder.81upg7k.mongodb.net/?retryWrites=true&w=majority";

// CORS Options
const corsOptions = {
  origin: `http://localhost:5173`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Configuración del servidor HTTP
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Conexión a MongoDB con Singleton
const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    console.log(error);
  }
};
mongoInstance();

// Configuración de Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("chat message", async (data) => {
    try {
      await messageService.save(data.user, data.message);
      io.emit("chat message", data);
    } catch (error) {
      console.error(error);
      socket.emit("error", { error: "Error in chat message event" });
    }
  });
});

// Middleware para parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie Parser
app.use(cookieParser());

// Configuración de archivos estáticos
app.use(express.static(`${__dirname}/public`));

// Rutas
app.use("/api/carts", cartRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter)
app.use("/api", mockRouter);

// Custom Router
const messageExtendRouter = new MessageExtendRouter();
app.use("/api/extend/messages", messageExtendRouter.getRouter());
