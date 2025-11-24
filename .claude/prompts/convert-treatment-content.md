# Behandeling Content Conversie Prompt

Deze prompt helpt bij het converteren van behandelingen van de oude website naar het nieuwe format.

## Instructies voor Claude

Je taak is om content van de oude website te converteren naar het nieuwe behandelingen-systeem. Dit bestaat uit **twee stappen**:

### Stap 1: Database Entry Aanmaken

Maak eerst een database entry aan via de API. Extract de volgende informatie uit de content:

**Vereiste velden:**
- `name`: De naam van de behandeling (bijv. "Chakra Balancering")
- `description`: Korte beschrijving voor overzichtspagina's (1-2 zinnen)
- `duration_minutes`: Duur in minuten (bijv. 75)
- `price_cents`: Prijs in centen (bijv. 8500 voor €85)
- `category`: "healing" of "massage"
- `intensity`: Getal 1-5 (1=Zeer Zacht, 5=Zeer Stevig)
- `intensity_label`: Beschrijvende tekst (bijv. "Zeer Zacht (Energetisch werk)")
- `icon`: Icon naam uit Iconify (bijv. "i-mdi-weather-sunny")
- `display_order`: Volgorde op de website (oplopend nummer)
- `is_active`: true

**Optionele velden:**
- `discount_enabled`: Boolean voor kortingsactie
- `discount_price_cents`: Kortingsprijs in centen
- `package_enabled`: Boolean voor pakketaanbieding
- `package_sessions`: Aantal sessies in pakket
- `package_price_cents`: Pakketprijs in centen

**Maak de database entry:**
```bash
curl -X POST http://localhost:3000/api/admin/treatments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Behandeling Naam",
    "description": "Korte beschrijving hier",
    "duration_minutes": 75,
    "price_cents": 8500,
    "category": "healing",
    "intensity": 1,
    "intensity_label": "Zeer Zacht (Energetisch werk)",
    "icon": "i-mdi-weather-sunny",
    "display_order": 10,
    "is_active": true
  }'
```

**BELANGRIJK:** Onthoud het `id` (UUID) dat wordt teruggegeven - je hebt dit nodig voor stap 2!

### Stap 2: Markdown Content Bestand Aanmaken

Maak een nieuw markdown bestand aan in `/content/behandelingen/[slug].md` waarbij `[slug]` de slug is die in stap 1 werd gegenereerd.

**Volg dit exacte template** (gebaseerd op `chakra-balancering.md`):

```markdown
---
title: [Behandeling Naam]
---

::behandeling-hero{#[DATABASE-UUID-HIER]}
::

::behandeling-sectie
---
items:
  - "[Eerste stap van de behandeling]"
  - "[Tweede stap van de behandeling]"
  - "[Derde stap van de behandeling]"
  - "[Vierde stap indien van toepassing]"
image: /images/[behandeling-afbeelding].webp
imageAlt: Beschrijvende alt-tekst voor de afbeelding
title: Wat kun je verwachten?
---
[Uitgebreide beschrijving van wat de cliënt kan verwachten tijdens de behandeling. 2-3 zinnen.]
::

::twee-kolommen
  :::voordelen-lijst
  ---
  items:
    - [Voordeel 1]
    - [Voordeel 2]
    - [Voordeel 3]
    - [Voordeel 4]
    - [Voordeel 5]
  title: Belangrijkste Voordelen
  ---
  :::

  :::voor-wie
  ---
  items:
    - [Doelgroep kenmerk 1]
    - [Doelgroep kenmerk 2]
    - [Doelgroep kenmerk 3]
    - [Doelgroep kenmerk 4]
    - [Doelgroep kenmerk 5]
  title: Voor Wie?
  ---
  :::
::

::uitklap-info{title="Meer informatie"}
### [Relevante Subtitel]

[Uitgebreide informatie die standaard is ingeklapt. Je kunt hier markdown gebruiken met koppen, lijsten, vet gedrukte tekst, etc.]

### [Nog een subtitel]

[Meer informatie...]

### Belangrijk om te Weten

- Punt 1
- Punt 2
- Punt 3
::
```

