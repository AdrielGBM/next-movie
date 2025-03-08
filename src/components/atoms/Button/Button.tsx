import "./Button.scss";

interface ButtonProps {
  classes?: string;
  type: "submit" | "reset" | "button" | undefined;
  functionOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  hidden?: boolean;
  children: React.ReactNode;
}

function Button({
  classes = "",
  type,
  hidden = false,
  functionOnClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`button ${classes} ${hidden ? "button--hidden" : ""}`}
      type={type}
      onClick={functionOnClick}
    >
      {children}
    </button>
  );
}

export default Button;
