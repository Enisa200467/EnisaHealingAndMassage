<script setup lang="ts">
/**
 * Skip Navigation Links
 *
 * Provides keyboard users with quick access to main content areas
 * Links are visually hidden but appear on keyboard focus
 * WCAG 2.1 Level A - 2.4.1 Bypass Blocks
 */
</script>

<template>
  <div class="skip-navigation">
    <a href="#main-content" class="skip-link">
      Spring naar hoofdinhoud
    </a>
    <a href="#navigation" class="skip-link">
      Spring naar navigatie
    </a>
    <a href="#footer" class="skip-link">
      Spring naar footer
    </a>
  </div>
</template>

<style scoped>
.skip-navigation {
  position: relative;
  z-index: 9999;
}

.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: rgb(139 92 246); /* primary-600 */
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0 0 0.5rem 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: top 0.2s ease-in-out;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid rgb(251 191 36); /* yellow-400 for high contrast */
  outline-offset: 2px;
}

.skip-link:hover {
  background: rgb(124 58 237); /* primary-700 */
}

/* Ensure skip links are announced by screen readers */
.skip-link:focus-visible {
  top: 0;
}
</style>
