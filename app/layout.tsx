import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import AuthSession from "@/AuthSession";

export const metadata: Metadata = {
  title: "omoi",
  description: "social media for japan travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthSession>
          <Header />
          {children}
        </AuthSession>
      </body>
    </html>
  );
}
