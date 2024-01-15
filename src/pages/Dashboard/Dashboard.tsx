import CustomInput from "../../components/InputComponent/InputComponent";
import Select from "../../components/SelectComponent/SelectComponent";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldValues } from "react-hook-form";

const Dashboard = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  interface FormValues {
    email: string;
    password: string;
  }

  // eslint-disable-next-line autofix/no-unused-vars
  enum FormValueNames {
    // eslint-disable-next-line autofix/no-unused-vars
    email = "email",
    // eslint-disable-next-line autofix/no-unused-vars
    password = "password",
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      [FormValueNames.email]: "",
      [FormValueNames.password]: "",
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          name="Email"
          register={register}
          error={errors[FormValueNames.email]?.message}
          label="Email"
          type="text"
          placeholder="Email"
        />
        <CustomInput
          name="Password"
          register={register}
          error={errors[FormValueNames.email]?.message}
          label="Password"
          type="password"
          placeholder="Password"
        />
        <Select
          name="Select"
          register={register}
          label="Select"
          placeholder="Select"
          options={["Option 1", "Option 2", "Option 3"]}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Dashboard;
