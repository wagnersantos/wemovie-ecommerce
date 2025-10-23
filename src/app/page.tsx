'use client'

import Loading from "./loading";
import { useMovies } from "@/hooks/useMovies";
import MovieCard from "@/components/MovieCard";
import EmptyState from "@/components/ShowState";

export default function Page() {
  const { movies, isLoading } = useMovies();
  
  if (isLoading) return <Loading />;
  if(!movies.length) return <EmptyState />;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {movies.map(m => <MovieCard key={m.id} movie={m} />)}
    </div>
  )
}
