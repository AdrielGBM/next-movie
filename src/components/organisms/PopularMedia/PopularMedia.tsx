import { useEffect, useState } from "react";
import useResponsiveWindow from "../../../hooks/useResponsiveWindow";
import { Movie } from "../../../types/media";
import "./PopularMedia.scss";

import Image from "../../atoms/Image/Image";
import Button from "../../atoms/Button/Button";

interface PopularMediaProps {
  media: Movie | string | null; // or TV
  genres: string[];
}

function PopularMedia({ media, genres }: PopularMediaProps) {
  const { width, height } = useResponsiveWindow();
  const [image, setImage] = useState<
    ["backdrop" | "logo" | "poster" | "profile", string]
  >(["backdrop", ""]);

  useEffect(() => {
    if (media && typeof media !== "string") {
      if (width / height > 1) {
        setImage(["backdrop", media.backdrop_path]);
        return;
      }
      setImage(["poster", media.poster_path]);
    }
  }, [width, height, media]);

  if (!media || typeof media === "string") {
    return <div></div>;
  }

  return (
    <div className="popular-media">
      <Image type={image[0]} name={media.title} path={image[1]}></Image>
      <div className="image-gradient"></div>
      <div className="popular-media__information">
        <h1 className="title">Más popular</h1>
        <h2 className="media-title">{media.title}</h2>
        <span>{genres.join(", ")}</span>
        <span>{`Estreno: ${media.release_date}`}</span>
        <span>
          {`Puntuación: ${(media.vote_average * 10).toFixed(0)} de 100`}
        </span>
      </div>
      <div className="popular-media__description">
        <p className="description">{media.overview}</p>
        <Button classes="details-button">Ver detalles</Button>
      </div>
    </div>
  );
}

export default PopularMedia;
