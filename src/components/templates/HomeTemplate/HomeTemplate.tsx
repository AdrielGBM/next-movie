import { Genre, Movie, Results, Series } from "../../../types/media";
import "./HomeTemplate.scss";

import Header from "../../organisms/Header/Header";
import MediaSynopsis from "../../organisms/MediaSynopsis/MediaSynopsis";
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
  console.log(popularSeriesData);

  const movie = popularMoviesData.data
    ? popularMoviesData.data.results[0]
    : null;

  const getGenres = (genreIds: number[]) => {
    return genreIds
      .map((id) => {
        const genre = genresData.find((genre: Genre) => genre.id === id);
        return genre ? genre.name : "";
      })
      .filter((name) => name !== "");
  };
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
      <Footer />
    </>
  );
}

export default HomeTemplate;
