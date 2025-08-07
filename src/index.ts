import express from "express";
import { sequelize } from "./config/database";
import { userRrouter } from "./routes/user.routes";
import { swaggerUi, swaggerSpec } from "./swagger";
import { statusDelete } from "./cron/statusDelete";
import { expiredOtpDelete } from "./cron/otpDelete";
import { chatRouter } from "./routes/chat.routes";
import { groupRouter } from "./routes/group.routes";
import { memberRouter } from "./routes/member.routes";
import { statusRouter } from "./routes/status.routes";
import { callRouter } from "./routes/call.routes";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import socketTest from "./controller/socket.controller";

const app = express();

const allowedOrigin = [process.env.FRONTEND_URL,process.env.MESSENGER_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigin.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Origin not allowed by cors"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigin.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Origin not allowed by cors"));
      }
    },
    credentials: true,
  },
});
socketTest(io);

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

// app.use(express.json());
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   },
// });
// socketTest(io);

app.use("/user", userRrouter);
app.use("/chat", chatRouter);
app.use("/group", groupRouter);
app.use("/member", memberRouter);
app.use("/status", statusRouter);
app.use("/call", callRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 10000;

statusDelete();
expiredOtpDelete();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log("✅ Database connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start app:", err);
  }
};

start();
