import { useState, useEffect } from "react";
import get from "../services/get";
import { Results, Movie, Series } from "../types/media";

function useResults<Data>(path: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Results<Data> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const mxResults = await get<Results<Data>>(
          "/3" + path + (path.includes("?") ? "&" : "?") + "language=es-MX"
        );
        const result = mxResults;

        const esResults = await get<Results<Data>>(
          "/3" + path + (path.includes("?") ? "&" : "?") + "language=es-ES"
        );
        (result as Results<Movie> | Results<Series>).results.forEach(
          (m, index) => {
            if (m.overview === "") {
              if (
                (esResults as Results<Movie> | Results<Series>).results[index]
                  .overview !== ""
              ) {
                (result as Results<Movie> | Results<Series>).results[index] = (
                  esResults as Results<Movie> | Results<Series>
                ).results[index];
              }
            }
          }
        );

        const enResults = await get<Results<Data>>(
          "/3" + path + (path.includes("?") ? "&" : "?") + "language=en-US"
        );
        (result as Results<Movie> | Results<Series>).results.forEach(
          (m, index) => {
            if (m.overview === "") {
              if (
                (enResults as Results<Movie> | Results<Series>).results[index]
                  .overview !== ""
              ) {
                (result as Results<Movie> | Results<Series>).results[index] = (
                  enResults as Results<Movie> | Results<Series>
                ).results[index];
              }
            }
          }
        );

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

export default useResults;
