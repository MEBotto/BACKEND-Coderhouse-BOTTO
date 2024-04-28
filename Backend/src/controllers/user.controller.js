import { authService } from "../services/factory.js";
import logger from "../utils/logger.js";

const getAllUsersController = async (req, res) => {
  try {
    const users = await authService.getAll();
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await authService.getAccountById(id);
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAccountByEmailController = async (req, res) => {
  try {
    const { email } = req.params;
    const account = await authService.getAccountByEmail(email);
    if (!account) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
    res.status(200).json({ success: true, data: account });
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
    const accountUpdated = await authService.updateAccount(id, newValues);
    if (accountUpdated.modifiedCount === 0) {
      res.status(404).json({ success: false, message: "No changes were made, as the received values are the same as those stored" });
    }
    res.status(200).json({ success: true, data: accountUpdated });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

const deleteAccountController = async (req, res) => {
  try {
    const { id } = req.params;
    const accountDeleted = await authService.deleteAccount(id);
    if (accountDeleted.deletedCount === 0) {
      res.status(404).json({ success: false, message: "No account was deleted" });
    }
    res.status(200).json({ success: true, data: accountDeleted });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
}

export {
  getAllUsersController,
  getUserByIdController,
  getAccountByEmailController,
  updateAccountController,
  deleteAccountController,
}