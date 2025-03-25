import { useParams } from "react-router";
import useDetails from "../../hooks/useDetails";
import useImages from "../../hooks/useImages";
import { MovieDetails } from "../../types/media";
import "./MovieDetailsPage.scss";

import DetailsTemplate from "../../components/templates/DetailsTemplate/DetailsTemplate";

function MovieDetailsPage() {
  const { movieId } = useParams();

  const {
    loading: detailsLoading,
    data: DetailsData,
    error: DetailsError,
  } = useDetails(`/movie/${movieId ?? ""}`);
  const {
    loading: imagesLoading,
    data: imagesData,
    error: imagesError,
  } = useImages(`/movie/${movieId ?? ""}`);

  return (
    <>
      <DetailsTemplate
        movie={{
          loading: detailsLoading,
          data: DetailsData as MovieDetails,
          error: DetailsError,
        }}
        images={{
          loading: imagesLoading,
          data: imagesData,
          error: imagesError,
        }}
      />
    </>
  );
}

export default MovieDetailsPage;
