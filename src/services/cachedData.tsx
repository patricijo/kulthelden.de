"use server";
import { unstable_cache } from "next/cache";
import {
  fetchMovie,
  fetchMovieCredits,
  fetchMovieRecommendations,
  fetchMovieSimilar,
  fetchMovieVideos,
  fetchPerson,
  fetchPersonCredits,
  fetchList,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
} from "./tmdb";
import kultCastData from "../../public/cast.json";

export const cachedQueryMovie = unstable_cache(
  async (id: number) => {
    const movie = await Promise.all([
      fetchMovie(id),
      fetchMovieCredits(id),
      fetchMovieVideos(id),
      fetchMovieRecommendations(id),
      fetchMovieSimilar(id),
    ]);

    movie[1].cast.map((cast) => {
      cast.kult = kultCastData.some((kultCast) => kultCast.tmdbId === cast.id);
    });

    return movie;
  },
  ["movie-cache"],
  {
    revalidate: 60 * 60 * 24 * 7, // 1 week
  }
);

export const cachedQueryCast = unstable_cache(
  async (id: number) => {
    const cast = await Promise.all([fetchPerson(id), fetchPersonCredits(id)]);

    cast[0].kult = kultCastData.some(
      (kultCast) => kultCast.tmdbId === cast[0].id
    );

    return cast;
  },
  ["cast-cache"],
  {
    revalidate: 60 * 60 * 24 * 7, // 1 week
  }
);

export const cachedQueryKultschauspieler = unstable_cache(
  async (page: number = 1) => {
    //get random 10 cast members from cast.json
    const cast = kultCastData;
    const randomCast = cast.slice((page - 1) * 20, page * 20);
    const KultschauspielerList = [];

    //loop through cast members and add them to the kult cast list
    for (let i = 0; i < randomCast.length; i++) {
      //get cast member from tmdb
      const tmdbCast = await cachedQueryCast(randomCast[i].tmdbId);
      //add cast member to kult cast list
      KultschauspielerList.push(tmdbCast);
    }

    return KultschauspielerList;
  },
  ["KultSchauspieler-cache"],
  {
    revalidate: 60 * 60 * 24 * 7, // 1 week
  }
);

export const cachedQueryRandomKultschauspieler = unstable_cache(
  async () => {
    //get random 10 cast members from cast.json
    const cast = kultCastData;
    const randomCast = cast.sort(() => Math.random() - 0.5).slice(0, 6);
    const KultschauspielerList = [];

    //loop through cast members and add them to the kult cast list
    for (let i = 0; i < randomCast.length; i++) {
      //get cast member from tmdb
      const tmdbCast = await cachedQueryCast(randomCast[i].tmdbId);
      //add cast member to kult cast list
      KultschauspielerList.push(tmdbCast);
    }

    return KultschauspielerList;
  },
  ["RandomCast-cache"],
  {
    revalidate: 60 * 60 * 24, // 1 day
  }
);

/**
 * Cached function to fetch a list by its ID
 * @param listId - The ID of the list to fetch
 * @param page - The page number (default: 1)
 * @returns The list details and results
 */
export const cachedQueryUpcomingMovies = unstable_cache(
  async (page: number = 1) => {
    const upcomingMovies = await fetchUpcomingMovies(page);
    return upcomingMovies;
  },
  ["upcoming-movies-cache"],
  {
    revalidate: 60 * 60 * 12, // 12 hours
  }
);

/**
 * Cached function to fetch now playing movies
 * @param page - The page number (default: 1)
 * @returns The now playing movies
 */
export const cachedQueryNowPlayingMovies = unstable_cache(
  async (page: number = 1) => {
    const nowPlayingMovies = await fetchNowPlayingMovies(page);
    return nowPlayingMovies;
  },
  ["now-playing-movies-cache"],
  {
    revalidate: 60 * 60 * 12, // 12 hours
  }
);

export const cachedQueryList = async (listId: string, page: number = 1) => {
  const data = unstable_cache(
    async () => {
      const list = await fetchList(listId, page);

      // Process list results if needed (similar to how cast members are processed)
      // For example, you could add additional data or filter results

      return list;
    },
    ["list-cache" + listId],
    {
      revalidate: 60 * 60 * 24 * 7, // 1 week
    }
  );

  return data();
};
