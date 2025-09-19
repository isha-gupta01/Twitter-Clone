import "./globals.css";
import SessionWrapper from "@/components/sesssionwrapper";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // choose weights you need
});

export const metadata = {
  title: "TwitterOn",
  description: "A Clone of Twitter. Made by Isha Gupta ❤️",
  icons: {
    icon: "/twitteron.ico",
  },
};

export default function RootLayout({ children }) {
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
