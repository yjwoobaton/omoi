"use server";

import { redirect } from "next/navigation";

export default async function handleForm(prevState: any, data: FormData) {
  "use server";
  console.log(prevState);
  redirect("/");
  return {
    errors: ["wrong password", "wrong email"],
  };
}
