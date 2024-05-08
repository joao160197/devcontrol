"use client";

import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogOut() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-lg">
      <div className="flex items-center justify-between gap-2 w-full max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-2 hover:tracking-widest duration-300 ">
            <span className="text-blue-700">DEV</span> CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button type="button" title="loading">
            <FiLoader className="animate-spin" size={25} color="grey" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin} type="button" title="loading">
            <FiLock size={25} color="grey" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-center flex-wrap gap-4">
            <Link href="/dashboard">
              <BsPerson size={25} color="grey" />
            </Link>
            <button onClick={handleLogOut} title="Deslogar" type="button">
              <ImExit size={25} color="grey" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
