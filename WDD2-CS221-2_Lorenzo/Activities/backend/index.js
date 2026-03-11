import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

const app = express();
const PORT = 3000;
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["*"],
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
//https://localhost:3000/api/auth/register
//https://localhost:3000/api/auth/login
//https://localhost:3000/api/auth/logout
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT: ${PORT}`);
});
