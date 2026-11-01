import { getRecommendations } from '#server/services/recommendations.service.ts';
import type { ApiResponse } from '@/types/Api.ts';
import type { TestimonialsPayload } from '@/types/Recommendations.ts';
import type { H3Event } from 'h3';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<TestimonialsPayload>> => {
    const { first, after } = getQuery(event);

    return await getRecommendations(
      event,
      Number(first) || 10,
      typeof after === 'string' ? after : undefined,
    );
  },
);
