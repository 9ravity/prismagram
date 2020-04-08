import { adjectives, nouns } from "./words";
import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";
import smtpTransport from "nodemailer-smtp-transport";

const MAIL_SERVICE = "gmail";
const MAIL_HOST = "smtp.gmail.com";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]}${nouns[randomNumber]}`;
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: process.env.SYS_EMAIL,
    to: adress,
    subject: "💥 Login Secret for gram 💥",
    html: `Hello! your secret is <strong>${secret}.</strong><br/> Copy paste on the Websited/app to login`,
  };
  return sendMail(email);
};

const sendMail = (email) => {
  const client = nodeMailer.createTransport(
    smtpTransport({
      service: MAIL_SERVICE,
      host: MAIL_HOST,
      auth: {
        user: process.env.SYS_EMAIL,
        pass: process.env.SYS_PASS,
      },
    })
  );
  return client.sendMail(email, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

//토큰 생성
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
