export class User {
  token: string;
  access_level: number;
}

export enum AccessLevel {
  teacher = 0,
  director = 1,
  head = 2
}
