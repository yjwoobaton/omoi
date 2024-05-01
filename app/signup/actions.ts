"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

// 이메일 인증 토큰 생성
async function generateVerificationToken(userId: number) {
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign({ userId }, secret, { expiresIn: "1h" });
  return token;
}

async function sendVerificationEmail(email: string, verificationUrl: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
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

const prisma = new PrismaClient();
const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/);
const userSchema = z.object({
  username: z
    .string()
    .min(2, "2글자 이상 입력해주세요.")
    .max(20, "최대 20자까지 입력 가능합니다.")
    .trim()
    .toLowerCase(),
  email: z.string().email("이메일 형식이 아닙니다.").trim().toLowerCase(),
  password: z
    .string()
    .regex(passwordRegex, "비밀번호는 영문 대소문자, 특수문자를 포함해야 합니다.")
    .min(8, "8자 이상 입력해주세요.")
    .trim(),
});

export default async function handleForm(prevState: any, formData: FormData) {
  console.log(cookies());
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = userSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log("user: ", result);

    // 유저네임, 이메일 중복 확인
    const checkIsUsernameExist = new PrismaClient().user.findUnique({
      where: {
        username: result.data.username,
      },
    });

    const checkIsEmailExist = new PrismaClient().user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    // 비밀번호 해싱
    const hashedPassword = createHash("sha256").update(result.data.password).digest("hex");

    // DB에 유저 저장
    const user = await prisma.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
    });

    // 유저 로그인
    // 유저에게 쿠키를 전달
    const session = await getIronSession(cookies(), {
      cookieName: "omoi-cookie",
      password: process.env.COOKIE_PASSWORD!,
      // '!': non-null assertion operator
    });
    

  
    // 홈으로 리다이렉트

    redirect("/signup/verify");
  }
}
