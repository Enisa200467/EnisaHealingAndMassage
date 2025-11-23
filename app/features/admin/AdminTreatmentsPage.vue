<script setup lang="ts">
import type { Treatment, TreatmentFormData } from "./types/treatment.types";

// SEO Meta
useSeoMeta({
  title: "Behandelingen Beheer - Beheer Dashboard",
  description:
    "Beheer alle behandelingen en hun details in het admin dashboard.",
  robots: "noindex, nofollow",
});

// Authentication check - let Supabase handle redirects
const user = useSupabaseUser();

// Client-side sanitization (defense in depth - server still validates)
const { sanitizeFormData } = useSanitize();

// Treatment management
const {
  treatments,
  loading,
  error,
  fetchTreatments,
  createTreatment,
  updateTreatment,
  deleteTreatment,
  toggleTreatmentStatus,
  formatForForm,
} = useAdminTreatments();

// View states
type ViewState = "list" | "create" | "edit" | "delete" | "calendar";
const currentView = ref<ViewState>("list");
const editingTreatment = ref<Treatment | null>(null);
const deletingTreatment = ref<Treatment | null>(null);

// Form data
const defaultFormData = {
  name: "",
  description: "",
  duration_minutes: 60,
  price_euros: 65,
  discount_enabled: false,
  package_enabled: false,
  discount_price_euros: 0,
  package_price_euros: 0,
  package_sessions: 0,
  icon: "",
  display_order: 0,
  is_active: true,
};

const formData = ref<TreatmentFormData>(defaultFormData);
// Reset form data
const resetFormData = () => {
  formData.value = defaultFormData;
};

// Handle create treatment
const handleCreate = () => {
  resetFormData();
  currentView.value = "create";
};

// Handle edit treatment
const handleEdit = (treatment: Treatment) => {
  editingTreatment.value = treatment;
  formData.value = formatForForm(treatment);
  currentView.value = "edit";
};

// Handle delete treatment
const handleDelete = (treatment: Treatment) => {
  deletingTreatment.value = treatment;
  currentView.value = "delete";
};

const shouldShowCmsWarning = ref(true);

// Handle form submit
const handleSubmit = async () => {
  // Sanitize form data before submission
  const sanitizedData = sanitizeFormData(formData.value);

  if (editingTreatment.value) {
    // Update existing treatment
    const result = await updateTreatment(
      editingTreatment.value.id,
      sanitizedData,
    );
    if (result) {
      currentView.value = "calendar";
      editingTreatment.value = null;
    }
  } else {
    // Create new treatment
    const result = await createTreatment(sanitizedData);
    if (result) {
      currentView.value = "calendar";
      shouldShowCmsWarning.value = true;
    }
  }
};

// Handle form cancel
const handleCancel = () => {
  currentView.value = "list";
  editingTreatment.value = null;
  resetFormData();
};

// Confirm delete
const confirmDelete = async () => {
  if (deletingTreatment.value) {
    const success = await deleteTreatment(deletingTreatment.value.id);
    if (success) {
      currentView.value = "list";
      deletingTreatment.value = null;
    }
  }
};

// Cancel delete
const cancelDelete = () => {
  currentView.value = "list";
  deletingTreatment.value = null;
};

// Handle status toggle
const handleToggleStatus = async (treatment: Treatment) => {
  await toggleTreatmentStatus(treatment.id, !treatment.is_active);
};

// Fetch treatments on mount
onMounted(() => {
  fetchTreatments();
});

// Only render if user is authenticated
// TODO auth guard?
const isAuthenticated = computed(() => user.value?.role === "authenticated");
</script>

