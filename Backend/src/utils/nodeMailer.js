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
    <div> 
      <p>Código:${ticket.code}</p>
      <p>Monto:${ticket.amount}</p>
      <p>Fecha y Hora:${ticket.purchaseDatetime}</p>
    </div>`,
  });
};

export default sendMail;
