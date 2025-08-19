<script setup lang="ts">
interface Section {
  id: string;
  label: string;
}

interface Props {
  sections: Section[];
  activeTab?: string;
}

interface Emits {
  (e: 'scroll-to', sectionId: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

// Tab icons
const tabIcons = {
  treatments: 'i-mdi-spa',
  content: 'i-mdi-file-document-edit',
  technical: 'i-mdi-cog',
};

// Tab labels
const tabLabels = {
  treatments: 'Behandelingen',
  content: 'Content',
  technical: 'Technisch',
};
</script>

<template>
  <div class="xl:col-span-1">
    <UCard class="sticky top-8">
      <template #header>
        <h2 class="font-semibold flex items-center gap-2">
          <UIcon
            :name="activeTab ? tabIcons[activeTab as keyof typeof tabIcons] : 'i-mdi-format-list-bulleted'"
            class="w-5 h-5"
          />
          {{
            activeTab
              ? `${tabLabels[activeTab as keyof typeof tabLabels]} Gids`
              : 'Inhoudsopgave'
          }}
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
