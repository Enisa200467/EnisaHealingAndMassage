export default defineEventHandler(async (event) => {
  const baseUrl = 'https://enisahealingmassage.nl';
  const currentDate = new Date().toISOString().split('T')[0];

  // Define static pages with last modified dates and metadata
  const staticPages = [
    {
      url: '/',
      priority: '1.0',
      changefreq: 'weekly',
      lastmod: currentDate,
      title: 'Enisa Healing & Massage - Helende Massages & Ontspanning',
      description:
        'Ervaar diepe ontspanning en heling met persoonlijke massages en behandelingen door Enisa.',
    },
    {
      url: '/over-mij',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: '2024-11-15',
      title: 'Over Mij - Enisa Healing & Massage',
      description:
        'Leer meer over Enisa, gecertificeerd massagetherapeut en healing practitioner.',
    },
    {
      url: '/boeken',
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: currentDate,
      title: 'Boek Een Afspraak - Enisa Healing & Massage',
      description:
        'Boek eenvoudig online een afspraak voor een healing of massage behandeling.',
    },
    {
      url: '/contact',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: '2024-11-15',
      title: 'Contact - Enisa Healing & Massage',
      description:
        'Neem contact op voor vragen of het boeken van een afspraak.',
    },
    {
      url: '/tarieven',
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: '2024-11-20',
      title: 'Tarieven - Enisa Healing & Massage',
      description: 'Overzicht van alle behandelingen en bijbehorende tarieven.',
    },
    {
      url: '/reviews',
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: currentDate,
      title: 'Klantbeoordelingen - Enisa Healing & Massage',
      description:
        'Lees wat klanten zeggen over hun ervaring met onze behandelingen.',
    },
    {
      url: '/faq',
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: '2024-11-15',
      title: 'Veelgestelde Vragen - Enisa Healing & Massage',
      description:
        'Vind antwoorden op veelgestelde vragen over behandelingen en boekingen.',
    },
  ];

  // Define treatment pages with enhanced metadata
  const treatmentPages = [
    {
      url: '/behandelingen/energetische-healing-sessie',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: '2024-11-25',
      title: 'Energetische Healing Sessie - Enisa Healing & Massage',
      description:
        'Herstel de natuurlijke energiestroom in je lichaam met een intuïtieve energetische healing.',
    },
    {
      url: '/behandelingen/chakra-healing',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: '2024-11-25',
      title: 'Chakra Healing - Enisa Healing & Massage',
      description:
        'Breng je chakras in balans en herstel de energiestroom door je lichaam.',
    },
    {
      url: '/behandelingen/healing-op-afstand',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: '2025-06-02',
      title: 'Healing op Afstand - Enisa Healing & Massage',
      description:
        'Ontvang krachtige energetische healing vanuit je eigen vertrouwde omgeving. Effectieve behandeling op afstand.',
    },
    {
      url: '/behandelingen/klassieke-ontspanningsmassage',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: '2024-11-25',
      title: 'Klassieke Ontspanningsmassage - Enisa Healing & Massage',
      description:
        'Een traditionele ontspanningsmassage voor diepe relaxatie en stressvermindering.',
    },
    {
      url: '/behandelingen/zweedse-massage',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: '2024-11-25',
      title: 'Zweedse Massage - Enisa Healing & Massage',
      description:
        'Klassieke Zweedse massagetechnieken voor spierontspanning en verbeterde circulatie.',
    },
    {
      url: '/behandelingen/sportmassage',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: '2024-11-25',
      title: 'Sportmassage - Enisa Healing & Massage',
      description:
        'Gespecialiseerde massage voor sporters ter voorkoming en behandeling van blessures.',
    },
    {
      url: '/behandelingen/intuitieve-lichaamsmassage',
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: '2024-11-25',
      title: 'Intuïtieve Lichaamsmassage - Enisa Healing & Massage',
      description:
        'Een persoonlijke, intuïtieve massage afgestemd op de unieke behoeften van je lichaam.',
    },
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
  </url>`
  )
  .join('\n')}
</urlset>`;

  setHeader(event, 'Content-Type', 'application/xml');
  setHeader(event, 'Cache-Control', 's-maxage=86400'); // Cache for 1 day

  return sitemap;
});
