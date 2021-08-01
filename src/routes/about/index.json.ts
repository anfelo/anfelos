import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import * as fromApi from '$lib/services/api';

// GET /about.json
export const get: RequestHandler<Locals> = async () => {
  const response = await fromApi.getBio();

  if (response.status === 404) {
    return { body: {} };
  }

  return response;
};