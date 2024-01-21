import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import Icon from "../../components/CustomIcon/Icon";
import Input from "../../components/Input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const Submit = () => {
    console.log("Submitted");
  };
  // eslint-disable-next-line autofix/no-unused-vars
  enum FormValueNames {
    // eslint-disable-next-line autofix/no-unused-vars
    email = "email",
    // eslint-disable-next-line autofix/no-unused-vars
    password = "password",
  }

  interface FormValues {
    email: string;
    password: string;
  }

  const schema = yup.object().shape({
    [FormValueNames.email]: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please enter an email address"),
    [FormValueNames.password]: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Please enter a password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      [FormValueNames.email]: "",
      [FormValueNames.password]: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  console.log(errors);

  return (
    <>
      <img
        src="/src/styles/MiracleFlightsLogo.png"
        alt="Description of the image"
        className={styles.logo}
      />
      <div className={styles.loginContainer}>
        <div className={styles.loginBlock}>
          <div className={styles.loginBlockHeader}>Log In</div>
          <div className={styles.loginRedirect}>
            Dont have an account?
            <Link to="/sign-up" className={styles.loginBlockLink}>
              {" "}
              Sign up
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(Submit)}
            className={styles.loginBlockContent}
          >
            <div className={styles.loginInputContainerUpper}>
              <Input
                name="email"
                register={register}
                error={errors[FormValueNames.email]?.message}
                label="Email"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className={styles.loginInputContainerLower}>
              <Input
                name="password"
                register={register}
                error={errors[FormValueNames.password]?.message}
                label="Password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
              />

              <div
                className={styles.passwordToggle}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <div className={styles.Icon}>
                  <Icon glyph={passwordVisible ? "eye-slash" : "eye"} />
                </div>
              </div>
            </div>
            <div className={styles.forgotPassword}>
              <Link to="/forgot-password" className={styles.loginBlockLink}>
                Forgot password?
              </Link>
            </div>
            <Button
              onClick={Submit}
              text={"Login"}
              disabled={
                !!errors[FormValueNames.email] ||
                !!errors[FormValueNames.password]
              }
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
