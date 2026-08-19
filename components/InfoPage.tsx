import Link from "next/link";

export default function InfoPage({ eyebrow, title, updated = "August 19, 2026", children }: { eyebrow: string; title: string; updated?: string; children: React.ReactNode }) {
  return (
    <main className="info-page">
      <header className="nav shell info-nav">
        <Link className="brand" href="/" aria-label="Zavera home"><span className="brand-lockup"><img src="/zavera-icon.png" alt="" /><span>zavera</span></span></Link>
        <Link href="/">TikTok downloader</Link>
      </header>
      <article className="info-article shell">
        <span className="kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="info-updated">Last updated: {updated}</p>
        <div className="info-body">{children}</div>
      </article>
      <footer><div className="shell footer-inner"><Link className="brand" href="/"><span className="brand-lockup"><img src="/zavera-icon.png" alt="" /><span>zavera</span></span></Link><p>Download responsibly. Respect creators.</p><div><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/copyright">Copyright</Link></div></div></footer>
    </main>
  );
}
