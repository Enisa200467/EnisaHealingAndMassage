<script setup lang="ts">
import { useTreatmentDetailsFormatter } from "~/composables/useTreatmentData";

interface TrajectContentItem {
  id: string;
  title?: string;
  description?: string;
  bullets?: string[];
  ctaText?: string;
  ctaLink?: string;
  treatmentId?: string;
}

interface TrajectRecord {
  id: string;
  sessions: number;
  price_cents: number;
}

interface TreatmentRecord {
  id: string;
  duration_minutes: number;
  price_cents: number;
}

interface TrajectDisplayItem extends TrajectContentItem {
  sessions?: number;
  price_cents?: number;
  duration_minutes?: number;
}

const props = defineProps<{
  items?: TrajectContentItem[];
}>();

const trajectIds = computed(() =>
  (props.items || []).map((item) => item.id).filter(Boolean)
);

const treatmentIds = computed(() =>
  (props.items || [])
    .map((item) => item.treatmentId)
    .filter(Boolean)
);

const { formatPrice, formatDuration } = useTreatmentDetailsFormatter();

const trajectQuery = computed(() => ({
  ids: trajectIds.value.join(","),
}));

const { data: trajectData } = await useAsyncData(
  () =>
    $fetch<{ data: TrajectRecord[] }>("/api/treatments/trajects", {
      query: trajectQuery.value,
    }),
  {
    default: () => ({ data: [] }),
    watch: [trajectQuery],
  }
);

const { data: treatmentData } = await useAsyncData(
  async () => {
    if (!treatmentIds.value.length) {
      return [];
    }
    const results = await Promise.all(
      treatmentIds.value.map((id) =>
        $fetch<TreatmentRecord | null>(`/api/treatments/${id}`)
      )
    );
    return results.filter(Boolean) as TreatmentRecord[];
  },
  {
    default: () => [],
    watch: [treatmentIds],
  }
);

if (import.meta.client) {
  watchEffect(() => {
    console.log("[TrajectKolommen] ids", trajectQuery.value.ids);
  });
}

const trajectMap = computed(() => {
  const map = new Map<string, TrajectRecord>();
  (trajectData.value?.data || []).forEach((traject) => {
    map.set(traject.id, traject);
  });
  return map;
});

const treatmentMap = computed(() => {
  const map = new Map<string, TreatmentRecord>();
  (treatmentData.value || []).forEach((treatment) => {
    map.set(treatment.id, treatment);
  });
  return map;
});

const mergedTrajects = computed<TrajectDisplayItem[]>(() =>
  (props.items || []).map((item) => {
    const meta = trajectMap.value.get(item.id);
    const treatmentMeta = item.treatmentId
      ? treatmentMap.value.get(item.treatmentId)
      : undefined;
    return {
      ...item,
      sessions: meta?.sessions,
      price_cents: meta?.price_cents ?? treatmentMeta?.price_cents,
      duration_minutes: treatmentMeta?.duration_minutes,
    };
  })
);
</script>

<template>
  <PageSection primary not-prose>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
      <UCard v-for="item in mergedTrajects" :key="item.id" class="p-5">
        <div class="space-y-4">
          <div>
            <h3 class="text-xl font-semibold text-neutral-900">
              {{ item.title }}
            </h3>
            <p
              v-if="item.description"
              class="text-neutral-600 mt-2 whitespace-pre-line"
            >
              {{ item.description }}
            </p>
          </div>

          <div v-if="item.sessions && item.price_cents" class="space-y-1">
            <p class="text-sm text-neutral-600">
              {{ item.sessions }} sessies
            </p>
            <p class="text-lg font-semibold text-primary-600">
              {{ formatPrice(item.price_cents) }}
            </p>
          </div>

          <div
            v-else-if="item.duration_minutes && item.price_cents"
            class="space-y-1"
          >
            <p class="text-lg font-semibold text-primary-600">
              {{ formatPrice(item.price_cents) }}
            </p>
          </div>

          <ul v-if="item.bullets && item.bullets.length" class="space-y-2">
            <li
              v-for="(bullet, index) in item.bullets"
              :key="index"
              class="flex items-start gap-2 text-sm text-neutral-600"
            >
              <UIcon
                name="i-mdi-check-circle"
                class="w-4 h-4 text-primary-500 mt-0.5"
              />
              <span>{{ bullet }}</span>
            </li>
          </ul>

          <UButton
            v-if="item.ctaText && item.ctaLink"
            :to="item.ctaLink"
            size="lg"
            color="primary"
            block
            icon="i-mdi-calendar-check"
          >
            {{ item.ctaText }}
          </UButton>
        </div>
      </UCard>
    </div>
  </PageSection>
</template>
