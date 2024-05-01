// // 예: /pages/api/login.ts
// import { withIronSessionApiRoute } from "iron-session-";
// import { NextApiRequest, NextApiResponse } from "next";

// async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
//   // 로그인 로직 (예: 데이터베이스에서 사용자 확인)
//   const user = { id: 1, username: "user1" }; // 예시 사용자
//   req.session.user = user;
//   await req.session.save();
//   res.send({ ok: true });
// }

// export default withIronSessionApiRoute(loginRoute, {
//   cookieName: "myapp_cookie",
//   password: process.env.SESSION_SECRET,
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// });
