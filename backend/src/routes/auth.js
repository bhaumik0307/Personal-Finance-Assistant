import express from "express";
import passport from "passport";
import {
  googleAuth,
  googleCallback,
  getCurrentUser,
  logoutUser
} from "../controllers/auth-controllers.js";

const router = express.Router();

// Redirect to Google for authentication
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}), googleAuth);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleCallback
);

router.get("/me", getCurrentUser);
router.get("/logout", logoutUser);

export default router;
