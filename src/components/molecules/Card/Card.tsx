import "./Card.scss";

import Image from "../../atoms/Image/Image";
import Link from "../../atoms/Link/Link";

interface CardProps {
  title: string;
  image: string;
  upperInformation?: string;
  centerInformation?: string;
  lowerInformation?: string;
  linkTo?: string;
}

function Card({
  title,
  image,
  upperInformation = "",
  centerInformation = "",
  lowerInformation = "",
  linkTo,
}: CardProps) {
  if (linkTo) {
    return (
      <Link classes="card" linkTo={linkTo}>
        <Image type="poster" name={title} path={image} isSmall={true}></Image>
        <div className="image-darker translucent"></div>
        <div className="card__information">
          <span className="card--media translucent">{title}</span>
          <span className="card--information translucent">
            {upperInformation}
          </span>
          {centerInformation + lowerInformation}
        </div>
      </Link>
    );
  }
  return (
    <div className="card">
      <Image type="poster" name={title} path={image} isSmall={true}></Image>
      <div className="image-darker translucent"></div>
      <div className="card__information">
        <span className="card--media translucent">{title}</span>
        <span className="card--information translucent">
          {upperInformation}
        </span>
      </div>
    </div>
  );
}

export default Card;
