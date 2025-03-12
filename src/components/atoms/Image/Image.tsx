import "./Image.scss";

interface ImageProps {
  classes?: string;
  type: "backdrop" | "logo" | "poster" | "profile";
  name: string;
  path: string;
}

function Image({ classes = "", type, name, path }: ImageProps) {
  function getSizes() {
    if (type === "backdrop") {
      return [
        ["original", "1280"],
        ["w1280", "780"],
        ["w780", "460"],
        ["w300", "300"],
      ];
    } else if (type === "logo") {
      return [
        ["original", "1920"],
        ["w500", "1280"],
        ["w300", "960"],
        ["w185", "780"],
        ["w154", "640"],
        ["w92", "460"],
        ["w45", "300"],
      ];
    } else if (type === "poster") {
      return [
        ["original", "960"],
        ["w780", "780"],
        ["w500", "640"],
        ["w342", "460"],
        ["w185", "300"],
      ];
    }
    return [
      ["original", "1280"],
      ["h632", "780"],
      ["w185", "460"],
      ["w45", "300"],
    ];
  }

  const sizes = getSizes();
  return (
    <div className={`image ${classes}`}>
      {path ? (
        <picture>
          {sizes.map((size, index) => {
            if (index + 1 === sizes.length) {
              return (
                <img
                  key={index}
                  src={`https://image.tmdb.org/t/p/${size[0]}${path}`}
                  alt={`Imagen de ${name}`}
                />
              );
            }
            return (
              <source
                key={index}
                media={`(min-width:${size[1]}px)`}
                srcSet={`https://image.tmdb.org/t/p/${size[0]}${path}`}
              />
            );
          })}
        </picture>
      ) : (
        ""
      )}
    </div>
  );
}

export default Image;
