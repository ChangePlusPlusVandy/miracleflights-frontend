/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./OnboardingPage.module.css";
import { OnboardingInputName } from "./OnboardingPage.definitions";
import Input from "../../components/Input/Input";
import logo from "../../public/0GAGNk.tif.png";
import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";
import { DividerSpacing } from "../../components/Divider/Divider.definitions";
import { ButtonVariant } from "../../components/Button/Button.definitions";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Resolver } from "react-hook-form";
import type { OnboardingInput } from "./OnboardingPage.definitions";

const OnboardingPage = () => {
  const { user } = useUser();
  const [exists, setExists] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});
  const navigate = useNavigate();

  const onboardingSchema = yup.object().shape({
    // make sure it is formatted as MM-DD-YYYY
    dob: yup
      .string()
      .matches(
        /^((0|1)\d{1})-((0|1|2)\d{1})-((19|20)\d{2})/,
        "Invalid date format (MM-DD-YYYY)",
      )
      .required("Date of birth is required"),
  });

  // form controller for the birthday
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<OnboardingInput>({
    defaultValues: {
      [OnboardingInputName.DOB]: "",
    },
    resolver: yupResolver(onboardingSchema) as Resolver<OnboardingInput>,
    mode: "onSubmit",
  });

  const onSubmitBirthdate = async (data: OnboardingInput) => {
    try {
      await axios
        .post(`${process.env.VITE_SERVER_URL}/user`, {
          firstName: user?.firstName,
          lastName: user?.lastName,
          birthdate: new Date(data.dob).toISOString(),
        })
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setUserData(data);
          setExists(true);
        })
        .catch((error) => console.error("Error fetching user data: ", error));
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  return (
    <>
      <img src={logo} alt="Description of the image" className={styles.logo} />
      <div className={styles.onboardingPageContainer}>
        <div className={styles.onboardingBlock}>
          {!exists ? (
            <>
              <div className={styles.onboardingBlockHeader}>
                {"Please enter patient's birthdate"}
                <p
                  className={styles.subtitleText}
                >{`If you have flown with us before, this should be the birthdate of the person receiving treatment.`}</p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmitBirthdate)}
                className={styles.onboardingBlockContent}
              >
                <div className={styles.onboardingInputContainer}>
                  <Input
                    name="dob"
                    register={register}
                    error={errors[OnboardingInputName.DOB]?.message}
                    label="Birthdate"
                    type="text"
                    placeholder="MM-DD-YYYY"
                  />
                </div>
                <Button
                  type="submit"
                  text="Submit"
                  disabled={Object.keys(errors).length > 0}
                />
              </form>
            </>
          ) : (
            <div className={styles.onboardingBlockHeader}>
              {"Looks like you've flown with us before!"}
              <p
                className={styles.subtitleText}
              >{`If this is not you, please contact us`}</p>
              <Divider spacing={DividerSpacing.MEDIUM} />
              <div>
                <div className={styles.patientGroup}>
                  <span className={styles.patientLabel}>First Name</span>{" "}
                  <span className={styles.patientText}>
                    {userData?.["First Name"]}
                  </span>
                </div>
                <div className={styles.patientGroup}>
                  <span className={styles.patientLabel}>Last Name</span>{" "}
                  <span className={styles.patientText}>
                    {userData?.["Last Name"]}
                  </span>
                </div>
                <div className={styles.patientGroup}>
                  <span className={styles.patientLabel}>City</span>{" "}
                  <span className={styles.patientText}>
                    {userData?.["City"]}
                  </span>
                </div>
              </div>
              <div className={styles.continueButtonContainer}>
                <Button
                  text="Continue to dashboard"
                  variant={ButtonVariant.Regular}
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;
