import express from "express";
import { sequelize } from "./config/database";
import { router } from "./routes/userRoutes";
import { swaggerUi, swaggerSpec } from "./swagger";
import { statusDelete } from "./cron/statusDelete";
import { expiredOtpDelete } from "./cron/otpDelete";

const app = express();
app.use(express.json());

app.use("/", router);
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
