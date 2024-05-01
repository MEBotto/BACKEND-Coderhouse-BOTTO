import { config } from "../config/env.config.js";
import { authService, emailService, userService } from "../services/factory.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateJWToken } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";
import { transporter } from "../utils/nodeMailer.js";
import logger from "../utils/logger.js";

const githubCallbackController = async (req, res) => {
  const user = req.user;

  const tokenGitHubUser = {
    name: user.first_name,
    email: "N/A",
    photo: user.photo,
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
    res.status(400).json({ success: false, error: error });
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

      return res.status(200).json({
        success: true,
        jwt: access_token,
      });
    }

    const account = await userService.getAccountByEmail(email);
    if (!account) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const verifyPassword = await isValidPassword(account.password, password);

    if (!verifyPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const tokenUser = {
      name: account.first_name + " " + account.last_name,
      email: account.email,
      age: account.age,
      role: account.role,
      registerWith: account.registerWith,
      userId: account._id,
      photo: account.photo,
    };

    const access_token = generateJWToken(tokenUser);

    userService.updateAccount(account._id, { last_connection: new Date() });

    return res.status(200).json({
      success: true,
      jwt: access_token,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

const logoutController = async (req, res) => {
  const { uid } = req.body;
  try {
    const userUpdated = await userService.updateAccount(uid, {
      last_connection: new Date(),
    });
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      data: "Logged out",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const mailOptionsToReset = {
  from: config.mailUser,
  subject: "Reset password",
};

const recoverPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email not provided" });
    }

    const findUser = await userService.getAccountByEmail(email);

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "There is no account with that email",
      });
    }

    const token = uuidv4();
    const link = `http://localhost:5173/password_reset?token=${token}&email=${email}`;

    const now = new Date();
    const oneHourMore = 60 * 60 * 1000;

    now.setTime(now.getTime() + oneHourMore);

    const tempDbMails = {
      email,
      tokenId: token,
      expirationTime: new Date(Date.now() + 60 * 60 * 1000),
    };

    try {
      const created = await emailService.createEmail(tempDbMails);
    } catch (error) {
      logger.error(error);
    }

    mailOptionsToReset.to = email;
    mailOptionsToReset.html = `To reset your password, click on the following link: <a href="${link}"><b>Reset Password</b></a>`;

    transporter.sendMail(mailOptionsToReset, (error, info) => {
      if (error) {
        res.status(500).json({ message: "Error", payload: error });
      }
      res.cookie("email", email, {
        httpOnly: false,
        maxAge: 8 * 60 * 60 * 1000,
      });
      res.status(200).json({ success: true, payload: info, email: email });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "No se pudo enviar el email desde: " + config.mailUser,
    });
  }
};

const newPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedPassword = await createHash(password);

  const findEmail = await emailService.getEmail(token);

  const findUser = await userService.getAccountByEmail(findEmail.email);

  const isEqual = await isValidPassword(findUser.password, password);

  if (isEqual) {
    return res
      .status(400)
      .json({ success: false, message: "Same password as previous one" });
  }

  const now = new Date();
  const expirationTime = findEmail.expirationTime;

  if (now > expirationTime || !expirationTime) {
    await emailService.deleteToken(token);
    logger.info("Expiration time of token completed");
    return res.redirect("/send-email-to-reset");
  }

  try {
    const updatePassword = await authService.updatePassword(
      findEmail.email,
      hashedPassword
    );
    res.status(200).json({ success: true, data: updatePassword });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

const userPremiumController = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userService.getAccountById(uid);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const requiredDocuments = ["id", "residenceProof", "bankStatementProof"];
    if (user.documents) {
      let { documents } = user;
      documents = Array.isArray(documents) ? documents : [documents];
      const userDocuments = documents.map((doc) => doc.file);
      const missingDocuments = requiredDocuments.filter(
        (requiredDoc) => !userDocuments[0].includes(requiredDoc)
      );
      console.log(missingDocuments);
      if (missingDocuments.length > 0) {
        return res
          .status(400)
          .json({
            success: false,
            message: `Missing documents: ${missingDocuments}`,
          });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Missing all documents" });
    }

    if (user.role === "premium") {
      return res
        .status(400)
        .json({ success: false, message: "User is already premium" });
    } else if (user.role === "admin") {
      return res
        .status(400)
        .json({ success: false, message: "Admin cannot be premium" });
    }
    const userUpdated = await authService.updateAccount(uid, {
      role: "premium",
    });
    return res.status(200).json({ success: true, data: userUpdated });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const documentsController = async (req, res) => {
  const { uid } = req.params;
  const files = req.cloudinaryUploads;
  try {
    const user = await userService.getAccountById(uid);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!files) {
      return res
        .status(400)
        .json({ success: false, message: "No files provided" });
    }

    const documents = files.map((file) => ({
      file: file.file,
      name: file.name,
      reference: file.url,
    }));

    await userService.updateAccount(uid, { documents: documents });
    return res.status(200).json({ success: true, documents });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export {
  githubCallbackController,
  googleCallbackController,
  registerController,
  loginController,
  recoverPasswordController,
  newPasswordController,
  logoutController,
  userPremiumController,
  documentsController,
};
