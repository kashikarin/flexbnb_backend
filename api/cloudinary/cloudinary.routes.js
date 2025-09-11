import express from "express"
import { getSignature } from "./cloudinary.controller.js"
import { requireAuth } from "../../middlewares/requireAuth.js"

const router = express.Router()

// route for signed upload requests
router.get("/signature", requireAuth, getSignature)

export const cloudinaryRoutes = router;