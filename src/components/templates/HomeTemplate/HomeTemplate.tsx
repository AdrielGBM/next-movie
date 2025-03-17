import useResponsiveWindow from "../../../hooks/useResponsiveWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Genre, Movie, Results, Series } from "../../../types/media";
import "./HomeTemplate.scss";

import Header from "../../organisms/Header/Header";
import MediaSynopsis from "../../organisms/MediaSynopsis/MediaSynopsis";
import MediaList from "../../organisms/MediaList/MediaList";
import Footer from "../../organisms/Footer/Footer";

interface HomeTemplateProps {
  genresData?: Genre[];
  popularMoviesData: Media<Movie>; // or TV
  popularSeriesData: Media<Series>;
}

interface Media<Data> {
  loading: boolean;
  data: Results<Data> | null;
  error: string | null;
}

function HomeTemplate({
  genresData = [],
  popularMoviesData,
  popularSeriesData,
}: HomeTemplateProps) {
  const { width } = useResponsiveWindow();
  const movie = popularMoviesData.data
    ? popularMoviesData.data.results[0]
    : null;

  function getGenres(genreIds: number[]) {
    return genreIds
      .map((id) => {
        const genre = genresData.find((genre: Genre) => genre.id === id);
        return genre ? genre.name : "";
      })
      .filter((name) => name !== "");
  }

  return (
    <>
      <Header />
      <MediaSynopsis
        title={"Película más popular"}
        mediaTitle={movie ? movie.title : null}
        backdropPath={movie ? movie.backdrop_path : null}
        posterPath={movie ? movie.poster_path : null}
        genres={movie ? getGenres(movie.genre_ids) : []}
        releaseDate={movie ? movie.release_date.split("-") : null}
        voteAverage={movie ? movie.vote_average : null}
        overview={movie ? movie.overview : null}
        link={{
          linkTo: `/movie/${String(movie ? movie.id : 0)}`,
          children: "Ver detalles",
        }}
        isLoading={popularMoviesData.loading}
        error={popularMoviesData.error ?? undefined}
      />
      <MediaList
        title={"Películas populares"}
        link={{
          linkTo: "/movies",
          children:
            width > 640 ? (
              "Ir a Películas"
            ) : (
              <FontAwesomeIcon icon={faArrowRight} />
            ),
        }}
        data={popularMoviesData.data}
        getGenres={getGenres}
        isLoading={popularMoviesData.loading}
        error={popularMoviesData.error ?? undefined}
      ></MediaList>
      <MediaList
        title={"Series populares"}
        link={{ linkTo: "/tv", children: "Ir a TV" }}
        data={popularSeriesData.data}
        getGenres={getGenres}
        isLoading={popularSeriesData.loading}
        error={popularSeriesData.error ?? undefined}
      ></MediaList>
      <Footer />
    </>
  );
}

export default HomeTemplate;
