# PageSection Component Implementation

## Overview

Created a reusable `PageSection` component to replace the repetitive pattern of:

```vue
<section class="py-16 sm:py-24 [background]">
  <UContainer>
    <div class="max-w-7xl mx-auto">
      <!-- content -->
    </div>
  </UContainer>
</section>
```

## Component Location

`/components/ui/PageSection.vue`

## Features

- **Purple Background**: `<PageSection purple>` - adds `bg-purple-50`
- **Gradient Background**: `<PageSection gradient>` - adds gradient from primary to secondary colors
- **Custom Background**: `<PageSection background="bg-neutral-50">` - custom background classes
- **Flexible Padding**: `padding="sm|md|lg"` for different section sizes
- **ARIA Support**: `aria-labelledby` and `id` props
- **Not Prose**: `not-prose` prop for content components
- **Custom Classes**: Additional CSS classes through `class` prop

## Usage Examples

### Basic Usage

```vue
<PageSection>
  <!-- Your content here -->
</PageSection>
```

### With Purple Background

```vue
<PageSection purple>
  <!-- Your content here -->
</PageSection>
```

### With Custom Background and Accessibility

```vue
<PageSection
  background="bg-neutral-50"
  aria-labelledby="section-heading"
  id="main-section"
>
  <!-- Your content here -->
</PageSection>
```

### For Content Components

```vue
<PageSection not-prose>
  <!-- Content component that needs not-prose -->
</PageSection>
```

## Files Updated

### Pages

- ✅ `features/pricing/PricingPage.vue`
- ✅ `pages/over-mij.vue`
- ✅ `pages/faq.vue`
- ✅ `features/contact/ContactPage.vue`
- ✅ `features/booking/BookingPage.vue`
- ✅ `features/reviews/ReviewsPage.vue`

### Components

- ✅ `features/treatments/components/RelatedTreatments.vue`
- ✅ `features/home/components/HomeIntro.vue`
- ✅ `components/content/TreatmentSection.vue`
- ✅ `components/content/TwoColumnSection.vue`
- ✅ `features/contact/components/ContactMap.vue`
- ✅ `features/contact/components/ContactFAQ.vue`

## Benefits

1. **Consistency**: All sections now use the same pattern
2. **Maintainability**: Changes to section styling can be made in one place
3. **Flexibility**: Easy to toggle backgrounds and customize padding
4. **Accessibility**: Built-in ARIA support
5. **Developer Experience**: Cleaner, more readable templates

## Padding Sizes

- `sm`: `py-12 sm:py-16`
- `md`: `py-16 sm:py-24` (default)
- `lg`: `py-20 sm:py-32`

## Background Options

- `purple`: Purple background (`bg-purple-50`)
- `gradient`: Gradient background (`bg-gradient-to-br from-primary-50 to-secondary-50`)
- `background`: Custom background class
- No prop: Default white background
