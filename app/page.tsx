"use client";

import { FormEvent, useState } from "react";
import AdSlot from "@/components/AdSlot";

type VideoResult = {
  id: string;
  title: string;
  cover: string;
  duration: number;
  author: { name: string; username: string };
  downloads: { hd?: string; standard: string; audio?: string };
};

const steps = [
  ["01", "Copy the link", "Open TikTok, tap Share, then copy the video link."],
  ["02", "Paste it here", "Drop the link into the box above and tap Find video."],
  ["03", "Save your video", "Choose HD, standard MP4, or audio and save it."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.zavera.site/#website",
      url: "https://www.zavera.site/",
      name: "Zavera",
      description: "A fast online TikTok video downloader for HD MP4 videos and MP3 audio.",
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id": "https://www.zavera.site/#app",
      name: "Zavera TikTok Video Downloader",
      url: "https://www.zavera.site/",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser and internet connection",
      description: "Download public TikTok videos as HD MP4 or save available audio as MP3.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      isAccessibleForFree: true,
    },
    {
      "@type": "Organization",
      "@id": "https://www.zavera.site/#organization",
      name: "Zavera",
      url: "https://www.zavera.site/",
      logo: "https://www.zavera.site/zavera-icon.png",
    },
  ],
};

function Brand() {
  return (
    <span className="brand-lockup">
      <img src="/zavera-icon.png" alt="" />
      <span>zavera</span>
    </span>
  );
}

function fileLink(src: string, name: string, type: string) {
  const query = new URLSearchParams({ src, name, type });
  return `/api/download?${query.toString()}`;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState<VideoResult | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setVideo(null);
    const isTikTok = /^https?:\/\/(www\.|m\.|vm\.|vt\.)?tiktok\.com\//i.test(url.trim());
    if (!isTikTok) {
      setNotice("Please paste a valid TikTok video link.");
      return;
    }
    setLoading(true);
    setNotice("Finding the best available versions…");
    try {
      const response = await fetch("/api/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "We could not process that video.");
      setVideo(payload);
      setNotice("");
      setTimeout(() => document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Zavera home"><Brand /></a>
        <nav aria-label="Main navigation"><a href="#how">How it works</a><a href="#faq">FAQ</a></nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
        <div className="shell hero-inner">
          <div className="eyebrow"><span>●</span> FAST · FREE · NO SIGN-UP</div>
          <h1>TikTok video downloader<br /><em>fast &amp; free.</em></h1>
          <p className="hero-copy">Download TikTok videos online in high-quality MP4 or save available audio as MP3. No app, account, or installation required.</p>

          <form className="download-card" id="download" onSubmit={submit} noValidate>
            <label htmlFor="tiktok-url">Paste your TikTok link</label>
            <div className="input-row">
              <div className="url-field"><span aria-hidden="true">↗</span><input id="tiktok-url" type="url" value={url} onChange={(event) => { setUrl(event.target.value); setNotice(""); }} placeholder="https://www.tiktok.com/@creator/video/..." autoComplete="url" /></div>
              <button type="submit" disabled={loading}>{loading ? "Finding…" : "Find video"} <span aria-hidden="true">↓</span></button>
            </div>
            <div className="form-meta"><span>✓ High-quality MP4</span><span>✓ No account needed</span><span>✓ Links are not stored</span></div>
            {notice && <p className="notice" role="status">{notice}</p>}
          </form>
          <p className="legal-line">Zavera processes public links only. Respect creators and copyright.</p>
        </div>
      </section>

      <AdSlot placement="after-hero" format="horizontal" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP} />

      {video && (
        <section className="result shell" id="result" aria-live="polite">
          <img className="result-cover" src={video.cover} alt={`Cover for ${video.title}`} />
          <div className="result-copy"><span className="result-ready">✓ VIDEO READY</span><h2>{video.title || "TikTok video"}</h2><p>@{video.author.username} · {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}</p></div>
          <div className="result-actions">
            {video.downloads.hd && <a className="download-primary" href={fileLink(video.downloads.hd, `zavera-${video.id}-hd`, "video")}>Download HD <span>↓</span></a>}
            <a href={fileLink(video.downloads.standard, `zavera-${video.id}`, "video")}>Standard MP4 <span>↓</span></a>
            {video.downloads.audio && <a href={fileLink(video.downloads.audio, `zavera-${video.id}`, "audio")} download={`zavera-${video.id}.mp3`}>Audio MP3 <span>↓</span></a>}
          </div>
        </section>
      )}

      <AdSlot placement="after-result" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT} />

      <section className="how shell" id="how">
        <div className="section-heading"><span className="kicker">THREE EASY STEPS</span><h2>From TikTok to your camera roll.</h2><p>No apps to install. No confusing menus. Just paste, tap, and save.</p></div>
        <div className="steps">{steps.map(([number, title, body]) => <article className="step" key={number}><span className="step-number">{number}</span><div className="step-icon" aria-hidden="true">{number === "01" ? "⌁" : number === "02" ? "↗" : "↓"}</div><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <AdSlot placement="between-sections" format="horizontal" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE} />

      <section className="features"><div className="shell feature-grid"><div><span>◈</span><h3>Quality stays crisp</h3><p>Get the best available version of your authorized video.</p></div><div><span>⌁</span><h3>Works everywhere</h3><p>Phone, tablet, or desktop—nothing extra to install.</p></div><div><span>◎</span><h3>Your links stay private</h3><p>We don’t keep a history of the links you submit.</p></div></div></section>

      <section className="seo-copy shell" aria-labelledby="about-zavera">
        <div>
          <span className="kicker">ONLINE TIKTOK DOWNLOADER</span>
          <h2 id="about-zavera">Download TikTok videos with Zavera</h2>
        </div>
        <div className="seo-columns">
          <p>Zavera is a browser-based TikTok video downloader built for quick, straightforward saving. Paste a public TikTok video link and choose the best available format: HD MP4, standard MP4, or MP3 audio. There is no software to install and no Zavera account to create.</p>
          <p>The downloader works on Android phones, iPhones, tablets, Windows PCs, Macs, and other devices with a modern browser. Zavera processes the link when you request a download and does not keep a download history. Only save videos you created or have permission to use.</p>
        </div>
      </section>

      <section className="faq shell" id="faq">
        <span className="kicker">GOOD TO KNOW</span><h2>Questions, answered.</h2>
        <details><summary>Can I download any TikTok video?<b>+</b></summary><p>Zavera handles public links. Only download videos you created or have clear permission to use. Private and unavailable videos cannot be processed.</p></details>
        <details><summary>Does Zavera provide videos without a watermark?<b>+</b></summary><p>When an authorized clean version is available, Zavera offers it. You remain responsible for respecting the creator’s rights and attribution requirements.</p></details>
        <details><summary>Do you store my links or videos?<b>+</b></summary><p>No download history is kept. Links are processed only long enough to prepare the available download options.</p></details>
        <details><summary>Can I download TikTok videos on iPhone or Android?<b>+</b></summary><p>Yes. Zavera runs in your mobile browser, so no separate downloader app is needed. Paste the public TikTok link, prepare the video, and choose an available format.</p></details>
        <details><summary>Can Zavera save TikTok audio as MP3?<b>+</b></summary><p>Yes, when an audio track is available for the public video, the results include an Audio MP3 download option.</p></details>
      </section>

      <AdSlot placement="before-footer" format="horizontal" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM} />

      <footer><div className="shell footer-inner"><a className="brand" href="#top"><Brand /></a><p>Download responsibly. Respect creators.</p><div><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/copyright">Copyright</a></div></div></footer>
    </main>
  );
}
