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
  SearchMovieResponse,
  SearchPersonResponse,
} from "@/lib/tmdbTypes";
import { kultCast } from "./kultschauspieler";
import { unstable_cacheLife } from "next/cache";

export const getGenreData = async (id: number, page: number = 1) => {
  "use cache";
  unstable_cacheLife("weeks");
  const genreData = await tmdbFetch<ListResponse>(
    `/list/${id}?page=${page}`,
    {},
    true
  );

  return genreData;
};

export const getFilmData = async (id: number) => {
  "use cache";
  unstable_cacheLife("days");
  const filmData = await tmdbFetch<MovieDetails>(`/movie/${id}`);

  return filmData;
};

export const getFilmCastData = async (id: number) => {
  "use cache";
  unstable_cacheLife("days");
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
  unstable_cacheLife("days");
  const filmCollectionData = await tmdbFetch<Collection>(`/collection/${id}`);

  return filmCollectionData;
};

export const getFilmTrailerData = async (id: number) => {
  "use cache";
  unstable_cacheLife("days");
  const filmTrailerData = await tmdbFetch<MovieVideosResponse>(
    `/movie/${id}/videos`
  );

  return filmTrailerData;
};

export const getKultSchauspielerData = async (page: number) => {
  "use cache";
  unstable_cacheLife("weeks");
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
  "use cache";
  unstable_cacheLife("days");
  const personData = await tmdbFetch<PersonDetails>(`/person/${id}`);
  return personData;
};

export const getRandomKultschauspieler = async (number: number) => {
  "use cache";
  unstable_cacheLife("days");
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
  "use cache";
  unstable_cacheLife("days");
  const personCreditsData = await tmdbFetch<PersonCredits>(
    `/person/${id}/movie_credits`
  );
  return personCreditsData;
};

export const searchMovie = async (query: string, page: number = 1) => {
  "use cache";
  const searchResultData = await tmdbFetch<SearchMovieResponse>(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
  );
  return searchResultData;
};

export const searchPerson = async (query: string, page: number = 1) => {
  "use cache";
  const searchResultData = await tmdbFetch<SearchPersonResponse>(
    `/search/person?query=${encodeURIComponent(query)}&page=${page}`
  );
  return searchResultData;
};

export const getNowPlaying = async () => {
  "use cache";
  unstable_cacheLife("days");
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 14);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  const nowPlaying = await tmdbFetch<SearchMovieResponse>(
    `/discover/movie?primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}&region=DE&sort_by=popularity.desc`
  );

  if (nowPlaying && nowPlaying.results) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const futureMovies = nowPlaying.results.filter((movie) => {
      if (!movie.release_date) return false;
      const releaseDate = new Date(movie.release_date);
      return releaseDate > today;
    });

    const pastOrPresentMovies = nowPlaying.results.filter((movie) => {
      if (!movie.release_date) return true;
      const releaseDate = new Date(movie.release_date);
      return releaseDate <= today;
    });

    futureMovies.sort((a, b) => {
      if (!a.release_date || !b.release_date) return 0;
      return (
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    });

    nowPlaying.results = [...futureMovies, ...pastOrPresentMovies];
  }

  return nowPlaying;
};
