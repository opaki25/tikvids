import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClipDrop — Save TikTok Videos",
  description: "Save your own or authorized TikTok videos quickly, privately, and in high quality.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
