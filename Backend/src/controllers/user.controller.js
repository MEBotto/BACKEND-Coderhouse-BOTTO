import { userService } from "../services/factory.js";
import UserDto from "../services/dto/user.dto.js";
import logger from "../utils/logger.js";

const getAllUsersController = async (req, res) => {
  const { limit, page, query } = req.query;
  try {
    const users = await userService.getAll(limit, page, query);
    const usersDTOs = users.payload.map((user) => new UserDto(user));
    res.status(200).json({
      success: true,
      users: usersDTOs,
      limit: users.limit,
      totalDocs: users.totalDocs,
      docsPerPage: users.docsPerPage,
      totalPages: users.totalPages,
      prevPage: users.prevPage,
      nextPage: users.nextPage,
      page: users.page,
      hasPrevPage: users.hasPrevPage,
      hasNextPage: users.hasNextPage,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getAccountById(id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    const userDTO = new UserDto(user);
    res.status(200).json({ success: true, user: userDTO });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAccountByEmailController = async (req, res) => {
  try {
    const { email } = req.params;
    const account = await userService.getAccountByEmail(email);
    if (!account) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
    const userDTO = new UserDto(account);
    res.status(200).json({ success: true, data: userDTO });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateAccountController = async (req, res) => {
  try {
    const { id } = req.params;
    const newValues = req.body;
    if (req.cloudinaryUploads) {
      const url = req.cloudinaryUploads[0].url;
      newValues.photo = url;
    }
    const accountUpdated = await userService.updateAccount(id, newValues);
    if (accountUpdated.modifiedCount === 0) {
      res
        .status(404)
        .json({
          success: false,
          message:
            "No changes were made, as the received values are the same as those stored",
        });
    }
    res.status(200).json({ success: true, data: accountUpdated });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

const deleteAccountController = async (req, res) => {
  try {
    const { id } = req.params;
    const accountDeleted = await userService.deleteAccount(id);
    if (accountDeleted.deletedCount === 0) {
      res
        .status(404)
        .json({ success: false, message: "No account was deleted" });
    }
    res.status(200).json({ success: true, data: accountDeleted });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export {
  getAllUsersController,
  getUserByIdController,
  getAccountByEmailController,
  updateAccountController,
  deleteAccountController,
};
