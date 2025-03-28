import { Genre, Movie, Results, Series } from "../../../types/media";
import "./DiscoverTemplate.scss";

import Header from "../../organisms/Header/Header";
import Filters from "../../molecules/Filters/Filters";
import MediaList from "../../organisms/MediaList/MediaList";
import Pagination from "../../molecules/Pagination/Pagination";
import Footer from "../../organisms/Footer/Footer";

interface DiscoverTemplateProps {
  title: string;
  searchParams: URLSearchParams;
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
  title,
  searchParams,
  setSearchParams,
  genresData = [],
  mediaData,
}: DiscoverTemplateProps) {
  function getGenres(genreIds: number[] | null) {
    return genreIds
      ? genreIds
          .map((id) => {
            const genre = genresData.find((genre: Genre) => genre.id === id);
            return genre ? genre.name : "";
          })
          .filter((name) => name !== "")
      : null;
  }

  return (
    <>
      <Header />
      <h1 className="discover__title">{title}</h1>
      <Filters
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        genres={genresData}
      />
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
