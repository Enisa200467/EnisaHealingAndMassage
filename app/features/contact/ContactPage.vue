<script setup lang="ts">
// Keep import for future use when email contact is re-enabled
// import { useContact } from './composables/useContact';
// import type { ContactFormData } from './types/contact.types';

// const { submitContactForm } = useContact();

// Keep form submission logic for future use when email contact is re-enabled
// Track form submission state
// const isSuccess = ref(false);
// const isError = ref(false);
// const errorMessage = ref('');

// Handle form submission
// const handleSubmit = async (data: ContactFormData) => {
//   // Reset states
//   isSuccess.value = false;
//   isError.value = false;
//   errorMessage.value = '';

//   const result = await submitContactForm(data);

//   if (result.success) {
//     isSuccess.value = true;
//   } else {
//     isError.value = true;
//     errorMessage.value = result.error?.message || 'Er is iets misgegaan. Probeer het later opnieuw.';
//   }
// };

</script>

<template>
  <div>
    <ContactHero />

    <!-- Main Content -->
    <PageSection primary aria-label="Contactgegevens">
      <div class="max-w-3xl mx-auto">
        <ContactInfo />
        <!-- Contact form disabled - uncomment to re-enable email contact -->
        <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <ContactInfo />
          <ContactForm
            :is-success="isSuccess"
            :is-error="isError"
            :error-message="errorMessage"
            @submit="handleSubmit"
          />
        </div> -->
      </div>
    </PageSection>

    <ContactFAQ />
    <ContactMap />
  </div>
</template>
