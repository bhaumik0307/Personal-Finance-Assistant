import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import path from "path";

import { connectDB } from "./src/lib/db.js";
import session from "express-session";
import passport from "passport";

import authRoutes from "./src/routes/auth.js";
import txRoutes from "./src/routes/transactions.js";
import generateShareableLinkRoutes from "./src/routes/generate-shareable-link.js";

dotenv.config();

import "./src/config/passport.js";

const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();
app.use(express.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true,
      sameSite: "none", // Required for cross-origin requests
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
  
app.use(cors({
    origin: `${process.env.FRONT_END_URL}`,
    credentials: true,
}));

app.use("/auth", authRoutes);
app.use("/api/transactions", txRoutes);
app.use("/generate-shareable-link", generateShareableLinkRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.BASE_URL} `);
  connectDB();
});
