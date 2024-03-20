import { authService } from "../services/factory.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateJWToken } from "../utils/jwt.js";

const getAllUsersController = async (req, res) => {
  try {
    const users = authService.getAll();
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const githubCallbackController = async (req, res) => {
  const user = req.user;
  console.log(user)

  const tokenGitHubUser = {
    first_name: user.first_name,
    last_name: "N/A",
    email: "N/A",
    role: user.role,
    registerWith: user.registerWith,
    userId: user._id,
  };

  const access_token = generateJWToken(tokenGitHubUser);

  res.cookie("access_token", access_token, {
    httpOnly: false,
    maxAge: 8 * 60 * 60 * 1000,
  });

  res.redirect("http://localhost:5173/");
};

const googleCallbackController = async (req, res) => {
  const user = req.user;

  const tokenGoogleUser = {
    first_name: user.first_name,
    last_name: "N/A",
    email: "N/A",
    role: user.role,
    registerWith: user.registerWith,
    userId: user._id,
  };

  const access_token = generateJWToken(tokenGoogleUser);

  res.status(200).json({ jwt: access_token });

  res.redirect("http://localhost:5173/products");
};

const registerController = async (req, res) => {
  let newUser = req.body;
  newUser.password = await createHash(newUser.password);
  newUser.registerWith = "form";
  if (newUser.email === "marianobotto92@gmail.com") {
    newUser.role = "admin";
  } else {
    newUser.role = "user";
  }
  try {
    const account = await authService.createAccount(newUser);
    return res.status(200).json({ success: true, data: account });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      const tokenAdmin = {
        first_name: "Admin",
        last_name: "N/A",
        email: "N/A",
        role: "admin",
        registerWith: "App",
      };

      const access_token = generateJWToken(tokenAdmin);

      res.status(200).json({ success: true, jwt: access_token });
    }

    const account = await authService.getAccountByEmail(email);
    if (!account) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

    const verifyPassword = await isValidPassword(account.password, password);

    if (!verifyPassword) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

    const tokenUser = {
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      role: "user",
      registerWith: account.registerWith,
      userId: account._id,
      photo: account.photo,
    };

    const access_token = generateJWToken(tokenUser);

    res.status(200).json({ success: true, jwt: access_token });
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
    const accountUpdated = await authService.updateAccount(id, newValues);
    if (!accountUpdated) {
      res.status(404).json({ success: false, message: "Account not found" });
    }
    res.status(200).json({ success: true, data: accountUpdated });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export {
  githubCallbackController,
  googleCallbackController,
  registerController,
  loginController,
  getAccountByEmailController,
  updateAccountController,
  getAllUsersController,
};
