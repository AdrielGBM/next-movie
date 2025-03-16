import useGenres from "../../hooks/useGenres";
import useResults from "../../hooks/useResults";
import { Genre, Series } from "../../types/media";
import "./SeriesPage.scss";

import DiscoverTemplate from "../../components/templates/DiscoverTemplate/DiscoverTemplate";

function SeriesPage() {
  const { data: genresData } = useGenres();

  const { loading, data, error } = useResults<Series>(
    "/discover/tv?page=1&vote_count.gte=100"
  );

  return (
    <>
      <DiscoverTemplate
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
