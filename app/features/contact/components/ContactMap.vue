<script setup lang="ts">
import { BUSINESS_INFO, getGoogleMapsUrl } from '~/constants/businessInfo';

// Map and location information for contact page
const businessLocation = BUSINESS_INFO.location;
const businessAddress = BUSINESS_INFO.address;
const googleMapsUrl = getGoogleMapsUrl();
</script>

<template>
  <PageSection primary>
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-neutral-900 mb-8 text-center">
        Locatie & Bereikbaarheid
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <!-- Interactive Google Map -->
        <UCard>
          <GoogleMap
            :latitude="businessLocation.latitude"
            :longitude="businessLocation.longitude"
            :zoom="16"
            :marker-title="BUSINESS_INFO.name"
            height="320px"
          />
        </UCard>

        <!-- Directions -->
        <div>
          <div class="space-y-4">
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-mdi-car" class="w-5 h-5 text-primary-500" />
                  <span class="font-medium">Met de auto</span>
                </div>
              </template>
              <p class="text-neutral-600 text-sm">
                Vanaf de A10 Ring Amsterdam neem je de afrit S118 richting
                IJplein / Amsterdam Noord.<br>
                Rijd naar IJplein 69.<br>
                Er is betaald parkeren rondom IJplein en in de buurt van het
                gebouw (meestal ± € 2,50 per uur).
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
                <span class="font-medium">Veerboot:</span><br>
                Vanaf Amsterdam Centraal neem je de GVB-veerboot (lijn F2)
                naar IJplein.<br>
                De overtocht duurt ongeveer 5 minuten.<br>
                Vanaf de veerboot is het slechts 1–2 minuten lopen naar IJplein
                69.<br><br>

                <span class="font-medium"
                  >Met metro en bus (vanuit Amsterdam of Amsterdam
                  Centraal):</span
                ><br>
                Neem metro 52 (Noord/Zuidlijn) en stap uit bij station
                Noord.<br>
                Vanaf station Noord neem je bus 38 en stap je uit bij halte
                Valkenweg.<br>
                Vanaf daar is het ongeveer 350 meter lopen (± 5 minuten) naar
                IJplein 69.
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
                Fietsenstalling beschikbaar achter het pand. Goed bereikbaar via
                de grote fietspaden.
              </p>
            </UCard>
          </div>

          <div class="mt-6">
            <UButton
              :href="googleMapsUrl"
              target="_blank"
              variant="outline"
              icon="i-mdi-directions"
              block
            >
              Routebeschrijving in Google Maps
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </PageSection>
</template>
