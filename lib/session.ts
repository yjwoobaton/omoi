// lib/session.ts

import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

interface SessionContent {
  id?: number;
}

export async function createSession(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: number,
) {
  const session = await getIronSession<SessionContent>(req, res, {
    cookieName: "omoi",
    password: process.env.COOKIE_PASSWORD!,
  });

  // user 아이디를 세션에 저장
  session.id = userId;

  // 세션 데이터 저장 후 쿠키를 클라이언트로 보냄
  await session.save();

  res.redirect("/signin");
}


