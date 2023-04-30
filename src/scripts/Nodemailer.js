import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const user = process.env.TEST_EMAIL;
const pass = process.env.TEST_PASSWORD;
const admEmail = process.env.ADMIN_EMAIL;

const authentication = {
  user,
  pass
};

let ecommerceGmail = createTransport({
  service : "gmail",
  port : 587,
  secure: false,
  auth : authentication
});

export {
  ecommerceGmail,
  admEmail
};