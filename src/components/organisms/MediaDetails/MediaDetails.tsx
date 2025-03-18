import { Company, Season } from "../../../types/media";
import "./MediaDetails.scss";

import Card from "../../molecules/Card/Card";

interface MediaDetailsProps {
  companies?: Company[];
  seasons?: Season[];
}

function MediaDetails({ companies, seasons }: MediaDetailsProps) {
  return (
    <section className="media-details">
      {seasons ? (
        <>
          <h2 className="media-details__title">Temporadas</h2>
          <div className="media-details__companies">
            {seasons.map((season, index) => {
              return (
                <Card
                  key={index}
                  title={`${season.name}${
                    season.air_date
                      ? " (" + season.air_date.split("-")[0] + ")"
                      : ""
                  }`}
                  information={`${String(season.episode_count)} episodios`}
                  image={season.poster_path}
                ></Card>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}
      {companies ? (
        <>
          <h2 className="media-details__title">Compañías</h2>
          <div className="media-details__companies">
            {companies.map((company, index) => {
              return (
                <Card
                  key={index}
                  title={company.name}
                  imageType="logo"
                  image={company.logo_path}
                ></Card>
              );
            })}
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
}

export default MediaDetails;
