import HomeTemplate from "../../components/templates/HomeTemplate/HomeTemplate";
import "./HomePage.scss";

import useResults from "../../hooks/useResults";
import { Movie } from "../../types/media";

function HomePage() {
  const {
    loading: popularMoviesLoading,
    data: popularMoviesData,
    error: popularMoviesError,
  } = useResults<Movie>("/discover/movie?language=es-MX&page=1");

  return (
    <>
      <HomeTemplate
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
