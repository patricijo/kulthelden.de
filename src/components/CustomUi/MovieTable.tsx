"use client";

import { Movie } from "@/lib/tmdbTypes";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MovieTable({ data }: { data: Movie[] }) {
  const [sortBy, setSortBy] = useState("year");

  const allMovies = [...data];

  if (sortBy === "year") {
    allMovies.sort((a, b) => {
      const dateA = a.release_date ? new Date(a.release_date) : new Date(0);
      const dateB = b.release_date ? new Date(b.release_date) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  }

  if (sortBy === "title") {
    allMovies.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  if (sortBy === "rating") {
    allMovies.sort((a, b) => {
      const ratingA = a.vote_average;
      const ratingB = b.vote_average;
      return ratingB - ratingA;
    });
  }

  return (
    <>
      {allMovies.length > 12 && (
        <div>
          <div className="bg-card rounded-lg shadow-lg overflow-hidden border">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" // Updated: Use text-muted-foreground
                  >
                    <button
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setSortBy("year")}
                    >
                      Jahr {sortBy == "year" && <ArrowDown size={14} />}
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" // Updated: Use text-muted-foreground
                  >
                    <button
                      className="flex items-center gap-2  cursor-pointer"
                      onClick={() => setSortBy("title")}
                    >
                      Titel {sortBy == "title" && <ArrowDown size={14} />}
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" // Updated: Use text-muted-foreground
                  >
                    Rolle
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" // Updated: Use text-muted-foreground
                    onClick={() => setSortBy("rating")}
                  >
                    <button
                      className="flex items-center gap-2  cursor-pointer"
                      onClick={() => setSortBy("rating")}
                    >
                      Bewertung {sortBy == "rating" && <ArrowDown size={14} />}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {allMovies.map((movie) => (
                  <tr
                    key={movie.id}
                    className="hover:bg-muted/50" // Updated: Use hover:bg-muted/50
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : ""}
                    </td>
                    <td className="px-4 py-4 ">
                      <Link
                        href={`/film/${movie.id}_${movie.title
                          .toLowerCase()
                          .replace(/ä/g, "ae")
                          .replace(/ö/g, "oe")
                          .replace(/ü/g, "ue")
                          .replace(/ß/g, "ss")
                          .replace(/[^\w\s-]/g, "")
                          .replace(/\s+/g, "-")}`}
                        className="text-primary hover:underline" // Updated: Use text-primary
                      >
                        {movie.title}
                      </Link>
                    </td>
                    <td className="px-4 py-4  text-sm text-muted-foreground">
                      {movie.character || ""}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span className="flex items-center  justify-end">
                        <span className="text-yellow-400 mr-1">★</span>{" "}
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
