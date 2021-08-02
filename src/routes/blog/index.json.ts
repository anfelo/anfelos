import type { RequestHandler } from '@sveltejs/kit';
import * as fromApi from '$lib/services/api';

// GET /blog.json
export const get: RequestHandler<any> = async () => {
  const response = await fromApi.getBlogArticles();

  if (response.status === 404) {
    return { body: {} };
  }

  return response;
};
