<script setup lang="ts">
  import AnimatedHeroSection from '@partials/home/animated-hero-section/index.vue';
  import ProjectSlider from '@partials/home/project-slider/index.vue';

  definePageMeta({
    path: '/',
    layout: 'default',
  });

  // @todo: remove after integration
  const PROJECTS = [
    {
      id: '019f9052-823b-7162-bbfd-9360d24866e6',
      title: 'kgallarin.com',
      link: 'https://github.com/kgallarin/me',
      description:
        'My personal website that I built from scratch to showcase my skills, technologies and myself. I plan to add more features and content whenever available to share some ideas and some of my experiences. Built with GraphQL API and yo, it has tests!',
      order: 1,
      icon: [
        {
          icon: ['fab', 'html5'],
          color: 'text-orange-400',
          __typename: 'ProjectIcon',
        },
        {
          icon: ['fab', 'vuejs'],
          color: 'text-green-500',
          __typename: 'ProjectIcon',
        },
        {
          icon: ['fab', 'js'],
          color: 'text-yellow-400',
          __typename: 'ProjectIcon',
        },
        {
          icon: ['fab', 'typescript'],
          color: 'text-blue-500',
          __typename: 'ProjectIcon',
        },
        {
          icon: ['fab', 'tailwind-css'],
          color: 'text-teal-400',
          __typename: 'ProjectIcon',
        },
        {
          icon: ['fab', 'sass'],
          color: 'text-pink-400',
          __typename: 'ProjectIcon',
        },
        {
          icon: ['fab', 'laravel'],
          color: 'text-red-500',
          __typename: 'ProjectIcon',
        },
      ],
      carouselSettings: {
        autoplay: true,
        showIndicators: true,
        showArrows: true,
        __typename: 'CarouselSettings',
      },
      images: [
        {
          url: 'https://imkg-personal-043594590972-ap-southeast-1-an.s3.ap-southeast-1.amazonaws.com/imkg-website/projects/webp/kgdev.webp',
          alt: 'kgdev',
          __typename: 'ImageLink',
        },
        {
          url: 'https://imkg-personal-043594590972-ap-southeast-1-an.s3.ap-southeast-1.amazonaws.com/imkg-website/projects/webp/kgdev2.webp',
          alt: 'kgdev2',
          __typename: 'ImageLink',
        },
      ],
      __typename: 'Project',
    },
  ];
</script>

<template>
  <div
    class="bg-gray-lighter flex flex-1 flex-col bg-[url('/images/backgrounds/webp/leaves-4.webp')] bg-blend-multiply"
  >
    <animated-hero-section />

    <project-slider :projects="PROJECTS" theme="light" />
  </div>
</template>
