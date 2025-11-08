# Behandelingen Beheren

Deze gids legt uit hoe je behandelingen beheert in de website van Enisa Healing & Massage.

## Overzicht

Behandelingen bestaan uit **twee onderdelen** die met elkaar verbonden zijn:

1. **Database Record** (in Supabase) - Bevat basis informatie zoals naam, prijs, duur, categorie
2. **Content Bestand** (Markdown `.md` bestand) - Bevat de volledige pagina-inhoud met afbeeldingen en tekst

Deze twee moeten **gesynchroniseerd** blijven voor een goede werking van de website.

---

## Stap 1: Behandeling Toevoegen aan Database

### Via de Admin Panel (Aanbevolen)

1. Ga naar `/admin/treatments` in je browser
2. Klik op "Nieuwe Behandeling"
3. Vul de volgende velden in:
   - **Naam**: Bijv. "Chakra Balancering"
   - **Slug**: Automatisch gegenereerd (bijv. `chakra-balancering`)
   - **Beschrijving**: Korte beschrijving voor overzichtspagina's
   - **Categorie**: `healing` of `massage`
   - **Prijs (in centen)**: Bijv. `8500` voor €85
   - **Duur (in minuten)**: Bijv. `75` voor 75 minuten
   - **Intensiteit**: 1-5 (1 = Zeer Zacht, 5 = Zeer Stevig)
   - **Intensiteit Label**: Bijv. "Zeer Zacht (Energetisch werk)"
   - **Icon**: Icoon naam (bijv. `i-mdi-weather-sunny`)
   - **Display Order**: Volgorde op de website (lager = eerder getoond)
4. Klik op "Opslaan"

> **Let op**: Onthoud de **slug** die wordt gegenereerd - deze heb je nodig voor de volgende stap!

---

## Stap 2: Content Bestand Aanmaken

### Locatie
Maak een nieuw bestand aan in: `/content/treatments/[slug].md`

Bijvoorbeeld: `/content/treatments/chakra-balancering.md`

### Basis Template

```markdown
::behandeling-hero
---
id: [DATABASE-ID-HIER]
---
::

::behandeling-sectie
---
title: Wat kun je verwachten?
image: /images/[jouw-afbeelding].webp
imageAlt: Beschrijving van de afbeelding
items:
  - Eerste stap van de behandeling
  - Tweede stap van de behandeling
  - Derde stap van de behandeling
---
Beschrijving van wat de cliënt kan verwachten tijdens de behandeling.
::

::twee-kolommen
  :::voordelen-lijst
  ---
  title: Belangrijkste Voordelen
  items:
    - Eerste voordeel
    - Tweede voordeel
    - Derde voordeel
  ---
  :::

  :::voor-wie
  ---
  title: Voor Wie?
  items:
    - Je symptoom X ervaart
    - Op zoek bent naar Y
    - Z wilt bereiken
  ---
  :::
::

::uitklap-info
---
title: Meer informatie
---
### Extra Informatie

Hier kun je uitgebreide informatie toevoegen die standaard ingeklapt is.
::

::info-blok{icon="i-mdi-alert" title="Belangrijke informatie" type="warning"}
Belangrijke waarschuwing of disclaimer hier.
::
```

---

## Beschikbare Componenten

### 1. `::behandeling-hero`
**Doel**: Toont de titel, prijs, duur en intensiteit bovenaan de pagina.

**Vereist veld**:
- `id`: Het UUID van de behandeling uit de database

**Voorbeeld**:
```markdown
::behandeling-hero
---
id: 75be22cd-31df-48bd-bd9f-337360edb2c4
---
::
```

> **Belangrijk**: Het `id` moet exact overeenkomen met het ID in de database!

---

### 2. `::behandeling-sectie`
**Doel**: Sectie met afbeelding en lijst van punten.

**Velden**:
- `title`: Titel van de sectie
- `image`: Pad naar afbeelding (bijv. `/images/chakra-healing.webp`)
- `imageAlt`: Alt-tekst voor toegankelijkheid
- `items`: Lijst met bullet points

**Voorbeeld**:
```markdown
::behandeling-sectie
---
title: Wat kun je verwachten?
image: /images/chakra-healing.webp
imageAlt: Sfeerbeeld van een chakra balancering sessie
items:
  - "Handoplegging: Zachte aanraking"
  - "Visualisatie: Geleide meditaties"
  - "Ademhalingstechnieken"
---
Beschrijvende tekst over de behandeling.
::
```

---

### 3. `::twee-kolommen`
**Doel**: Wrapper voor twee kolommen naast elkaar (voordelen en doelgroep).

**Gebruik**: Bevat geneste componenten `:::voordelen-lijst` en `:::voor-wie`

**Voorbeeld**:
```markdown
::twee-kolommen
  :::voordelen-lijst
  ---
  title: Belangrijkste Voordelen
  items:
    - Eerste voordeel
    - Tweede voordeel
  ---
  :::

  :::voor-wie
  ---
  title: Voor Wie?
  items:
    - Voor mensen die X
    - Voor mensen die Y
  ---
  :::
::
```

---

### 4. `::voordelen-lijst`
**Doel**: Toont een lijst met voordelen met groene vinkjes.

**Velden**:
- `title`: Titel van de sectie
- `items`: Lijst met voordelen

