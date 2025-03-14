import { useState, useEffect } from "react";
import get from "../services/get";
import { Genres, Genre } from "../types/media";

function useGenres() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Genres | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const movieGenres = await get<Genres>(
          "/3/genre/movie/list?language=es-MX"
        );
        const result = movieGenres;
        setData(result);
        const tvGenres = await get<Genres>("/3/genre/tv/list?language=es-MX");
        (tvGenres.genres as Genre[]).forEach((genre: Genre) => {
          if (!result.genres.some((g) => (g as Genre).id === genre.id)) {
            if (result.genres.every((g) => typeof g !== "string")) {
              result.genres.push(genre);
            }
          }
        });
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    void getData();
  }, []);

  return { loading, data, error };
}

export default useGenres;
