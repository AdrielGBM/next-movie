import { useEffect, useState } from "react";
import useResponsiveWindow from "../../../hooks/useResponsiveWindow";
import "./MediaSynopsis.scss";

import Image from "../../atoms/Image/Image";
import Link from "../../atoms/Link/Link";
import Button from "../../atoms/Button/Button";

interface MediaSynopsisProps {
  title?: string | null;
  mediaTitle: string | null;
  backdropPath: string | null;
  posterPath: string | null;
  genres: string[] | null;
  releaseDate: string[] | null;
  voteAverage: number | null;
  overview: string | null;
  link?: {
    linkTo: string;
    children: React.ReactNode;
  };
  isLoading: boolean;
  error?: string;
}

function MediaSynopsis({
  title,
  mediaTitle,
  backdropPath,
  posterPath,
  genres,
  releaseDate,
  voteAverage,
  overview,
  link,
  isLoading,
  error,
}: MediaSynopsisProps) {
  const { width, height } = useResponsiveWindow();
  const [image, setImage] = useState<
    ["backdrop" | "logo" | "poster" | "profile", string]
  >(["backdrop", ""]);

  useEffect(() => {
    if (width / height > 1) {
      if (backdropPath) {
        setImage(["backdrop", backdropPath]);
        return;
      }
    } else if (posterPath) {
      setImage(["poster", posterPath]);
    }
  }, [width, height, backdropPath, posterPath]);

  if (isLoading) {
    return (
      <div className="media-synopsis">
        <p className="text--description">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="media-synopsis">
        <p className="text--description">{error}</p>
      </div>
    );
  }

  return (
    <section className="media-synopsis">
      <Image type={image[0]} name={mediaTitle ?? ""} path={image[1]}></Image>
      <div className="image-gradient"></div>
      <div className="media-synopsis__information">
        <div className="media-synopsis__information-title">
          <h1 className={title !== undefined ? "text--title" : "text--media"}>
            {title !== undefined
              ? title
              : `${mediaTitle ?? ""} (${releaseDate ? releaseDate[0] : ""})`}
          </h1>
          {title !== undefined && releaseDate ? (
            <h2 className="text--media">{`${mediaTitle ?? ""} (${
              releaseDate[0]
            })`}</h2>
          ) : (
            ""
          )}
        </div>
        <span className="text--information">
          {genres && genres.length > 0
            ? genres.join(", ")
            : "No hay géneros disponibles"}
        </span>
        <span className="text--score">
          {voteAverage
            ? `${(voteAverage * 10).toFixed(0)} / 100`
            : "No hay puntuación disponible"}
        </span>
      </div>
      <div className="media-synopsis__description">
        <p className="text--description">
          {overview && overview !== ""
            ? overview
            : "No hay descripción disponible"}
        </p>
        {link ? (
          <Link linkTo={link.linkTo}>
            <Button classes={"details-button"}>{link.children}</Button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default MediaSynopsis;