## Component Referentie

### 1. `::behandeling-hero`

**Doel:** Toont header met titel, prijs, duur, icon (haalt data op uit database)

**Syntax:**
```markdown
::behandeling-hero{#[DATABASE-UUID]}
::
```

**BELANGRIJK:**
- Het `#[DATABASE-UUID]` is verplicht en moet exact overeenkomen met het UUID uit de database!
- Gebruik de `id` property syntax: `{#uuid-hier}`
- Alle andere data (titel, prijs, duur, icon) wordt automatisch uit de database gehaald

### 2. `::behandeling-sectie`

**Doel:** Sectie met afbeelding en bullet points van verwachtingen

**Velden:**
- `title`: Sectie titel (meestal "Wat kun je verwachten?")
- `image`: Pad naar afbeelding in `/public/images/`
- `imageAlt`: Alt-tekst voor toegankelijkheid
- `items`: Array van strings met stappen/verwachtingen

**Tussen de `---` markeringen komt de beschrijvende tekst**

### 3. `::twee-kolommen` met geneste componenten

**Doel:** Container voor twee kolommen (voordelen en doelgroep)

**BELANGRIJK:** Geneste componenten gebruiken `:::` (drie dubbele punten)!

#### `:::voordelen-lijst`
- `title`: Meestal "Belangrijkste Voordelen"
- `items`: Array van voordelen (5-7 punten)

#### `:::voor-wie`
- `title`: Meestal "Voor Wie?" of "Geschikt voor jou als je"
- `items`: Array van doelgroep kenmerken (5-7 punten)

### 4. `::uitklap-info`

**Doel:** Inklapbare sectie met uitgebreide informatie

**Velden:**
- `title`: Titel die altijd zichtbaar is

**Inhoud tussen de markers kan markdown bevatten:**
- Koppen (`###`, `####`)
- Lijsten (`-`, `1.`)
- **Vet** en *cursief*
- Meerdere paragrafen

## Afbeeldingen

**Locatie:** `/public/images/`

**Formaat:** WebP voor beste prestaties

**Naamgeving:** Gebruik beschrijvende namen in kebab-case:
- `chakra-healing.webp`
- `klassieke-massage.webp`
- `energetische-healing.webp`

**Aanbevolen afmetingen:**
- Hero afbeeldingen: 1200x800px
- Sectie afbeeldingen: 600x400px

**Alt-teksten:** Altijd beschrijvend en compleet (voor SEO en toegankelijkheid)

## Checklist voor Conversie

Bij het converteren van oude content naar nieuw formaat:

- [ ] Database entry aangemaakt via API
- [ ] UUID ontvangen en genoteerd
- [ ] Slug bepaald (automatisch gegenereerd of handmatig)
- [ ] Markdown bestand aangemaakt in `/content/behandelingen/[slug].md`
- [ ] Frontmatter `title` correct ingevuld
- [ ] `::behandeling-hero{#uuid}` met correcte UUID
- [ ] `::behandeling-sectie` met relevante stappen en afbeelding
- [ ] `::twee-kolommen` met `:::voordelen-lijst` en `:::voor-wie`
- [ ] `::uitklap-info` met uitgebreide informatie
- [ ] Alle afbeeldingen aanwezig in `/public/images/`
- [ ] Alt-teksten beschrijvend en compleet
- [ ] Markdown syntax correct (let op aantal dubbele punten!)
- [ ] Preview pagina op `http://localhost:3000/behandelingen/[slug]`

## Veelvoorkomende Fouten

### ❌ Fout: Verkeerd aantal dubbele punten
```markdown
::voordelen-lijst  <!-- FOUT: moet ::: zijn in twee-kolommen -->
```

### ✅ Correct:
```markdown
::twee-kolommen
  :::voordelen-lijst  <!-- CORRECT: 3 dubbele punten voor geneste componenten -->
```

### ❌ Fout: UUID syntax
```markdown
::behandeling-hero
---
id: 75be22cd-31df-48bd-bd9f-337360edb2c4  <!-- FOUT: oude syntax -->
---
::
```

