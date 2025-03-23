import { MovieDetails, SeriesDetails } from "../../../types/media";
import "./DetailsTemplate.scss";

import Header from "../../organisms/Header/Header";
import MediaSynopsis from "../../organisms/MediaSynopsis/MediaSynopsis";
import MediaDetails from "../../organisms/MediaDetails/MediaDetails";
import Footer from "../../organisms/Footer/Footer";

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
  console.log(details);

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
            ? (details as MovieDetails).release_date ||
              (details as SeriesDetails).first_air_date
              ? (
                  (details as MovieDetails).release_date ||
                  (details as SeriesDetails).first_air_date
                ).split("-")
              : null
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
      <MediaDetails
        companies={details ? details.production_companies : undefined}
        seasons={details ? (details as SeriesDetails).seasons : undefined}
      />
      <Footer />
    </>
  );
}

export default DetailsTemplate;
