import {
  SITE_DEFAULT_DESCRIPTION,
  SKOOL_URL,
  SOCIAL_LINKS,
  getSiteUrl,
} from "@/lib/site-links";

export function JsonLd() {
  const base = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: "DobotAI",
        url: base,
        logo: `${base}/brand/logo.avif`,
        sameAs: [
          SOCIAL_LINKS.linkedin,
          SOCIAL_LINKS.youtube,
          SOCIAL_LINKS.x,
          SKOOL_URL,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: "DobotAI",
        url: base,
        description: SITE_DEFAULT_DESCRIPTION,
        publisher: { "@id": `${base}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted static content from our own constants
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
