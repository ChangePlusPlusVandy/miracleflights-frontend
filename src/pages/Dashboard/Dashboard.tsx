import ReusableInput from "./inputComponent";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  // Dashboard tab
  console.log("Dashboard");

  const onSubmit = (data: FormData) => {
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
        <ReusableInput
          name="Email"
          register={register}
          errors={errors}
          isRequired={true}
          label="Email"
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
