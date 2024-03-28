import mongoose from "mongoose";
import logger from "../../utils/logger.js";
import { config } from "../env.config.js";
import userModel from "../../models/user.model.js";

export default class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }

  //Implementing Singleton
  static getInstance() {
    if (this.#instance) {
      logger.error("[ERROR] Already exist a connection to MongoDB");
    } else {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }

  #connectMongoDB = async () => {
    try {
      await mongoose.connect(config.urlMongo).then(() => {
        userModel.syncIndexes();
        logger.info("[Server] - MongoDB connected.");
      });
    } catch (error) {
      logger.error("[ERROR] Connection to MongoDB failed: " + error);
      process.exit();
    }
  };
}
