import { Request, Response } from "express";

async function createAPurchase(req: Request, res: Response) {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server error" });
  }
}
export default { createAPurchase };
