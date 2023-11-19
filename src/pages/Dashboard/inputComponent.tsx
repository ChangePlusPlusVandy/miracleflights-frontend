// import React from "react";
// import { useForm, UseFormRegister, FieldValues } from "react-hook-form";
import { ReusableInputProps } from "./inputComponent.definitions";
import "./inputComponent.css";

const ReusableInput = ({
  name,
  register,
  errors,
  isRequired,
  label,
  placeholder,
  defaultValue,
  errorText,
}: ReusableInputProps) => {
  return (
    <div className="form-field">
      <div className="label-and-error">
        <p className="label">{label}</p>
        <p className="error-text">{errors[name] && errors[name].message}</p>
      </div>
      <input
        placeholder={placeholder}
        defaultValue={defaultValue}
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

export default ReusableInput;
