<template>
  <nav class="skip-navigation" aria-label="Skip navigation">
    <a href="#main-content" class="skip-link"> Skip to main content </a>
    <a href="#navigation" class="skip-link"> Skip to navigation </a>
    <a href="#footer" class="skip-link"> Skip to footer </a>
  </nav>
</template>

<style scoped>
.skip-navigation {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
}

.skip-link {
  position: fixed;
  top: -40px;
  left: 6px;
  background: #1f2937;
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 0 0 4px 4px;
  font-size: 14px;
  font-weight: 600;
  transition: top 0.3s;
  pointer-events: auto;
}

.skip-link:focus {
  top: 0;
}

.skip-link:hover {
  background: #374151;
}
</style>
