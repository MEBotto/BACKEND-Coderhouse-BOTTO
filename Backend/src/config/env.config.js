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

console.log("[Server] - Server is running on mode:", program.opts().mode);

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
  githubCallbackURL: process.env.GITHUB_CALLBACK_URL,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  environment: environment,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

process.on("exit", (code) => {
  console.log("Exit code process: ", code);
});

process.on("uncaughtException", (exception) => {
  console.log(`Something went wrong! Unhandled exception: ${exception}`);
});

process.on("message", (message) => {
  console.log(`Received message: ${message}`);
});
