import type { RequestHandler } from '@sveltejs/kit';

import * as fromApi from '$lib/services/api';

// GET /blog/[slug].json
export const get: RequestHandler<any> = async (req) => {
  const { slug } = req.params;

  const response = await fromApi.getBlogArticle(slug);

  if (response.status === 404) {
    return { body: {} };
  }

  return response;
};
