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
