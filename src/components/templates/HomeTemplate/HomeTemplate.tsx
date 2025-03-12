import { Genre, Movie, Results } from "../../../types/media";
import "./HomeTemplate.scss";

import Header from "../../organisms/Header/Header";
import MediaSynopsis from "../../organisms/PopularMedia/MediaSynopsis";
import Footer from "../../organisms/Footer/Footer";

interface HomeTemplateProps {
  genresData?: Genre[];
  popularData: Media<Movie>; // or TV
}

interface Media<Data> {
  loading: boolean;
  data: Results<Data> | null;
  error: string | null;
}

function HomeTemplate({ genresData = [], popularData }: HomeTemplateProps) {
  return (
    <>
      <Header />
      <MediaSynopsis
        title={"Película más popular"}
        mediaTitle={popularData.data ? popularData.data.results[0].title : null}
        backdropPath={
          popularData.data ? popularData.data.results[0].backdrop_path : null
        }
        posterPath={
          popularData.data ? popularData.data.results[0].poster_path : null
        }
        genres={
          popularData.data
            ? popularData.data.results[0].genre_ids
                .map((id) => {
                  const genre = genresData.find(
                    (genre: Genre) => genre.id === id
                  );
                  return genre ? genre.name : "";
                })
                .filter((name) => name !== "")
            : []
        }
        releaseDate={
          popularData.data
            ? popularData.data.results[0].release_date.split("-")
            : null
        }
        voteAverage={
          popularData.data ? popularData.data.results[0].vote_average : null
        }
        overview={
          popularData.data ? popularData.data.results[0].overview : null
        }
        link={{
          linkTo: `/movie/${String(
            popularData.data ? popularData.data.results[0].id : 0
          )}`,
          children: "Ver detalles",
        }}
        error={popularData.error ?? undefined}
      />
      <Footer />
    </>
  );
}

export default HomeTemplate;
