import "./Card.scss";

import Image from "../../atoms/Image/Image";
import Link from "../../atoms/Link/Link";

interface CardProps {
  title: string;
  imageType?: "backdrop" | "logo" | "poster" | "profile";
  image: string | null;
  information?: string;
  linkTo?: string;
}

function Card({
  title,
  imageType,
  image,
  information = "",
  linkTo,
}: CardProps) {
  if (linkTo) {
    return (
      <Link classes="card" linkTo={linkTo}>
        <Image
          type={imageType ?? "poster"}
          name={title}
          path={image}
          isSmall={true}
        ></Image>
        <div className="image-darker translucent"></div>
        <div className="card__information">
          <span className={`card--media ${image ? "translucent" : ""}`}>
            {title}
          </span>
          <span className="card--information translucent">{information}</span>
        </div>
      </Link>
    );
  }
  return (
    <div className="card">
      <Image
        type={imageType ?? "poster"}
        name={title}
        path={image}
        isSmall={true}
      ></Image>
      <div className="image-darker translucent"></div>
      <div className="card__information">
        <span className={`card--media ${image ? "translucent" : ""}`}>
          {title}
        </span>
        <span className="card--information translucent">{information}</span>
      </div>
    </div>
  );
}

export default Card;