### ✅ Correct:
```markdown
::behandeling-hero{#75be22cd-31df-48bd-bd9f-337360edb2c4}  <!-- CORRECT: property syntax -->
::
```

### ❌ Fout: Prijs in euros
```markdown
"price_cents": 85  <!-- FOUT: moet in centen -->
```

### ✅ Correct:
```markdown
"price_cents": 8500  <!-- CORRECT: €85 = 8500 centen -->
```

### ❌ Fout: Ontbrekende afbeelding path slash
```markdown
image: images/chakra.webp  <!-- FOUT: mist leading slash -->
```

### ✅ Correct:
```markdown
image: /images/chakra.webp  <!-- CORRECT: met leading slash -->
```

## Voorbeeld Workflow

1. **Ontvang oude content** van gebruiker
2. **Extract informatie:**
   - Naam, beschrijving, prijs, duur
   - Categorie (healing/massage), intensiteit
   - Icon kiezen uit Iconify MDI set
3. **Maak database entry** via curl/API call
4. **Noteer UUID** uit response
5. **Schrijf markdown** volgens exact template
6. **Plaats afbeeldingen** in `/public/images/` (of noteer welke nodig zijn)
7. **Test pagina** op localhost

## Icon Suggesties

Veelgebruikte icons uit de `@iconify-json/mdi` set:

- **Healing:** `i-mdi-weather-sunny`, `i-mdi-meditation`, `i-mdi-hand-heart`, `i-mdi-energy`
- **Massage:** `i-mdi-hand`, `i-mdi-spa`, `i-mdi-flower`, `i-mdi-leaf`
- **Chakra:** `i-mdi-circle-multiple`, `i-mdi-chakras`
- **Ontspanning:** `i-mdi-zen`, `i-mdi-spa-outline`

Browse meer icons op: https://icon-sets.iconify.design/mdi/

## Intensiteit Labels

1. **Zeer Zacht (Energetisch werk)** - Geen of minimale aanraking
2. **Zacht** - Lichte druk, ontspannend
3. **Gemiddeld** - Matige druk, therapeutisch
4. **Stevig** - Ferme druk, diep weefsel
5. **Zeer Stevig** - Intense druk, sportmassage

## Taal en Tone of Voice

- **Taal:** Nederlands
- **Tone:** Warm, professioneel, uitnodigend
- **Perspectief:** Tweede persoon ("je", "jou")
- **Stijl:** Begrijpelijk, niet te technisch, empathisch

## Output Formaat

Na conversie, lever de volgende output:

1. **Database curl commando** met alle velden ingevuld
2. **Markdown bestand inhoud** volledig uitgeschreven
3. **Bestandsnaam** voor het markdown bestand
4. **Afbeelding requirements** (welke afbeeldingen zijn nodig)
5. **Checklist bevestiging** - welke stappen zijn gedaan

## Belangrijke Opmerkingen

- **Slug matching:** Database slug MOET exact overeenkomen met markdown bestandsnaam (zonder `.md`)
- **UUID kritiek:** Zonder correcte UUID in hero component werkt de pagina niet
- **Dubbele punten:** `::` voor root componenten, `:::` voor geneste componenten
- **Prijs formaat:** Altijd in centen (€85 = 8500)
- **Afbeeldingen:** Leading slash verplicht (`/images/...`)
- **Alt-teksten:** Verplicht voor elke afbeelding (SEO + toegankelijkheid)
- **Frontmatter:** Alleen `title` in frontmatter, rest in componenten

## Test URLs

Na conversie, test deze URLs:

- Individuele pagina: `http://localhost:3000/behandelingen/[slug]`
- Overzichtspagina: `http://localhost:3000/behandelingen`
- Tarieven pagina: `http://localhost:3000/tarieven`

---

**Referentie bestanden:**
- Template voorbeeld: `/content/behandelingen/chakra-balancering.md`
- API endpoint: `/server/api/admin/treatments/index.post.ts`
- Documentatie: `/docs/BEHANDELINGEN_BEHEREN.md`
