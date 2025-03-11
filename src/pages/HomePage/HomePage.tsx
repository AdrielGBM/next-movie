import HomeTemplate from "../../components/templates/HomeTemplate/HomeTemplate";
import "./HomePage.scss";

import useResults from "../../hooks/useResults";
import { Genre, Movie } from "../../types/media";
import useGenres from "../../hooks/useGenres";

function HomePage() {
  const { data: genresData } = useGenres("movie");

  const {
    loading: popularMoviesLoading,
    data: popularMoviesData,
    error: popularMoviesError,
  } = useResults<Movie>("/discover/movie?language=es-MX&page=1");

  return (
    <>
      <HomeTemplate
        genresData={genresData ? (genresData.genres as Genre[]) : undefined}
        popularData={{
          loading: popularMoviesLoading,
          data: popularMoviesData,
          error: popularMoviesError,
        }}
      />
    </>
  );
}

export default HomePage;
