"use server";

import { tmdbFetch } from "@/lib/tmdb";
import {
  Collection,
  ListResponse,
  MovieCredits,
  MovieDetails,
} from "@/lib/tmdbTypes";

export const getGenreData = async (id: string, page: number = 1) => {
  "use cache";

  const genreData = await tmdbFetch<ListResponse>(
    `/list/${id}?page=${page}`,
    {},
    true
  );

  return genreData;
};

export const getFilmData = async (id: string) => {
  "use cache";

  const filmData = await tmdbFetch<MovieDetails>(`/movie/${id}`);

  return filmData;
};

export const getFilmCastData = async (id: string) => {
  "use cache";

  const filmCastData = await tmdbFetch<MovieCredits>(`/movie/${id}/credits`);

  return filmCastData;
};

export const getFilmCollectionData = async (id: string) => {
  "use cache";

  const filmCollectionData = await tmdbFetch<Collection>(`/collection/${id}`);

  return filmCollectionData;
};
