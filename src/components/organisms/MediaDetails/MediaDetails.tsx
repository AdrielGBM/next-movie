import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Company, Images, Season } from "../../../types/media";
import "./MediaDetails.scss";

import Card from "../../molecules/Card/Card";
import Button from "../../atoms/Button/Button";
import Image from "../../atoms/Image/Image";

interface MediaDetailsProps {
  images?: Images;
  companies?: Company[];
  seasons?: Season[];
}

function MediaDetails({ images, companies, seasons }: MediaDetailsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="media-details">
      {images && (images.backdrops.length > 0 || images.posters.length > 0) ? (
        <>
          <h2 className="media-details__title">Imágenes</h2>
          <div className="media-details__carrousel">
            <Button
              classes="media-details__button media-details__button--left button--gray"
              functionOnClick={scrollLeft}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <div className="media-details__images" ref={carouselRef}>
              {images.backdrops.map((image, index) => {
                return (
                  <Image
                    key={index}
                    classes="image--rounded"
                    type="backdrop"
                    name="Fondo"
                    path={image.file_path}
                  />
                );
              })}
              {images.posters.map((image, index) => {
                return (
                  <Image
                    key={index}
                    classes="image--rounded"
                    type="poster"
                    name="Póster"
                    path={image.file_path}
                  />
                );
              })}
            </div>
            <Button
              classes="media-details__button media-details__button--right button--gray"
              functionOnClick={scrollRight}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        </>
      ) : null}
      {seasons && seasons.length > 0 ? (
        <>
          <h2 className="media-details__title">Temporadas</h2>
          <div className="media-details__seasons">
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
      ) : null}
      {companies && companies.length > 0 ? (
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
      ) : null}
    </section>
  );
}

export default MediaDetails;
