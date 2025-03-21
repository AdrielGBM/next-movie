import { useEffect, useState } from "react";
import "./Pagination.scss";

import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";

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
      {currentPage !== 1 ? (
        <Button
          classes="button--gray"
          functionOnClick={() => {
            if (currentPage > 1) updatePageParam(currentPage - 1);
          }}
        >
          {currentPage > 1 ? currentPage - 1 : 1}
        </Button>
      ) : (
        ""
      )}
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
      {totalPages >= 2 && currentPage < totalPages ? (
        <Button
          classes="button--gray"
          functionOnClick={() => {
            if (currentPage < totalPages) updatePageParam(currentPage + 1);
          }}
        >
          {currentPage < totalPages ? currentPage + 1 : currentPage}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Pagination;
