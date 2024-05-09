"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";

// @TODO: 쿠키 만료기간이 지났을 때 재발급하는 함수

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string({
      required_error: "이메일을 입력해주세요.",
    })
    .email("@를 포함한 이메일 주소를 입력해주세요.")
    .toLowerCase()
    .refine(checkEmailExists, "이메일을 찾을 수 없습니다."),
  password: z.string({
    required_error: "비밀번호를 입력해주세요.",
  }),
});

export async function handleSignIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "xxxx");
    if (ok) {
      redirect("/");
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호를 틀렸습니다."],
          email: [],
        },
      };
    }
  }
}
