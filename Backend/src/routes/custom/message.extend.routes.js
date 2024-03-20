import CustomRouter from "./custom.routes.js";
import { getMessagesController, createMessageController, updateMessageController, deleteMessageController } from "../../controllers/message.controller.js";

export default class MessageExtendRouter extends CustomRouter {
  init(){
    this.get("/", ["USER", "USER_PREMIUN"], getMessagesController);

    this.post("/", ["USER", "USER_PREMIUN"], createMessageController);

    this.put("/:id", ["USER", "USER_PREMIUN"], updateMessageController);

    this.delete("/:id", ["USER", "USER_PREMIUN"], deleteMessageController);
  }
}