import mongoose from "mongoose";
import config from "./config.js"

export default class MongoSingleton {
  static #instance;

  constructor () {
    this.#connectMongoDB();
  }

  //Implementing Singleton
  static getInstance () {
    if (this.#instance) {
      console.log("A connection to MongoDB has already been opened");
    } else {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }

  #connectMongoDB = async () => {
    try {
      await mongoose.connect(config.urlMongo);
      console.log("Successfully connected to MongoDB using Mongoose!");
    } catch (error) {
      console.error("Failed to connect to DB using Mongoose: ", error);
      process.exit(error);
    }
  }
}