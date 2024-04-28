import { loggerMiddleware } from "../../middlewares/loggerMiddleware.js";
import logger from "../../utils/logger.js";
import MongoSingleton from "../db/mongodb-singleton.js";

import cartRouter from "../../routes/carts.routes.js";
import messageRouter from "../../routes/message.routes.js";
import productRouter from "../../routes/products.routes.js";
import authRouter from "../../routes/auth.routes.js";
import mockRouter from "../../routes/mock.routes.js";
import userRouter from "../../routes/user.routes.js";

import __dirname from "../../utils.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import compression from "express-compression";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../../docs/swaggerSpecs.js";

const expressApp = express();

const corsOptions = {
  origin: `http://localhost:5173`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders:
    "Content-Type, Authorization, X-Request-With, Accept, Origin, Access-Control-Allow-Headers",
  optionsSuccessStatus: 204,
};

expressApp.use(cors(corsOptions));

const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
    logger.info("[Server] - All services working with MongoDB are loaded.");
  } catch (error) {
    logger.error("[ERROR]: Failed initialize MongoDB: " + error);
    process.exit(1);
  }
};
mongoInstance();

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

expressApp.use(cookieParser());

expressApp.use(loggerMiddleware);

expressApp.use(
  compression({
    brotli: {
      enabled: true,
      zlib: {},
    },
  })
);

expressApp.use("/api", mockRouter);
expressApp.use("/api/carts", cartRouter);
expressApp.use("/api/auth", authRouter);
expressApp.use("/api/products", productRouter);
expressApp.use("/api/messages", messageRouter);
expressApp.use("/api/users", userRouter);

expressApp.use(
  "/apidocs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
      operationsSorter: "method",
    },
  })
);

expressApp.use(express.static(`${__dirname}/public`));

export default expressApp;