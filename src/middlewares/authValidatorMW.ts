import { Request, Response, NextFunction } from "express";
import authValidator from "../utils/authValidator.js";
export default function authValidatorMW(
  req: Request,
  res: Response,
  nxt: NextFunction
) {
  const validate = authValidator(req.body);
  if (!validate) {
    res.status(400).json({ message: "check your fields" });
    return;
  }
  nxt();
}
