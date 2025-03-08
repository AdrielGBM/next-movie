import "./NavBar.scss";

import Link from "../../atoms/Link/Link";

interface NavBarProps {
  links: NavBarLinkProps[];
}

interface NavBarLinkProps {
  path: string;
  children: React.ReactNode;
}

function NavBar({ links }: NavBarProps) {
  return (
    <nav className="nav">
      {links.map(({ path, children }, index) => {
        return (
          <Link key={index} linkTo={path}>
            {children}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavBar;
