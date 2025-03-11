import { useEffect, useRef, useState } from "react";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useResponsiveWindow from "../../../hooks/useResponsiveWindow";
import "./Header.scss";

import NavBar from "../../molecules/NavBar/NavBar";
import Link from "../../atoms/Link/Link";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import IconBar from "../../molecules/IconBar/IconBar";

function Header() {
  const { width } = useResponsiveWindow();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLFormElement>(null);

  const links = [
    { path: "/movies", children: "Películas" },
    { path: "/tv", children: "TV" },
  ];
  const icons = [
    {
      icon: faBars,
      title: "Abrir menú",
      functionOnClick: () => {
        console.log("Menú");
      },
    },
  ];
  if (width < 640) {
    icons.unshift({
      icon: faMagnifyingGlass,
      title: "Buscar",
      functionOnClick: () => {
        setIsSearchVisible(true);
      },
    });
  }

  function handleClickOutsideSearchBar(event: MouseEvent) {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setIsSearchVisible(false);
    }
  }

  useEffect(() => {
    if (width >= 640) {
      setIsSearchVisible(false);
    }
  }, [width]);

  useEffect(() => {
    if (isSearchVisible) {
      document.addEventListener("mousedown", handleClickOutsideSearchBar);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSearchBar);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchBar);
    };
  }, [isSearchVisible]);

  return (
    <header className="header">
      <span
        className={`header__logo ${
          isSearchVisible ? "header__logo--hidden" : ""
        }`}
      >
        <Link linkTo="/">Next Movie</Link>
      </span>
      <SearchBar
        classes={isSearchVisible ? "search-bar--visible" : ""}
        inputRef={inputRef}
        searchBarRef={searchBarRef}
      ></SearchBar>
      <NavBar links={links}></NavBar>
      <IconBar
        classes={isSearchVisible ? "icon-bar--hidden" : ""}
        icons={icons}
      ></IconBar>
    </header>
  );
}

export default Header;
