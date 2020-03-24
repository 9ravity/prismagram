import dotenv from "dotenv";
import path from "path";
console.log(__dirname);
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodeMailer from "nodemailer";
import nsTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]}${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodeMailer.createTransport(nsTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "haha@naver.com",
    to: adress,
    subject: "💥 Login Secret for gram 💥",
    html: `Hello! your secret is <strong>${secret}.</strong><br/> Copy paste on the Websited/app to login`
  };
  return sendMail(email);
};
