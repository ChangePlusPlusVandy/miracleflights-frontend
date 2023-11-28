import styles from "./SelectComponent.module.css";
import { type SelectProps } from "./SelectComponent.definitions.tsx";
// import { useForm, Controller } from "react-hook-form"
import type { ChangeEvent, ReactElement } from "react";

const Select = ({
  options,
  placeholder,
  action,
}: SelectProps): ReactElement => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    action(selectedOption);
  };

  return (
    <>
      <div className={styles.selectWrapper}>
        <select onChange={handleSelectChange}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
