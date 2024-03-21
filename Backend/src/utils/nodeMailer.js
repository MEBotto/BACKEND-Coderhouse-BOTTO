import nodemailer from "nodemailer";
import userModel from "../models/user.model.js";
import { config } from "../config/env.config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.mailUser,
    pass: config.mailPassword,
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const sendMail = async (ticket) => {
  const user = userModel.findById(ticket.purchaser);

  let productsTable = '';
  ticket.productsBought.forEach(product => {
    productsTable += `
      <tr>
        <td>${product.productId.title}</td>
        <td>${product.productId.description}</td>
        <td>$${product.productId.price}</td>
        <td>${product.quantity}</td>
      </tr>
    `;
  });

  let result = await transporter.sendMail({
    from: "Compras FriKommerce - <marianobotto92@gmail.com>",
    to: "marianobotto92@gmail.com",
    subject: "Ticket de Compra",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px;">
      <h1 style="color: #333;">Ticket de Compra</h1>
      <div style="background-color: #fff; padding: 10px; border-radius: 5px;">
        <p>Código: ${ticket.code}</p>
        <p>Monto: $${ticket.amount}</p>
        <p>Fecha y Hora: ${ticket.purchaseDatetime}</p>
        <h2>Productos Comprados</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
          ${productsTable}
        </table>
      </div>
    </div>`,
  });
};

export default sendMail;
