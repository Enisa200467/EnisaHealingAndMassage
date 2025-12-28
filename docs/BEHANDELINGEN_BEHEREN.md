# Behandelingen Beheren

Deze gids legt uit hoe je behandelingen toevoegt en beheert op de website.

## Overzicht

Behandelingen bestaan uit **twee onderdelen**:
1. **Database Record** - Basis metadata (naam, prijs, duur, status)
2. **Content Bestand** - Volledige pagina-inhoud met frontmatter (markdown `.md` bestand)

**Belangrijk**: Beschrijving wordt beheerd in markdown frontmatter, niet in de database. Dit zorgt voor een enkele bron van waarheid.

De slug moet identiek zijn in beide onderdelen.

---

## Snelste Methode: Dupliceer een Bestaand Bestand

**Aanbevolen voor niet-developers**

1. **Kopieer een bestaand behandeling bestand**
   - Ga naar `/content/behandelingen/`
   - Kopieer bijv. `chakra-healing.md`
   - Hernoem naar je nieuwe slug (bijv. `nieuwe-behandeling.md`)

2. **Maak database record aan**
   - Ga naar `/admin/treatments`
   - Klik "Nieuwe Behandeling"
   - Vul metadata in: naam, prijs, duur, icoon, volgorde
   - Zorg dat de **slug** exact overeenkomt met je bestandsnaam
   - Kopieer het **UUID** na het opslaan

3. **Pas het gekopieerde bestand aan**
   - Open je nieuwe `.md` bestand
   - **Update frontmatter**: titel en beschrijving
   - Vervang het `id` in `::behandeling-hero` met het nieuwe UUID
   - Pas alle teksten, afbeeldingen en content aan
   - Upload nieuwe afbeeldingen naar `/public/images/`

4. **Controleer**
   - Preview op `/behandelingen/[slug]`
   - Check dat prijs, duur, naam én beschrijving kloppen

---

## Markdown Structuur

Behandeling content gebruikt frontmatter voor metadata:

```markdown
---
title: Chakra Healing
description: Herstel de harmonie en energiestroom in je lichaam met een zachte Chakra Balancering. Gericht op het vrijmaken van blokkades en het bevorderen van emotioneel en fysiek welzijn.
---

::behandeling-hero{#database-uuid-here}
::

... rest of content ...
```

### Frontmatter Velden

| Veld | Voorbeeld | Verplicht? |
|------|-----------|------------|
| `title` | "Chakra Healing" | Ja |
| `description` | Korte beschrijving voor overzichtspagina's | Ja |

---

## Database Velden

Vul deze velden in via `/admin/treatments`:

| Veld | Voorbeeld | Toelichting |
|------|-----------|-------------|
| **Naam** | "Chakra Balancering" | Officiële naam |
| **Slug** | `chakra-balancering` | URL-vriendelijk (auto-gegenereerd) |
| **Prijs** | `8500` | In centen (€85,00) |
| **Duur** | `75` | In minuten |
| **Icon** | `i-mdi-weather-sunny` | Icoon voor display |
| **Display Order** | `10` | Lager = eerder getoond |
| **Is Active** | `true` | Moet aan voor zichtbaarheid |

**Let op**: Beschrijving wordt beheerd in markdown frontmatter (zie Markdown Structuur hieronder).

---

## Componenten Referentie

Alle componenten gebruiken **kebab-case** in markdown. Geneste componenten (binnen `::twee-kolommen`) gebruiken `:::` (drie dubbele punten).

### Verplicht Component

**`::behandeling-hero`**
- Toont titel, prijs, duur, intensiteit
- **Vereist**: `id` (UUID uit database)

### Optionele Componenten

| Component | Doel | Belangrijke Velden |
|-----------|------|-------------------|
| `::behandeling-sectie` | Sectie met afbeelding + lijst | `title`, `image`, `imageAlt`, `items` |
| `::twee-kolommen` | Wrapper voor voordelen + doelgroep | Bevat geneste componenten |
| `:::voordelen-lijst` | Voordelen met groene vinkjes | `title`, `items` (gebruik binnen `::twee-kolommen`) |
| `:::voor-wie` | Doelgroep kenmerken | `title`, `items` (gebruik binnen `::twee-kolommen`) |
| `::uitklap-info` | Inklapbare extra informatie | `title` + markdown content |
| `::info-blok` | Gekleurde waarschuwing/info box | `icon`, `title`, `type` (`info`/`warning`/`success`/`error`) |
| `::afbeelding` | Grote afbeelding met bijschrift | `src`, `alt`, `caption` (optioneel) |
| `::kop` | Styled heading | `level` (1-6), `centered` (optioneel) |

---

## Afbeeldingen

- **Locatie**: `/public/images/`
- **Formaat**: WebP (beste prestaties)
- **Afmetingen**: Hero 1200x800px, Sectie 600x400px
- **Alt-tekst**: Altijd beschrijvend invullen

---

## Veelvoorkomende Problemen

| Probleem | Oplossing |
|----------|-----------|
| Behandeling niet zichtbaar | Check `is_active = true` in database; slug komt overeen; geen syntax errors |
| Prijs/duur klopt niet | Update database (database heeft voorrang) |
| Afbeelding niet zichtbaar | Check pad `/images/naam.webp`; bestand bestaat; let op hoofdletters |
| Component werkt niet | Gebruik kebab-case; check `---` lijnen; gebruik `:::` voor geneste componenten |
| ID mismatch error | Controleer dat `id` in `::behandeling-hero` overeenkomt met database UUID |

---

## Checklist

Bij aanmaken/bewerken:
- [ ] Database slug = bestandsnaam
- [ ] `id` in `::behandeling-hero` = database UUID
- [ ] Alle afbeeldingen bestaan in `/public/images/`
- [ ] Alt-teksten zijn ingevuld
- [ ] Preview werkt op `/behandelingen/[slug]`
- [ ] `is_active = true` in database
