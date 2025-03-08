import "./Header.scss";

import NavBar from "../../molecules/NavBar/NavBar";
import Link from "../../atoms/Link/Link";
import SearchBar from "../../molecules/SearchBar/SearchBar";

function Header() {
  return (
    <header className="header">
      <span className="header__logo">
        <Link linkTo="/">Next Movie</Link>
      </span>
      <SearchBar></SearchBar>
      <NavBar
        links={[
          { path: "/movies", children: "Películas" },
          { path: "/tv", children: "TV" },
        ]}
      ></NavBar>
    </header>
  );
}

export default Header;
