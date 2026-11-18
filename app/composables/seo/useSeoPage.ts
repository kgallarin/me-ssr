import type { SeoPageOption } from '~~/types/Seo';

export function useSeoPage(options: SeoPageOption) {
  const config = useRuntimeConfig();

  const siteName = config.public.siteName;

  const title = computed((): string => {
    const rawTitle = unref(options.title);
    if (!rawTitle) return siteName;
    const formattedRawTitle = rawTitle.charAt(0).toUpperCase() + rawTitle?.slice(1);
    return formattedRawTitle.includes(siteName)
      ? rawTitle
      : `${formattedRawTitle} | ${siteName}`;
  });

  const description = toRef(options.description);

  const siteUrl = config.public.appUrl;
  const ogImage = computed(() => {
    const img = unref(options.ogImage) ?? 'og-sharing.png';
    const absoluteUrl = img.startsWith('http') ? img : `${siteUrl}${img}`;
    return absoluteUrl.startsWith('?v=') ? absoluteUrl : `${absoluteUrl}?v=1`;
  });

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: ogImage,
    ogImageSecureUrl: ogImage,
    ogImageWidth: '1200',
    ogImageHeight: '630',
    ogImageType: 'image/png',
    ogImageAlt: title,
    ogSiteName: siteName,
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
    meta: [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
  });
}
