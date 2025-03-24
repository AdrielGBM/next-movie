import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.scss";

import Label from "../../atoms/Label/Label";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";

interface SearchBarProps {
  classes?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  searchBarRef?: React.RefObject<HTMLFormElement | null>;
}

function SearchBar({ classes = "", inputRef, searchBarRef }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [isResetButtonHidden, setIsResetButtonHidden] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
    setIsResetButtonHidden(value === "");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === "Enter") {
      event.preventDefault();

      if (inputValue !== "") {
        void navigate(
          `/search?query=${inputValue}${
            location.pathname.includes("tv") ||
            location.search.includes("type=tv")
              ? "&type=tv"
              : ""
          }`
        );
      }
    }
  }

  return (
    <form
      className={`search-bar ${classes}`}
      onReset={() => {
        setInputValue("");
        setIsResetButtonHidden(true);
      }}
      onKeyDown={handleKeyDown}
      ref={searchBarRef}
    >
      <Label htmlFor="search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Label>
      <Input
        id="search"
        value={inputValue}
        placeholder="Buscar"
        functionOnChange={handleInputChange}
        ref={inputRef}
      ></Input>
      <Button hidden={isResetButtonHidden} type="reset">
        <FontAwesomeIcon icon={faXmark} />
      </Button>
    </form>
  );
}

export default SearchBar;
