import crypto from "crypto";
import { Router } from "express";
import Token from "../models/Token.js";

const router = Router();

router.post("/", async (req, res) =>{
    if (!req.user || !req.user.id) {
        return res.status(400).json({ error: "User ID is required." });
    }
    const userId = req.user.id;

    try {
        let token = await Token.findOne({
            userId,
            expiration: {$gt: Date.now()}
        })

        if(!token){
            await Token.deleteMany({
                userId,
                expiration: {$lt: Date.now()} 
            })

            const newToken = crypto.randomBytes(32).toString("hex");
            const expiration = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

            token = new Token({
                userId,
                token: newToken,
                expiration
            })

            await token.save();
        }

        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
        const shareableLink = `${frontendUrl}/shared-transactions?token=${token.token}`;
        res.json({shareableLink});
    } catch (error) {
        console.error("Error generating shareable link:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    
    
});

export default router;