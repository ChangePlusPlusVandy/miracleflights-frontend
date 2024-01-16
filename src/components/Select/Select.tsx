import style from "./Select.module.css";
import type { ReactElement } from "react";
import type { SelectProps } from "./Select.definitions.ts";

const Select = ({
  name,
  register,
  label,
  placeholder,
  options,
}: SelectProps): ReactElement => {
  return (
    <form>
      <div className={style.selectWrapper}>
        {label && <label>{label}</label>}
        <select {...register(name)}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default Select;
