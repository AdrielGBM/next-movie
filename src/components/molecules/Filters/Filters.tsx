import { useEffect, useMemo, useState } from "react";
import { Genre } from "../../../types/media";
import "./Filters.scss";

import Label from "../../atoms/Label/Label";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";

interface FiltersProps {
  type?: string;
  genres: Genre[];
  searchParams: URLSearchParams;
  setSearchParams?: (params: URLSearchParams) => void;
}

function Filters({
  type,
  genres,
  searchParams,
  setSearchParams,
}: FiltersProps) {
  const defaultFilters = useMemo(
    () => ({
      sort_by: [
        "sort_by",
        "popularity.desc",
        [
          ["popularity.asc", "Popularidad ascendente"],
          ["popularity.desc", "Popularidad descendente"],
          ["revenue.asc", "Ganancia ascendente"],
          ["revenue.desc", "Ganancia descendente"],
          ["primary_release_date.asc", "Estreno ascendente"],
          ["primary_release_date.desc", "Estreno descendente"],
          ["title.asc", "Título ascendente"],
          ["title.desc", "Título descendente"],
          ["vote_average.asc", "Calificación ascendente"],
          ["vote_average.desc", "Calificación descendente"],
          ["vote_count.asc", "Votos ascendente"],
          ["vote_count.desc", "Votos descendente"],
        ],
      ],
      vote_average_gte: ["vote_average.gte", "0"],
      vote_average_lte: ["vote_average.lte", "100"],
      vote_count_gte: ["vote_count.gte", "100"],
      vote_count_lte: ["vote_count.lte", "0"],
      with_genres: ["with_genres", "", [...genres]],
    }),
    [genres]
  );

  const [filters, setFilters] = useState(() => ({
    sort_by:
      searchParams.get("sort_by") ?? (defaultFilters.sort_by[1] as string),
    vote_average_gte: searchParams.get("vote_average.gte")
      ? (
          parseFloat(searchParams.get("vote_average.gte") ?? "0") * 10
        ).toString()
      : defaultFilters.vote_average_gte[1],
    vote_average_lte: searchParams.get("vote_average.lte")
      ? (
          parseFloat(searchParams.get("vote_average.lte") ?? "0") * 10
        ).toString()
      : defaultFilters.vote_average_lte[1],
    vote_count_gte:
      searchParams.get("vote_count.gte") ?? defaultFilters.vote_count_gte[1],
    vote_count_lte:
      searchParams.get("vote_count.lte") ?? defaultFilters.vote_count_lte[1],
    with_genres:
      searchParams.get("with_genres") ??
      (defaultFilters.with_genres[1] as string),
  }));
  const [inputFilters, setInputFilters] = useState(filters);

  function updateFilterParam(updatedFilters: Record<string, string>) {
    const params = new URLSearchParams(window.location.search);

    Object.entries(updatedFilters).forEach(([key, value]) => {
      const filter = defaultFilters[
        key.replace(".", "_") as keyof typeof defaultFilters
      ] as string[];

      if (value === filter[1]) {
        params.delete(filter[0]);
        params.delete("page");
      } else {
        params.set(filter[0], value);
      }
    });

    if (setSearchParams) {
      setSearchParams(params);
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setInputFilters((prevInputFilters) => ({
      ...prevInputFilters,
      [name]: value,
    }));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === "Enter") {
      validateFilters();
    }
  }

  function validateFilters() {
    const updatedFilters = { ...inputFilters };

    const voteAverageGte = parseInt(inputFilters.vote_average_gte, 10);
    if (isNaN(voteAverageGte) || voteAverageGte < 0 || voteAverageGte > 100) {
      updatedFilters.vote_average_gte = filters.vote_average_gte;
    }

    const voteAverageLte = parseInt(inputFilters.vote_average_lte, 10);
    if (isNaN(voteAverageLte) || voteAverageLte < 0 || voteAverageLte > 100) {
      updatedFilters.vote_average_lte = filters.vote_average_lte;
    }

    if (voteAverageLte < voteAverageGte) {
      updatedFilters.vote_average_lte = "100";
    }

    updatedFilters.vote_average_gte = (
      parseInt(updatedFilters.vote_average_gte, 10) / 10
    ).toString();
    updatedFilters.vote_average_lte = (
      parseInt(updatedFilters.vote_average_lte, 10) / 10
    ).toString();

    const voteCountGte = parseInt(inputFilters.vote_count_gte, 10);
    if (isNaN(voteCountGte) || voteCountGte < 0 || voteCountGte > 10000) {
      updatedFilters.vote_count_gte = filters.vote_count_gte;
    }

    const voteCountLte = parseInt(inputFilters.vote_count_lte, 10);
    if (isNaN(voteCountLte) || voteCountLte < 0 || voteCountLte > 10000) {
      updatedFilters.vote_count_lte = filters.vote_count_lte;
    }

    if (voteCountLte < voteCountGte) {
      updatedFilters.vote_count_lte = "0";
    }

    if (
      inputFilters.with_genres !== "" &&
      !genres.some((genre) => genre.id.toString() === inputFilters.with_genres)
    ) {
      updatedFilters.with_genres = filters.with_genres;
    }

    setFilters(updatedFilters);
    updateFilterParam(updatedFilters);
  }

  useEffect(() => {
    const newFilters = {
      sort_by:
        searchParams.get("sort_by") ?? (defaultFilters.sort_by[1] as string),
      vote_average_gte: searchParams.get("vote_average.gte")
        ? (
            parseFloat(searchParams.get("vote_average.gte") ?? "0") * 10
          ).toString()
        : defaultFilters.vote_average_gte[1],
      vote_average_lte: searchParams.get("vote_average.lte")
        ? (
            parseFloat(searchParams.get("vote_average.lte") ?? "0") * 10
          ).toString()
        : defaultFilters.vote_average_lte[1],
      vote_count_gte:
        searchParams.get("vote_count.gte") ?? defaultFilters.vote_count_gte[1],
      vote_count_lte:
        searchParams.get("vote_count.lte") ?? defaultFilters.vote_count_lte[1],
      with_genres:
        searchParams.get("with_genres") ??
        (defaultFilters.with_genres[1] as string),
    };
    setFilters(newFilters);
    setInputFilters(newFilters);
  }, [searchParams, defaultFilters]);

  if (type === "search") {
    return <form></form>;
  }
  return (
    <form className="filters" onKeyDown={handleKeyDown}>
      <div className="filter">
        <Label htmlFor="with_genres">Género:</Label>
        <select
          id="with_genres"
          name="with_genres"
          value={inputFilters.with_genres}
          onChange={handleInputChange}
        >
          <option value="">Todos los géneros</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter">
        <Label htmlFor="sort_by">Ordenar por:</Label>
        <select
          id="sort_by"
          name="sort_by"
          value={inputFilters.sort_by}
          onChange={handleInputChange}
        >
          {(defaultFilters.sort_by[2] as [string, string][]).map((option) => (
            <option key={option[0]} value={option[0]}>
              {option[1]}
            </option>
          ))}
        </select>
      </div>
      <div className="filter">
        <Label htmlFor="vote_average_gte">Calificación mínima:</Label>
        <Input
          id="vote_average_gte"
          type="number"
          value={inputFilters.vote_average_gte}
          functionOnChange={handleInputChange}
        />
      </div>
      <div className="filter">
        <Label htmlFor="vote_average_lte">Calificación máxima:</Label>
        <Input
          id="vote_average_lte"
          type="number"
          value={inputFilters.vote_average_lte}
          functionOnChange={handleInputChange}
        />
      </div>
      <div className="filter">
        <Label htmlFor="vote_count_gte">Votos mínimos:</Label>
        <Input
          id="vote_count_gte"
          type="number"
          value={inputFilters.vote_count_gte}
          functionOnChange={handleInputChange}
        />
      </div>
      <div className="filter">
        <Label htmlFor="vote_count_lte">Votos máximos:</Label>
        <Input
          id="vote_count_lte"
          type="number"
          value={inputFilters.vote_count_lte}
          functionOnChange={handleInputChange}
        />
      </div>
      <Button classes="button--gray" functionOnClick={validateFilters}>
        Filtrar
      </Button>
    </form>
  );
}

export default Filters;
