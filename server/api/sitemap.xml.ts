import type { H3Event } from "h3";
import { queryCollection } from "@nuxt/content/server";
import { BUSINESS_INFO } from "../../app/constants/businessInfo";

interface SitemapPage {
  url: string;
  lastmod?: string;
}

const STATIC_PAGES: SitemapPage[] = [
  { url: "/" },
  { url: "/behandelingen" },
  { url: "/over-mij" },
  { url: "/contact" },
  { url: "/tarieven" },
  { url: "/reviews" },
  { url: "/faq" },
];

export default defineEventHandler(async (event) => {
  const treatmentPages = await loadTreatmentPages(event);
  const pages = [...STATIC_PAGES, ...treatmentPages].filter(
    (page, index, allPages) =>
      allPages.findIndex((candidate) => candidate.url === page.url) === index,
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(createUrlEntry).join("\n")}
</urlset>`;

  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  setHeader(
    event,
    "Cache-Control",
    "s-maxage=86400, stale-while-revalidate=3600",
  );

  return sitemap;
});

const loadTreatmentPages = async (event: H3Event): Promise<SitemapPage[]> => {
  try {
    const docs = await queryCollection(event, "behandelingen").all();

    return docs
      .flatMap((doc) => {
        if (!isCanonicalTreatmentPath(doc.path)) return [];

        const meta =
          doc.meta && typeof doc.meta === "object"
            ? (doc.meta as Record<string, unknown>)
            : {};
        const lastmod = toDateString(
          meta.updatedAt ?? meta.modifiedAt ?? meta.date,
        );

        return [{ url: doc.path, ...(lastmod && { lastmod }) }];
      })
      .sort((a, b) => a.url.localeCompare(b.url));
  } catch {
    return [];
  }
};

const isCanonicalTreatmentPath = (path: unknown): path is string =>
  typeof path === "string" && /^\/behandelingen\/[^/?#]+$/.test(path);

const createUrlEntry = (page: SitemapPage) => {
  const location = new URL(page.url, `${BUSINESS_INFO.url}/`).toString();
  const lastmod = page.lastmod
    ? `\n    <lastmod>${page.lastmod}</lastmod>`
    : "";

  return `  <url>
    <loc>${escapeXml(location)}</loc>${lastmod}
  </url>`;
};

const toDateString = (value: unknown) => {
  if (!value) return undefined;

  const date = new Date(
    value instanceof Date ? value.toISOString() : String(value),
  );
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString().split("T")[0];
};

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };

    return entities[character] || character;
  });
