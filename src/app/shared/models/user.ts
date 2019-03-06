export class User {
  token: string;
  accessLevel: number;
}

export enum AccessLevel {
  teacher = 0,
  director = 1,
  head = 2
}
