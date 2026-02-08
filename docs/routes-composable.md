# Routes Composable Documentation

## Overview

The `useRoutes()` composable provides centralized route management for the Enisa Healing & Massage website. It eliminates hardcoded paths throughout the application by providing a single source of truth for all route definitions.

## Basic Usage

```vue
<script setup lang="ts">
const routes = useRoutes();
</script>

<template>
  <!-- Use page routes -->
  <NuxtLink :to="routes.pages.about">Over Mij</NuxtLink>
  <NuxtLink :to="routes.pages.contact">Contact</NuxtLink>

  <!-- Use treatment routes -->
  <NuxtLink :to="routes.treatments['chakra-balancering']">
    Chakra Balancering
  </NuxtLink>
</template>
```

## Available Routes

### Page Routes (`routes.pages`)

```typescript
pages: {
  home: '/',
  about: '/over-mij',
  treatments: '/behandelingen',
  contact: '/contact',
  faq: '/faq',
  blog: '/blog',
  tarieven: '/tarieven',
}
```

### Treatment Routes (`routes.treatments`)

```typescript
treatments: {
  'chakra-balancering': '/behandelingen/chakra-balancering',
  'klassieke-ontspanningsmassage': '/behandelingen/klassieke-ontspanningsmassage',
  'energetische-healing-sessie': '/behandelingen/energetische-healing-sessie',
  'zweedse-massage': '/behandelingen/zweedse-massage',
  'sportmassage': '/behandelingen/sportmassage',
  'intuitieve-lichaamsmassage': '/behandelingen/intuitieve-lichaamsmassage',
}
```

## Utility Functions

### `getTreatmentPath(slug: string)`

Get a treatment path by slug, with fallback generation:

```typescript
const path = routes.getTreatmentPath('chakra-balancering');
// Returns: '/behandelingen/chakra-balancering'

const fallbackPath = routes.getTreatmentPath('new-treatment');
// Returns: '/behandelingen/new-treatment'
```

### `treatmentExists(slug: string)`

Check if a treatment route exists:

```typescript
const exists = routes.treatmentExists('chakra-balancering'); // true
const notExists = routes.treatmentExists('non-existent'); // false
```

### `routeExists(path: string)`

Validate if any route exists:

```typescript
const valid = routes.routeExists('/over-mij'); // true
const invalid = routes.routeExists('/non-existent'); // false
```

### `slugToTitle(slug: string)`

Convert a slug string to a properly formatted title:

```typescript
const title = routes.slugToTitle('chakra-balancering');
// Returns: 'Chakra Balancering'
```

## Navigation Helpers

### `getTreatmentNavigationItems()`

Get formatted navigation items for treatment dropdowns:

```typescript
const navItems = routes.getTreatmentNavigationItems();
// Returns array with label, description, to, and icon properties
```

### `getNavigationRoutes()`

Get structured navigation data for headers and footers:

```typescript
const nav = routes.getNavigationRoutes();
// Returns: { main: [...], treatments: [...], footer: { services: [...], info: [...] } }
```

### `generateBreadcrumbs(currentPath: string)`

Generate breadcrumb navigation:

```typescript
const breadcrumbs = routes.generateBreadcrumbs(
  '/behandelingen/chakra-balancering'
);
// Returns: [
//   { label: 'Home', path: '/', icon: 'i-mdi-home' },
//   { label: 'Behandelingen', path: '/behandelingen', icon: 'i-mdi-sparkles' },
//   { label: 'Chakra Balancering', path: '/behandelingen/chakra-balancering', icon: 'i-mdi-file-document' }
// ]
```

### `getRelatedTreatments(currentSlug: string, limit?: number)`

Get related treatment suggestions:

```typescript
const related = routes.getRelatedTreatments('chakra-balancering', 3);
// Returns array of related treatments excluding the current one
```

## Advanced Features

### Dynamic Content Syncing

The composable includes functions for syncing with Nuxt Content (for future enhancement):

```typescript
// Get treatment routes from content collection
const contentTreatments = await routes.getTreatmentRoutesFromContent();

// Sync static routes with dynamic content
const syncedRoutes = await routes.syncTreatmentRoutes();
```

## Type Safety

The composable exports TypeScript types for better development experience:

```typescript
import type {
  PageRoutes,
  TreatmentRoutes,
  BreadcrumbItem,
} from '~/composables/useRoutes';
```

## Examples in Components

### Header Component

```vue
<script setup lang="ts">
const routes = useRoutes();
const treatmentItems = routes.getTreatmentNavigationItems();
</script>

<template>
  <UDropdownMenu :items="treatmentItems">
    <UButton>Behandelingen</UButton>
  </UDropdownMenu>

  <UButton :to="routes.pages.contact"> Contact opnemen </UButton>
</template>
```

### Footer Component

```vue
<script setup lang="ts">
const routes = useRoutes();
const navigation = routes.getNavigationRoutes();
</script>

<template>
  <div>
    <h3>Behandelingen</h3>
    <ul>
      <li v-for="service in navigation.footer.services" :key="service.path">
        <NuxtLink :to="service.path">{{ service.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
```

### Treatment Hero Component

```vue
<script setup lang="ts">
const routes = useRoutes();
</script>

<template>
  <UButton :to="routes.pages.contact" size="lg" color="primary">
    Contact opnemen
  </UButton>
</template>
```

## Benefits

1. **Centralized Management**: All routes defined in one place
2. **Type Safety**: Full TypeScript support with intellisense
3. **DRY Principle**: No hardcoded paths throughout the application
4. **Easy Maintenance**: Update paths once, reflected everywhere
5. **Validation**: Built-in route existence checking
6. **Navigation Helpers**: Pre-formatted data for common navigation patterns
7. **Future-Proof**: Ready for dynamic content integration
8. **SEO Friendly**: Consistent URL structure
9. **Developer Experience**: Clear, documented API

## Maintenance

To add a new treatment:

1. Add the entry to the `treatments` object in the composable
2. Create the corresponding content file in `/content/treatments/`
3. The route will be automatically available throughout the application

To add a new page:

1. Add the entry to the `pages` object in the composable
2. Create the corresponding page file in `/pages/`
3. Update navigation helpers if needed
