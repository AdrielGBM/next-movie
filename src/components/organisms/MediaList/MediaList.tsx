import { Movie, Results, Series } from "../../../types/media";
import Button from "../../atoms/Button/Button";
import Link from "../../atoms/Link/Link";
import Card from "../../molecules/Card/Card";
import "./MediaList.scss";

interface MediaListProps {
  title?: string;
  link?: {
    linkTo: string;
    children: React.ReactNode;
  };
  data: Results<Movie | Series> | null;
  getGenres: (genreIds: number[]) => string[];
  isLoading: boolean;
  error?: string;
}

function MediaList({
  title,
  link,
  data,
  getGenres,
  isLoading,
  error,
}: MediaListProps) {
  if (isLoading) {
    return (
      <div className="media-list">
        <p className="text--description">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="media-list">
        <p className="text--description">{error}</p>
      </div>
    );
  }
  return (
    <section className="media-list">
      {title && link ? (
        <div className="media-list__title">
          <h2 className="text--title">{title}</h2>
          <Link linkTo={link.linkTo}>
            <Button classes={"button--yellow"}>{link.children}</Button>
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="media-list__container">
        {data
          ? data.results.map((media, index) => {
              return (
                <Card
                  key={index}
                  title={`${
                    (media as Movie).title || (media as Series).name
                  } (${
                    (
                      (media as Movie).release_date ||
                      (media as Series).first_air_date
                    ).split("-")[0]
                  })`}
                  image={media.poster_path || media.backdrop_path}
                  information={getGenres(media.genre_ids).join(", ")}
                  linkTo={`/${"title" in media ? "movie" : "tv"}/${String(
                    media.id
                  )}`}
                ></Card>
              );
            })
          : ""}
      </div>
    </section>
  );
}

export default MediaList;
