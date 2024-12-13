import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./fontawesome.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Edunify",
  description: "An Reno Next.js Assignment",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`  ${geistSans.variable} ${geistMono.variable} bg-gray-100 text-black antialiased`}
      >
        {children}

      </body>
    </html>
  );
}
