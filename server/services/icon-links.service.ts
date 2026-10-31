import { createAppFetch } from '#server/services/app.service.ts';
import type { IconLink } from '@/types/Icons.ts';
import type { H3Event } from 'h3';

export async function getIconLinks(event: H3Event): Promise<IconLink[]> {
  const iconLinksFetch = createAppFetch(event);

  const GET_ICON_LINKS = `
    query GetIconLinks {
    iconLinks {
      id
      name
      url
      icon
      classColor
    }
  }
  `;

  return await iconLinksFetch('', {
    method: 'POST',
    body: JSON.stringify({
      query: GET_ICON_LINKS,
    }),
  });
}
