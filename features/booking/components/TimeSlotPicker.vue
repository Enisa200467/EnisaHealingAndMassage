<script setup lang="ts">
interface AvailableSlot {
  time: string;
  available: boolean;
  date: string;
}

interface Props {
  selectedDate?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'slot-selected': [slot: AvailableSlot];
}>();

const availableSlots = computed(() => {
  if (!props.selectedDate) return [];

  // Mock availability data - in real app this would come from API
  const slots: AvailableSlot[] = [
    { time: '09:00', available: true, date: props.selectedDate },
    { time: '10:00', available: false, date: props.selectedDate },
    { time: '11:00', available: true, date: props.selectedDate },
    { time: '14:00', available: true, date: props.selectedDate },
    { time: '15:00', available: false, date: props.selectedDate },
    { time: '16:00', available: true, date: props.selectedDate },
    { time: '17:00', available: true, date: props.selectedDate },
  ];

  return slots;
});

const selectSlot = (slot: AvailableSlot) => {
  if (slot.available) {
    emit('slot-selected', slot);
  }
};
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold text-neutral-900">
      Beschikbare tijdsloten
    </h3>

    <div v-if="!selectedDate" class="text-center py-8">
      <UIcon
        name="i-mdi-calendar"
        class="w-12 h-12 text-neutral-400 mx-auto mb-3"
      />
      <p class="text-neutral-500">
        Selecteer eerst een datum om beschikbare tijden te zien
      </p>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <button
        v-for="slot in availableSlots"
        :key="slot.time"
        :disabled="!slot.available"
        :class="[
          'p-3 rounded-lg border text-sm font-medium transition-all duration-200',
          slot.available
            ? 'border-primary-200 bg-white hover:border-primary-400 hover:bg-primary-50 text-neutral-900'
            : 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed',
        ]"
        @click="selectSlot(slot)"
      >
        <div class="flex items-center justify-center gap-2">
          <UIcon
            :name="slot.available ? 'i-mdi-check-circle' : 'i-mdi-close-circle'"
            :class="[
              'w-4 h-4',
              slot.available ? 'text-green-500' : 'text-red-400',
            ]"
          />
          {{ slot.time }}
        </div>
        <div class="text-xs mt-1">
          {{ slot.available ? 'Beschikbaar' : 'Bezet' }}
        </div>
      </button>
    </div>

    <div class="bg-blue-50 p-4 rounded-lg">
      <div class="flex items-start gap-3">
        <UIcon name="i-mdi-information" class="w-5 h-5 text-blue-600 mt-0.5" />
        <div class="text-sm">
          <p class="font-medium text-blue-900">Afspraak maken</p>
          <p class="text-blue-700 mt-1">
            Klik op een beschikbaar tijdslot om je afspraak in te plannen. Je
            ontvangt een bevestiging per e-mail.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
