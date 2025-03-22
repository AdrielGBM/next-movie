import "./Input.scss";

interface InputProps {
  id: string;
  classes?: string;
  type?: string;
  placeholder?: string;
  autocomplete?: string;
  value: string;
  functionOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  functionOnBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  functionOnKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement | null>;
}

function Input({
  id,
  classes = "",
  type = "text",
  placeholder = "",
  autocomplete = "off",
  value,
  functionOnChange,
  functionOnBlur,
  functionOnKeyDown,
  ref,
}: InputProps) {
  return (
    <input
      id={id}
      className={`input ${classes}`}
      name={id}
      type={type}
      placeholder={placeholder}
      autoComplete={autocomplete}
      value={value}
      onChange={functionOnChange}
      onBlur={functionOnBlur}
      onKeyDown={functionOnKeyDown}
      ref={ref}
    />
  );
}

export default Input;
