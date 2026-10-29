import { getProjects } from '#server/services/projects.service.ts';
import type { ApiResponse } from '@/types/Api.ts';
import type { ProjectsPayload } from '@/types/Projects.ts';
import type { H3Event } from 'h3';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<ProjectsPayload>> => {
    const { first, after } = getQuery(event);
    return await getProjects(
      event,
      Number(first) || 10,
      typeof after === 'string' ? after : undefined,
    );
  },
);
