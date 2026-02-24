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

  // Define treatment pages with enhanced metadata
  // Only include treatments that have corresponding markdown files in /content/behandelingen/
  const treatmentPages = [
    {
      url: "/behandelingen/anti-stress",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: "2024-11-25",
      title: "Anti Stress - Enisa Healing & Massage",
      description:
        "Je kunt na deze sessies je leven weer oppakken en met een frisse blik verder gaan.",
    },
    {
      url: "/behandelingen/chakra-healing",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: "2024-11-25",
      title: "Chakra Healing - Enisa Healing & Massage",
      description:
        "Breng je chakras in balans en herstel de energiestroom door je lichaam.",
    },
    {
      url: "/behandelingen/hypnotherapie",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: "2024-11-25",
      title: "Hypnotherapie - Enisa Healing & Massage",
      description:
        "Combinatie van hypnotherapie en energetische healing in Amsterdam Noord voor duurzame verandering op mentaal, emotioneel en energetisch niveau",
    },
    // TODO: Add more treatments when markdown files are created:
  ];

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
