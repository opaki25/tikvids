import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isPublicTikTokUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && /(^|\.)tiktok\.com$/i.test(url.hostname);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (typeof url !== "string" || !isPublicTikTokUrl(url)) return NextResponse.json({ error: "Please paste a valid public TikTok link." }, { status: 400 });

    const body = new URLSearchParams({ url, hd: "1" });
    const response = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "Zavera/1.0" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(25_000),
    });
    if (!response.ok) throw new Error("Provider unavailable");
    const payload = await response.json();
    if (payload.code !== 0 || !payload.data?.play) return NextResponse.json({ error: payload.msg || "This video is unavailable or restricted." }, { status: 422 });

    const item = payload.data;
    return NextResponse.json({
      id: String(item.id), title: item.title || "TikTok video", cover: item.cover || item.origin_cover || "", duration: Number(item.duration || 0),
      author: { name: item.author?.nickname || "TikTok creator", username: item.author?.unique_id || "creator" },
      downloads: { hd: item.hdplay || undefined, standard: item.play, audio: item.music || undefined },
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const timeout = error instanceof Error && error.name === "TimeoutError";
    return NextResponse.json({ error: timeout ? "TikTok took too long to respond. Please try again." : "We could not process that link right now. Please try again." }, { status: 500 });
  }
}
