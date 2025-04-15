/**
 * TMDB API Service
 * This file contains functions to interact with The Movie Database (TMDB) API
 */

// Types for TMDB API responses
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails extends Movie {
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  kult?: boolean;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
  }[];
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieVideosResponse {
  id: number;
  results: Video[];
}

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  adult: boolean;
  popularity: number;
  known_for_department: string;
  kult?: boolean;
}

export interface PersonDetails extends Person {
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  imdb_id: string | null;
  place_of_birth: string | null;
  also_known_as: string[];
}

export interface PersonCredit {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  character: string;
  credit_id: string;
  order: number;
  media_type: string;
}

export interface PersonCreditsResponse {
  id: number;
  cast: PersonCredit[];
  crew: {
    id: number;
    department: string;
    job: string;
    credit_id: string;
    media_type: string;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
  }[];
}

export interface ListItem {
  id: number;
  original_title: string;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  media_type: string;
}

export interface ListResponse {
  created_by: string;
  description: string;
  favorite_count: number;
  id: string;
  results: ListItem[];
  total_results: number;
  page: number;
  total_pages: number;
  iso_639_1: string;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  average_rating: number;
  public: boolean;
  revenue: number;
  runtime: number | null;
  sort_by: string;
  comments: { [key: string]: string } | null;
}

// Error type for API errors
export class TMDBError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "TMDBError";
    this.status = status;
  }
}

// Base URL and endpoints

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_BASE_URL_v4 = "https://api.themoviedb.org/4";

/**
 * Get your API key from https://www.themoviedb.org/settings/api
 * For security, this should be stored in an environment variable
 */
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

/**
 * Base fetch function with error handling
 * @param endpoint - The API endpoint to fetch from
 * @param options - Additional fetch options
 * @returns The parsed JSON response
 * @throws TMDBError if the request fails
 */
async function tmdbFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  v4: boolean = false
): Promise<T> {
  if (!TMDB_API_KEY) {
    throw new Error(
      "TMDB API key is not defined. Please set NEXT_PUBLIC_TMDB_API_KEY in your environment variables."
    );
  }

  const url = new URL(`${!v4 ? TMDB_BASE_URL : TMDB_BASE_URL_v4}${endpoint}`);

  // Add API key and language parameters
  url.searchParams.append("api_key", TMDB_API_KEY);
  url.searchParams.append("language", "de-DE");

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new TMDBError(
        errorData.status_message ||
          `Failed to fetch from TMDB API: ${response.statusText}`,
        response.status
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof TMDBError) {
      throw error;
    }
    throw new Error(
      `Failed to fetch from TMDB API: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Fetch a movie by its ID
 * @param movieId - The ID of the movie to fetch
 * @returns The movie details
 */
export async function fetchMovie(movieId: number): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(`/movie/${movieId}`);
}

/**
 * Search for movies by title
 * @param query - The search query
 * @param page - The page number (default: 1)
 * @returns The search results
 */
export async function searchMovies(
  query: string,
  page: number = 1
): Promise<MovieResponse> {
  const endpoint = `/search/movie?query=${encodeURIComponent(
    query
  )}&page=${page}`;
  return tmdbFetch<MovieResponse>(endpoint);
}

/**
 * Fetch popular movies
 * @param page - The page number (default: 1)
 * @returns The popular movies
 */
export async function fetchPopularMovies(
  page: number = 1
): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(`/movie/popular?page=${page}`);
}

/**
 * Fetch now playing movies
 * @param page - The page number (default: 1)
 * @returns The now playing movies for the German region
 */
export async function fetchNowPlayingMovies(
  page: number = 1
): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(`/movie/now_playing?page=${page}&region=DE`);
}

/**
 * Fetch top rated movies
 * @param page - The page number (default: 1)
 * @returns The top rated movies
 */
export async function fetchTopRatedMovies(
  page: number = 1
): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(`/movie/top_rated?page=${page}`);
}

/**
 * Fetch upcoming movies
 * @param page - The page number (default: 1)
 * @returns The upcoming movies for the German region
 */
export async function fetchUpcomingMovies(
  page: number = 1
): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(`/movie/upcoming?page=${page}&region=DE`);
}

/**
 * Fetch movie credits including cast and crew
 * @param movieId - The ID of the movie to fetch credits for
 * @returns The movie credits including cast and crew
 */
export async function fetchMovieCredits(
  movieId: number
): Promise<MovieCredits> {
  return tmdbFetch<MovieCredits>(`/movie/${movieId}/credits`);
}

/**
 * Fetch videos (trailers, teasers, etc.) for a movie
 * @param movieId - The ID of the movie to fetch videos for
 * @returns The movie videos response containing an array of videos
 */
export async function fetchMovieVideos(
  movieId: number
): Promise<MovieVideosResponse> {
  return tmdbFetch<MovieVideosResponse>(`/movie/${movieId}/videos`);
}

/**
 * Fetch person details by ID
 * @param personId - The ID of the person to fetch
 * @returns The person details
 */
export async function fetchPerson(personId: number): Promise<PersonDetails> {
  return tmdbFetch<PersonDetails>(`/person/${personId}`);
}

/**
 * Fetch movie credits for a person
 * @param personId - The ID of the person to fetch credits for
 * @returns The person's movie credits
 */
export async function fetchPersonCredits(
  personId: number
): Promise<PersonCreditsResponse> {
  return tmdbFetch<PersonCreditsResponse>(`/person/${personId}/movie_credits`);
}

/**
 * Fetch movie recommendations based on a movie ID
 * @param movieId - The ID of the movie to fetch recommendations for
 * @param page - The page number (default: 1)
 * @returns The movie recommendations response containing an array of similar movies
 */
export async function fetchMovieRecommendations(
  movieId: number,
  page: number = 1
): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(
    `/movie/${movieId}/recommendations?page=${page}`
  );
}

/**
 * Fetch similar movies based on a movie ID
 * @param movieId - The ID of the movie to fetch similar movies for
 * @param page - The page number (default: 1)
 * @returns The similar movies response containing an array of similar movies
 */
export async function fetchMovieSimilar(
  movieId: number,
  page: number = 1
): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(`/movie/${movieId}/similar?page=${page}`);
}

/**
 * Fetch a list by its ID using TMDB API v4
 * @param listId - The ID of the list to fetch
 * @param page - The page number (default: 1)
 * @returns The list details and results
 */
export async function fetchList(
  listId: string,
  page: number = 1
): Promise<ListResponse> {
  return tmdbFetch<ListResponse>(`/list/${listId}?page=${page}`, {}, true);
}
