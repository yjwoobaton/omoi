import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}
export default function getSession() {
  console.log('cookie:', cookies());
  // 유저에게 쿠키를 전달해 로그인 상태 유지
  // 쿠키가 없다면 getIronSession 함수가 새로운 쿠키를 생성
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "omoi",
    password: process.env.COOKIE_PASSWORD!,
  });
}
