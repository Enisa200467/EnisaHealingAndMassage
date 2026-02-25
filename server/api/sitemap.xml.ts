import type { H3Event } from "h3";
import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const baseUrl = "https://enisahealingenmassage.nl";
  const currentDate = new Date().toISOString().split("T")[0];

  // Define static pages with last modified dates and metadata
  const staticPages = [
    {
      url: "/",
      priority: "1.0",
      changefreq: "weekly",
      lastmod: currentDate,
      title: "Enisa Healing & Massage - Helende Massages & Ontspanning",
      description:
        "Ervaar diepe ontspanning en heling met persoonlijke massages en behandelingen door Enisa.",
    },
    {
      url: "/over-mij",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: "2024-11-15",
      title: "Over Mij - Enisa Healing & Massage",
      description:
        "Leer meer over Enisa, gecertificeerd massagetherapeut en healing practitioner.",
    },
    {
      url: "/contact",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: "2024-11-15",
      title: "Contact - Enisa Healing & Massage",
      description:
        "Neem contact op voor vragen of het boeken van een afspraak.",
    },
    {
      url: "/tarieven",
      priority: "0.7",
      changefreq: "monthly",
      lastmod: "2024-11-20",
      title: "Tarieven - Enisa Healing & Massage",
      description: "Overzicht van alle behandelingen en bijbehorende tarieven.",
    },
    {
      url: "/reviews",
      priority: "0.7",
      changefreq: "weekly",
      lastmod: currentDate,
      title: "Klantbeoordelingen - Enisa Healing & Massage",
      description:
        "Lees wat klanten zeggen over hun ervaring met onze behandelingen.",
    },
    {
      url: "/faq",
      priority: "0.6",
      changefreq: "monthly",
      lastmod: "2024-11-15",
      title: "Veelgestelde Vragen - Enisa Healing & Massage",
      description:
        "Vind antwoorden op veelgestelde vragen over behandelingen en boekingen.",
    },
  ];

  // Define treatment pages based on markdown files in /content/behandelingen/
  const treatmentPages = await loadTreatmentPages(event, currentDate);

  const allPages = [...staticPages, ...treatmentPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  setHeader(event, "Content-Type", "application/xml");
  setHeader(event, "Cache-Control", "s-maxage=86400"); // Cache for 1 day

  return sitemap;
});

const loadTreatmentPages = async (event: H3Event, fallbackDate: string) => {
  try {
    const docs = await queryCollection(event, "behandelingen").all();
    const pages = docs
      .map((doc) => {
        const path = "path" in doc && typeof doc.path === "string" ? doc.path : null;
        if (!path) {
          return null;
        }

        const meta = doc as unknown as Record<string, unknown>;
        const lastmodValue =
          meta.updatedAt ??
          meta._updatedAt ??
          meta.modifiedAt ??
          meta.date ??
          meta._date;
        const lastmod = toDateString(lastmodValue, fallbackDate);

        return {
          url: path,
          priority: "0.8",
          changefreq: "monthly",
          lastmod,
        };
      })
      .filter((page): page is { url: string; priority: string; changefreq: string; lastmod: string } =>
        Boolean(page),
      )
      .sort((a, b) => a.url.localeCompare(b.url));

    return pages;
  } catch {
    return [];
  }
};

const toDateString = (value: unknown, fallbackDate: string) => {
  if (!value) {
    return fallbackDate;
  }

  const date = new Date(value instanceof Date ? value.toISOString() : String(value));
  if (Number.isNaN(date.getTime())) {
    return fallbackDate;
  }

  return date.toISOString().split("T")[0];
};
