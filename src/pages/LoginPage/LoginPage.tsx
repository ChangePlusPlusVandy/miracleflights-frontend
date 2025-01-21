import styles from "./LoginPage.module.css";
import { FormValueNames, type FormValues } from "./LoginPage.definitions";
import Button from "../../components/Button/Button";
import { ButtonVariant } from "../../components/Button/Button.definitions";
import Icon from "../../components/CustomIcon/Icon";
import Input from "../../components/Input/Input";
import logo from "../../public/0GAGNk.tif.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  const { signIn, setActive, isLoaded } = useSignIn();

  interface CustomError {
    code: string;
  }

  interface ErrorWithDetails {
    errors: CustomError[];
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
    formState: { errors, isValid },
    setError: setSignInError,
  } = useForm<FormValues>({
    defaultValues: {
      [FormValueNames.email]: "",
      [FormValueNames.password]: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const Submit = async (inputData: FormValues) => {
    if (!isLoaded) {
      return;
    }

    await setActive({ session: null });

    try {
      const completeSignIn = await signIn.create({
        identifier: inputData.email,
        password: inputData.password,
      });

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
        navigate("/dashboard");
      }
    } catch (err) {
      const error = err as ErrorWithDetails;
      if (
        error.errors.some((error) => error.code === "form_identifier_not_found")
      ) {
        setSignInError("email", {
          type: "manual",
          message: "We can't find an account with that email address.",
        });
      }

      if (
        error.errors.some((error) => error.code === "form_password_incorrect")
      ) {
        setSignInError("password", {
          type: "manual",
          message: "Incorrect password.",
        });
      }

      await setActive({ session: null });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  useEffect(() => {
    setDisabled(!isValid);
  }, [isValid]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.navbar}>
        <img src={logo} alt="Miracle Flights Logo" className={styles.logo} />
      </div>
      <div className={styles.contentContainer}>
        {/* Left side: login container */}
        <div className={styles.loginContainer}>
          <div className={styles.loginBlock}>
            <div className={styles.loginBlockHeader}>Login to your Account</div>
            <form
              onSubmit={handleSubmit(Submit)}
              className={styles.loginBlockContent}
            >
              <div className={styles.loginInputContainerUpper}>
                <Input
                  name="email"
                  register={register}
                  error={errors[FormValueNames.email]?.message}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className={styles.loginInputContainerLower}>
                <Input
                  name="password"
                  register={register}
                  error={errors[FormValueNames.password]?.message}
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
                <div
                  onClick={() => navigate("/forgot-password")}
                  className={styles.loginBlockLink}
                >
                  Forgot password?
                </div>
              </div>
              <Button
                variant={ButtonVariant.Login}
                type="submit"
                text="Login"
                disabled={disabled}
              />
            </form>
          </div>
        </div>

        <div className={styles.rightSideContent}>
          <div className={styles.rightSideHeader}>New Here?</div>
          <div className={styles.rightSideText}>
            Create your account with us today!
          </div>
          <Button
            text="Sign Up"
            type="button"
            variant={ButtonVariant.Signup}
            onClick={() => navigate("/sign-up")}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
