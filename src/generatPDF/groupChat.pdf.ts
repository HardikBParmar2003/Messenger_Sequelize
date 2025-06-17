import PDFDocument from "pdfkit";
import fs from "fs";
import { Request, Response } from "express";
import { userRepository } from "../repositories/user.repositories";
import { groupRepository } from "../repositories/group.repositories";
import { Group } from "../models";
export const generatGroupChatPDF = {
  async groupChatPDF(req: Request, res: Response) {
    try {
      const group_id: number = Number(req.params.group_id);
      const user_id: number = req.user?.user_id as number;
      const group_data: Group = (await groupRepository.grtGroupData(
        group_id
      )) as Group;
      const group_name: string = group_data.group_name;
      const groupChat = await userRepository.getUserWithChat(group_id);
      if (groupChat.length > 0) {
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(`${group_name}_group_chat.pdf`));
        doc
          .fontSize(20)
          .font("Times-Roman")
          .text(`Chat from ${group_name} group`, {
            align: "center",
            underline: true,
          });
        let yPos: number = 120;
        let currentDate: string = "";
        groupChat.forEach((msg, index) => {
          const full_name: string =
            msg.sender.first_name + " " + msg.sender.last_name;
          doc.fontSize(15);
          const date: Date = msg.createdAt;
          const messageDate: string =
            date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
          const messageTime: string = date.getHours() + ":" + date.getMinutes();

          if (currentDate != messageDate) {
            doc
              .font("Times-Bold")
              .text(messageDate, 50, yPos, { width: 500, align: "center" });
            yPos += 20;
            currentDate = messageDate;
          }

          if (msg.sender.user_id == user_id) {
            doc
              .fontSize(10)
              .font("Times-Bold")
              .text(full_name, 50, yPos, {
                width: 500,
                align: "right",
              })
              .fontSize(15)
              .font("Times-Roman")
              .text(msg.message, {
                width: 500,
                align: "right",
              })
              .fontSize(10)
              .font("Times-Roman")
              .text(messageTime, { width: 500, align: "right" });
              yPos += 55;
            } else {
            doc
              .fontSize(10)
              .font("Times-Bold")
              .text(full_name, 50, yPos, {
                width: 500,
                align: "left",
              })
              .fontSize(15)
              .font("Times-Roman")
              .text(msg.message , {
                width: 500,
                align: "left",
              })
              .fontSize(10)
              .text(messageTime, { width: 500, align: "left" });
            yPos += 55;
          }
          if (yPos > 750 && index !== groupChat.length - 1) {
            doc.addPage();
            yPos = 50;
          }
        });
        doc.end();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Error while generating group chat pdf")
    }
  },
};
