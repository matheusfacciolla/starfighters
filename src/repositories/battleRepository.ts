import db from "../config/db.js";
import axios from "axios";

async function gitHubUsersExist(firstUser: string, secondUser: string) {
  await axios.get(`http://api.github.com/users/${firstUser}`).catch((error) => {
    throw { type: "not_found", message: error.response.data };
  });

  await axios
    .get(`http://api.github.com/users/${secondUser}`)
    .catch((error) => {
      throw { type: "not_found", message: error.response.data };
    });

  return;
}

async function getGitHubRepository(username: string) {
  const repositories = await axios
    .get(`http://api.github.com/users/${username}/repos`)
    .catch((error) => {
      throw { type: "not_found", message: error.response.data };
    });
  return repositories;
}

async function getFighter(username: string) {
  return db.query(
    `
    SELECT *
    FROM fighters
    WHERE username=$1
    `,
    [username]
  );
}

async function createNewFighter(username: string) {
  return db.query(
    `
        INSERT INTO fighters (username, wins, losses, draws)
        VALUES ($1,$2,$3,$4)
    `,
    [username, 0, 0, 0]
  );
}

async function updateFighter(username: string, wins: number, losses: number, draws: number) {
  return db.query(
    `
        UPDATE fighters SET wins=wins+$1, losses=losses+$2, draws=draws+$3
        WHERE username = $4;
    `,
    [wins, losses, draws, username]
  );
}

export const battleRepository = {
  gitHubUsersExist,
  getGitHubRepository,
  getFighter,
  createNewFighter,
  updateFighter,
};
