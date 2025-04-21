import "server-only";
import { tmdbFetch } from "@/lib/tmdb";
import {
  Collection,
  ListResponse,
  MovieCredits,
  MovieDetails,
  MovieVideosResponse,
  PersonCredits,
  PersonDetails,
} from "@/lib/tmdbTypes";
import { kultCast } from "./kultschauspieler";

export const getGenreData = async (id: number, page: number = 1) => {
  const genreData = await tmdbFetch<ListResponse>(
    `/list/${id}?page=${page}`,
    {},
    true
  );

  return genreData;
};

export const getFilmData = async (id: number) => {
  const filmData = await tmdbFetch<MovieDetails>(`/movie/${id}`);

  return filmData;
};

export const getFilmCastData = async (id: number) => {
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
  const filmCollectionData = await tmdbFetch<Collection>(`/collection/${id}`);

  return filmCollectionData;
};

export const getFilmTrailerData = async (id: number) => {
  const filmTrailerData = await tmdbFetch<MovieVideosResponse>(
    `/movie/${id}/videos`
  );

  return filmTrailerData;
};

export const getKultSchauspielerData = async (page: number) => {
  const startIndex = (page - 1) * 20;
  const endIndex = startIndex + 20;
  const kultSchauspielerData = [...kultCast].slice(startIndex, endIndex);

  const kultschauspieler = await Promise.all(
    kultSchauspielerData.map(async (person) => {
      const personData = await getPersonData(person.tmdbId);
      personData.kult = true;
      personData.termId = person.termId;
      return personData;
    })
  );

  const response = {
    totalItems: kultCast.length,
    page: page,
    results: kultschauspieler,
  };

  return response;
};

export const getPersonData = async (id: number) => {
  const personData = await tmdbFetch<PersonDetails>(`/person/${id}`);
  return personData;
};

export const getRandomKultschauspieler = async (number: number) => {
  const randomCast = [...kultCast]
    .sort(() => Math.random() - 0.5)
    .slice(0, number);

  const randomKultschauspieler = await Promise.all(
    randomCast.map(async (person) => {
      const personData = await getPersonData(person.tmdbId);
      return personData;
    })
  );
  return randomKultschauspieler;
};

export const getPersonCredits = async (id: number) => {
  const personCreditsData = await tmdbFetch<PersonCredits>(
    `/person/${id}/movie_credits`
  );
  return personCreditsData;
};
