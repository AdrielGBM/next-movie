import "./Input.scss";

interface InputProps {
  id: string;
  type: string;
  placeholder?: string;
  autocomplete?: string;
  functionOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  id,
  type = "text",
  placeholder,
  autocomplete = "off",
  functionOnChange,
}: InputProps) {
  return (
    <input
      id={id}
      className="input"
      type={type}
      placeholder={placeholder}
      autoComplete={autocomplete}
      onChange={functionOnChange}
    />
  );
}

export default Input;
