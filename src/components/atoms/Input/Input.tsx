import "./Input.scss";

interface InputProps {
  id: string;
  classes?: string;
  type: string;
  placeholder?: string;
  autocomplete?: string;
  functionOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  id,
  classes = "",
  type = "text",
  placeholder,
  autocomplete = "off",
  functionOnChange,
}: InputProps) {
  return (
    <input
      id={id}
      className={`input ${classes}`}
      type={type}
      placeholder={placeholder}
      autoComplete={autocomplete}
      onChange={functionOnChange}
    />
  );
}

export default Input;
