import styles from "./SignUpPage.module.css";
import { SignUpCodeName, SignUpInputName } from "./SignUpPage.definitions";
import Button from "../../components/Button/Button";
import Icon from "../../components/CustomIcon/Icon";
import Input from "../../components/Input/Input";
import logo from "../../public/0GAGNk.tif.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/clerk-react";
import type { Resolver } from "react-hook-form";
import type { SignUpCodeInput, SignUpInput } from "./SignUpPage.definitions";

const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);

  const signUpSchema = yup.object().shape({
    email: yup.string().email().required("Required"),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const signUpCodeSchema = yup.object().shape({
    code: yup.string().required("Code is required."),
  });

  // form controller for the new user
  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors, isValid: signUpIsValid },
  } = useForm<SignUpInput>({
    defaultValues: {
      [SignUpInputName.EMAIL]: "",
      [SignUpInputName.FIRST_NAME]: "",
      [SignUpInputName.LAST_NAME]: "",
      [SignUpInputName.PASSWORD]: "",
      [SignUpInputName.CONFIRM_PASSWORD]: "",
    },
    resolver: yupResolver(signUpSchema) as Resolver<SignUpInput>,
    mode: "onBlur",
  });

  // form controller for the email code
  const {
    formState: { errors: signUpCodeErrors },
    handleSubmit: handleCodeSubmit,
    register: signUpCodeRegister,
  } = useForm<SignUpCodeInput>({
    defaultValues: {
      [SignUpCodeName.CODE]: "",
    },
    resolver: yupResolver(signUpCodeSchema) as Resolver<SignUpCodeInput>,
    mode: "onSubmit",
  });

  // Update the disabled state based on whether there are errors and the form is valid
  useEffect(() => {
    setDisabled(!signUpIsValid);
  }, [signUpIsValid]);

  // start the sign up process.
  const handleSubmitSignUp = async (signUpData: SignUpInput) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: signUpData.email,
        password: signUpData.password,
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onSubmitCode = async (inputData: SignUpCodeInput) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: inputData.code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
                                         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/onboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <img src={logo} alt="Description of the image" className={styles.logo} />
      <div className={styles.signUpContainer}>
        {!pendingVerification ? (
          <div className={styles.signUpBlock}>
            <div className={styles.signUpBlockHeader}>Sign Up</div>
            <div className={styles.signUpRedirect}>
              Have an account?
              <div
                onClick={() => navigate("/sign-in")}
                className={styles.signUpBlockLink}
              >
                Sign in
              </div>
            </div>
            <form
              onSubmit={handleSignUpSubmit(handleSubmitSignUp)}
              className={styles.signUpBlockContent}
            >
              <div className={styles.signUpInputContainerUpper}>
                <Input
                  name="email"
                  register={signUpRegister}
                  error={signUpErrors[SignUpInputName.EMAIL]?.message}
                  label="Email"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className={styles.signUpInputContainerUpper}>
                <Input
                  name="firstName"
                  register={signUpRegister}
                  error={signUpErrors[SignUpInputName.FIRST_NAME]?.message}
                  label="First name"
                  type="text"
                  placeholder="John"
                />
              </div>
              <div className={styles.signUpInputContainerUpper}>
                <Input
                  name="lastName"
                  register={signUpRegister}
                  error={signUpErrors[SignUpInputName.LAST_NAME]?.message}
                  label="Last name"
                  type="text"
                  placeholder="Doe"
                />
              </div>
              <div className={styles.signUpInputContainerLower}>
                <Input
                  name="password"
                  register={signUpRegister}
                  error={signUpErrors[SignUpInputName.PASSWORD]?.message}
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
              <div className={styles.signUpInputContainerLower}>
                <Input
                  name="confirmPassword"
                  register={signUpRegister}
                  error={
                    signUpErrors[SignUpInputName.CONFIRM_PASSWORD]?.message
                  }
                  label="Confirm password"
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
                  className={styles.signUpBlockLink}
                >
                  Forgot password?
                </div>
              </div>
              <Button type="submit" text={"Sign Up"} disabled={disabled} />
            </form>
          </div>
        ) : (
          <div className={styles.signUpBlock}>
            <div className={styles.signUpBlockHeader}>
              {"Let's see if you're real"}
              <p
                className={styles.sentEmailText}
              >{`We've sent a 6-digit code to ${signUp?.emailAddress}.`}</p>
            </div>

            <form
              onSubmit={handleCodeSubmit(onSubmitCode)}
              className={styles.signUpBlockContent}
            >
              <div className={styles.signUpInputContainerUpper}>
                <Input
                  name="code"
                  register={signUpCodeRegister}
                  error={signUpCodeErrors[SignUpCodeName.CODE]?.message}
                  label="Code"
                  type="text"
                  placeholder="Paste your 6-digit code here."
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpPage;
