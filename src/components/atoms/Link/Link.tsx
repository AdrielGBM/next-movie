import { NavLink } from "react-router";
import "./Link.scss";

interface LinkProps {
  classes?: string;
  linkTo: string;
  children: React.ReactNode;
}

function Link({ classes = "", linkTo, children }: LinkProps) {
  return (
    <NavLink className={`link ${classes}`} to={linkTo}>
      {children}
    </NavLink>
  );
}

export default Link;
