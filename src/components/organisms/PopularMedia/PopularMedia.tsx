import { useEffect, useState } from "react";
import useResponsiveWindow from "../../../hooks/useResponsiveWindow";
import { Movie } from "../../../types/media";
import "./PopularMedia.scss";

import Image from "../../atoms/Image/Image";

interface PopularMediaProps {
  media: Movie | string | null; // or TV
}

function PopularMedia({ media }: PopularMediaProps) {
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
      <h1 className="title">Más popular</h1>
      <h2 className="media-title">{media.title}</h2>
      <p>{media.overview}</p>
    </div>
  );
}

export default PopularMedia;
