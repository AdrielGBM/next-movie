import { useEffect, useState } from "react";
import "./Pagination.scss";

import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setSearchParams?: (params: URLSearchParams) => void;
}

function Pagination({
  currentPage,
  totalPages,
  setSearchParams,
}: PaginationProps) {
  const [page, setPage] = useState(currentPage);
  const [inputValue, setInputValue] = useState(currentPage.toString());

  function updatePageParam(newPage: number) {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    if (setSearchParams) {
      setSearchParams(params);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const numericValue = parseInt(inputValue, 10);
      if (
        !isNaN(numericValue) &&
        numericValue >= 1 &&
        numericValue <= totalPages
      ) {
        setPage(numericValue);
        updatePageParam(numericValue);
      } else {
        setInputValue(page.toString());
      }
    }
  }

  useEffect(() => {
    setPage(currentPage);
    setInputValue(currentPage.toString());
  }, [currentPage]);

  if (totalPages === 0) return null;
  if (totalPages > 500) totalPages = 500;

  return (
    <div className="pagination">
      <div className="pagination__previous">
        {currentPage > 2 ? (
          <>
            <Button
              classes="button--gray"
              functionOnClick={() => {
                updatePageParam(1);
              }}
            >
              1
            </Button>
            <FontAwesomeIcon className="icon" icon={faEllipsis} />
          </>
        ) : null}
        {currentPage > 1 ? (
          <Button
            classes="button--gray"
            functionOnClick={() => {
              updatePageParam(currentPage - 1);
            }}
          >
            {currentPage - 1}
          </Button>
        ) : null}
      </div>
      {totalPages >= 2 ? (
        <>
          <Input
            id="page"
            classes="input--page"
            type="number"
            value={inputValue}
            functionOnChange={handleInputChange}
            functionOnKeyDown={handleKeyDown}
          ></Input>
        </>
      ) : null}
      <div className="pagination__next">
        {totalPages >= 2 && currentPage < totalPages ? (
          <Button
            classes="button--gray"
            functionOnClick={() => {
              updatePageParam(currentPage + 1);
            }}
          >
            {currentPage + 1}
          </Button>
        ) : null}
        {totalPages >= 3 && currentPage < totalPages - 1 ? (
          <>
            <FontAwesomeIcon className="icon" icon={faEllipsis} />
            <Button
              classes="button--gray"
              functionOnClick={() => {
                updatePageParam(totalPages);
              }}
            >
              {totalPages}
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Pagination;
