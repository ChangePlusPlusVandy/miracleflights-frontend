import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import CustomInput from "./CustomInput";

const Dashboard = () => {
  // Dashboard tab
  console.log("Dashboard");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          name="Email"
          register={register}
          errors={errors}
          isRequired={true}
          label="Email"
          type="email"
          placeholder="Email"
          defaultValue=""
          errorText="(Required)"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Dashboard;
