import { NavLink } from "react-router";
import "./Link.scss";

interface LinkProps {
  linkTo: string;
  children: React.ReactNode;
}

function Link({ linkTo, children }: LinkProps) {
  return (
    <NavLink className="link" to={linkTo}>
      {children}
    </NavLink>
  );
}

export default Link;
