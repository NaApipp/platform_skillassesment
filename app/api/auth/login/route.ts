// app/api/auth/login/route.ts
import { USERS } from "@/app/lib/user";
import { NextResponse } from "next/server";
import { signToken } from "@/app/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const username = body?.username?.toString() ?? "";
  const password = body?.password?.toString() ?? "";

  const user = USERS.find((u) => u.username === username && u.password === password);
  if (!user) {
    return NextResponse.json({ error: "Username / password salah" }, { status: 401 });
  }

  const token = await signToken({ username: user.username, role: user.role });

  return NextResponse.json({
    token,
    user: { username: user.username, role: user.role },
  });
}