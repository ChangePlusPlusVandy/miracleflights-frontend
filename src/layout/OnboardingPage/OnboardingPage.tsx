import styles from "./OnboardingPage.module.css";
import { OnboardingInputName } from "./OnboardingPage.definitions";
import Input from "../../components/Input/Input";
import logo from "../../public/0GAGNk.tif.png";
import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";
import { DividerSpacing } from "../../components/Divider/Divider.definitions";
import {
  ButtonColor,
  ButtonVariant,
} from "../../components/Button/Button.definitions";
import { createUser, linkUser } from "../../api/queries";
import { useUserContext } from "../../context/User.context";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import type { Resolver } from "react-hook-form";
import type { OnboardingInput } from "./OnboardingPage.definitions";
import type { PassengerData } from "../../interfaces/passenger.interface";

const OnboardingPage = () => {
  const [exists, setExists] = useState<string | null>(null);
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();
  const { setCurrentUser } = useUserContext();

  const onboardingSchema = yup.object().shape({
    // make sure it is formatted as MM-DD-YYYY
    dob: yup
      .string()
      .matches(
        /^((0|1)\d{1})-((0|1|2|3)\d{1})-((19|20)\d{2})/,
        "Invalid date format (MM-DD-YYYY)",
      )
      .required("Date of birth is required"),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
  });

  // form controller for the birthday
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<OnboardingInput>({
    defaultValues: {
      [OnboardingInputName.DOB]: "",
      [OnboardingInputName.FIRST_NAME]: "",
      [OnboardingInputName.LAST_NAME]: "",
    },
    resolver: yupResolver(onboardingSchema) as Resolver<OnboardingInput>,
    mode: "onSubmit",
  });

  // mutation to create a new user
  const { mutate: findUserMutate, data: userData } = useMutation({
    mutationFn: async (data: OnboardingInput) =>
      createUser(
        {
          birthdate: data.dob,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        await getToken(),
      ),
    onSuccess: () => {
      setExists("yes");
    },
    onError: () => {
      setExists("no");
    },
  });

  // mutation to link user
  const { mutate: linkUserMutate } = useMutation({
    mutationFn: async () =>
      linkUser(userData?.["AirTable Record ID"] || "", await getToken()),
    onSuccess: () => {
      user?.reload().then(() => {
        setCurrentUser(userData as PassengerData);
        navigate("/dashboard");
      });
    },
    onError: () => {
      setExists("no");
    },
  });

  useEffect(() => {
    if (user?.publicMetadata.airtableRecordId) {
      navigate("/dashboard");
    }
  }, [user]);

  const onSubmitBirthdate = async (data: OnboardingInput) => {
    findUserMutate(data);
  };

  return (
    <>
      <img src={logo} alt="Description of the image" className={styles.logo} />
      <div className={styles.onboardingPageContainer}>
        <div className={styles.onboardingBlock}>
          {exists === null ? (
            <>
              <div className={styles.onboardingBlockHeader}>
                {"Please enter patient's name and birthday"}
                <p
                  className={styles.subtitleText}
                >{`If you have flown with us before, this should be the name and birthday of the person receiving treatment.`}</p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmitBirthdate)}
                className={styles.onboardingBlockContent}
              >
                <div className={styles.onboardingInputContainer}>
                  <Input
                    name="firstName"
                    register={register}
                    error={errors[OnboardingInputName.FIRST_NAME]?.message}
                    label="First Name"
                    type="text"
                    placeholder="John"
                  />
                  <Input
                    name="lastName"
                    register={register}
                    error={errors[OnboardingInputName.LAST_NAME]?.message}
                    label="Last Name"
                    type="text"
                    placeholder="Doe"
                  />
                  <Input
                    name="dob"
                    register={register}
                    error={errors[OnboardingInputName.DOB]?.message}
                    label="Birthday"
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
          ) : exists === "yes" ? (
            userData?.["Email"] === user?.primaryEmailAddress?.emailAddress ? (
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
                    <span className={styles.patientLabel}>Email</span>{" "}
                    <span className={styles.patientText}>
                      {userData?.["Email"].replace(
                        /^(.{3}).*@/,
                        "$1" +
                          "*".repeat(
                            userData?.["Email"].split("@")[0].length - 3,
                          ) +
                          "@",
                      )}
                    </span>
                  </div>
                </div>
                <div className={styles.continueButtonContainer}>
                  <Button
                    text="Continue to dashboard"
                    variant={ButtonVariant.Regular}
                    onClick={() => {
                      linkUserMutate();
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.onboardingBlockHeader}>
                {"We don't recognize you!"}
                <p className={styles.subtitleText}>
                  The provided information matches an account with a different
                  email address than the one currently signed in. For security
                  reasons, you can only link an account associated with your
                  email address.
                </p>
                <p className={styles.subtitleText}>
                  If you believe this is an error, please contact support for
                  assistance.
                </p>
                <Divider spacing={DividerSpacing.MEDIUM} />
                <div className={styles.continueButtonContainer}>
                  <Button
                    text="Try again"
                    variant={ButtonVariant.Regular}
                    color={ButtonColor.Grey}
                    onClick={() => {
                      setExists(null);
                    }}
                  />
                </div>
              </div>
            )
          ) : (
            <div className={styles.onboardingBlockHeader}>
              {"We don't recognize you!"}
              <p
                className={styles.subtitleText}
              >{`If you've flown with us before, try again and check for spelling errors.`}</p>
              <Divider spacing={DividerSpacing.MEDIUM} />
              <div className={styles.continueButtonContainer}>
                <Button
                  text="Try again"
                  variant={ButtonVariant.Regular}
                  color={ButtonColor.Grey}
                  onClick={() => {
                    setExists(null);
                  }}
                />
                <Button
                  text="Create account"
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
