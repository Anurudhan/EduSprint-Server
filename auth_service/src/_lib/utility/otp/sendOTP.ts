import nodemailer from "nodemailer";
import { env_variables } from "../../../_boot/config";

export const sendOTP = async (email: string, otp: string | number) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    service: "Gmail",
    auth: {
      user: env_variables.USERMAIL,
      pass: env_variables.USERSECRET,
    },
    secure: true,
  });

  const message = "Enter this OTP to continue";
  const mailData = {
    from: "edu_sprint@gmail.com",
    to: email,
    subject: "OTP from SolveX",
    html: `<p>${message}</p> <p style='color: red; font-size: 25px; letter-spacing: 2px'><b>${otp}</b></p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (error) => {
      if (error) {
        console.log("Error occurred while sending the OTP", error);
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};
