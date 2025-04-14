import "server-only";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_BASE_URL_v4 = "https://api.themoviedb.org/4";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function tmdbFetch<T>(
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
      throw new Error(
        `Failed to fetch from TMDB API: ${
          errorData.status_message || response.statusText
        }`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    throw new Error(
      `Failed to fetch from TMDB API: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
