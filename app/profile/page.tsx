"use client";

import Button from "@/components/Button";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();
  const signOut = async () => {
    const response = await fetch("/api/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      window.location.href = "/signin"; // 성공 시 로그인 페이지로 리다이렉션
    } else {
      alert("Logout failed");
    }
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mb-4">
            <p className="text-gray-700 text-base">
              안녕하세요, {session?.user?.name} 님
            </p>
          </div>
          {/* <Button
            onClick={signOut}
            content="로그아웃"
            type="secondary"
          /> */}
        </div>
      </div>
    </main>
  );
}
