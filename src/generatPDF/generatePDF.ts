import { Request, Response } from "express";
import { chatRepository } from "../repositories/chat.repoitories";
import PDFDocument from "pdfkit";
import fs from "fs";
import { Chat } from "../../interface";
export const generatePDF = {
  async personalChat(req: Request, res: Response) {
    const admin_id: number = req.user?.user_id as number;
    const admin_name: string = ((req.user?.first_name as string) +
      " " +
      req.user?.last_name) as string;
    const user_id: number = req.body.user_id;
    const user_name: string = req.body.user_name;
    const data: Chat[] = await chatRepository.getUserChat(admin_id, user_id);
    if (data.length > 0) {
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(`${admin_name}_${user_name}_chat.pdf`));
      doc
        .fontSize(20)
        .font("Times-Roman")
        .text(`Chat Between ${admin_name} and ${user_name}`);
      let yPos = 120;
      let currentDate: string = "";
      data.forEach((msg, index) => {
        doc.fontSize(15);
        const date: Date = msg.createdAt;
        const newTime: string = date.getHours() + ":" + date.getMinutes()+":"+date.getSeconds()

        let newDate: string =
          date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
        let line: string;
        if (newDate !== currentDate) {
          line = `${newDate}`;
          doc
            .font("Times-Bold")
            .text(line, 50, yPos, { width: 500, align: "center" });
          yPos += 20;
          currentDate = newDate;
        } else {
        }

        if (msg.sender_id === admin_id) {
          line = `${msg.message}`;
          doc
            .font("Times-Roman")
            .text(line, 70, yPos, { width: 500, align: "right" })
            .fontSize(10)
            .font("Times-Roman")
            .text(` ${newTime}`, { width: 500, align: "right" });
          yPos += 35;
        } else {
            line = `${msg.message}`;
          doc
            .font("Times-Roman")
            .text(line, 50, yPos, { width: 500, align:"left" })
            .fontSize(10)
            .font("Times-Roman")
            .text(` ${newTime}`, { width: 500, align:"left" });
            yPos += 35;
            //   doc.font("Times-Roman").text(msg.message, 50, yPos, {
        //     width: 500,
        //     align: "left",
        //     continued: true,
        //   });
        //   yPos += 15;

        //   doc
        //     .fontSize(10)
        //     .font("Times-Roman")
        //     .text(newTime, 50, yPos, { width: 500, align: "left" });
        //   yPos += 25;
        }
        if (yPos > 750 && index !== data.length - 1) {
          doc.addPage();
          yPos = 50;
        }
      });
      doc.end();
      return true;
    } else {
      return false;
    }
  },
};
