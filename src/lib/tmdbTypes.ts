export interface ListResponse {
  created_by: string;
  description: string;
  favorite_count: number;
  id: number;
  results: Movie[];
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

export interface Movie {
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
  media_type?: string;
  character?: string;
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

export interface MovieCredits {
  id: number;
  cast: Person[];
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

export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character?: string;
  credit_id: string;
  order: number;
  kult?: boolean;
}
export interface PersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
  kult?: boolean;
  termId?: number;
}

export interface PersonCredits {
  id: number;
  cast: Movie[];
  crew: Movie[];
}

export interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: Movie[];
}

export interface MovieVideosResponse {
  id: number;
  results: Video[];
}
export interface Video {
  id: number;
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

export interface SearchMovieResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export interface SearchPersonResponse {
  page: number;
  results: Person[];
  total_results: number;
  total_pages: number;
}
