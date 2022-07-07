import { battleRepository } from "../repositories/battleRepository.js";

export async function fight(firstUser: string, secondUser: string) {
  const firstUserExists = await battleRepository.getFighter(firstUser);
  if (!firstUserExists.rows.length) {
    await battleRepository.createNewFighter(firstUser);
  }

  const secondUserExists = await battleRepository.getFighter(secondUser);
  if (!secondUserExists.rows.length) {
    await battleRepository.createNewFighter(secondUser);
  }

  const firstUserRepositories = await battleRepository.getGitHubRepository(firstUser);
  const secondUserRepositories = await battleRepository.getGitHubRepository(secondUser);

  let firstUserStargazersCount = 0;
  let secondUserStargazersCount = 0;

  firstUserRepositories.data.forEach(
    (element: any) => (firstUserStargazersCount += element.stargazers_count)
  );

  secondUserRepositories.data.forEach(
    (element: any) => (secondUserStargazersCount += element.stargazers_count)
  );

  if (firstUserStargazersCount === secondUserStargazersCount) {
    await battleRepository.updateFighter(firstUser, 0, 0, 1);
    await battleRepository.updateFighter(secondUser, 0, 0, 1);
    return { winner: null, loser: null, draw: true };
  }

  if (firstUserStargazersCount > secondUserStargazersCount) {
    await battleRepository.updateFighter(firstUser, 1, 0, 0);
    await battleRepository.updateFighter(secondUser, 0, 1, 0);
    return { winner: firstUser, loser: secondUser, draw: false };
  }

  if (firstUserStargazersCount < secondUserStargazersCount) {
    await battleRepository.updateFighter(firstUser, 0, 1, 0);
    await battleRepository.updateFighter(secondUser, 1, 0, 0);
    return { winner: secondUser, loser: firstUser, draw: false };
  }
}
