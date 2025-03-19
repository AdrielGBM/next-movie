import { Genre, Movie, Results, Series } from "../../../types/media";
import "./DiscoverTemplate.scss";

import Header from "../../organisms/Header/Header";
import MediaList from "../../organisms/MediaList/MediaList";
import Pagination from "../../molecules/Pagination/Pagination";
import Footer from "../../organisms/Footer/Footer";

interface DiscoverTemplateProps {
  setSearchParams?: (params: URLSearchParams) => void;
  genresData?: Genre[];
  mediaData: Media<Movie> | Media<Series>;
}

interface Media<Data> {
  loading: boolean;
  data: Results<Data> | null;
  error: string | null;
}

function DiscoverTemplate({
  setSearchParams,
  genresData = [],
  mediaData,
}: DiscoverTemplateProps) {
  function getGenres(genreIds: number[]) {
    return genreIds
      .map((id) => {
        const genre = genresData.find((genre: Genre) => genre.id === id);
        return genre ? genre.name : "";
      })
      .filter((name) => name !== "");
  }

  return (
    <>
      <Header />
      <MediaList
        data={mediaData.data}
        getGenres={getGenres}
        isLoading={mediaData.loading}
        error={mediaData.error ?? undefined}
      ></MediaList>
      {mediaData.data ? (
        <Pagination
          currentPage={mediaData.data.page}
          totalPages={mediaData.data.total_pages}
          setSearchParams={setSearchParams}
        />
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}

export default DiscoverTemplate;
