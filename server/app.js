import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

import express, { json } from "express";
import cors from "cors";
const app = express();

import { connectDB } from "./config/db.js";
connectDB();

app.use(cors());
app.use(json());

// routes
import paymentRoutes from "./routes/paymentRoutes.js";
app.use("/api", paymentRoutes);

import metricsRoutes from "./routes/metricsRoutes.js";
app.use("/api", metricsRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});