**Let op**: Gebruik binnen `::twee-kolommen` met `:::` (drie dubbele punten)

---

### 5. `::voor-wie`
**Doel**: Toont doelgroep informatie.

**Velden**:
- `title`: Titel van de sectie
- `items`: Lijst met doelgroep kenmerken

**Let op**: Gebruik binnen `::twee-kolommen` met `:::` (drie dubbele punten)

---

### 6. `::uitklap-info`
**Doel**: Inklapbare sectie voor extra informatie.

**Velden**:
- `title`: Titel die altijd zichtbaar is

**Voorbeeld**:
```markdown
::uitklap-info
---
title: Meer over chakra balancering
---
### Subtitle

Je kunt hier markdown gebruiken:
- Bullet points
- **Vet gedrukte** tekst
- Links, etc.
::
```

---

### 7. `::info-blok`
**Doel**: Gekleurde box voor belangrijke informatie of waarschuwingen.

**Velden**:
- `icon`: Icon naam (bijv. `i-mdi-alert`)
- `title`: Titel van het blok
- `type`: `info`, `warning`, `success`, of `error`

**Voorbeeld**:
```markdown
::info-blok{icon="i-mdi-alert" title="Belangrijke informatie" type="warning"}
Deze behandeling is niet geschikt tijdens de eerste drie maanden van de zwangerschap.
::
```

---

### 8. `::afbeelding`
**Doel**: Grote afbeelding met optioneel bijschrift.

**Velden**:
- `src`: Pad naar afbeelding
- `alt`: Alt-tekst
- `caption`: (Optioneel) Bijschrift

**Voorbeeld**:
```markdown
::afbeelding
---
src: /images/treatment.webp
alt: Beschrijving van de afbeelding
caption: Optioneel bijschrift
---
::
```

---

### 9. `::kop`
**Doel**: Custom heading met styling.

**Velden**:
- `level`: Heading level (1-6)
- `centered`: (Optioneel) Boolean voor centrering

---

## Afbeeldingen Toevoegen

1. Plaats afbeeldingen in `/public/images/`
2. Gebruik WebP formaat voor beste prestaties
3. Gebruik beschrijvende bestandsnamen (bijv. `chakra-healing.webp`)
4. Voeg altijd een goede `alt` tekst toe voor toegankelijkheid

**Aanbevolen afmetingen**:
- Hero afbeeldingen: 1200x800px
- Sectie afbeeldingen: 600x400px

---

## Synchronisatie Checklist

Bij het aanmaken of bewerken van een behandeling:

- [ ] Database record heeft juiste informatie (naam, prijs, duur, etc.)
- [ ] Slug in database komt overeen met bestandsnaam in `/content/treatments/`
- [ ] `id` in `::behandeling-hero` komt overeen met database ID
- [ ] Alle vereiste velden zijn ingevuld
- [ ] Afbeeldingen bestaan in `/public/images/`
- [ ] Alt-teksten zijn beschrijvend en compleet
- [ ] Preview de pagina op `/behandelingen/[slug]`

---

## Veelvoorkomende Fouten

### Behandeling verschijnt niet op de website
**Oplossing**:
- Check of `is_active` op `true` staat in de database
- Verifieer dat de slug overeenkomt tussen database en bestandsnaam
- Controleer of het content bestand geen syntax errors heeft

### Prijs of duur klopt niet
**Oplossing**:
- Update de database via de admin panel
- De database waarden hebben voorrang boven content waarden

### Afbeelding wordt niet getoond
**Oplossing**:
- Check of het pad klopt: `/images/bestandsnaam.webp`
- Verifieer dat het bestand bestaat in `/public/images/`
- Let op hoofdletters/kleine letters in bestandsnamen

### Component werkt niet
**Oplossing**:
- Gebruik **kebab-case** voor component namen (bijv. `::behandeling-sectie`)
- Check of de `---` lijnen correct zijn geplaatst
- Gebruik `:::` (3 dubbele punten) voor geneste componenten binnen `::twee-kolommen`

---

## Tips voor Niet-Developers

1. **Kopieer een bestaand bestand**: Start met een kopie van `chakra-balancering.md` als template
2. **Test je wijzigingen**: Bekijk de pagina in je browser na elke wijziging
3. **Markdown syntax**:
   - `**vet**` voor **vet**
   - `*cursief*` voor *cursief*
   - `- ` aan het begin voor bullet points
4. **Vraag om hulp**: Bij twijfel, neem contact op met de developer

---

## Snelle Referentie: Component Overzicht

| Component | Gebruik | Genest in twee-kolommen? |
|-----------|---------|--------------------------|
| `::behandeling-hero` | Pagina header | Nee |
| `::behandeling-sectie` | Sectie met afbeelding | Nee |
| `::twee-kolommen` | Wrapper voor 2 kolommen | Nee |
| `:::voordelen-lijst` | Voordelen lijst | Ja (met `:::`) |
| `:::voor-wie` | Doelgroep info | Ja (met `:::`) |
| `::uitklap-info` | Inklapbare sectie | Nee |
| `::info-blok` | Waarschuwing/info box | Nee |
| `::afbeelding` | Grote afbeelding | Nee |
| `::kop` | Custom heading | Nee |

---

## Support

Voor technische vragen of problemen, neem contact op met de developer of check de documentatie in `/docs/`.
