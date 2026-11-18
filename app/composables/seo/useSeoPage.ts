import type { SeoPageOption } from '~~/types/Seo';

export function useSeoPage(options: SeoPageOption) {
  const config = useRuntimeConfig();

  const siteName = config.public.siteName;

  const title = computed(() => {
    const rawTitle = unref(options.title);
    if (!rawTitle) return siteName;
    const formattedRawTitle = rawTitle.charAt(0).toUpperCase() + rawTitle?.slice(1);
    return formattedRawTitle.includes(siteName)
      ? rawTitle
      : `${formattedRawTitle} | ${siteName}`;
  });

  const description = toRef(options.description);
  const ogImage = toRef(options.ogImage ?? '/og-default.png');

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    robots: options.noIndex ? 'noindex, nofollow' : 'index, follow',
  });

  const route = useRoute();

  useHead({
    link: [
      {
        rel: 'canonical',
        href: computed((): string => `${config.public.appUrl}${route.path}`),
      },
    ],
  });
}
