<template>
  <UApp>
    <!-- <main class="flex flex-col min-h-screen ml-2 lg:ml-64 mr-2 lg:mr-64"> -->
    <main class="flex flex-col min-h-screen">
      <SiteHeader />
      <NuxtPage />
      <SiteFooter />
      <BookingWidget />
    </main>
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
