"use client";

import { FormEvent, useState } from "react";

const steps = [
  ["01", "Copy the link", "Open TikTok, tap Share, then copy the video link."],
  ["02", "Paste it here", "Drop the link into the box above and tap Download."],
  ["03", "Save your video", "Choose your available format and save it to your device."],
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [notice, setNotice] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const isTikTok = /^https?:\/\/(www\.|vm\.|vt\.)?tiktok\.com\//i.test(url.trim());
    if (!isTikTok) {
      setNotice("Please paste a valid TikTok video link.");
      return;
    }
    setNotice("This demo is ready for an authorized video-processing provider. Your link was not stored.");
  }

  return (
    <main>
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="ClipDrop home">
          <span className="brand-mark">↓</span>
          <span>ClipDrop</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="nav-cta" href="#download">Download now</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="shell hero-inner">
          <div className="eyebrow"><span>●</span> FAST · FREE · NO SIGN-UP</div>
          <h1>Save the videos<br />you <em>love.</em></h1>
          <p className="hero-copy">Download your own or authorized TikTok videos in high quality. Simple, quick, and made for every device.</p>

          <form className="download-card" id="download" onSubmit={submit} noValidate>
            <label htmlFor="tiktok-url">Paste your TikTok link</label>
            <div className="input-row">
              <div className="url-field">
                <span aria-hidden="true">↗</span>
                <input
                  id="tiktok-url"
                  type="url"
                  value={url}
                  onChange={(event) => { setUrl(event.target.value); setNotice(""); }}
                  placeholder="https://www.tiktok.com/@creator/video/..."
                  autoComplete="url"
                />
              </div>
              <button type="submit">Download <span aria-hidden="true">↓</span></button>
            </div>
            <div className="form-meta">
              <span>✓ High-quality MP4</span><span>✓ No account needed</span><span>✓ Private by design</span>
            </div>
            {notice && <p className="notice" role="status">{notice}</p>}
          </form>

          <p className="legal-line">By using ClipDrop, you confirm you own the video or have permission to download it.</p>
        </div>
      </section>

      <aside className="ad-slot shell" aria-label="Advertisement">
        <span>ADVERTISEMENT</span>
        <p>Your ad could be here</p>
      </aside>

      <section className="how shell" id="how">
        <div className="section-heading">
          <span className="kicker">THREE EASY STEPS</span>
          <h2>From TikTok to your camera roll.</h2>
          <p>No apps to install. No confusing menus. Just paste, tap, and save.</p>
        </div>
        <div className="steps">
          {steps.map(([number, title, body]) => (
            <article className="step" key={number}>
              <span className="step-number">{number}</span>
              <div className="step-icon" aria-hidden="true">{number === "01" ? "⌁" : number === "02" ? "↗" : "↓"}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="features">
        <div className="shell feature-grid">
          <div><span>◈</span><h3>Quality stays crisp</h3><p>Get the best available version of your authorized video.</p></div>
          <div><span>⌁</span><h3>Works everywhere</h3><p>Phone, tablet, or desktop—nothing extra to install.</p></div>
          <div><span>◎</span><h3>Your links stay private</h3><p>We don’t keep a history of the links you submit.</p></div>
        </div>
      </section>

      <section className="faq shell" id="faq">
        <span className="kicker">GOOD TO KNOW</span>
        <h2>Questions, answered.</h2>
        <details><summary>Can I download any TikTok video?<b>+</b></summary><p>Only download videos you created or have clear permission to use. Private, restricted, or rights-protected videos may not be available.</p></details>
        <details><summary>Does ClipDrop remove watermarks?<b>+</b></summary><p>Where an authorized source provides a clean original, ClipDrop can offer it. We do not alter or disguise ownership marks without the rights holder’s permission.</p></details>
        <details><summary>Do you store my links or videos?<b>+</b></summary><p>No download history is kept. A production processing partner should also be configured to delete temporary files promptly.</p></details>
      </section>

      <footer>
        <div className="shell footer-inner">
          <a className="brand" href="#top"><span className="brand-mark">↓</span><span>ClipDrop</span></a>
          <p>Download responsibly. Respect creators.</p>
          <div><a href="#faq">Terms</a><a href="#faq">Privacy</a><a href="#faq">Copyright</a></div>
        </div>
      </footer>
    </main>
  );
}
