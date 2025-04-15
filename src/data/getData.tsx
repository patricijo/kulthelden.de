import "server-only";
import { tmdbFetch } from "@/lib/tmdb";
import {
  Collection,
  ListResponse,
  MovieCredits,
  MovieDetails,
  MovieVideosResponse,
} from "@/lib/tmdbTypes";
import { kultCast } from "./kultschauspieler";

export const getGenreData = async (id: number, page: number = 1) => {
  "use cache";

  const genreData = await tmdbFetch<ListResponse>(
    `/list/${id}?page=${page}`,
    {},
    true
  );

  return genreData;
};

export const getFilmData = async (id: number) => {
  "use cache";

  const filmData = await tmdbFetch<MovieDetails>(`/movie/${id}`);

  return filmData;
};

export const getFilmCastData = async (id: number) => {
  "use cache";

  const filmCastData = await tmdbFetch<MovieCredits>(`/movie/${id}/credits`);

  // (kultCast) => kultCast.tmdbId === filmCastData.cast[0].id
  // check iv every item in filmCastData.cast if its in kultCast if its in set filmCastData.cast[].kult to true

  filmCastData.cast.forEach((castMember) => {
    const kultCastMember = kultCast.find(
      (kultCastMember) => kultCastMember.tmdbId === castMember.id
    );
    if (kultCastMember) {
      castMember.kult = true;
    }

    return castMember;
  });

  return filmCastData;
};

export const getFilmCollectionData = async (id: number) => {
  "use cache";

  const filmCollectionData = await tmdbFetch<Collection>(`/collection/${id}`);

  return filmCollectionData;
};

export const getFilmTrailerData = async (id: number) => {
  "use cache";

  const filmTrailerData = await tmdbFetch<MovieVideosResponse>(
    `/movie/${id}/videos`
  );

  return filmTrailerData;
};
