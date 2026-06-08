import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

interface LoginRequest {
  user: string;
  password: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const user = searchParams.get("user");
  const password = searchParams.get("password");

  const loginRedis = await redis.get<LoginRequest>("login");

  if (!loginRedis) {
    return NextResponse.json({ error: "Não encontrado" });
  }

  if (user !== loginRedis.user || !password) {
    return NextResponse.json({ error: "Usuário inválido" });
  }

  if (loginRedis.password !== password) {
    return NextResponse.json({ error: "Senha incorreta" });
  }

  return NextResponse.json({ success: true });
}
