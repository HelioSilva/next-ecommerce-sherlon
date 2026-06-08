"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import crypto from "crypto";

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");

  function md5(text: string) {
    return crypto.createHash("md5").update(text).digest("hex");
  }

  async function handleLogin() {
    const hash = md5(password);
    const res = await fetch(
      `/api/login?user=${user.toLowerCase()}&password=${hash}`,
    );
    const data = await res.json();

    if (data.success) {
      const token = window.crypto.randomUUID();
      sessionStorage.setItem("token", token);
      onSuccess();
      router.push("/admin");
    } else {
      toast.error("Login inválido!");
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <div className="flex flex-col items-center justify-center  h-full ">
        <div className="md:hidden">
          <img
            src="/images/logo-pgn-ini.svg"
            alt=""
            width={200}
            height={100}
            className="pb-5"
          />
        </div>

        <div className="hidden sm:flex">
          <img
            src="/images/logo-pgn-ini.svg"
            alt=""
            className=" mb-5"
            width={350}
            height={175}
          />
        </div>
        <div className="font-semibold  md:text-xl text-[#685048] mb-6">
          <h2>Administrativo</h2>
        </div>
        <div>
          <input
            type="text"
            placeholder="Usuário"
            className="border p-2 w-full mb-2"
            value={user}
            onChange={(e) => setUser(e.target.value.trim())}
          />

          <input
            type="password"
            placeholder="Senha"
            className="border p-2 w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <button
            onClick={handleLogin}
            className="bg-[#685048] text-white w-full py-2 rounded"
          >
            Entrar
          </button>
        </div>
      </div>
    </>
  );
}
