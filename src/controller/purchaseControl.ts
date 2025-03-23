import { Request, Response } from "express";
import { Purchase } from "../models/purchaseModel.js";

async function createAPurchase(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { courseId } = req.body;
    const purchase = new Purchase(userId, courseId);
    const response = await purchase.save();
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server error" });
  }
}
export default { createAPurchase };
