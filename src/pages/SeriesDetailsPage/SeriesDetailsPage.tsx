import { useParams } from "react-router";
import useDetails from "../../hooks/useDetails";
import useImages from "../../hooks/useImages";
import { SeriesDetails } from "../../types/media";
import "./SeriesDetailsPage.scss";

import DetailsTemplate from "../../components/templates/DetailsTemplate/DetailsTemplate";

function SeriesDetailsPage() {
  const { tvId } = useParams();

  const {
    loading: detailsLoading,
    data: DetailsData,
    error: DetailsError,
  } = useDetails(`/tv/${tvId ?? ""}`);
  const {
    loading: imagesLoading,
    data: imagesData,
    error: imagesError,
  } = useImages(`/tv/${tvId ?? ""}`);

  return (
    <>
      <DetailsTemplate
        series={{
          loading: detailsLoading,
          data: DetailsData as SeriesDetails,
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

export default SeriesDetailsPage;
