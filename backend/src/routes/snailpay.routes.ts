import { Router } from "express"
import { procesarPago } from "../controllers/snailpay.controller"

const router = Router()

router.post("/recarga", procesarPago)

export default router