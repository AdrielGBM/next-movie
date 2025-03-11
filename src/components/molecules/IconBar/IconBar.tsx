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
  title: string;
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
            title={icon.title}
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
