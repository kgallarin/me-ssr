import { type MaybeRef, computed, toRef } from 'vue';

import type { ParsedPartSafeHtml } from '@/types/App.ts';

export function useSafeHtml(htmlInput: MaybeRef<string | undefined>) {
  const htmlRef = toRef(htmlInput);

  const parsedParts = computed<ParsedPartSafeHtml[]>(() => {
    const raw = htmlRef.value;
    if (!raw) return [];

    const regex =
      /(<br\s*\/?>|<a\s+[^>]*href="[^"]+"[^>]*>.*?<\/a>|<strong[^>]*>.*?<\/strong>|<span[^>]*>.*?<\/span>)/gi;

    return raw
      .split(regex)
      .filter(Boolean)
      .map((part): ParsedPartSafeHtml => {
        const lower = part.toLowerCase();

        switch (true) {
          case lower.startsWith('<br'):
            return { type: 'br' };

          case lower.startsWith('<a'):
            return {
              type: 'a',
              href: part.match(/href="([^"]+)"/i)?.[1],
              content: part.match(/>([\s\S]*?)<\/a>/i)?.[1],
            };

          case lower.startsWith('<strong'):
            return {
              type: 'strong',
              content: part.match(/>([\s\S]*?)<\/strong>/i)?.[1],
            };

          case lower.startsWith('<span'):
            return {
              type: 'span',
              class: part.match(/class="([^"]+)"/i)?.[1],
              content: part.match(/>([\s\S]*?)<\/span>/i)?.[1],
            };

          default:
            return { type: 'text', text: part };
        }
      });
  });

  return {
    parsedParts,
  };
}
