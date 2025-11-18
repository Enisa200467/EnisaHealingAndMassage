<script setup lang="ts">
// SEO meta tags
useSeoMeta({
  title: 'Admin Inloggen - Enisa Healing & Massage',
  description: 'Login pagina voor admin beheer van Enisa Healing & Massage',
  robots: 'noindex, nofollow',
});

const supabase = useSupabaseClient();
const toast = useToast();
const router = useRouter();

// Form state
const formData = reactive({
  email: '',
  password: '',
});
const isLoading = ref(false);
const errors = ref<{ email?: string; password?: string; general?: string }>({});

// Validation
const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!formData.email) {
    errors.value.email = 'E-mailadres is verplicht';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.value.email = 'Voer een geldig e-mailadres in';
    isValid = false;
  }

  if (!formData.password) {
    errors.value.password = 'Wachtwoord is verplicht';
    isValid = false;
  }

  return isValid;
};

// Handle login
const handleLogin = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  errors.value = {};

  try {
    // Try Supabase authentication
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Supabase auth succeeded
    toast.add({
      title: 'Succesvol ingelogd',
      description: 'Welkom terug in het admin beheer',
      color: 'success',
      icon: 'i-mdi-check-circle',
    });

    router.push('/admin');
  } catch (error: any) {
    errors.value.general =
      error?.statusMessage ||
      error?.message ||
      'Er is iets misgegaan bij het inloggen';

    toast.add({
      title: 'Login mislukt',
      description: errors.value.general,
      color: 'error',
      icon: 'i-mdi-alert-circle',
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 sm:py-16"
  >
    <UContainer>
      <div class="max-w-md mx-auto">
        <UCard class="shadow-xl border border-neutral-200">
          <template #header>
            <div class="flex items-center justify-center">
              <div class="text-center">
                <h1 class="text-2xl font-bold text-neutral-900">
                  Admin Inloggen
                </h1>
                <p class="text-sm text-neutral-600 mt-1">
                  Log in om het admin panel te beheren
                </p>
              </div>
            </div>
          </template>

          <UForm :state="formData" class="space-y-6" @submit="handleLogin">
            <!-- Email Field -->
            <UFormField label="E-mailadres" required :error="errors.email">
              <UInput
                v-model="formData.email"
                type="email"
                placeholder="admin@enisahealing.nl"
                icon="i-mdi-email"
                autocomplete="username"
              />
            </UFormField>

            <!-- Password Field -->
            <UFormField label="Wachtwoord" required :error="errors.password">
              <UInput
                v-model="formData.password"
                type="password"
                placeholder="••••••••"
                icon="i-mdi-lock"
                autocomplete="current-password"
              />
            </UFormField>

            <!-- General Error Message -->
            <UAlert
              v-if="errors.general"
              color="error"
              variant="soft"
              icon="i-mdi-alert-circle"
              title="Login mislukt"
              :description="errors.general"
            />

            <!-- Submit Button -->
            <UButton
              type="submit"
              block
              color="primary"
              :loading="isLoading"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Bezig met inloggen...' : 'Inloggen' }}
            </UButton>
          </UForm>

          <template #footer>
            <div class="flex justify-center items-center">
              <ULink
                to="/"
                class="text-sm text-neutral-600 hover:text-primary-600"
              >
                <UIcon
                  name="i-mdi-arrow-left"
                  class="w-4 h-4 inline-block mr-1"
                />
                Terug naar homepage
              </ULink>
            </div>
          </template>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
