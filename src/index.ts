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

const app = express();
app.use(express.json());

app.use("/user", userRrouter);
app.use("/chat",chatRouter);
app.use("/group",groupRouter);
app.use("/member",memberRouter);
app.use("/status",statusRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
statusDelete();
expiredOtpDelete()

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start app:", err);
  }
};

start();
