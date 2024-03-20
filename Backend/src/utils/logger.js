import winston from "winston";
import { config } from "../config/env.config.js";

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  customColor: {
    fatal: "cyan",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "white",
    debug: "blue",
  },
};

const devLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.colorize({ colors: customLevelOptions.customColor }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: "logs/dev/combined.log",
      level: "debug",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/dev/exceptions.log" }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.colorize({ colors: customLevelOptions.customColor }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: "logs/prod/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/prod/combined.log" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/prod/exceptions.log" }),
  ],
});

let logger;

if (config.environment === "dev") {
  logger = devLogger;
} else {
  logger = prodLogger;
}

export default logger;