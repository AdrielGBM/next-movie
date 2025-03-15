import { useParams } from "react-router";
import useDetails from "../../hooks/useDetails";
import "./MovieDetailsPage.scss";

import DetailsTemplate from "../../components/templates/DetailsTemplate/DetailsTemplate";
import { MovieDetails } from "../../types/media";

function MovieDetailsPage() {
  const { movieId } = useParams();

  const { loading, data, error } = useDetails(`/movie/${movieId ?? ""}`);

  return (
    <>
      <DetailsTemplate
        movie={{ loading: loading, data: data as MovieDetails, error: error }}
      />
    </>
  );
}

export default MovieDetailsPage;
