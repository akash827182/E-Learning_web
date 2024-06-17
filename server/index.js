import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";

dotenv.config();

const app = express();

// Using middlewares
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

// importing routes
import userRoutes from "./routes/user.js";

// using routes
app.use("/api", userRoutes);

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
