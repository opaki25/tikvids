import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://www.zavera.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "TikTok Video Downloader – HD MP4 & MP3 | Zavera", template: "%s | Zavera" },
  description: "Download TikTok videos online in HD MP4 or save TikTok audio as MP3 with Zavera. Fast, free, private, and no app or account required.",
  applicationName: "Zavera",
  keywords: ["Zavera", "TikTok video downloader", "download TikTok videos", "TikTok downloader", "TikTok MP4", "TikTok MP3 downloader"],
  alternates: { canonical: "/" },
  authors: [{ name: "Zavera", url: siteUrl }],
  creator: "Zavera",
  publisher: "Zavera",
  category: "technology",
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/zavera-icon.png", apple: "/zavera-icon.png" },
  openGraph: { title: "TikTok Video Downloader – HD MP4 & MP3 | Zavera", description: "Download TikTok videos online in HD MP4 or save audio as MP3. Fast, free, and no sign-up required.", url: siteUrl, siteName: "Zavera", type: "website", locale: "en_US", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Zavera TikTok video downloader" }] },
  twitter: { card: "summary_large_image", title: "TikTok Video Downloader | Zavera", description: "Download TikTok videos in HD MP4 or save audio as MP3—fast and free.", images: ["/og.png"] },
};

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
