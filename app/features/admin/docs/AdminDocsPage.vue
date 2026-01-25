<script setup lang="ts">
// Admin documentation page - Codex content editing guide
useSeoMeta({
  title: "Content Editing via Codex",
  description: "Guide for editing website content using Codex AI assistant",
  robots: "noindex, nofollow",
});

definePageMeta({
  layout: false,
});

const routes = useRoutes();

// Prompt generator state
const promptForm = reactive({
  url: "",
  originalText: "",
  newText: "",
});

const generatedPrompt = ref("");
const showCopied = ref(false);

// Generate prompt
const generatePrompt = () => {
  if (!promptForm.url || !promptForm.originalText || !promptForm.newText) {
    return;
  }

  // Extract path from URL
  let contentPath = "";
  try {
    const url = new URL(promptForm.url);
    const path = url.pathname;

    // Map URL paths to content paths
    if (path.startsWith("/behandelingen/")) {
      const slug = path.replace("/behandelingen/", "").replace(/\/$/, "");
      contentPath = `content/behandelingen/${slug}.md`;
    } else if (path === "/" || path === "") {
      contentPath = "content/index.md";
    } else {
      // Generic content path
      contentPath = `content${path}.md`;
    }
  } catch {
    contentPath = "content/[path-to-file].md";
  }

  generatedPrompt.value = `Update the following text in ${contentPath}:

Original text:
"${promptForm.originalText}"

Replace with:
"${promptForm.newText}"

Please update this content and verify the change.`;

  // Auto-copy to clipboard
  copyToClipboard();
};

