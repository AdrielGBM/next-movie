import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import "./SearchPage.scss";

import SearchTemplate from "../../components/templates/SearchTemplate/SearchTemplate";
import useGenres from "../../hooks/useGenres";
import useResults from "../../hooks/useResults";
import { Genre, Movie, Series } from "../../types/media";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultParams = useMemo(
    () =>
      ({
        page: ["page", "1"],
        type: ["type", "movie"],
        query: ["query", ""],
      } as Record<string, [string, string]>),
    []
  );
  const [params, setParams] = useState({
    page: searchParams.get("page") ?? defaultParams.page[1],
    type: searchParams.get("type") ?? defaultParams.type[1],
    query: searchParams.get("query") ?? defaultParams.type[1],
  });

  const path = useMemo(() => {
    const queryParams = [
      `page=${params.page}`,
      params.type !== "movie" ? `type=${params.type}` : null,
      params.query ? `query=${params.query}` : null,
    ]
      .filter(Boolean)
      .join("&");

    return `/search/${params.type}?${queryParams}`;
  }, [params]);

  const { data: genresData } = useGenres();
  const { loading, data, error } = useResults<Movie | Series>(path);

  useEffect(() => {
    setParams({
      page: searchParams.get("page") ?? defaultParams.page[1],
      type: searchParams.get("type") ?? defaultParams.type[1],
      query: searchParams.get("query") ?? defaultParams.type[1],
    });
  }, [searchParams, defaultParams]);

  return (
    <>
      <SearchTemplate
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        genresData={genresData ? (genresData.genres as Genre[]) : undefined}
        mediaData={{
          loading,
          data,
          error,
        }}
      ></SearchTemplate>
    </>
  );
}

export default SearchPage;
