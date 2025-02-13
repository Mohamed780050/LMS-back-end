import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
dotenv.config();
export default function JWTverifyMW(
  req: Request,
  res: Response,
  nxt: NextFunction
) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    `${process.env.ACCESS_TOKEN_SECRET}`,
    (err, payload: any) => {
      if (err) {
        res.sendStatus(403);
        return null;
      }
      req.params = { ...req.params, userId: payload.userId };
      nxt();
    }
  );
}
