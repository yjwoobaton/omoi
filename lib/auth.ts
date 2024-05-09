import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";

interface SessionContent {
  id?: number;
}

export async function verifySessionAndSignIn(req: NextApiRequest, res: NextApiResponse, userId: number) {
  const session = await getIronSession<SessionContent>(req, res, {
    cookieName: "omoi",
    password: process.env.COOKIE_PASSWORD!,
  });

  if (!session.id) {
    session.id = userId;
    await session.save();
  }

  if (session.id === userId) {
    redirect('/');
  } else {
    return res.status(401).json({ error: "Invalid session or user ID mismatch." });
  }
}
