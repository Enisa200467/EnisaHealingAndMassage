<template>
  <UApp>
    <SkipNavigation />
    <div class="flex flex-col min-h-screen">
      <SiteHeader />
      <main
        id="main-content"
        class="flex-1"
        role="main"
        aria-label="Main content"
      >
        <NuxtPage />
      </main>
      <SiteFooter />
      <BookingWidget />
    </div>
  </UApp>
</template>

<style>
.calendly-badge-widget {
  z-index: 9999 !important;
  bottom: 20px !important;
  right: 360px !important;

  @media screen and (max-width: 1920px) {
    right: 145px !important;
  }

  @media screen and (max-width: 1024px) {
    right: 45px !important;
  }

  @media screen and (max-width: 768px) {
    right: 5px !important;
  }
}
</style>
