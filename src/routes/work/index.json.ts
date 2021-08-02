import type { RequestHandler } from '@sveltejs/kit';
import * as fromApi from '$lib/services/api';

// GET /about.json
export const get: RequestHandler<any> = async () => {
  const response = await fromApi.getProjects();

  if (response.status === 404) {
    return { body: {} };
  }

  return response;
};
