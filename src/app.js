import express from "express";
import exphbs from "express-handlebars";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import cors from "cors";
import __dirname from "./utils.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import sessionsRouter from "./routes/sessions.routes.js";
import userViewRouter from "./routes/users.views.routes.js";
import messageDao from "./daos/dbManager/message.dao.js";
import githubLoginRouter from "./routes/github-login.views.routes.js"
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const app = express();
const PORT = 8080;
const mongoURL = "mongodb+srv://marianobotto92:47pjMQKnnwIQOect@clustercoder.81upg7k.mongodb.net/?retryWrites=true&w=majority";

// CORS Options
const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Configuración de Session
app.use(session({
  store: MongoStore.create({
    mongoUrl: mongoURL,
    ttl: 10 * 60
  }),
  secret: "v5h2Lor01Nu0",
  resave: false,
  saveUninitialized: true
}));

// Inicialización Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Conexión a MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connection Successfull!!");
  } catch (error) {
    console.error("Connection Failed: " + error);
    process.exit();
  }
};
connectMongoDB();

// Configuración del servidor HTTP
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Configuración de Socket.IO
const io = new Server(httpServer);
io.on('connection', (socket) => {
  console.log("A user connected");

  socket.on('disconnect', () => {
    console.log("A user disconnected");
  });

  socket.on('chat message', async (data) => {
    try {
      await messageDao.createMessage(data.user, data.content);
      io.emit('chat message', data);
    } catch (error) {
      console.error(error);
      socket.emit('error', { error: 'Error in chat message event' });
    }
  });
});

// Middleware para parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
const hbs = exphbs.create({
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
  extname: 'hbs',
  defaultLayout: 'main',
  helpers: {
    eq: function (a, b) {
      return a === b;
    },
    getPageNumbers: function (totalPages) {
      const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
      console.log(pageNumbers);
      return pageNumbers;
    }
  }
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

// Configuración de archivos estáticos
app.use(express.static(`${__dirname}/public`));

// Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/users", userViewRouter);
app.use("/github", githubLoginRouter);
app.use("/", viewsRouter);