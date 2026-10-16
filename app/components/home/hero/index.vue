<script setup lang="ts">
  import SwooshLayeredBg from '@components/motion/SwooshLayeredBg.vue';
  import LeftAndRightTexts from '@components/home/landing-hero/LeftAndRightTexts.vue';
  import PairedTexts from '@components/home/hero/PairedTexts.vue';

  withDefaults(
    defineProps<{
      isHoveredRight?: boolean;
      isHoveredLeft?: boolean;
    }>(),
    {
      isHoveredRight: false,
      isHoveredLeft: false,
    },
  );

  const emit = defineEmits(['hover-right', 'hover-left', 'hover-leave', 'click']);
</script>

<template>
  <div
    class="hero-main border-secondary font-acumin relative flex justify-between overflow-hidden border-b"
    @click="emit('click')"
  >
    <!-- Background Layers -->
    <swoosh-layered-bg
      container-classes="pointer-events-none absolute inset-0 z-0"
      first-bg-classes="absolute inset-0 bg-[url('/images/backgrounds/webp/swoosh_gray.webp')] bg-right bg-no-repeat"
      second-bg-classes="absolute inset-0 bg-[url('/images/backgrounds/webp/swoosh_blue.webp')] bg-right bg-no-repeat"
      :is-hovered-right="isHoveredRight"
      :is-hovered-left="isHoveredLeft"
      img-url="/images/backgrounds/webp/swoosh_gray.webp"
      :animate-prop-bg1="{
        opacity: isHoveredRight ? 1 : 0,
        x: isHoveredRight ? 0 : 10,
      }"
      :animate-prop-bg2="{
        opacity: isHoveredRight ? 1 : 0,
        x: isHoveredRight ? 0 : 10,
      }"
    />

    <swoosh-layered-bg
      container-classes="pointer-events-none absolute inset-0 z-0"
      first-bg-classes="absolute inset-0 bg-[url('/images/backgrounds/webp/swoosh_green.webp')] bg-left bg-no-repeat"
      second-bg-classes="absolute inset-0 bg-[url('/images/backgrounds/webp/swoosh_yellow.webp')] bg-left bg-no-repeat"
      :is-hovered-right="isHoveredRight"
      :is-hovered-left="isHoveredLeft"
      img-url="/images/backgrounds/webp/swoosh_yellow.webp"
      :animate-prop-bg1="{
        opacity: isHoveredLeft ? 1 : 0,
        x: isHoveredLeft ? 0 : 10,
      }"
      :animate-prop-bg2="{
        opacity: isHoveredLeft ? 1 : 0,
        x: isHoveredLeft ? 0 : 10,
      }"
    />

    <div
      class="absolute top-[35%] right-0 left-0 z-50 mx-auto flex h-auto w-full items-center justify-between p-0 text-black sm:px-4 md:top-auto md:z-10 md:h-full md:px-8 md:pb-28 lg:max-w-screen-lg xl:max-w-screen-xl"
    >
      <motion.div
        class="w-1/2 pr-[18%] text-center md:pr-[20%]"
        :initial="{ x: 0, opacity: 1 }"
        :animate="{
          opacity: isHoveredRight ? 0 : 1,
        }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
      >
        <h3
          class="font-proxima 2xs:text-lg xs:text-2xl font-bold sm:text-4xl md:mb-1 lg:mb-3 xl:text-6xl"
          :class="[{ 'text-black': isHoveredLeft && appTheme === 'dark' }]"
        >
          perceptive
        </h3>
        <p
          class="shadow-thickens mr-auto hidden text-left font-light md:inline-block md:text-sm lg:w-3/4 lg:text-xl xl:w-5/6 xl:pl-[3%]"
          :class="[{ 'text-black': isHoveredLeft && appTheme === 'dark' }]"
        >
          an eye for design, feels
          <span
            class="md:hidden xl:inline-block"
            :class="[{ 'text-black': isHoveredLeft && appTheme === 'dark' }]"
          >
            and attention to detail
          </span>
        </p>
      </motion.div>

      <motion.div
        class="w-1/2 pl-[15%] text-center"
        :initial="{ x: 0, opacity: 1 }"
        :animate="{
          opacity: isHoveredLeft ? 0 : 1,
        }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
      >
        <h3
          class="font-proxima 2xs:text-lg xs:text-2xl font-bold sm:text-4xl md:mb-1 lg:mb-3 xl:text-6xl"
        >
          {{ '<coding />' }}
        </h3>
        <p
          class="shadow-thickens ml-auto hidden pl-2 text-right font-light md:inline-block md:text-sm lg:text-xl xl:w-5/6 xl:pr-[10%]"
        >
          testing <span class="md:hidden xl:inline-block">, readability </span>
          <br class="md:hidden xl:inline-block" />
          and maintainability
        </p>
      </motion.div>
    </div>

    <paired-texts />
  </div>
</template>