<template>
  <div v-if="isAuthenticated">
    <UContainer class="py-8">
      <!-- Admin Navigation -->
      <AdminNavigation />

      <!-- Error Alert -->
      <UAlert
        v-if="error"
        icon="i-mdi-alert-circle"
        color="error"
        variant="soft"
        :title="error"
        :close-button="{ icon: 'i-mdi-close', color: 'error', variant: 'link' }"
        class="mb-6"
        @close="error = null"
      />

      <!-- Treatments List -->
      <div v-if="currentView === 'list'">
        <TreatmentsList
          :treatments="treatments"
          :loading="loading"
          @create="handleCreate"
          @edit="handleEdit"
          @delete="handleDelete"
          @toggle-status="handleToggleStatus"
        />
      </div>

      <!-- Create Treatment Form -->
      <div v-else-if="currentView === 'create'">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <UButton
                  variant="ghost"
                  icon="i-mdi-arrow-left"
                  size="sm"
                  @click="handleCancel"
                />
                <h2 class="text-2xl font-bold text-neutral-900">
                  Nieuwe Behandeling Toevoegen
                </h2>
              </div>
            </div>
          </template>

          <TreatmentForm
            v-model="formData"
            :loading="loading"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </UCard>
      </div>

      <!-- Edit Treatment Form -->
      <div v-else-if="currentView === 'edit'">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <UButton
                  variant="ghost"
                  icon="i-mdi-arrow-left"
                  size="sm"
                  @click="handleCancel"
                />
                <h2 class="text-2xl font-bold text-neutral-900">
                  {{ editingTreatment?.name }} Bewerken
                </h2>
              </div>
            </div>
          </template>

          <TreatmentForm
            v-model="formData"
            :loading="loading"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </UCard>
      </div>

      <!-- Calendar Manager -->
      <div v-else-if="currentView === 'calendar'">
        <UCard>
          <UAlert
            color="warning"
            variant="subtle"
            icon="i-lucide-triangle-alert"
            title="Vergeet niet om de behandeling te controleren!"
          >
            <template #description>
              <p>
                Controleer of de behandeling correct staat in
                <a
                  href="https://go.setmore.com/easy-share"
                  target="_blank"
                  class="underline font-medium text-blue-600"
                  >setmore</a
                >.
              </p>

              <p v-if="shouldShowCmsWarning">
                Voeg de behandeling ook toe aan
                <a
                  href="https://nuxt.studio/Enisa200467/enisa-healing-and-massage/content?valueId=treatments&refId=main"
                  target="_blank"
                  class="underline font-medium text-blue-600"
                  >Nuxt Studio</a
                >.
              </p>
            </template>
            <template #actions>
              <UButton variant="outline" @click="currentView = 'list'">
                Terug naar Behandelingen Lijst
              </UButton>
            </template>
          </UAlert>
        </UCard>
      </div>

      <!-- Delete Confirmation -->
      <div v-else-if="currentView === 'delete'">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <UButton
                  variant="ghost"
                  icon="i-mdi-arrow-left"
                  size="sm"
                  @click="cancelDelete"
                />
                <h2 class="text-2xl font-bold text-error-900">
                  Behandeling Verwijderen
                </h2>
              </div>
            </div>
          </template>

          <div class="space-y-6">
            <div
              class="flex items-center space-x-4 p-6 bg-error-50 rounded-lg border border-error-200"
            >
              <UIcon
                name="i-mdi-alert-circle"
                class="w-12 h-12 text-error-600 flex-shrink-0"
              />
              <div>
                <h3 class="text-lg font-semibold text-error-900 mb-2">
                  Weet je zeker dat je deze behandeling wilt verwijderen?
                </h3>
                <p class="text-error-800 font-medium">
                  {{ deletingTreatment?.name }}
                </p>
                <p class="text-sm text-error-700 mt-1">
                  Deze actie kan niet ongedaan worden gemaakt. Alle gegevens van
                  deze behandeling zullen permanent worden verwijderd.
                </p>
              </div>
            </div>

            <div class="flex justify-end space-x-3">
              <UButton
                variant="outline"
                :disabled="loading"
                @click="cancelDelete"
              >
                Annuleren
              </UButton>

              <UButton color="error" :loading="loading" @click="confirmDelete">
                Definitief Verwijderen
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-neutral-900 mb-4">
        Bezig met authenticeren...
      </h1>
      <p class="text-neutral-600">
        Even geduld terwijl we je gegevens verifiëren.
      </p>
    </div>
  </div>
</template>
