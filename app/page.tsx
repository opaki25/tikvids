"use client";

import { FormEvent, useState } from "react";

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
  const [authorized, setAuthorized] = useState(false);
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
    if (!authorized) {
      setNotice("Please confirm that you own the video or have permission to download it.");
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
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Zavera home"><Brand /></a>
        <nav aria-label="Main navigation"><a href="#how">How it works</a><a href="#faq">FAQ</a></nav>
        <a className="nav-cta" href="#download">Download now</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
        <div className="shell hero-inner">
          <div className="eyebrow"><span>●</span> FAST · FREE · NO SIGN-UP</div>
          <h1>Save the videos<br />you <em>love.</em></h1>
          <p className="hero-copy">Download your own or authorized TikTok videos in high quality. Simple, quick, and made for every device.</p>

          <form className="download-card" id="download" onSubmit={submit} noValidate>
            <label htmlFor="tiktok-url">Paste your TikTok link</label>
            <div className="input-row">
              <div className="url-field"><span aria-hidden="true">↗</span><input id="tiktok-url" type="url" value={url} onChange={(event) => { setUrl(event.target.value); setNotice(""); }} placeholder="https://www.tiktok.com/@creator/video/..." autoComplete="url" /></div>
              <button type="submit" disabled={loading}>{loading ? "Finding…" : "Find video"} <span aria-hidden="true">↓</span></button>
            </div>
            <label className="permission-check"><input type="checkbox" checked={authorized} onChange={(event) => setAuthorized(event.target.checked)} /><span>I own this video or have the creator’s permission to download it.</span></label>
            <div className="form-meta"><span>✓ High-quality MP4</span><span>✓ No account needed</span><span>✓ Links are not stored</span></div>
            {notice && <p className="notice" role="status">{notice}</p>}
          </form>
          <p className="legal-line">Zavera processes public links only. Respect creators and copyright.</p>
        </div>
      </section>

      {video && (
        <section className="result shell" id="result" aria-live="polite">
          <img className="result-cover" src={video.cover} alt={`Cover for ${video.title}`} />
          <div className="result-copy"><span className="result-ready">✓ VIDEO READY</span><h2>{video.title || "TikTok video"}</h2><p>@{video.author.username} · {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}</p></div>
          <div className="result-actions">
            {video.downloads.hd && <a className="download-primary" href={fileLink(video.downloads.hd, `zavera-${video.id}-hd`, "video")}>Download HD <span>↓</span></a>}
            <a href={fileLink(video.downloads.standard, `zavera-${video.id}`, "video")}>Standard MP4 <span>↓</span></a>
            {video.downloads.audio && <a href={fileLink(video.downloads.audio, `zavera-${video.id}`, "audio")}>Audio MP3 <span>↓</span></a>}
          </div>
        </section>
      )}

      <aside className="ad-slot shell" aria-label="Advertisement"><span>ADVERTISEMENT</span><p>Your ad could be here</p></aside>

      <section className="how shell" id="how">
        <div className="section-heading"><span className="kicker">THREE EASY STEPS</span><h2>From TikTok to your camera roll.</h2><p>No apps to install. No confusing menus. Just paste, tap, and save.</p></div>
        <div className="steps">{steps.map(([number, title, body]) => <article className="step" key={number}><span className="step-number">{number}</span><div className="step-icon" aria-hidden="true">{number === "01" ? "⌁" : number === "02" ? "↗" : "↓"}</div><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="features"><div className="shell feature-grid"><div><span>◈</span><h3>Quality stays crisp</h3><p>Get the best available version of your authorized video.</p></div><div><span>⌁</span><h3>Works everywhere</h3><p>Phone, tablet, or desktop—nothing extra to install.</p></div><div><span>◎</span><h3>Your links stay private</h3><p>We don’t keep a history of the links you submit.</p></div></div></section>

      <section className="faq shell" id="faq">
        <span className="kicker">GOOD TO KNOW</span><h2>Questions, answered.</h2>
        <details><summary>Can I download any TikTok video?<b>+</b></summary><p>Zavera handles public links. Only download videos you created or have clear permission to use. Private and unavailable videos cannot be processed.</p></details>
        <details><summary>Does Zavera provide videos without a watermark?<b>+</b></summary><p>When an authorized clean version is available, Zavera offers it. You remain responsible for respecting the creator’s rights and attribution requirements.</p></details>
        <details><summary>Do you store my links or videos?<b>+</b></summary><p>No download history is kept. Links are processed only long enough to prepare the available download options.</p></details>
      </section>

      <footer><div className="shell footer-inner"><a className="brand" href="#top"><Brand /></a><p>Download responsibly. Respect creators.</p><div><a href="#faq">Terms</a><a href="#faq">Privacy</a><a href="#faq">Copyright</a></div></div></footer>
    </main>
  );
}
