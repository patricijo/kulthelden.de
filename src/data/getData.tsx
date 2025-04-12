"use server";

import { tmdbFetch } from "@/lib/tmdb";
import { ListResponse } from "@/lib/tmdbTypes";

export const getGenreData = async (id: string, page: number = 1) => {
  "use cache";

  const genreData = await tmdbFetch<ListResponse>(
    `/list/${id}?page=${page}`,
    {},
    true
  );

  return genreData;
};
