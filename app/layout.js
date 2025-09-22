"use client"
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import "./globals.css";
import SessionWrapper from "@/components/sesssionwrapper";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // choose weights you need
});

const metadata = {
  title: "TwitterOn",
  description: "A Clone of Twitter. Made by Isha Gupta ❤️",
  icons: {
    icon: "/twitteron.ico",
  },
};

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login"); // optional redirect
        }
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      }
    }
  }, []);
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body
        className={`${roboto.className} antialiased`}
      >
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
