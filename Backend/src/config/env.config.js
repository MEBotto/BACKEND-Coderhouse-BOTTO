import dotenv from "dotenv";
import { Command } from "commander";

// dotenv.config();
export const program = new Command();

program
  .option("-d", "Variable para debug", false)
  .option("-p <port>", "Puerto del servidor", 8080)
  .option("--mode <mode>", "Modo de trabajo", "dev")
  .requiredOption(
    "-u <user>",
    "Usuario que va a utilizar el aplicativo.",
    "User not declared."
  );
program.parse();

console.log("Modo Options: ", program.opts().mode);

const environment = program.opts().mode;

dotenv.config({
  path: environment === "prod" ? "./.env.production" : "./.env.development",
});

export const config = {
  port: process.env.PORT,
  urlMongo: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubSecret: process.env.GITHUB_SECRET,
  githubCallbackURL: process.env.GITHUB_CALLBACK_URL
};

process.on("exit", (code) => {
  console.log("Este codigo se ejecuta antes de salir del proceso.");
  console.log("Process exit code: ", code);
});

process.on("uncaughtException", (exception) => {
  console.log("Esta exception no fue capturada o controlada.");
  console.log(`Uncaught Exception: ${exception}`);
});

process.on("message", (message) => {
  console.log(
    "Este codigo ejecutará cuando reciba un mensaje de otro proceso."
  );
  console.log(`Received message: ${message}`);
});
