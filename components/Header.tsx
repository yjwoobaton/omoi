"use client";

import Image from "next/image";
import logo from "../public/logo/logo_title.svg";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  return (
    <header className="bg-white max-w-3xl mx-auto px-4">
      <nav className="flex justify-between items-center gap-4 ">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src={logo} width={72} height={72} alt="omoi logo" />
          </Link>
          <ul className="flex gap-2">
            <li>
              <Link className="block px-2 py-4" href="/feed">
                피드
              </Link>
            </li>
            <li>
              <Link className="block px-2 py-4" href="/map">
                지도
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex">
          <Link className="block px-2 py-4" href="/signin">
            로그인
          </Link>
          <Link className="block px-2 py-4" href="/about">
            User님
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
