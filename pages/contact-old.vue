<script setup lang="ts">
useSeoMeta({
  title: 'Contact - Enisa Healing & Massage',
  description:
    'Neem contact op met Enisa voor vragen over behandelingen, tarieven of om een afspraak in te plannen. Bel, mail of gebruik ons contactformulier.',
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      class="bg-gradient-to-br from-primary-50 to-secondary-50 py-16 sm:py-24"
    >
      <UContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6"
          >
            Contact
          </h1>
          <p class="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Heb je vragen over de behandelingen of wil je een afspraak maken? Ik
            help je graag verder. Neem gerust contact met me op.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Main Content -->
    <UContainer class="py-16 sm:py-24">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Information -->
          <div>
            <h2 class="text-3xl font-bold text-neutral-900 mb-8">
              Contactgegevens
            </h2>

            <!-- Contact Cards -->
            <div class="space-y-6 mb-12">
              <!-- Phone -->
              <UCard>
                <div class="flex items-start gap-4">
                  <div class="bg-primary-100 p-3 rounded-full">
                    <UIcon
                      name="i-mdi-phone"
                      class="w-6 h-6 text-primary-600"
                    />
                  </div>
                  <div>
                    <h3 class="font-semibold text-neutral-900 mb-2">
                      Telefoon
                    </h3>
                    <p class="text-neutral-600 mb-2">
                      <ULink
                        href="tel:+31612345678"
                        class="hover:text-primary-600"
                      >
                        +31 6 12 34 56 78
                      </ULink>
                    </p>
                    <p class="text-sm text-neutral-500">
                      Ma-Za: 9:00 - 18:00 uur
                    </p>
                  </div>
                </div>
              </UCard>

              <!-- Email -->
              <UCard>
                <div class="flex items-start gap-4">
                  <div class="bg-secondary-100 p-3 rounded-full">
                    <UIcon
                      name="i-mdi-email"
                      class="w-6 h-6 text-secondary-600"
                    />
                  </div>
                  <div>
                    <h3 class="font-semibold text-neutral-900 mb-2">E-mail</h3>
                    <p class="text-neutral-600 mb-2">
                      <ULink
                        href="mailto:info@enisahealing.nl"
                        class="hover:text-secondary-600"
                      >
                        info@enisahealing.nl
                      </ULink>
                    </p>
                    <p class="text-sm text-neutral-500">
                      Reactie binnen 24 uur
                    </p>
                  </div>
                </div>
              </UCard>

              <!-- Location -->
              <UCard>
                <div class="flex items-start gap-4">
                  <div class="bg-green-100 p-3 rounded-full">
                    <UIcon
                      name="i-mdi-map-marker"
                      class="w-6 h-6 text-green-600"
                    />
                  </div>
                  <div>
                    <h3 class="font-semibold text-neutral-900 mb-2">Locatie</h3>
                    <p class="text-neutral-600 mb-2">
                      Voorbeeldstraat 123<br />
                      1234 AB Amsterdam
                    </p>
                    <p class="text-sm text-neutral-500">
                      Gratis parkeren beschikbaar
                    </p>
                  </div>
                </div>
              </UCard>

              <!-- WhatsApp -->
              <UCard>
                <div class="flex items-start gap-4">
                  <div class="bg-green-100 p-3 rounded-full">
                    <UIcon
                      name="i-mdi-whatsapp"
                      class="w-6 h-6 text-green-600"
                    />
                  </div>
                  <div>
                    <h3 class="font-semibold text-neutral-900 mb-2">
                      WhatsApp
                    </h3>
                    <p class="text-neutral-600 mb-2">
                      <ULink
                        href="https://wa.me/31612345678"
                        target="_blank"
                        class="hover:text-green-600"
                      >
                        +31 6 12 34 56 78
                      </ULink>
                    </p>
                    <p class="text-sm text-neutral-500">Voor snelle vragen</p>
                  </div>
                </div>
              </UCard>
            </div>

            <!-- Quick Actions -->
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton
                to="/boeken"
                size="lg"
                icon="i-mdi-calendar"
                class="flex-1"
              >
                Boek Direct Online
              </UButton>
              <UButton
                href="tel:+31612345678"
                size="lg"
                variant="outline"
                icon="i-mdi-phone"
                class="flex-1"
              >
                Bel Nu
              </UButton>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <h2 class="text-3xl font-bold text-neutral-900 mb-8">
              Stuur een bericht
            </h2>

            <UCard>
              <UForm class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <UFormField label="Voornaam" required>
                    <UInput placeholder="Je voornaam" icon="i-mdi-account" />
                  </UFormField>
                  <UFormField label="Achternaam" required>
                    <UInput placeholder="Je achternaam" />
                  </UFormField>
                </div>

                <UFormField label="E-mailadres" required>
                  <UInput
                    type="email"
                    placeholder="je@email.nl"
                    icon="i-mdi-email"
                  />
                </UFormField>

                <UFormField label="Telefoonnummer">
                  <UInput
                    type="tel"
                    placeholder="+31 6 12 34 56 78"
                    icon="i-mdi-phone"
                  />
                </UFormField>

                <UFormField label="Onderwerp" required>
                  <USelect
                    :items="[
                      'Algemene vraag',
                      'Afspraak maken',
                      'Behandeling informatie',
                      'Tarieven',
                      'Anders',
                    ]"
                    placeholder="Selecteer een onderwerp"
                  />
                </UFormField>

                <UFormField label="Bericht" required>
                  <UTextarea
                    placeholder="Vertel me waar ik je mee kan helpen..."
                    :rows="5"
                  />
                </UFormField>

                <div class="flex items-start gap-3">
                  <UCheckbox />
                  <p class="text-sm text-neutral-600">
                    Ik ga akkoord met de
                    <ULink
                      to="/privacy"
                      class="text-primary-600 hover:underline"
                    >
                      privacyverklaring
                    </ULink>
                    en geef toestemming voor het verwerken van mijn gegevens.
                  </p>
                </div>

                <UButton type="submit" size="lg" block icon="i-mdi-send">
                  Verstuur Bericht
                </UButton>
              </UForm>
            </UCard>

            <!-- Contact Info -->
            <UAlert
              class="mt-6"
              icon="i-mdi-information-outline"
              color="primary"
              variant="subtle"
              title="Reactietijd"
              description="Ik reageer meestal binnen 24 uur op berichten. Voor urgente vragen kun je beter bellen of WhatsApp gebruiken."
            />
          </div>
        </div>
      </div>
    </UContainer>

    <!-- FAQ Section -->
    <section class="bg-neutral-50 py-16 sm:py-24">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Veelgestelde Vragen
          </h2>
          <p class="text-neutral-600 text-center mb-12">
            Vind snel antwoorden op de meest gestelde vragen, of bekijk onze
            uitgebreide FAQ pagina.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <UCard>
              <template #header>
                <h3 class="font-semibold">Hoe maak ik een afspraak?</h3>
              </template>
              <p class="text-neutral-600 text-sm">
                Je kunt online boeken via onze website, bellen, mailen of
                WhatsApp gebruiken. Online boeken is 24/7 beschikbaar.
              </p>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="font-semibold">Wat moet ik meenemen?</h3>
              </template>
              <p class="text-neutral-600 text-sm">
                Je hoeft niets mee te nemen. Handdoeken en alle benodigdheden
                zijn aanwezig. Draag comfortabele kleding die je makkelijk uit
                kunt trekken.
              </p>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="font-semibold">Kan ik afzeggen?</h3>
              </template>
              <p class="text-neutral-600 text-sm">
                Afzeggen kan tot 24 uur van tevoren zonder kosten. Bij late
                afzegging of no-show wordt 50% van het tarief berekend.
              </p>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="font-semibold">Worden de kosten vergoed?</h3>
              </template>
              <p class="text-neutral-600 text-sm">
                Sommige zorgverzekeraars vergoeden massagetherapie via de
                aanvullende verzekering. Check dit bij je verzekeraar.
              </p>
            </UCard>
          </div>

          <div class="text-center">
            <UButton to="/faq" variant="outline" icon="i-mdi-help-circle">
              Bekijk Alle Vragen
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Map Section -->
    <section class="py-16 sm:py-24">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Locatie & Bereikbaarheid
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <!-- Map Placeholder -->
            <UCard>
              <div
                class="bg-neutral-100 h-80 flex items-center justify-center rounded-lg"
              >
                <div class="text-center">
                  <UIcon
                    name="i-mdi-map"
                    class="w-16 h-16 text-neutral-400 mx-auto mb-4"
                  />
                  <p class="text-neutral-500">Google Maps embed</p>
                  <p class="text-sm text-neutral-400">
                    Hier komt de interactieve kaart
                  </p>
                </div>
              </div>
            </UCard>

            <!-- Directions -->
            <div>
              <div class="space-y-4">
                <UCard>
                  <template #header>
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-mdi-car"
                        class="w-5 h-5 text-primary-500"
                      />
                      <span class="font-medium">Met de auto</span>
                    </div>
                  </template>
                  <p class="text-neutral-600 text-sm">
                    Gratis parkeren direct voor de deur. Vanaf de A10 ring
                    Amsterdam, afrit S109 richting centrum.
                  </p>
                </UCard>

                <UCard>
                  <template #header>
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-mdi-train"
                        class="w-5 h-5 text-secondary-500"
                      />
                      <span class="font-medium">Openbaar vervoer</span>
                    </div>
                  </template>
                  <p class="text-neutral-600 text-sm">
                    5 minuten lopen vanaf tramhalte Voorbeeldplein (lijn 2, 5).
                    Vanaf Amsterdam Centraal 20 minuten met tram.
                  </p>
                </UCard>

                <UCard>
                  <template #header>
                    <div class="flex items-center gap-2">
                      <UIcon name="i-mdi-bike" class="w-5 h-5 text-green-500" />
                      <span class="font-medium">Met de fiets</span>
                    </div>
                  </template>
                  <p class="text-neutral-600 text-sm">
                    Fietsenstalling beschikbaar achter het pand. Goed bereikbaar
                    via de grote fietspaden.
                  </p>
                </UCard>
              </div>

              <div class="mt-6">
                <UButton
                  href="https://maps.google.com"
                  target="_blank"
                  variant="outline"
                  icon="i-mdi-directions"
                  block
                >
                  Open in Google Maps
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
