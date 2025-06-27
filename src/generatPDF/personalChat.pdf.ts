import { Request, Response } from "express";
import { chatRepository } from "../repositories/chat.repoitories";
import PDFDocument, { file } from "pdfkit";
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
      let filePath: string = `/home/hardik/Hardik Parmar Trainnig Folder/Sequelize/Messenger postgres/public/assets/${fileName}`;
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(filePath));
      doc
        .fontSize(20)
        .font("Times-Roman")
        .text(`Chat Between ${admin_name} and ${user_name}`, {
          align: "center",
        });
      let yPos: number = 120;
      let currentDate: string = "";
      data.forEach((msg, index) => {
        doc.fontSize(15);
        const date: Date = msg.createdAt;
        const newTime: string = date.getHours() + ":" + date.getMinutes();

        let newDate: string =
          date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
        let line: string;
        if (newDate !== currentDate) {
          line = `${newDate}`;
          doc
            .font("Times-Bold")
            .text(line, 50, yPos, { width: 500, align: "center" });
          yPos += 20;
          currentDate = newDate;
        }

        if (msg.sender_id === admin_id) {
          doc
            .font("Times-Roman")
            .text(msg.message, 70, yPos, { width: 500, align: "right" })
            .fontSize(10)
            .font("Times-Roman")
            .text(newTime, { width: 500, align: "right" });
          yPos += 35;
        } else {
          doc
            .font("Times-Roman")
            .text(msg.message, 50, yPos, { width: 500, align: "left" })
            .fontSize(10)
            .font("Times-Roman")
            .text(newTime, { width: 500, align: "left" });
          yPos += 35;
        }
        if (yPos > 750 && index !== data.length - 1) {
          doc.addPage();
          yPos = 50;
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
