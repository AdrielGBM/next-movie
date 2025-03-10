import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import "./IconBar.scss";

import Button from "../../atoms/Button/Button";

interface IconBarProps {
  classes?: string;
  icons: IconBarIconProps[];
}

interface IconBarIconProps {
  icon: IconDefinition;
  functionOnClick: React.MouseEventHandler<HTMLButtonElement>;
}

function IconBar({ classes = "", icons }: IconBarProps) {
  return (
    <div className={`icon-bar ${classes}`}>
      {icons.map((icon, index) => {
        return (
          <Button
            key={index}
            classes="icon"
            functionOnClick={icon.functionOnClick}
          >
            <FontAwesomeIcon icon={icon.icon} />
          </Button>
        );
      })}
    </div>
  );
}

export default IconBar;