const copyToClipboard = async () => {
  if (!generatedPrompt.value) return;

  try {
    await navigator.clipboard.writeText(generatedPrompt.value);
    showCopied.value = true;
    setTimeout(() => {
      showCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

const resetForm = () => {
  promptForm.url = "";
  promptForm.originalText = "";
  promptForm.newText = "";
  generatedPrompt.value = "";
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/20 to-neutral-50"
  >
    <UContainer class="py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <UButton
            :to="routes.admin.dashboard"
            variant="ghost"
            icon="i-mdi-arrow-left"
            size="sm"
          >
            Terug naar Admin
          </UButton>
        </div>

        <div class="flex items-center gap-3 mb-4">
          <UIcon name="i-mdi-robot" class="w-10 h-10 text-primary-600" />
          <h1 class="text-4xl font-bold text-neutral-900">
            Content Editing met Codex
          </h1>
        </div>

        <p class="text-xl text-neutral-600">
          Alle content aanpassingen gebeuren via de Codex AI assistant
        </p>
      </div>

      <!-- Main Content - Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column: Instructions & Examples -->
        <div class="space-y-6">
          <!-- Primary Workflow Card -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-mdi-alert-circle"
                  class="w-6 h-6 text-primary-600"
                />
                <h2 class="text-2xl font-bold text-neutral-900">
                  Belangrijke Regel
                </h2>
              </div>
            </template>

            <div class="prose prose-neutral max-w-none">
              <div
                class="p-4 bg-primary-100 border-l-4 border-primary-600 rounded-r"
              >
                <p class="text-lg font-semibold text-primary-900 mb-2">
                  Alle content aanpassingen moeten via Codex
                </p>
                <p class="text-neutral-700 mb-0">
                  Gebruik <strong>altijd</strong> de Codex AI assistant voor het
                  bewerken van website content. Dit zorgt voor consistentie,
                  versionering via GitHub, en preview deploys.
                </p>
              </div>
            </div>
          </UCard>

          <!-- How It Works -->
          <UCard>
            <template #header>
              <h3 class="text-xl font-bold text-neutral-900">Hoe het werkt</h3>
            </template>

            <div class="space-y-4">
              <div class="flex gap-4">
                <div
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center"
                >
                  1
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900 mb-1">
                    Bezoek de website
                  </h4>
                  <p class="text-neutral-600 text-sm">
                    Navigeer naar de pagina die je wilt aanpassen en kopieer de
                    URL
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center"
                >
                  2
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900 mb-1">
                    Identificeer de tekst
                  </h4>
                  <p class="text-neutral-600 text-sm">
                    Selecteer en kopieer de exacte tekst die je wilt wijzigen
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center"
                >
                  3
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900 mb-1">
                    Schrijf nieuwe tekst
                  </h4>
                  <p class="text-neutral-600 text-sm">
                    Formuleer de nieuwe tekst die je wilt gebruiken
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center"
                >
                  4
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900 mb-1">
                    Geef opdracht aan Codex
                  </h4>
                  <p class="text-neutral-600 text-sm">
                    Gebruik het prompt generator formulier hiernaast of schrijf
                    je eigen prompt
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center"
                >
                  5
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900 mb-1">
                    Controleer preview deploy
                  </h4>
                  <p class="text-neutral-600 text-sm">
                    Vercel maakt automatisch een preview waar je de wijziging
                    kunt controleren
                  </p>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Hoe werk je met Codex -->
          <UCard>
            <template #header>
              <h3 class="text-xl font-bold text-neutral-900">
                Hoe werk je met Codex
              </h3>
            </template>

            <ul class="space-y-3 text-sm">
              <li class="flex gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5"
                />
                <span class="text-neutral-700">
                  <strong>Geef het exacte pad mee</strong> als je het weet
                  (bijv. content/behandelingen/reiki.md)
                </span>
              </li>
              <li class="flex gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5"
                />
                <span class="text-neutral-700">
                  <strong>Kopieer de originele tekst exact</strong> inclusief
                  leestekens en hoofdletters
                </span>
              </li>
              <li class="flex gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5"
                />
                <span class="text-neutral-700">
                  <strong>Vraag om verificatie</strong> zodat Codex de wijziging
                  controleert
                </span>
              </li>
              <li class="flex gap-3">
                <UIcon
                  name="i-mdi-check-circle"
                  class="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5"
                />
                <span class="text-neutral-700">
                  <strong>Gebruik preview deploys</strong> om wijzigingen te
                  controleren voor publicatie
                </span>
              </li>
              <li class="flex gap-3">
                <UIcon
                  name="i-mdi-alert"
                  class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                />
                <span class="text-neutral-700">
                  <strong>Werk nooit direct in GitHub</strong> zonder Codex -
                  dit voorkomt fouten
                </span>
              </li>
            </ul>
          </UCard>
        </div>

        <!-- Right Column: Prompt Generator -->
        <div class="space-y-6">
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-mdi-auto-fix" class="w-6 h-6 text-primary-600" />
                <h2 class="text-2xl font-bold text-neutral-900">
                  Prompt Generator
                </h2>
              </div>
            </template>

            <div class="space-y-4">
              <p class="text-sm text-neutral-600">
                Vul onderstaand formulier in om automatisch een Codex prompt te
                genereren. De prompt wordt automatisch gekopieerd naar je
                klembord.
              </p>

              <!-- URL Input -->
              <div>
                <label
                  class="block text-sm font-semibold text-neutral-700 mb-2"
                >
                  Pagina URL
                </label>
                <UInput
                  v-model="promptForm.url"
                  placeholder="https://enisa-healing-and-massage.vercel.app/behandelingen/chakra-healing"
                  size="lg"
                  icon="i-mdi-link-variant"
                />
                <p class="text-xs text-neutral-500 mt-1">
                  De URL van de pagina die je wilt aanpassen
                </p>
              </div>

              <!-- Original Text -->
              <div>
                <label
                  class="block text-sm font-semibold text-neutral-700 mb-2"
                >
                  Originele Tekst
                </label>
                <UTextarea
                  v-model="promptForm.originalText"
                  placeholder="Kopieer hier de exacte tekst die je wilt vervangen..."
                  :rows="4"
                  size="lg"
                />
                <p class="text-xs text-neutral-500 mt-1">
                  Kopieer de tekst exact zoals deze op de website staat
                </p>
              </div>

              <!-- New Text -->
              <div>
                <label
                  class="block text-sm font-semibold text-neutral-700 mb-2"
                >
                  Nieuwe Tekst
                </label>
                <UTextarea
                  v-model="promptForm.newText"
                  placeholder="Schrijf hier de nieuwe tekst..."
                  :rows="4"
                  size="lg"
                />
                <p class="text-xs text-neutral-500 mt-1">
                  De nieuwe tekst die je wilt gebruiken
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <UButton
                  size="lg"
                  icon="i-mdi-auto-fix"
                  :disabled="
                    !promptForm.url ||
                    !promptForm.originalText ||
                    !promptForm.newText
                  "
                  @click="generatePrompt"
                >
                  Genereer Prompt
                </UButton>
                <UButton
                  variant="ghost"
                  size="lg"
                  icon="i-mdi-refresh"
                  @click="resetForm"
                >
                  Reset
                </UButton>
              </div>
            </div>
          </UCard>

          <!-- Generated Prompt Display -->
          <UCard v-if="generatedPrompt" class="border-2 border-primary-200">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-neutral-900">
                  Gegenereerde Prompt
                </h3>
                <div class="flex items-center gap-2">
                  <UBadge v-if="showCopied" color="success" variant="subtle">
                    <UIcon name="i-mdi-check" class="w-4 h-4" />
                    Gekopieerd!
                  </UBadge>
                  <UButton
                    size="sm"
                    variant="ghost"
                    icon="i-mdi-content-copy"
                    @click="copyToClipboard"
                  >
                    Kopieer
                  </UButton>
                </div>
              </div>
            </template>

            <div class="p-4 bg-neutral-900 rounded-lg">
              <pre
                class="text-sm text-neutral-100 whitespace-pre-wrap font-mono"
                >{{ generatedPrompt }}</pre
              >
            </div>

            <template #footer>
              <div class="flex items-start gap-2 p-3 bg-teal-50 rounded-lg">
                <UIcon
                  name="i-mdi-information"
                  class="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5"
                />
                <div class="text-sm text-teal-900">
                  <p class="font-semibold mb-1">Volgende stappen:</p>
                  <ol class="list-decimal list-inside space-y-1 text-teal-800">
                    <li>Plak deze prompt in Codex</li>
                    <li>Wacht tot Codex de wijziging heeft doorgevoerd</li>
                    <li>Controleer de preview deploy link van Vercel</li>
                    <li>Goedkeuren als het klopt</li>
                  </ol>
                </div>
              </div>
            </template>
          </UCard>
        </div>
      </div>

      <!-- Step-by-Step Visual Guide (Full Width Below) -->
      <div class="mt-16">
        <UCard>
          <template #header>
            <div class="text-center mb-4">
              <div class="flex items-center justify-center gap-3 mb-3">
                <UIcon name="i-mdi-walk" class="w-8 h-8 text-primary-600" />
                <h2 class="text-3xl font-bold text-neutral-900">
                  Stap-voor-Stap Handleiding
                </h2>
              </div>
              <p class="text-lg text-neutral-600">
                Volg deze simpele stappen om content aan te passen
              </p>
            </div>
          </template>

          <div class="space-y-12">
            <!-- Step 1: Open Codex -->
            <div class="border-b border-neutral-200 pb-8">
              <div class="flex items-start gap-6">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-xl flex items-center justify-center"
                >
                  1
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-neutral-900 mb-3">
                    Open Codex
                  </h3>
                  <p class="text-neutral-700 mb-4 text-lg">
                    Klik op de onderstaande knop om Codex te openen in een nieuw
                    tabblad. Dit is de AI assistent die alle wijzigingen voor je
                    doorvoert.
                  </p>
                  <div class="mb-6">
                    <UButton
                      to="https://chatgpt.com/codex"
                      target="_blank"
                      size="xl"
                      icon="i-mdi-robot"
                      color="primary"
                    >
                      Open Codex
                      <UIcon name="i-mdi-open-in-new" class="ml-2" />
                    </UButton>
                  </div>
                  <div
                    class="rounded-lg overflow-hidden border-2 border-neutral-200 shadow-lg"
                  >
                    <img
                      src="/images/admin/codex-home-screen.png"
                      alt="Computer scherm met Codex interface"
                      class="w-full object-contain"
                    />
                  </div>
                  <p class="text-sm text-neutral-500 mt-2 italic">
                    Tip: Zorg dat je bent ingelogd bij Codex
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 2: Go to Website -->
            <div class="border-b border-neutral-200 pb-8">
              <div class="flex items-start gap-6">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-xl flex items-center justify-center"
                >
                  2
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-neutral-900 mb-3">
                    Ga naar de website
                  </h3>
                  <p class="text-neutral-700 mb-4 text-lg">
                    Open je website en zoek de pagina waar je tekst wilt
                    aanpassen. Kopieer de URL (webadres) bovenaan je browser.
                  </p>
                  <div class="mb-6">
                    <UButton
                      to="https://enisa-healing-and-massage.vercel.app/"
                      target="_blank"
                      size="xl"
                      variant="outline"
                      icon="i-mdi-web"
                    >
                      Open Website
                      <UIcon name="i-mdi-open-in-new" class="ml-2" />
                    </UButton>
                  </div>
                  <div
                    class="rounded-lg overflow-hidden border-2 border-neutral-200 shadow-lg"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
                      alt="Website met behandelingen overzicht"
                      class="w-full h-64 object-cover"
                    />
                  </div>
                  <div
                    class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <p class="text-sm text-blue-900">
                      <strong>Voorbeeld URL:</strong>
                      https://enisa-healing-and-massage.vercel.app/behandelingen/chakra-healing
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Generate Prompt -->
            <div class="border-b border-neutral-200 pb-8">
              <div class="flex items-start gap-6">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-xl flex items-center justify-center"
                >
                  3
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-neutral-900 mb-3">
                    Vul het formulier in en genereer de prompt
                  </h3>
                  <div class="space-y-4 text-neutral-700 text-lg mb-6">
                    <p><strong>Stap A:</strong> Kopieer de URL van de pagina</p>
                    <p>
                      <strong>Stap B:</strong> Selecteer en kopieer de tekst die
                      je wilt vervangen (precies zoals het er staat!)
                    </p>
                    <p>
                      <strong>Stap C:</strong> Schrijf de nieuwe tekst die je
                      wilt gebruiken
                    </p>
                    <p>
                      <strong>Stap D:</strong> Klik op "Genereer Prompt" - de
                      tekst wordt automatisch gekopieerd
                    </p>
                  </div>
                  <div
                    class="rounded-lg overflow-hidden border-2 border-neutral-200 shadow-lg"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop"
                      alt="Formulier invullen op computer"
                      class="w-full h-64 object-cover"
                    />
                  </div>
                  <div
                    class="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200"
                  >
                    <p class="text-sm text-amber-900">
                      <strong>Let op:</strong> Kopieer de originele tekst exact
                      zoals deze op de website staat, inclusief hoofdletters en
                      leestekens!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 4: Paste in Codex -->
            <div class="border-b border-neutral-200 pb-8">
              <div class="flex items-start gap-6">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-xl flex items-center justify-center"
                >
                  4
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-neutral-900 mb-3">
                    Plak de prompt in Codex
                  </h3>
                  <p class="text-neutral-700 mb-6 text-lg">
                    Ga terug naar het Codex tabblad en plak de gegenereerde
                    prompt in het invoerveld onderaan. Druk op Enter of klik op
                    de verstuur knop.
                  </p>
                  <div
                    class="rounded-lg overflow-hidden border-2 border-primary-300 shadow-lg"
                  >
                    <img
                      src="/images/admin/codex-home-screen.png"
                      alt="Tekst plakken in chat interface"
                      class="w-full object-contain"
                    />
                  </div>
                  <div
                    class="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200"
                  >
                    <p class="text-sm text-teal-900">
                      <strong>Wat gebeurt er nu?</strong> Codex leest je
                      opdracht, zoekt het juiste bestand, en voert de wijziging
                      door. Dit duurt ongeveer 5 minuten.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 5: View PR -->
            <div class="border-b border-neutral-200 pb-8">
              <div class="flex items-start gap-6">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-xl flex items-center justify-center"
                >
                  5
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-neutral-900 mb-3">
                    Klik op "PR bekijken"
                  </h3>
                  <p class="text-neutral-700 mb-6 text-lg">
                    Als Codex klaar is, zie je een link met de tekst
                    <strong>"PR bekijken"</strong> of
                    <strong>"View PR"</strong>. Klik op deze link om de
                    wijziging te bekijken.
                  </p>
                  <div
                    class="rounded-lg overflow-hidden border-2 border-neutral-200 shadow-lg"
                  >
                    <img
                      src="/images/admin/codex-pr-bekijken.png"
                      alt="Link naar pull request bekijken"
                      class="w-full object-contain"
                    />
                  </div>
                  <div
                    class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <p class="text-sm text-blue-900">
                      <strong>Wat is een PR?</strong> PR staat voor "Pull
                      Request" - dit is een voorstel voor een wijziging. Je kunt
                      het bekijken en goedkeuren voordat het live gaat.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 6: Preview from Vercel -->
            <div class="border-b border-neutral-200 pb-8">
              <div class="flex items-start gap-6">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-xl flex items-center justify-center"
                >
                  6
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-neutral-900 mb-3">
                    Bekijk de preview van Vercel
                  </h3>
                  <p class="text-neutral-700 mb-6 text-lg">
                    Scroll naar beneden op de PR pagina. Je ziet een bericht van
                    <strong>"vercel bot"</strong>. Klik op de link
                    <strong>"Preview bekijken"</strong> of
                    <strong>"Visit Preview"</strong>. Dit duurt ook ongeveer 5
                    minuten.
                  </p>
                  <div
                    class="rounded-lg overflow-hidden border-2 border-neutral-200 shadow-lg"
                  >
                    <img
                      src="/images/admin/preview-vercel.png"
                      alt="Vercel preview deploy link"
                      class="w-full object-contain"
                    />
                  </div>
                  <div
                    class="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200"
                  >
                    <p class="text-sm text-purple-900">
                      <strong>Wat zie je nu?</strong> Een exacte kopie van je
                      website met de nieuwe wijziging. Je kunt alles controleren
                      zonder dat bezoekers het zien!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 7: Bypass Rules -->
            <div class="border-b border-neutral-200 pb-8">
              <div class="flex items-start gap-6">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500 text-white font-bold text-xl flex items-center justify-center"
                >
                  7
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-neutral-900 mb-3">
                    Klik op "Bypass branch protections"
                  </h3>
                  <p class="text-neutral-700 mb-6 text-lg">
                    Als alles er goed uitziet in de preview, ga je terug naar de PR pagina.
                    Scroll naar beneden naar de groene "Merge pull request" knop. 
                    Klik <strong>eerst</strong> op het kleine pijltje naast de knop en selecteer 
                    <strong>"Bypass branch protections"</strong>.
                  </p>
                  <div
                    class="rounded-lg overflow-hidden border-2 border-amber-300 shadow-lg"
                  >
                    <img
                      src="/images/admin/click-to-bypass-rules.png"
                      alt="Bypass branch protections selecteren"
                      class="w-full object-contain"
                    />
                  </div>
                  <div
                    class="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200"
                  >
                    <p class="text-sm text-amber-900">
                      <strong>Waarom deze stap?</strong> Dit is een beveiligingsmaatregel die je moet 
                      overslaan om wijzigingen door te voeren. Geen zorgen, dit is normaal!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 8: Confirm Merge -->
            <div>
              <div class="flex items-start gap-6">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500 text-white font-bold text-xl flex items-center justify-center"
                >
                  8
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-neutral-900 mb-3">
                    Bevestig en publiceer
                  </h3>
                  <p class="text-neutral-700 mb-6 text-lg">
                    Nu klik je op de groene knop <strong>"Merge pull request"</strong> 
                    en daarna op <strong>"Confirm merge"</strong>. 
                    De wijziging gaat nu live op je website!
                  </p>
                  <div
                    class="rounded-lg overflow-hidden border-2 border-teal-300 shadow-lg"
                  >
                    <img
                      src="/images/admin/click-to-confirm-merge.png"
                      alt="Confirm merge knop"
                      class="w-full object-contain"
                    />
                  </div>
                  <div
                    class="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200 space-y-2"
                  >
                    <p class="text-sm text-teal-900">
                      <strong>Hoelang duurt het?</strong> Na het goedkeuren
                      duurt het ongeveer 2-3 minuten voordat de wijziging op de
                      echte website zichtbaar is.
                    </p>
                    <p class="text-sm text-teal-900">
                      <strong>Klopt er iets niet?</strong> Geen zorgen! Je kunt
                      de wijziging altijd terugdraaien door Codex te vragen om
                      het terug te zetten.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <template #footer>
            <div
              class="p-6 bg-gradient-to-r from-primary-50 to-teal-50 rounded-lg border border-primary-200"
            >
              <div class="flex items-start gap-4">
                <UIcon
                  name="i-mdi-party-popper"
                  class="w-8 h-8 text-primary-600 flex-shrink-0"
                />
                <div>
                  <h4 class="text-xl font-bold text-neutral-900 mb-2">
                    Gefeliciteerd! 🎉
                  </h4>
                  <p class="text-neutral-700 text-lg">
                    Je hebt zojuist je eerste content wijziging doorgevoerd via
                    Codex. Bij elke volgende keer zal het steeds makkelijker
                    gaan. Als je vragen hebt of ergens blijft steken, vraag het
                    gewoon aan Codex - de AI assistent helpt je graag verder!
                  </p>
                </div>
              </div>
            </div>
          </template>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
