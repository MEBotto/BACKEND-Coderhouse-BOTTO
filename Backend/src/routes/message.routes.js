import { Router } from "express";
import {
  getMessagesController,
  createMessageController,
  updateMessageController,
  deleteMessageController,
} from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.get("/", getMessagesController);
messageRouter.put("/:id", updateMessageController);
messageRouter.post("/", createMessageController);
messageRouter.delete("/:id", deleteMessageController);

export default messageRouter;