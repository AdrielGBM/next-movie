import "./Header.scss";

import NavBar from "../../molecules/NavBar/NavBar";
import Link from "../../atoms/Link/Link";

function Header() {
  return (
    <header className="header">
      <span className="header__logo">
        <Link linkTo="/">Next Movie</Link>
      </span>
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
