---
description: Convert old website treatment content to new format (database + markdown)
---

# Behandeling Conversie

Ik ga de oude behandeling content converteren naar het nieuwe systeem. Dit bestaat uit twee stappen:

## Stap 1: Database Entry

Ik zal eerst een database entry aanmaken met de behandelingsinformatie (naam, prijs, duur, etc.) en het UUID ontvangen.

## Stap 2: Markdown Content

Vervolgens maak ik een markdown bestand in `/content/behandelingen/[slug].md` volgens het exacte template van `chakra-balancering.md`:

**Structuur:**
1. Frontmatter met `title`
2. `::behandeling-hero{#uuid}` - met database UUID
3. `::behandeling-sectie` - wat te verwachten met afbeelding
4. `::twee-kolommen` met:
   - `:::voordelen-lijst` (3 dubbele punten!)
   - `:::voor-wie` (3 dubbele punten!)
5. `::uitklap-info` - uitgebreide informatie

**Belangrijke details:**
- Database UUID is verplicht in hero component: `{#uuid}`
- Geneste componenten gebruiken `:::` (3 dubbele punten)
- Prijs altijd in centen (€85 = 8500)
- Afbeeldingen met leading slash: `/images/...`
- Slug moet exact overeenkomen tussen database en bestandsnaam

**Volledige instructies:** `.claude/prompts/convert-treatment-content.md`

---

**Klaar om te beginnen? Deel de oude behandeling content en ik zal:**
1. De database entry aanmaken (via API)
2. Het markdown bestand schrijven
3. Een checklist geven van wat nog nodig is (afbeeldingen, etc.)
