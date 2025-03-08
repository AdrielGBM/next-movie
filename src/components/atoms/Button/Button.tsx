import "./Button.scss";

interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  hidden?: boolean;
  children: React.ReactNode;
}

function Button({ hidden = false, type, children }: ButtonProps) {
  return (
    <button className={`button ${hidden ? "button--hidden" : ""}`} type={type}>
      {children}
    </button>
  );
}

export default Button;
