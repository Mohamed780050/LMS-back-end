import teacherValidator from "../utils/teacherValidator.js";
import { Request, Response, NextFunction } from "express";
export default function teacherValidatorMW(
  req: Request,
  res: Response,
  nxt: NextFunction
) {
  const validate = teacherValidator(req.body);
  if (!validate) {
    res.status(400).send(teacherValidator.errors);
    return;
  }
  nxt();
}
