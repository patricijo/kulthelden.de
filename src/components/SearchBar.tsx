"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/suche?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear the search input after submitting
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <input
        type="text"
        placeholder="Suchen..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="absolute right-0"
        aria-label="Suchen"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
