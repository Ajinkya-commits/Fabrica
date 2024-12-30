import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

app.use("/api/user", authRoutes);
app.use("/api/product", productRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
  connectDB();
});