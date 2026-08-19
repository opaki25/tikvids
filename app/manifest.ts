import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zavera TikTok Video Downloader",
    short_name: "Zavera",
    description: "Download TikTok videos in MP4 or save available audio as MP3.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#729520",
    icons: [{ src: "/zavera-icon.png", sizes: "1254x1254", type: "image/png" }],
  };
}
