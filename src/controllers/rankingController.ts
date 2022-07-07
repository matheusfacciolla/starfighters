import { Request, Response } from "express";
import { rankingRepository } from "./../repositories/rankingRepository.js";

export async function ranking(req: Request, res: Response) {
  const fightersResult = await rankingRepository.getRanking();
  res.send(fightersResult.rows);
}