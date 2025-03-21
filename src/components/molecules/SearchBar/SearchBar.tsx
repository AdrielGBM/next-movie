import { useState } from "react";
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

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
    setIsResetButtonHidden(value === "");
  }

  return (
    <form
      className={`search-bar ${classes}`}
      onReset={() => {
        setInputValue("");
        setIsResetButtonHidden(true);
      }}
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
