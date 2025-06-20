import nodemailer from "nodemailer";

export const sendEmail = {
  async otpSendEmail(email: string, otp: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "projectmanagement760@gmail.com",
          pass: "vkpq qkmo mhvk ovzb",
        },
      });

      return await transporter.sendMail({
        from: "projectmanagement760@gmail.com",
        to: email,
        subject: "OTP Verification",
        html: otp,
      });
    } catch (error) {
      throw new Error("Error while sending email or incorrect email");
    }
  },

  async chatPDFSendEmail(email: string, fileName: string, filePath: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "projectmanagement760@gmail.com",
          pass: "vkpq qkmo mhvk ovzb",
        },
      });

      return await transporter.sendMail({
        from: "projectmanagement760@gmail.com",
        to: email,
        subject: "Chat data PDF",
        attachments: [
          {
            filename: fileName,
            path: filePath,
            contentType: "application/pdf",
          },
        ],
      });
    } catch (error) {
      throw new Error("Error while sending pdf to email ");
    }
  },
};
