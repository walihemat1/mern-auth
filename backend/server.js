import express from "express";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

// using express.json() will allow us to get the data from the http body like req.body
app.use(express.json());

// urlencoded will allow us to send form data
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`App is listening on PORT ${PORT}`));
