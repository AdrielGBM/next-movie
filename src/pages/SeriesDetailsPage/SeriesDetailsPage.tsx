import { useParams } from "react-router";
import useDetails from "../../hooks/useDetails";
import "./SeriesDetailsPage.scss";

import DetailsTemplate from "../../components/templates/DetailsTemplate/DetailsTemplate";
import { SeriesDetails } from "../../types/media";

function SeriesDetailsPage() {
  const { tvId } = useParams();

  const { loading, data, error } = useDetails(`/tv/${tvId ?? ""}`);

  return (
    <>
      <DetailsTemplate
        series={{
          loading: loading,
          data: data as SeriesDetails,
          error: error,
        }}
      />
    </>
  );
}

export default SeriesDetailsPage;
