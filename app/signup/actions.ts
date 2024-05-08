"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "@/lib/db";
import { z } from "zod";
import { createHash } from "crypto";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import getSession from "@/lib/session";

async function isTokenExpired(email: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      emailTokenExpiration: true,
    },
  });

  if (!user || !user.emailTokenExpiration) {
    // 사용자 또는 emailTokenExpiration 값이 없는 경우
    return true; // 토큰이 만료되었다고 간주
  }

  // 현재 시간과 emailTokenExpiration 시간을 비교
  const currentTime = new Date();
  return currentTime > user.emailTokenExpiration; // 만료 시간이 현재 시간보다 이전이면 true (만료됨)
}

// 이메일 인증 토큰 생성
async function generateVerificationToken(userId: number) {
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign({ userId }, secret, { expiresIn: "1h" });
  return token;
}

// 유저에게 이메일 전송
async function sendVerificationEmail(email: string, verificationUrl: string) {
  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com", // SMTP 서버명
    port: 465, // SMTP 포트
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "[OMOI] 이메일 인증을 진행해주세요.",
    html: `이메일 인증을 위해 아래 URL을 클릭해주세요.: <a href="${verificationUrl}">${verificationUrl}</a>`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

// 유저네임 중복 확인
// const checkUsername = async (username: string) => {
//   const user = await db.user.findUnique({
//     where: {
//       username,
//     },
//     select: {
//       id: true,
//     },
//   });

//   return !Boolean(user);
// };

// 이메일 중복 확인
// const checkEmail = async (email: string) => {
//   const user = await db.user.findUnique({
//     where: {
//       email,
//     },
//     select: {
//       id: true,
//     },
//   });

//   return !Boolean(user);
// };

const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/);
const userSchema = z
  .object({
    username: z
      .string()
      .min(2, "2글자 이상 입력해주세요.")
      .max(20, "최대 20자까지 입력 가능합니다.")
      .trim()
      .toLowerCase(), // 쉼표 추가
    email: z.string().email("이메일 형식이 아닙니다.").trim().toLowerCase(), // 쉼표 추가
    password: z
      .string()
      .regex(passwordRegex, "비밀번호는 영문 대소문자, 특수문자를 포함해야 합니다.")
      .min(8, "8자 이상 입력해주세요.")
      .trim(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용중인 닉네임입니다.",
        path: ["username"],
        fatal: true,
      });
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용중인 이메일입니다.",
        path: ["email"],
        fatal: true,
      });
    }
  });

export default async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await userSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log("user: ", result);

    const userEmail = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
      },
    });

    if (userEmail) {
      throw new Error("이미 사용중인 이메일입니다.");
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    console.log(hashedPassword);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    console.log(user);

    const token = await generateVerificationToken(123);
    
    await sendVerificationEmail(
      result.data.email,
      `${process.env.DEV_DOMAIN}/signup/verify?token=${token}}`
    );

    const isEmailTokenVerified = await db.user.update({
      where: {
        email: result.data.email,
      },
      data: {
        emailToken: token,
        emailTokenExpiration: new Date(new Date().getTime() + 60 * 60 * 1000),
      },
      select: {
        id: true,
      },
    });

    const isEmailTokenExpired = await isTokenExpired(result.data.email);

    if(isEmailTokenVerified && !isEmailTokenExpired) {
      const session = await getSession();
      session.id = user.id;
      await session.save();
    }

    // redirect("/signup/verify");
  }
}
