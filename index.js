import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();
connectDB(); 
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
