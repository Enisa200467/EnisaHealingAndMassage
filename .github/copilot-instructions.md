# Copilot Instructions for Enisa Healing & Massage

## Project Overview

This is a **mobile-first Nuxt 3 website** for a healing and massage therapy practice, built with modern web design principles, SEO optimization, and content management through Nuxt Content.

## Core Technologies & Modules

- **Nuxt 3** with TypeScript
- **@nuxt/ui** for component library and design system
- **@nuxt/content** for content management
- **@nuxt/image** for optimized images
- **@nuxt/fonts** for typography
- **@nuxt/icon** for iconography
- **@nuxtjs/device** for device detection
- **Tailwind CSS** for styling

## Development Principless

### 1. Mobile-First Design

- Always start with mobile designs and progressively enhance for larger screens
- Use responsive breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Prioritize touch-friendly interactions and appropriate spacing
- Test layouts on mobile viewports first

### 2. SEO Optimization Priority

- Use `useSeoMeta()` for all pages with proper title, description, and meta tags
- Implement structured data for therapy/health services
- Optimize images with `NuxtImg` component using `format="webp"`, `quality="80"`, and appropriate `loading` attributes
- Use semantic HTML structure with proper heading hierarchy
- Implement breadcrumbs for treatment pages
- Ensure all images have descriptive `alt` attributes
- Use `preload` for critical images, `lazy` for below-the-fold content

### 3. Content Management with Nuxt Content

- Create reusable content components in `/components/content/` directory
- Use frontmatter for structured data (title, description, duration, price)
- Implement custom components like `::heading`, `::infoBox`, `::benefitList`, `::featureImage`
- Follow the established pattern for treatment pages in `/content/treatments/`
- Use collections defined in `content.config.ts` for organized content structure

### 4. Design System & Styling

- Follow the established color palette: primary (purple), secondary (teal), neutral (gray)
- Use Nuxt UI components as base, customize through `app.config.ts`
- Maintain consistent spacing using Tailwind's spacing scale
- Implement proper typography hierarchy with the established prose styles
- Use the `not-prose` class to prevent Tailwind Typography conflicts in custom components

## Code Patterns & Best Practices

### Component Development

```vue
<script setup lang="ts">
// Always use TypeScript
// Define props with proper types
defineProps<{
  title?: string;
  items: string[];
}>();

// Use composables for SEO
useSeoMeta({
  title: 'Page Title',
  description: 'Page description for SEO',
});
</script>

<template>
  <!-- Use semantic HTML -->
  <!-- Implement mobile-first responsive design -->
  <!-- Use Nuxt UI components when possible -->
</template>
```

### Content Component Pattern

- Place all content components in `/components/content/`
- Use the `not-prose` class to prevent typography conflicts
- Components accept data through frontmatter syntax in component calls
- Follow the established styling patterns for consistency

### Content Component Usage

Use the clean frontmatter syntax for content components:

```markdown
## ::componentName

key: value
arrayKey:

- item1
- item2

---

Content goes here if needed
::
```

Example patterns:

```markdown
## ::infoBox

icon: i-heroicons-clock
title: Behandelingsdetails

---

- **Duur:** 60 minuten
- **Prijs:** € 65
  ::

## ::benefitList

title: Belangrijkste Voordelen
items:

- Verlicht spierspanning
- Bevordert ontspanning

---

::

## ::featureImage

src: /images/treatment.webp
alt: Treatment description
caption: Optional caption text

---

::

## ::treatmentHero

title: Treatment Title
subtitle: Treatment subtitle
duration: 60 minuten
price: € 70
intensity: Zeer Zacht
icon: i-heroicons-sparkles

---

::

## ::treatmentSection

title: Wat kun je verwachten?
image: /images/treatment-small.webp
imageAlt: Treatment description
items:

- Item 1
- Item 2

---

::
```

### Image Optimization

```vue
<NuxtImg
  :src="src"
  :alt="descriptive alt text"
  class="responsive classes"
  format="webp"
  quality="80"
  loading="lazy"
  sizes="sm:100vw md:80vw lg:600px"
/>
```

### Page Structure

```vue
<script setup lang="ts">
// SEO meta tags are mandatory
useSeoMeta({
  title: 'Specific Page Title',
  description: 'Detailed description for search engines',
});
</script>

<template>
  <article>
    <!-- Use semantic HTML structure -->
    <!-- Implement proper heading hierarchy -->
    <!-- Mobile-first responsive layout -->
  </article>
</template>
```

## Content Creation Guidelines

### Treatment Pages

- Use the established frontmatter structure (title, description, duration, price, intensity, intensityLabel, icon)
- Use `TreatmentHero` component for title and pricing information
- Use `TreatmentSection` for "what to expect" content with small image
- Use `TwoColumnSection` with `BenefitList` and `ForWhom` components
- Include treatment details with visual intensity rating (1-5 dots)
- Add appropriate warning boxes for medical disclaimers
- Intensity system: Use number (1-5) for `intensity` and descriptive text for `intensityLabel`
  - 1: Zeer Zacht (e.g., energetic work)
  - 2: Zacht (e.g., gentle massage)
  - 3: Medium (e.g., standard pressure)
  - 4: Stevig (e.g., firm pressure)
  - 5: Zeer Stevig (e.g., deep tissue)

### SEO Content Requirements

- Descriptive, keyword-rich titles (50-60 characters)
- Compelling meta descriptions (150-160 characters)
- Use location-based keywords where relevant
- Include service-specific long-tail keywords
- Implement schema markup for health services

## Responsive Design Patterns

- Container: Use `UContainer` for consistent page width
- Grid layouts: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Flexible components: `flex flex-col sm:flex-row`
- Spacing: `py-16 sm:py-24` for sections
- Typography: `text-4xl sm:text-5xl lg:text-6xl` for headings

## Performance Considerations

- Lazy load images below the fold
- Use `preload` for critical hero images
- Implement proper image sizing with the `sizes` attribute
- Minimize bundle size by importing only necessary components
- Use the device detection module for conditional rendering

## Accessibility Standards

- Maintain proper heading hierarchy (h1 → h2 → h3)
- Include ARIA labels for interactive elements
- Ensure sufficient color contrast ratios
- Implement keyboard navigation support
- Use semantic HTML elements appropriately

## When Creating New Features

1. **Start mobile-first** - design and code for mobile screens first
2. **SEO first** - implement proper meta tags and structured data
3. **Content-driven** - use Nuxt Content for manageable, reusable content
4. **Performance-conscious** - optimize images and lazy load appropriately
5. **Accessible** - follow WCAG guidelines and semantic HTML
6. **Consistent** - follow established patterns and design system

## File Organization

- Pages: `/pages/` (use proper routing structure)
- Components: `/components/` (UI) and `/components/content/` (content-specific)
- Content: `/content/treatments/` for treatment pages
- Assets: `/public/images/` for static images
- Styling: Utility-first with Tailwind, custom CSS in `/assets/css/`

Remember: This is a health and wellness website, so prioritize trust signals, professional presentation, and user experience that conveys calm and reliability.
