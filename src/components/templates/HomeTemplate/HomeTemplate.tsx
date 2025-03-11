import { Genre, Movie, Results } from "../../../types/media";
import "./HomeTemplate.scss";

import Header from "../../organisms/Header/Header";
import PopularMedia from "../../organisms/PopularMedia/PopularMedia";
import Footer from "../../organisms/Footer/Footer";

interface HomeTemplateProps {
  genresData?: Genre[];
  popularData: Media<Movie>; // or TV
}

interface Media<Data> {
  loading: boolean;
  data: Results<Data> | null;
  error: string | null;
}

function HomeTemplate({ genresData = [], popularData }: HomeTemplateProps) {
  return (
    <>
      <Header />
      <PopularMedia
        media={
          !popularData.loading && popularData.data && !popularData.error
            ? popularData.data.results[0]
            : popularData.error
        }
        genres={
          !popularData.loading && popularData.data && !popularData.error
            ? popularData.data.results[0].genre_ids
                .map((id) => {
                  const genre = genresData.find(
                    (genre: Genre) => genre.id === id
                  );
                  return genre ? genre.name : "";
                })
                .filter((name) => name !== "")
            : []
        }
      />
      <Footer />
    </>
  );
}

export default HomeTemplate;
