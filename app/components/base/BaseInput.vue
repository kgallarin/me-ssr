<script setup lang="ts">
  withDefaults(
    defineProps<{
      label?: string;
      type?: string;
      error?: string;
    }>(),
    {
      label: '',
      type: 'text',
      error: '',
    },
  );

  const model = defineModel<string | number>();
</script>

<template>
  <div class="mb-4">
    <label
      v-if="label"
      :for="($attrs.id as string) || label"
      class="mb-2 block font-proxima text-lg font-light text-primary"
    >
      {{ label }}
    </label>
    <textarea
      v-if="type === 'textarea'"
      :id="($attrs.id as string) || label"
      v-model="model as string"
      minlength="10"
      v-bind="$attrs"
      class="w-full rounded-md border px-4 py-2 text-black placeholder:font-proxima placeholder:text-sm placeholder:font-thin placeholder:text-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
      :class="error ? 'border-red-400' : 'border-gray-300'"
    />
    <input
      v-else
      :id="($attrs.id as string) || label"
      v-model="model"
      v-bind="$attrs"
      :type="type"
      class="w-full rounded-md border px-4 py-2 text-black placeholder:font-proxima placeholder:text-sm placeholder:font-thin placeholder:text-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
      :class="error ? 'border-red-400' : 'border-gray-300'"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>
