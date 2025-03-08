import "./Label.scss";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

function Label({ htmlFor, children }: LabelProps) {
  return (
    <label className="label" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default Label;
