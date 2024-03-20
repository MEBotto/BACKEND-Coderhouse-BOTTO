// Importing Express and related modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";

// Application configurations and utilities
import { config } from "./config/env.config.js";
import { program } from "./config/env.config.js";
import MongoSingleton from "./config/db/mongodb-singleton.js";
import __dirname from "./utils.js";
import initializePassport from "./config/auth/passport.config.js";

// Routers and services
import cartRouter from "./routes/carts.routes.js";
import authRouter from "./routes/auth.routes.js";
import ProductExtendRouter from "./routes/custom/products.extend.routes.js";
import MessageExtendRouter from "./routes/custom/message.extend.routes.js";
import CartExtendRouter from "./routes/custom/cart.extend.routes.js";
import { messageService } from "./services/factory.js";

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

// Configuración de Session
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoURL,
      ttl: 10 * 60,
    }),
    secret: "v5h2Lor01Nu0",
    resave: false,
    saveUninitialized: true,
  })
);

// Inicialización Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

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

// Custom Router
const productExtendRouter = new ProductExtendRouter();
app.use("/api/extend/products", productExtendRouter.getRouter());
const messageExtendRouter = new MessageExtendRouter();
app.use("/api/extend/messages", messageExtendRouter.getRouter());
const cartExtendRouter = new CartExtendRouter();
app.use("/api/extend/carts", cartExtendRouter.getRouter());
