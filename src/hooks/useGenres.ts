import { useState, useEffect } from "react";
import get from "../services/get";
import { Genres } from "../types/media";

function useGenres(type: "movie" | "tv") {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Genres | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const result = await get<Genres>(
          "/3/genre/" + type + "/list?language=es-MX"
        );
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    void getData();
  }, [type]);

  return { loading, data, error };
}

export default useGenres;
