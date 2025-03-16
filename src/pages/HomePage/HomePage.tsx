import HomeTemplate from "../../components/templates/HomeTemplate/HomeTemplate";
import "./HomePage.scss";

import useResults from "../../hooks/useResults";
import { Genre, Movie, Series } from "../../types/media";
import useGenres from "../../hooks/useGenres";

function HomePage() {
  const { data: genresData } = useGenres();

  const {
    loading: popularMoviesLoading,
    data: popularMoviesData,
    error: popularMoviesError,
  } = useResults<Movie>("/discover/movie?page=1&vote_count.gte=100");

  const {
    loading: popularSeriesLoading,
    data: popularSeriesData,
    error: popularSeriesError,
  } = useResults<Series>("/discover/tv?page=1&vote_count.gte=100");

  return (
    <>
      <HomeTemplate
        genresData={genresData ? (genresData.genres as Genre[]) : undefined}
        popularMoviesData={{
          loading: popularMoviesLoading,
          data: popularMoviesData,
          error: popularMoviesError,
        }}
        popularSeriesData={{
          loading: popularSeriesLoading,
          data: popularSeriesData,
          error: popularSeriesError,
        }}
      />
    </>
  );
}

export default HomePage;
