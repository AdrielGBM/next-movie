import useGenres from "../../hooks/useGenres";
import useResults from "../../hooks/useResults";
import { Genre, Movie } from "../../types/media";
import "./MoviesPage.scss";

import DiscoverTemplate from "../../components/templates/DiscoverTemplate/DiscoverTemplate";

function MoviesPage() {
  const { data: genresData } = useGenres();

  const { loading, data, error } = useResults<Movie>(
    "/discover/movie?page=1&vote_count.gte=100"
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

export default MoviesPage;
