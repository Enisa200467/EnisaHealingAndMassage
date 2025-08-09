<script setup lang="ts">
import type { Treatment, TreatmentFormData } from './types/treatment.types';

// SEO Meta
useSeoMeta({
  title: 'Behandelingen Beheer - Admin Dashboard',
  description:
    'Beheer alle behandelingen en hun details in het admin dashboard.',
  robots: 'noindex, nofollow',
});

// Authentication check
const user = useSupabaseUser();
const router = useRouter();

// Redirect if not authenticated
watch(
  user,
  (newUser) => {
    if (!newUser) {
      router.push('/admin/login');
    }
  },
  { immediate: true }
);

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
type ViewState = 'list' | 'create' | 'edit' | 'delete';
const currentView = ref<ViewState>('list');
const editingTreatment = ref<Treatment | null>(null);
const deletingTreatment = ref<Treatment | null>(null);

// Form data
const formData = ref<TreatmentFormData>({
  name: '',
  description: '',
  duration_minutes: 60,
  price_euros: 65,
  intensity: 2,
  intensity_label: '',
  icon: '',
  category: '',
  display_order: 0,
  is_active: true,
});

// Reset form data
const resetFormData = () => {
  formData.value = {
    name: '',
    description: '',
    duration_minutes: 60,
    price_euros: 65,
    intensity: 2,
    intensity_label: '',
    icon: '',
    category: '',
    display_order: treatments.value.length,
    is_active: true,
  };
};

// Handle create treatment
const handleCreate = () => {
  resetFormData();
  currentView.value = 'create';
};

// Handle edit treatment
const handleEdit = (treatment: Treatment) => {
  editingTreatment.value = treatment;
  formData.value = formatForForm(treatment);
  currentView.value = 'edit';
};

// Handle delete treatment
const handleDelete = (treatment: Treatment) => {
  deletingTreatment.value = treatment;
  currentView.value = 'delete';
};

// Handle form submit
const handleSubmit = async () => {
  if (editingTreatment.value) {
    // Update existing treatment
    const result = await updateTreatment(
      editingTreatment.value.id,
      formData.value
    );
    if (result) {
      currentView.value = 'list';
      editingTreatment.value = null;
    }
  } else {
    // Create new treatment
    const result = await createTreatment(formData.value);
    if (result) {
      currentView.value = 'list';
    }
  }
};

// Handle form cancel
const handleCancel = () => {
  currentView.value = 'list';
  editingTreatment.value = null;
  resetFormData();
};

// Confirm delete
const confirmDelete = async () => {
  if (deletingTreatment.value) {
    const success = await deleteTreatment(deletingTreatment.value.id);
    if (success) {
      currentView.value = 'list';
      deletingTreatment.value = null;
    }
  }
};

// Cancel delete
const cancelDelete = () => {
  currentView.value = 'list';
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
const isAuthenticated = computed(() => !!user.value);
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
        Authenticating...
      </h1>
      <p class="text-neutral-600">
        Please wait while we verify your credentials.
      </p>
    </div>
  </div>
</template>
