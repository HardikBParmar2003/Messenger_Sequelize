import { Request, Response } from "express";
import { chatRepository } from "../repositories/chat.repoitories";
import PDFDocument from "pdfkit";
import fs from "fs";
import { Chat } from "../../interface";
import { sendEmail } from "../emailSender/sendEmail";

export const generatePersonalChatPDF = {
  async personalChat(req: Request, res: Response) {
    const admin_id: number = req.user?.user_id as number;
    const admin_name: string = ((req.user?.first_name as string) +
      " " +
      req.user?.last_name) as string;
    const user_id: number = req.body.user_id;
    const user_name: string = req.body.user_name;
    const data: Chat[] = await chatRepository.getUserChat(admin_id, user_id);

    if (data.length > 0) {
      let fileName = `${admin_name}_${user_name}_chat.pdf`;
      let filePath: string = `public/assets/${fileName}`;

      const doc = new PDFDocument({ margin: 50 });
      doc.pipe(fs.createWriteStream(filePath));

      doc
        .fontSize(20)
        .font("Times-Roman")
        .text(`Chat Between ${admin_name} and ${user_name}`, {
          align: "center",
        });

      doc.moveDown(2);

      let currentDate: string = "";

      data.forEach((msg, index) => {
        const date: Date = msg.createdAt;
        const newTime: string =
          date.getHours().toString().padStart(2, "0") +
          ":" +
          date.getMinutes().toString().padStart(2, "0");

        const newDate: string =
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear();

        if (newDate !== currentDate) {
          if (currentDate !== "") doc.moveDown(1);

          doc
            .font("Times-Bold")
            .fontSize(12)
            .text(newDate, { align: "center" });

          doc.moveDown(0.5);
          currentDate = newDate;
        }

        if (msg.sender_id === admin_id) {
          doc.fontSize(15).font("Times-Roman");
          doc.text(msg.message, { width: 500, align: "right" });

          doc.fontSize(10).font("Times-Roman");
          doc.text(newTime, { width: 500, align: "right" });
          doc.moveDown();
        } else {
          doc.fontSize(15).font("Times-Roman");
          doc.text(msg.message, { width: 500, align: "left" });

          doc.fontSize(10);
          doc.text(newTime, { width: 500, align: "left" });
          doc.moveDown();
        }

        doc.moveDown(1);

        if (
          doc.y > doc.page.height - doc.page.margins.bottom - 50 &&
          index !== data.length - 1
        ) {
          doc.addPage();
        }
      });

      doc.end();

      await sendEmail.chatPDFSendEmail(
        req.user?.email as string,
        fileName,
        filePath
      );
      return true;
    } else {
      return false;
    }
  },
};
