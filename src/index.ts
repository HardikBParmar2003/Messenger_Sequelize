import express from 'express';
import { sequelize } from './config/database';
// import userRoutes from './routes/user.routes';
import { Request,Response } from 'express';
import { router } from './routes/userRoutes';
const app = express();
app.use(express.json());

// app.use('/users', userRoutes);
app.use("/",router)

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true});
    console.log('✅ Database connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start app:', err);
  }
};

start();
