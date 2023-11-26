import type { ReusableInputProps } from "./CustomInput.definitions";
import "./CustomInput.css";
import type { FieldError } from "react-hook-form";

const CustomInput = ({
  name,
  register,
  errors,
  isRequired,
  label,
  type,
  placeholder,
  defaultValue,
  errorText,
}: ReusableInputProps) => {
  const error = errors[name] as FieldError | undefined;

  return (
    <div className="form-field">
      <div className="label-and-error">
        <p className="label">{label}</p>
        {error && <p className="error-text">{error.message}</p>}
      </div>
      <input
        placeholder={placeholder}
        defaultValue={defaultValue}
        type={type}
        {...register(name, {
          required: {
            value: isRequired,
            message: errorText,
          },
        })}
      />
    </div>
  );
};

export default CustomInput;
