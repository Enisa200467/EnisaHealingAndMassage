<script setup lang="ts">
interface Section {
  id: string;
  label: string;
}

interface Props {
  sections: Section[];
}

interface Emits {
  (e: 'scroll-to', sectionId: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<template>
  <div class="xl:col-span-1">
    <UCard class="sticky top-8">
      <template #header>
        <h2 class="font-semibold flex items-center gap-2">
          <UIcon name="i-mdi-format-list-bulleted" class="w-5 h-5" />
          Inhoudsopgave
        </h2>
      </template>

      <nav class="space-y-2">
        <UButton
          v-for="section in sections"
          :key="section.id"
          variant="ghost"
          size="sm"
          justify="start"
          class="w-full text-left"
          @click="emit('scroll-to', section.id)"
        >
          {{ section.label }}
        </UButton>
      </nav>
    </UCard>
  </div>
</template>
