import { Movie, Results } from "../../../types/media";
import "./HomeTemplate.scss";

import Header from "../../organisms/Header/Header";
import PopularMedia from "../../organisms/PopularMedia/PopularMedia";
import Footer from "../../organisms/Footer/Footer";

interface HomeTemplateProps {
  popularData: Media<Movie>; // or TV
}

interface Media<Data> {
  loading: boolean;
  data: Results<Data> | null;
  error: string | null;
}

function HomeTemplate({ popularData }: HomeTemplateProps) {
  if (popularData.error) return <div>{popularData.error}</div>;
  return (
    <>
      <Header />
      <PopularMedia
        media={
          !popularData.loading && popularData.data && !popularData.error
            ? popularData.data.results[0]
            : popularData.error
        }
      />
      <Footer />
    </>
  );
}

export default HomeTemplate;
