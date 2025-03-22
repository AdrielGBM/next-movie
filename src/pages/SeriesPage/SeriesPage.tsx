import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Genre, Series } from "../../types/media";
import useGenres from "../../hooks/useGenres";
import useResults from "../../hooks/useResults";
import "./SeriesPage.scss";

import DiscoverTemplate from "../../components/templates/DiscoverTemplate/DiscoverTemplate";

function SeriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultParams = useMemo(
    () =>
      ({
        page: ["page", "1"],
        sort_by: ["sort_by", "popularity.desc"],
        vote_average_gte: ["vote_average.gte", "0"],
        vote_average_lte: ["vote_average.lte", "100"],
        vote_count_gte: ["vote_count.gte", "100"],
        vote_count_lte: ["vote_count.lte", "0"],
        with_genres: ["with_genres", ""],
      } as Record<string, [string, string]>),
    []
  );
  const [params, setParams] = useState({
    page: searchParams.get("page") ?? defaultParams.page[1],
    sort_by: searchParams.get("sort_by") ?? defaultParams.sort_by[1],
    vote_average_gte:
      searchParams.get("vote_average.gte") ?? defaultParams.vote_average_gte[1],
    vote_average_lte:
      searchParams.get("vote_average.lte") ?? defaultParams.vote_average_lte[1],
    vote_count_gte:
      searchParams.get("vote_count.gte") ?? defaultParams.vote_count_gte[1],
    vote_count_lte:
      searchParams.get("vote_count.lte") ?? defaultParams.vote_count_lte[1],
    with_genres:
      searchParams.get("with_genres") ?? defaultParams.with_genres[1],
  });

  const path = useMemo(() => {
    const queryParams = [
      `page=${params.page}`,
      params.sort_by !== "popularity.desc" ? `sort_by=${params.sort_by}` : null,
      params.vote_average_gte !== "0"
        ? `vote_average.gte=${params.vote_average_gte}`
        : null,
      params.vote_average_lte !== "0"
        ? `vote_average.lte=${params.vote_average_lte}`
        : null,
      params.vote_count_gte !== "0"
        ? `vote_count.gte=${params.vote_count_gte}`
        : null,
      params.vote_count_lte !== "0"
        ? `vote_count.lte=${params.vote_count_lte}`
        : null,
      params.with_genres ? `with_genres=${params.with_genres}` : null,
    ]
      .filter(Boolean)
      .join("&");

    return `/discover/tv?${queryParams}`;
  }, [params]);

  const { data: genresData } = useGenres();
  const { loading, data, error } = useResults<Series>(path);

  useEffect(() => {
    setParams({
      page: searchParams.get("page") ?? defaultParams.page[1],
      sort_by: searchParams.get("sort_by") ?? defaultParams.sort_by[1],
      vote_average_gte:
        searchParams.get("vote_average.gte") ??
        defaultParams.vote_average_gte[1],
      vote_average_lte:
        searchParams.get("vote_average.lte") ??
        defaultParams.vote_average_lte[1],
      vote_count_gte:
        searchParams.get("vote_count.gte") ?? defaultParams.vote_count_gte[1],
      vote_count_lte:
        searchParams.get("vote_count.lte") ?? defaultParams.vote_count_lte[1],
      with_genres:
        searchParams.get("with_genres") ?? defaultParams.with_genres[1],
    });
  }, [searchParams, defaultParams]);

  return (
    <>
      <DiscoverTemplate
        title="Series"
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        genresData={genresData ? (genresData.genres as Genre[]) : undefined}
        mediaData={{
          loading: loading,
          data: data,
          error: error,
        }}
      />
    </>
  );
}

export default SeriesPage;
