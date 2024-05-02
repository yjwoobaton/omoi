import db from "@/lib/db";
import Button from "@/components/Button";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if(user) {
      return user;
    }
  }
  notFound(); // 세션 아이디가 없을 경우
}
export default async function Profile() {
  const user = await getUser();
  const signOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    // 유저 정보 불러오기
    <main>
      hello {user?.username}
      <form action={signOut}>
        <Button content="로그아웃" type="secondary" />
      </form>
    </main>
  );
}
