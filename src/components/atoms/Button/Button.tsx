import "./Button.scss";

interface ButtonProps {
  classes?: string;
  type?: "submit" | "reset" | "button" | undefined;
  title?: string;
  hidden?: boolean;
  functionOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

function Button({
  classes = "",
  type = "button",
  title = "",
  hidden = false,
  functionOnClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`button ${classes} ${hidden ? "button--hidden" : ""}`}
      type={type}
      title={title}
      onClick={functionOnClick}
    >
      {children}
    </button>
  );
}

export default Button;
