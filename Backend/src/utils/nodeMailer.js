import nodemailer from "nodemailer";
import userModel from "../models/user.model.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "marianobotto92@gmail.com",
    pass: "ubfwlwpluyvskxis",
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
  let result = await transporter.sendMail({
    from: "Compras FriKommerce - <marianobotto92@gmail.com>",
    to: "marianobotto92@gmail.com",
    subject: "Ticket de Compra",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px;">
      <h1 style="color: #333;">Ticket de Compra</h1>
      <div style="background-color: #fff; padding: 10px; border-radius: 5px;">
        <p style="margin: 0;">Código: ${ticket.code}</p>
        <p style="margin: 0;">Monto: ${ticket.amount}</p>
        <p style="margin: 0;">Fecha y Hora: ${ticket.purchaseDatetime}</p>
      </div>
    </div>`,
  });
};

export default sendMail;
