import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Terms of Use", description: "Read the terms governing use of the Zavera TikTok video downloader.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <InfoPage eyebrow="LEGAL" title="Terms of Use">
    <h2>Using Zavera</h2><p>Zavera provides tools that process publicly accessible links. You may use the service only for lawful purposes and in accordance with these terms and applicable platform rules.</p>
    <h2>Your responsibility</h2><p>Only download, copy, or reuse content that you created, that is in the public domain, or that you have permission or another lawful basis to use. You are responsible for copyright, privacy, publicity, and other rights affected by your activity.</p>
    <h2>Prohibited activity</h2><p>Do not use Zavera to access private or restricted content, bypass access controls, distribute malware, overload the service, automate abusive requests, or infringe the rights of creators or other parties.</p>
    <h2>Availability</h2><p>The service is provided as available. A source video or format may become unavailable, and Zavera may change, limit, or discontinue features to maintain reliability, security, or legal compliance.</p>
    <h2>Disclaimer</h2><p>Zavera is an independent service and is not affiliated with, endorsed by, or sponsored by TikTok. TikTok is a trademark of its respective owner.</p>
  </InfoPage>;
}
