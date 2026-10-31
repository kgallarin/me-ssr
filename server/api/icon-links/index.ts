import { getIconLinks } from '#server/services/icon-links.service.ts';
import type { IconLink } from '@/types/Icons.ts';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event): Promise<IconLink[]> => {
  return await getIconLinks(event);
});
