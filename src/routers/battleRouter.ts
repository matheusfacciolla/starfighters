import { Router } from "express";
import { newBattle } from "./../controllers/battleController.js";

const battleRouter = Router();

battleRouter.post("/battle", newBattle);

export default battleRouter;