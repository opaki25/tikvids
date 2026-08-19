import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Copyright Policy", description: "Zavera’s copyright policy and responsible downloading requirements.", alternates: { canonical: "/copyright" } };

export default function CopyrightPage() {
  return <InfoPage eyebrow="LEGAL" title="Copyright Policy">
    <h2>Respect creators</h2><p>Zavera is designed for downloading content you created or are otherwise authorized to use. The availability of a public link does not by itself grant permission to copy, publish, monetize, or redistribute the content.</p>
    <h2>No hosted catalogue</h2><p>Zavera does not operate a searchable catalogue of TikTok videos and does not claim ownership of content processed from submitted links.</p>
    <h2>Rights-holder concerns</h2><p>Rights holders should identify the protected work, the relevant source URL, the claimed infringement, and evidence of authority when submitting a copyright concern through Zavera’s published support channel.</p>
    <h2>Repeat misuse</h2><p>Zavera may restrict access, block abusive requests, or take other appropriate action when credible evidence shows repeated misuse of the service.</p>
  </InfoPage>;
}
