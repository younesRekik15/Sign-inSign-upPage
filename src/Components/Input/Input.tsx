import "./Input.css";
import { useId } from "react";

interface Prompt {
  type: string;
  label: string;
  placeholder: string;
  width?: {};
  value?: string;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationResult?: {message: string, color: string};
  show?: boolean;
}

const Input = ({
  type,
  label,
  placeholder,
  width = { width: "388px" },
  value = "",
  handleInput,
  validationResult,
  show,
}: Prompt) => {
  const id = useId();
  return (
    <label htmlFor={id} className="input" style={width}>
      <p>{label}</p>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onInput={handleInput}
        style={show?{borderColor: validationResult?.color,borderStyle: "solid",borderWidth: "2px"}:{borderStyle: "solid"}}
      />
      {show && validationResult && (
        <span className="validationMessage" style={{ color: validationResult.color }}>
          {validationResult.message}
        </span>
      )}
    </label>
  );
};

export default Input;
