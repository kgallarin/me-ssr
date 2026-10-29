import { createAppFetch } from '#server/services/app.service.ts';
import type { ApiResponse } from '@/types/Api.ts';
import type { ProjectsPayload } from '@/types/Projects.ts';
import type { H3Event } from 'h3';

const GET_PROJECTS = `
  query GetProjects($first: Int!, $page: Int) {
    projects(first: $first, page: $page) {
      data {
        id
        title
        link
        description
        order
        icon {
          icon
          color
        }
        carouselSettings {
          autoplay
          showIndicators
          showArrows
        }
        images {
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
export async function getProjects(
  event: H3Event,
  first = 10,
  after?: string,
  page?: number,
): Promise<ApiResponse<ProjectsPayload>> {
  const projectFetch = createAppFetch(event);
  return await projectFetch('', {
    method: 'POST',
    body: JSON.stringify({
      query: GET_PROJECTS,
      variables: { first, after, page },
    }),
  });
}
