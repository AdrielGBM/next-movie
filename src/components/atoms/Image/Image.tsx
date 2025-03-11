import "./Image.scss";

interface ImageProps {
  type: "backdrop" | "logo" | "poster" | "profile";
  name: string;
  path: string;
}

function Image({ type, name, path }: ImageProps) {
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
        ["original", "1920"],
        ["w780", "1280"],
        ["w500", "960"],
        ["w342", "780"],
        ["w185", "640"],
        ["w154", "460"],
        ["w92", "300"],
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
    <div className="image">
      <picture>
        {sizes.map((size, index) => {
          if (index + 1 === sizes.length) {
            return (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/${size[0]}/${path}`}
                alt={`Imagen de ${name}`}
              />
            );
          }
          return (
            <source
              key={index}
              media={`(min-width:${size[1]}px)`}
              srcSet={`https://image.tmdb.org/t/p/${size[0]}/${path}`}
            />
          );
        })}
      </picture>
    </div>
  );
}

export default Image;
