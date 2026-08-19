import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Privacy Policy", description: "Learn how Zavera handles submitted links, technical data, cookies, and advertising information.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <InfoPage eyebrow="LEGAL" title="Privacy Policy">
    <h2>Information Zavera processes</h2><p>When you submit a public TikTok link, Zavera processes that URL long enough to retrieve the available download options. Zavera does not require an account and does not maintain a personal download history.</p>
    <h2>Technical information</h2><p>Our hosting and security providers may process ordinary technical data such as IP address, browser type, request time, requested pages, and diagnostic logs to deliver and protect the service.</p>
    <h2>Advertising and cookies</h2><p>If advertising is enabled, advertising partners such as Google may use cookies or similar technologies to deliver, measure, and personalize ads where permitted. Consent choices may be presented when required by applicable law.</p>
    <h2>Third-party services</h2><p>Zavera relies on hosting, media-processing, analytics, security, and advertising providers. Those providers process information under their own terms and privacy policies.</p>
    <h2>Your choices</h2><p>You can avoid submitting links, use browser controls to manage cookies, and use any consent controls displayed on the site. This policy may be updated as Zavera’s services and legal obligations evolve.</p>
  </InfoPage>;
}
