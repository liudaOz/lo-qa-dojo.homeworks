import { randomDigits, randomEnglishWord } from "./randomValueHelper";

export interface RandomUser {
  username: string;
  email: string;
  password: string;
}

export function createRandomUser(): RandomUser {
  const username = `${randomEnglishWord().toLowerCase()}${randomDigits(4)}`;
  const email = `${username}@ukr.net`;
  const password = `${username}@ukr.net`;

  return { username, email, password };
}
