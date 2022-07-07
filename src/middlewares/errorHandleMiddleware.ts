import { NextFunction, Request, Response } from "express";

export default function handleErrorsMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
  if (error.type === "not_found") {
    res.sendStatus(404);
  }

  res.sendStatus(500);
}
