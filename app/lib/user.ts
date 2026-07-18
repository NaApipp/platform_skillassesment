// lib/users.ts
export type DemoUser = {
  username: string;
  password: string; // demo only (plaintext). Jangan gini di production.
  role: "admin" | "user";
};

export const USERS: DemoUser[] = [
  { username: "user_testing1", password: "Testing1#", role: "user" },
  { username: "user_testing2", password: "Testing2#", role: "user" },
  { username: "user_testing3", password: "Testing3#", role: "user" },
  { username: "user_testing4", password: "Testing4#", role: "user" },
  { username: "user_testing5", password: "Testing5#", role: "user" },
  { username: "user_testing6", password: "Testing6#", role: "user" },
  { username: "user_testing7", password: "Testing7#", role: "user" },
  { username: "user_testing8", password: "Testing8#", role: "user" },
  { username: "user_testing9", password: "Testing9#", role: "user" },
  { username: "user_testing10 ", password: "testing10#", role: "user" },
];