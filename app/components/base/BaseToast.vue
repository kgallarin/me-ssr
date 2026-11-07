<script setup lang="ts">
  import type { AppTheme, ToastPosition } from '@/types/App.ts';
  import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome';
  import { AnimatePresence, motion } from 'motion-v';
  import { THEME } from '~/assets/constants';
  import { useToast } from '~/composables/useToast.ts';

  const props = withDefaults(
    defineProps<{
      show?: boolean;
      message?: string;
      position?: ToastPosition;
      theme?: AppTheme;
      index?: number;
      toastOffset?: number;
      showDelay?: number;
    }>(),
    {
      show: false,
      message: '',
      position: 'top-right',
      theme: THEME.LIGHT,
      index: 0,
      toastOffset: 0,
      showDelay: 0,
    },
  );

  const emit = defineEmits(['close']);
  const slots = defineSlots();

  const { isVisible, positionStyle, sideClasses, motionProps } = useToast({
    show: () => props.show,
    position: () => props.position,
    index: () => props.index,
    toastOffset: () => props.toastOffset,
    showDelay: () => props.showDelay,
    onClose: () => emit('close'),
  });
</script>

<template>
  <animate-presence>
    <motion.div
      v-if="isVisible"
      :initial="motionProps.initial"
      :animate="motionProps.animate"
      :exit="motionProps.exit"
      :style="positionStyle"
      :class="[
        'fixed z-[60]',
        sideClasses,
        theme === 'light' ? 'bg-white' : 'bg-secondary',
      ]"
    >
      <div
        v-if="!slots.default"
        class="flex items-center gap-4 rounded-lg px-4 py-2 text-sm font-medium text-black shadow-lg ring-1 ring-black/5"
      >
        <div class="flex items-center justify-center shrink-0">
          <fa-icon :icon="['fas', 'bolt']" class="w-4 h-4 text-yellow-400" />
        </div>
        <span class="text-xs md:text-base">
          {{ message }}
        </span>
        <button
          type="button"
          class="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
          @click="emit('close')"
        >
          <fa-icon :icon="['fas', 'times']" class="h-3 w-3" />
        </button>
      </div>

      <slot :close="() => emit('close')" />
    </motion.div>
  </animate-presence>
</template>
