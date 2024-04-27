// pages/login.tsx
import Head from "next/head";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ReactEventHandler } from "react";
import { FormEvent } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const handleSubmit = async (data: FormData) => {
    "use server";
    console.log("form submitted");
    redirect("/feed");
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100 items-center justify-center px-4">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
          <div>
            <p className="text-gray-700 font-medium text-lg text-left">로그인</p>
          </div>
          <form className="space-y-6" action={handleSubmit}>
            <Input name="email" label="이메일" placeholder="이메일을 입력하세요." />
            <Input name="password" label="비밀번호" placeholder="비밀번호를 입력하세요." />
            <Button content="로그인" type="primary" />
          </form>
          <Button content="네이버 로그인" type="secondary" />
          <div className="flex items-center">
            <Link href="/signup" className="text-sm text-gray-500 mr-4">
              회원가입
            </Link>
            <Link href="/profile" className="text-sm text-gray-500">
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}