import "./Label.scss";

interface LabelProps {
  classes?: string;
  htmlFor: string;
  children: React.ReactNode;
}

function Label({ classes = "", htmlFor, children }: LabelProps) {
  return (
    <label className={`label ${classes}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default Label;
