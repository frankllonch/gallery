import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/top-bar";

export const metadata: Metadata = {
  title: "Gallery — Frank Llonch",
  description: "Paintings, drawings and animations by Frank Llonch.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
