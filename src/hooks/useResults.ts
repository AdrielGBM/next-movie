import { useState, useEffect } from "react";
import get from "../services/get";
import {
  Results,
  Movie,
  Series,
  MovieDetails,
  SeriesDetails,
} from "../types/media";

function useResults<Data>(path: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Results<Data> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toTranslate, setToTranslate] = useState<
    { id: string; type: string; index: number }[]
  >([]);

  async function translate(id: string, type: string) {
    let result = await get<MovieDetails | SeriesDetails>(
      `/3/${type}/${id}?language=es-ES`
    );

    if (result.overview === "") {
      result = await get<MovieDetails | SeriesDetails>(
        `/3/${type}/${id}?language=en-US`
      );
    }

    return result;
  }

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const result = await get<Results<Data>>(
          "/3" + path + (path.includes("?") ? "&" : "?") + "language=es-MX"
        );

        const itemsToTranslate: { id: string; type: string; index: number }[] =
          [];

        (result as Results<Movie> | Results<Series>).results.forEach(
          (m, index) => {
            if (m.overview === "") {
              itemsToTranslate.push({
                id: String(m.id),
                type: "title" in m ? "movie" : "tv",
                index: index,
              });
            }
          }
        );

        setToTranslate(itemsToTranslate);
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    void getData();
  }, [path]);

  useEffect(() => {
    async function getTranslations() {
      if (data) {
        const updatedResults = [...data.results];

        for (const item of toTranslate) {
          const translation = await translate(item.id, item.type);

          const index = item.index;
          if (index !== -1) {
            if (item.type === "movie") {
              (updatedResults[index] as Movie).overview = translation.overview;
              (updatedResults[index] as Movie).title = (
                translation as MovieDetails
              ).title;
            } else {
              (updatedResults[index] as Series).overview = translation.overview;
              (updatedResults[index] as Series).name = (
                translation as SeriesDetails
              ).name;
            }
          }
        }

        setData({ ...data, results: updatedResults });
      }
    }

    if (toTranslate.length > 0) {
      void getTranslations();
    }
  }, [toTranslate, data]);

  return { loading, data, error };
}

export default useResults;
