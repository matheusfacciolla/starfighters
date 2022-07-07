import { Request, Response } from "express";
import { fight } from "../services/battleService.js";
import { battleRepository } from "../repositories/battleRepository.js";

export async function newBattle(req: Request, res: Response) {
  const { firstUser, secondUser } : {firstUser: string, secondUser: string} = req.body;

  await battleRepository.gitHubUsersExist(firstUser, secondUser);
  const result = await fight(firstUser, secondUser);
  
  res.send(result);
}