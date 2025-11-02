<template>
  <section class="text-center">
    <h2 class="text-3xl font-bold text-neutral-900 mb-6">
      Klaar om te boeken?
    </h2>
    <p class="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
      Kies je gewenste behandeling en plan direct je afspraak in. Heb je vragen
      over de tarieven? Neem gerust contact op.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <UButton to="/boeken" size="lg" icon="i-mdi-calendar">
        Boek Een Afspraak
      </UButton>
      <UButton
        to="/contact"
        size="lg"
        variant="outline"
        icon="i-mdi-help-circle"
      >
        Stel Een Vraag
      </UButton>
    </div>
  </section>
</template>
