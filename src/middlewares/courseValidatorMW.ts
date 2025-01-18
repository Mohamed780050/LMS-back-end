import courseValidator from "../utils/courseValidator";
import { Request, Response,NextFunction } from "express";
export default function courseValidatorMW(req: Request, res: Response,nxt:NextFunction) {
  const validate = courseValidator(req.body)
  if(!validate) {
    res.status(400).json({data:"all fields are required"})
    return
  }
  nxt()
}
