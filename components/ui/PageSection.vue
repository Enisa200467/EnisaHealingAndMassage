<template>
  <section :id="id" :class="sectionClasses" :aria-labelledby="ariaLabelledby">
    <UContainer>
      <div class="max-w-7xl mx-auto">
        <slot />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface Props {
  /** Add purple background */
  purple?: boolean;
  /** Add gradient background */
  gradient?: boolean;
  /** Custom background color class */
  background?: string;
  /** Vertical padding size */
  padding?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  class?: string;
  /** ARIA labelledby attribute */
  ariaLabelledby?: string;
  /** Section ID */
  id?: string;
  /** Remove prose styles for content components */
  notProse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  purple: false,
  gradient: false,
  background: undefined,
  padding: 'md',
  class: undefined,
  ariaLabelledby: undefined,
  id: undefined,
  notProse: false,
});

const sectionClasses = computed(() => {
  const classes = [];

  // Base padding classes
  switch (props.padding) {
    case 'sm':
      classes.push('py-12 sm:py-16');
      break;
    case 'lg':
      classes.push('py-20 sm:py-32');
      break;
    default: // 'md'
      classes.push('py-16 sm:py-24');
  }

  // Background classes
  if (props.gradient) {
    classes.push('bg-gradient-to-br from-primary-50 to-secondary-50');
  } else if (props.purple) {
    classes.push('bg-purple-50');
  } else if (props.background) {
    classes.push(props.background);
  }

  // Prose handling for content components
  if (props.notProse) {
    classes.push('not-prose');
  }

  // Custom classes
  if (props.class) {
    classes.push(props.class);
  }

  return classes.join(' ');
});
</script>
