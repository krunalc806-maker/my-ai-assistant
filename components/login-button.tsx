"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span>Hi, {session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="px-3 py-2 rounded bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="px-3 py-2 rounded bg-blue-600 text-white"
    >
      Sign in with Google
    </button>
  );
}