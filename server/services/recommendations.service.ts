import { createAppFetch } from '#server/services/app.service.ts';
import type { ApiResponse } from '@/types/Api.ts';
import type { TestimonialsPayload } from '@/types/Recommendations.ts';
import type { H3Event } from 'h3';

const GET_RECOMMENDATIONS = `
  query GetRecommendations($first: Int!, $page: Int) {
    recommendations(first: $first, page: $page) {
      data {
        id
        author
        title
        text
        rating
        linkedIn
        avatar {
          url
          alt
        }
      }
      paginatorInfo {
        total
        count
        currentPage
        lastPage
        hasMorePages
      }
    }
  }
`;
export async function getRecommendations(
  event: H3Event,
  first = 10,
  after?: string,
  page?: number,
): Promise<ApiResponse<TestimonialsPayload>> {
  const recommendationFetch = createAppFetch(event);

  return await recommendationFetch('', {
    method: 'POST',
    body: JSON.stringify({
      query: GET_RECOMMENDATIONS,
      variables: { first, after, page },
    }),
  });
}
