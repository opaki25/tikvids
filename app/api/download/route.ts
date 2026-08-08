const ALLOWED_MEDIA_HOST = /(^|\.)(tiktokcdn(?:-[a-z0-9]+)?\.com|tikwm\.com)$/i;

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const source = new URL(params.get("src") || "");
    if (source.protocol !== "https:" || !ALLOWED_MEDIA_HOST.test(source.hostname)) return new Response("Invalid media source", { status: 400 });

    const type = params.get("type") === "audio" ? "audio" : "video";
    const extension = type === "audio" ? "mp3" : "mp4";
    const safeName = (params.get("name") || "zavera-download").replace(/[^a-z0-9_-]/gi, "-").slice(0, 80);
    const upstream = await fetch(source, { headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.tiktok.com/" }, cache: "no-store", signal: AbortSignal.timeout(30_000) });
    if (!upstream.ok || !upstream.body) return new Response("Media is no longer available. Please prepare the video again.", { status: 502 });

    const headers = new Headers({ "Content-Type": upstream.headers.get("content-type") || `${type}/${extension}`, "Content-Disposition": `attachment; filename="${safeName}.${extension}"`, "Cache-Control": "private, no-store" });
    const length = upstream.headers.get("content-length");
    if (length) headers.set("Content-Length", length);
    return new Response(upstream.body, { status: 200, headers });
  } catch {
    return new Response("The download link expired. Please prepare the video again.", { status: 400 });
  }
}
