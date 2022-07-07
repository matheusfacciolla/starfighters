import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";

import "./config/setup.js";
import battleRouter from "./routers/battleRouter.js";
import rankingRouter from "./routers/rankingRouter.js";

const app = express();
app.use(cors());
app.use(json());
app.use(battleRouter);
app.use(rankingRouter)

const port: number = +process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.bold.green(`Server is running on port: ${port}`))
})

export default app;