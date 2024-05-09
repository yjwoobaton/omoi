import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}
export default function createSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "omoi",
    password: process.env.COOKIE_PASSWORD!
  });
}