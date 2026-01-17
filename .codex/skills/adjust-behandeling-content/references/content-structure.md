# Content Structure (Behandelingen)

## Frontmatter
- Required fields: `title`, `description`.
- The frontmatter description is the source for the short summary shown in content blocks.

Example:
```markdown
---
title: Chakra Healing & Ontspanningsmassage
description: Korte samenvatting die op overzichtspagina's wordt gebruikt.
---
```

## Required Block
`::behandeling-hero` must include the database UUID and can include a content description:
```markdown
::behandeling-hero
---
description: Korte intro op de pagina.
id: <database-uuid>
---
::
```

## Common Blocks
- `::behandeling-sectie` with `title`, `items`, `image`, `imageAlt`.
- `::twee-kolommen` containing:
  - `:::voordelen-lijst` with `title`, `items`
  - `:::voor-wie` with `title`, `items`
- `::uitklap-info{title="..."}` for expandable content.
- `::info-blok` for highlighted callouts.

## Syntax Rules
- Use kebab-case component names.
- Use `:::` for nested blocks inside `::twee-kolommen`.
- Keep `---` separators around block props.

## Images
- Store in `public/images/` and reference as `/images/<name>.webp`.
- Provide descriptive `imageAlt` text.
