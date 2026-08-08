import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Zavera — Save TikTok Videos",
    description: "Save your own or authorized TikTok videos quickly, privately, and in high quality.",
    icons: { icon: "/zavera-icon.png", apple: "/zavera-icon.png" },
    openGraph: { title: "Zavera — Save the videos you love.", description: "Fast, free TikTok video downloads for content you own or have permission to use.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Zavera — Save the videos you love." }] },
    twitter: { card: "summary_large_image", title: "Zavera — Save the videos you love.", description: "Fast, free TikTok video downloads for authorized content.", images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="en">
      <body>
        {children}
        {adClient && <Script async strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`} crossOrigin="anonymous" />}
      </body>
    </html>
  );
}
