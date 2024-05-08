import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";

export default function Verify() {
  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-4">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <p className="text-gray-700 font-medium text-lg text-left">이메일 인증</p>
        <p className="text-gray-700 font-medium text-base text-left pb-4">
          {/* 입력하신 이메일로 인증 메일을 발송해드렸어요. 인증이 완료되면 회원가입이 완료됩니다. */}
          이메일 인증에 성공했습니다.
        </p>
        <Link href="/signin">
          <Button content="로그인" type="primary" />
        </Link>
      </div>
    </div>
  );
}
