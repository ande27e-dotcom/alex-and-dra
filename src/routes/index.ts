import { Router } from "express"
import authRoutes from "@/modules/auth/auth.routes"

const router = Router()

router.use("/auth", authRoutes)

router.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

export default router
