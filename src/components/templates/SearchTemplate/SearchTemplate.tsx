import "./SearchTemplate.scss";

import Header from "../../organisms/Header/Header";
import Filters from "../../molecules/Filters/Filters";
import MediaList from "../../organisms/MediaList/MediaList";
import Pagination from "../../molecules/Pagination/Pagination";
import Footer from "../../organisms/Footer/Footer";
import { Genre, Movie, Results, Series } from "../../../types/media";

interface SearchTemplateProps {
  searchParams: URLSearchParams;
  setSearchParams?: (params: URLSearchParams) => void;
  genresData?: Genre[];
  mediaData: Media<Movie | Series>;
}

interface Media<Data> {
  loading: boolean;
  data: Results<Data> | null;
  error: string | null;
}

function SearchTemplate({
  searchParams,
  setSearchParams,
  genresData = [],
  mediaData,
}: SearchTemplateProps) {
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
      <h1 className="search__title">{`Búsqueda ${
        searchParams.get("query") && searchParams.get("query") !== ""
          ? `de "${searchParams.get("query") ?? ""}"`
          : ""
      }`}</h1>
      <Filters
        type="search"
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
      ) : null}
      <Footer />
    </>
  );
}

export default SearchTemplate;
