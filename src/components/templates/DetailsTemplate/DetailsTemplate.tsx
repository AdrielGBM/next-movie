import "./DetailsTemplate.scss";

import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";
import { MovieDetails, SeriesDetails } from "../../../types/media";
import MediaSynopsis from "../../organisms/MediaSynopsis/MediaSynopsis";

interface DetailsTemplateProps {
  movie?: Media<MovieDetails>;
  series?: Media<SeriesDetails>;
}

interface Media<Data> {
  loading: boolean;
  data: Data | null;
  error: string | null;
}

function DetailsTemplate({ movie, series }: DetailsTemplateProps) {
  const details = movie ? movie.data : series ? series.data : null;

  return (
    <>
      <Header />
      <MediaSynopsis
        mediaTitle={
          details
            ? (details as MovieDetails).title || (details as SeriesDetails).name
            : null
        }
        backdropPath={details ? details.backdrop_path : null}
        posterPath={details ? details.poster_path : null}
        genres={
          details
            ? details.genres.map((genre) => {
                return genre.name;
              })
            : []
        }
        releaseDate={
          details
            ? (
                (details as MovieDetails).release_date ||
                (details as SeriesDetails).first_air_date
              ).split("-")
            : null
        }
        voteAverage={details ? details.vote_average : null}
        overview={details ? details.overview : null}
        tagline={details ? details.tagline : null}
        isLoading={movie ? movie.loading : series ? series.loading : false}
        error={
          movie
            ? movie.error ?? undefined
            : series
            ? series.error ?? undefined
            : undefined
        }
      />
      <Footer />
    </>
  );
}

export default DetailsTemplate;
