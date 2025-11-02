import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import 'boxicons/css/boxicons.min.css';

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "NotTyler | Organization",
  description: "NotTyler is a prestigious organization that was imagined as a place for brilliant creative works to be appreciated for their genius and clever artistic vision.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"px-2 lg:px-2" + `${inter.variable} ${spaceMono.variable}`}>{children}</body>
    </html>
  );
}
