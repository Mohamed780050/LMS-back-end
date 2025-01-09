import { Request, Response, NextFunction } from "express";
import logTheEvent from "./logEventsMW.js";
export default function errorMW(
  err: Error,
  req: Request,
  res: Response,
  nxt: NextFunction
) {
  logTheEvent(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errors.log"
  );
  console.log(err.stack);
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status).json({ message: "server Error" });
}
