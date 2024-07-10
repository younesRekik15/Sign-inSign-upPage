import "./Input.css";
import { useId } from 'react';

interface Prompt {
  type: string;
  label: string;
  placeholder: string;
  width?: {};
  value?: string;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  label,
  placeholder,
  width = { width: "388px" },
  value = '',
  handleInput,
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
      />
    </label>
  );
};

export default Input;
