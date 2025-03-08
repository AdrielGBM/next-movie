import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.scss";

import Label from "../../atoms/Label/Label";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";

interface SearchBarProps {
  classes: string;
}

function SearchBar({ classes }: SearchBarProps) {
  const [isButtonHidden, setIsButtonHidden] = useState(true);

  function hideResetButton(event: React.ChangeEvent<HTMLInputElement>) {
    setIsButtonHidden(event.target.value === "");
  }

  return (
    <form
      className={`search-bar ${classes}`}
      onReset={() => {
        setIsButtonHidden(true);
      }}
    >
      <Label htmlFor="search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Label>
      <Input
        id="search"
        type="text"
        placeholder="Buscar"
        functionOnChange={hideResetButton}
      ></Input>
      <Button hidden={isButtonHidden} type="reset">
        <FontAwesomeIcon icon={faXmark} />
      </Button>
    </form>
  );
}

export default SearchBar;
