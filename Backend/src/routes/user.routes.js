import {
  deleteAccountController,
  getAccountByEmailController,
  getAllUsersController,
  getUserByIdController,
  updateAccountController,
  deleteInactivesController,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { uploadToCloudinary } from "../middlewares/multerMiddleware.js";
import { checkUserRole } from "../middlewares/hasPermissionsMiddleware.js";

const userRouter = new Router();

userRouter.get("/", checkUserRole(["ADMIN"]), getAllUsersController);

userRouter.get("/:id", getUserByIdController);

userRouter.get("/email/:email", getAccountByEmailController);

userRouter.put("/:id", uploadToCloudinary("", "any"), updateAccountController);

userRouter.delete("/", checkUserRole(["ADMIN"]), deleteInactivesController);

userRouter.delete("/:id", checkUserRole(["ADMIN"]), deleteAccountController);

export default userRouter;