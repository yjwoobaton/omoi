"use client";

import Image from "next/image";
import logo from "../public/logo/logo_title.svg";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <header className="bg-white max-w-3xl mx-auto px-4">
      <nav className="flex justify-between items-center gap-4 ">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src={logo} width={72} height={72} alt="omoi logo" />
          </Link>
          <ul className="flex gap-2">
            <li>
              <Link className="block px-2 py-4" href="/">
                피드
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex">
          {session ? (
            <button
              className="block px-2 py-4"
              onClick={() => {
                signOut();
                redirect("/");
              }}
            >
              로그아웃
            </button>
          ) : (
            <Link className="block px-2 py-4" href="/signin">
              로그인
            </Link>
          )}

          {session && (
            <Link className="block px-2 py-4" href="/">
              {session.user?.name} 님
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
