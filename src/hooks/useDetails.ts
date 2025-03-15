import { useState, useEffect } from "react";
import get from "../services/get";
import { MovieDetails, SeriesDetails } from "../types/media";

function useDetails(path: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<MovieDetails | SeriesDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let result = await get<MovieDetails | SeriesDetails>(
          "/3" + path + (path.includes("?") ? "&" : "?") + "language=es-MX"
        );
        if (result.overview === "") {
          result = await get<MovieDetails | SeriesDetails>(
            "/3" + path + (path.includes("?") ? "&" : "?") + "language=es-ES"
          );
        }
        if (result.overview === "") {
          result = await get<MovieDetails | SeriesDetails>(
            "/3" + path + (path.includes("?") ? "&" : "?") + "language=en-US"
          );
        }
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    void getData();
  }, [path]);

  return { loading, data, error };
}

export default useDetails;
