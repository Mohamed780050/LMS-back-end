import express from "express"
import JWTverifyMW from "../middlewares/JWTverifyMW.js"
import purchaseControl from "../controller/purchaseControl.js"
const router = express.Router()
router.route("/").post(JWTverifyMW,purchaseControl.createAPurchase)
export default router