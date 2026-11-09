<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  import type { BaseImageProps } from '@/types/Props.ts';

  const props = withDefaults(defineProps<BaseImageProps>(), {
    src: '',
    alt: '',
    showLoader: true,
    rounded: '',
    objectFit: 'cover',
    imageContainerClass: '',
    imageClass: '',
    width: undefined,
    height: undefined,
    aspectRatio: undefined,
  });

  const isLoaded = ref(false);
  const imgRef = ref<HTMLImageElement | null>(null);

  const onImgLoad = () => {
    // setTimeout(() => {
    //   isLoaded.value = true;
    // }, 500);
    isLoaded.value = true;
  };

  onMounted(() => {
    // @todo: use isLoaded from NuxtImg
    if (imgRef.value?.complete) {
      onImgLoad();
    }
  });
</script>

<template>
  <div
    data-testid="base-image"
    class="relative flex overflow-hidden"
    :class="[props.imageContainerClass, props.rounded]"
    :style="{
      aspectRatio:
        props.aspectRatio ||
        (props.width && props.height
          ? `${props.width} / ${props.height}`
          : undefined),
    }"
  >
    <div
      v-if="(!isLoaded || !props.src) && props.showLoader"
      class="skeleton absolute inset-0 z-10 w-full"
      :class="props.rounded"
    />

    <NuxtImg
      v-if="props.src"
      ref="imgRef"
      :src="props.src"
      :alt="props.alt"
      class="w-full"
      :class="[
        props.imageClass,
        props.rounded,
        `object-${props.objectFit}`,
        {
          'opacity-0': !isLoaded && props.showLoader,
          'opacity-100 transition-opacity duration-300':
            isLoaded || !props.showLoader,
        },
      ]"
      @load="onImgLoad"
    />
  </div>
</template>
