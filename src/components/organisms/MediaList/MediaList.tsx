import { Movie, Results, Series } from "../../../types/media";
import "./MediaList.scss";

import Link from "../../atoms/Link/Link";
import Button from "../../atoms/Button/Button";
import Card from "../../molecules/Card/Card";

interface MediaListProps {
  title?: string;
  link?: {
    linkTo: string;
    children: React.ReactNode;
  };
  data: Results<Movie | Series> | null;
  getGenres: (genreIds: number[]) => string[] | null;
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
      {data?.results.length !== 0 ? (
        <div className="media-list__container">
          {data
            ? data.results.map((media, index) => {
                return (
                  <Card
                    key={index}
                    title={`${
                      (media as Movie).title || (media as Series).name
                    }${
                      (media as Movie).release_date ||
                      (media as Series).first_air_date
                        ? ` (${
                            (
                              (media as Movie).release_date ||
                              (media as Series).first_air_date
                            ).split("-")[0]
                          })`
                        : ""
                    }`}
                    image={media.poster_path || media.backdrop_path}
                    information={(() => {
                      const genres = getGenres(media.genre_ids);
                      return genres ? genres.join(", ") : "";
                    })()}
                    linkTo={`/${"title" in media ? "movie" : "tv"}/${String(
                      media.id
                    )}`}
                  ></Card>
                );
              })
            : ""}
        </div>
      ) : (
        <p className="text--description">No se encontraron resultados.</p>
      )}
    </section>
  );
}

export default MediaList;
