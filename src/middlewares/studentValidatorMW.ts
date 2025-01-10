import { Request, Response, NextFunction } from "express";
import studentValidator from "../utils/studentValidator.js";
export default function studentValidatorMW(
  req: Request,
  res: Response,
  nxt: NextFunction
) {
  const validate = studentValidator(req.body);
  if (!validate) {
    res.status(400).json({ data: "check your inputs" });
    return;
  }
  nxt();
}
