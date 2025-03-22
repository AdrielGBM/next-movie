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
    () => ({
      page: ["page", "1"],
      vote_count_gte: ["vote_count.gte", "100"],
    }),
    []
  );
  const [params, setParams] = useState({
    page: searchParams.get("page") ?? defaultParams.page[1],
    vote_count_gte:
      searchParams.get("vote_count.gte") ?? defaultParams.vote_count_gte[1],
  });

  const path = useMemo(() => {
    return `/discover/tv?page=${params.page}&vote_count.gte=${params.vote_count_gte}`;
  }, [params]);

  const { data: genresData } = useGenres();
  const { loading, data, error } = useResults<Series>(path);

  useEffect(() => {
    setParams({
      page: searchParams.get("page") ?? defaultParams.page[1],
      vote_count_gte:
        searchParams.get("vote_count.gte") ?? defaultParams.vote_count_gte[1],
    });
  }, [searchParams, defaultParams]);

  return (
    <>
      <DiscoverTemplate
        title="Series"
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
