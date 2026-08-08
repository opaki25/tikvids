export const dynamic = "force-dynamic";

export function GET() {
  const publisher = process.env.ADSENSE_PUBLISHER_ID;
  const body = publisher ? `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n` : "# Add ADSENSE_PUBLISHER_ID after AdSense approval.\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
