import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { Movie } from "@/types/movie";

export function useMovies() {
  const { data, error, isLoading } = useSWR<{ products: Movie[] }>(
   process.env.NEXT_PUBLIC_URL_API,
    fetcher
  );
  return {
    movies: data?.products ?? [],
    isLoading,
    error,
  };
}
