"use server";

import { Redis } from "@upstash/redis";
import crypto from "crypto";
const redis = Redis.fromEnv();

// function md5(text: string) {
//   return crypto.createHash("md5").update(text).digest("hex");
// }

type LoginRequest = {
  user: string;
  password: string;
};

export async function LoginAuth({ user, password }: LoginRequest) {
  //   const hash = md5(password);

  const loginRedis = await redis.get<LoginRequest>("login");

  // console.log("Login Redis:", loginRedis);

  // if (loginRedis?.user !== user) {
  //   return Response.json({ error: "Usuário não encontrado" });
  // }

  // if (loginRedis?.password !== password) {
  //   return Response.json({ error: "Senha incorreta" });
  // }

  console.log("Login bem-sucedido para o usuário:", user);

  // return Response.json({ success: true });
}
