<script setup lang="ts">
interface Emits {
  (e: "nav-to-content"): void;
}

const emit = defineEmits<Emits>();

const handleNavigateToContent = () => {
  emit("nav-to-content");
};
</script>

<template>
  <section id="create-treatment" class="scroll-mt-8">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-bold flex items-center gap-3">
          <UIcon name="i-mdi-plus-circle" class="w-6 h-6 text-green-600" />
          Nieuwe Behandeling Aanmaken
        </h2>
      </template>

      <div class="prose prose-neutral max-w-none">
        <h3 class="text-xl font-bold text-gray-900 mb-4">
          Stap 1: Database Record
        </h3>
        <ol class="space-y-3 mb-8">
          <li>
            <NuxtLink
              to="/admin/treatments"
              class="text-blue-600 hover:text-blue-800 underline font-semibold"
            >
              Ga naar Admin → Behandelingen
            </NuxtLink>
          </li>
          <li>Klik "Nieuwe Behandeling"</li>
          <li>
            Vul alle velden in (naam, prijs, duur, icoon, etc.)
            <div
              class="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2 text-sm"
            >
              <strong>⚠️ Belangrijk:</strong> Voeg ook toe aan
              <a
                href="https://www.setmore.com/"
                target="_blank"
                rel="noopener"
                class="text-blue-600 underline"
                >Setmore</a
              >
              met identieke prijs!
            </div>
          </li>
          <li>
            Opslaan en <strong>kopieer het UUID</strong> (database ID)
          </li>
        </ol>

        <h3 class="text-xl font-bold text-gray-900 mb-4">
          Stap 2: Content Bestand (Dupliceer!)
        </h3>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <div class="flex items-start gap-4">
            <UIcon
              name="i-mdi-content-copy"
              class="w-7 h-7 text-blue-600 mt-1"
            />
            <div>
              <p class="text-blue-900 font-semibold mb-2">
                Beste Methode: Dupliceer Bestaand Bestand
              </p>
              <ol class="text-blue-800 space-y-1 text-sm mb-3">
                <li>
                  1. Open Nuxt Studio → <code>/content/treatments/</code>
                </li>
                <li>
                  2. Dupliceer <code>chakra-balancering.md</code> (of
                  vergelijkbare)
                </li>
                <li>3. Hernoem naar je nieuwe slug (exact zoals database)</li>
                <li>4. Vervang UUID in <code>::behandeling-hero</code></li>
                <li>5. Pas content aan en publiceer</li>
              </ol>
              <button
                class="text-sm text-blue-600 font-medium hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-lg border border-blue-300 hover:border-blue-400 flex items-center gap-2 group transition-all"
                @click="handleNavigateToContent"
              >
                <span>Content Beheer Details</span>
                <UIcon
                  name="i-mdi-arrow-right"
                  class="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </section>
</template>
