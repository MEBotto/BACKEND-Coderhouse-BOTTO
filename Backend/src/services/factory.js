import CartDAO from "./dao/mongo/cart.dao.js";
import ProductDAO from "./dao/mongo/product.dao.js";
import MessageDAO from "./dao/mongo/message.dao.js";
import AuthDAO from "./dao/mongo/auth.dao.js";
import EmailDAO from "./dao/mongo/email.dao.js"

import CartRepository from "./repository/cart.repository.js";
import ProductRepository from "./repository/product.repository.js";
import MessageRepository from "./repository/message.repository.js";
import AuthRepository from "./repository/auth.repository.js";
import EmailRepository from "./repository/email.repository.js";

// Generamos instancias de las clases DAO
const cartDao = new CartDAO();
const productDao = new ProductDAO();
const messageDao = new MessageDAO();
const authDao = new AuthDAO();
const emailDao = new EmailDAO();

export const cartService = new CartRepository(cartDao);
export const productService = new ProductRepository(productDao);
export const messageService = new MessageRepository(messageDao);
export const authService = new AuthRepository(authDao);
export const emailService = new EmailRepository(emailDao);
