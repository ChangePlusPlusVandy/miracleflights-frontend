import styles from "./AddPassengerModal.module.css";
import Modal from "../../../../components/Modal/Modal";
import Icon from "../../../../components/CustomIcon/Icon";
import Input from "../../../../components/Input/Input";
import { ButtonColor } from "../../../../components/Button/Button.definitions";
import Button from "../../../../components/Button/Button";
import Select from "../../../../components/Select/Select";
import { useUserContext } from "../../../../context/User.context";
import { createPassenger } from "../../../../api/queries";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import passengerSchema from "./passengerSchema";
import type {
  FormData,
  AddPassengerModalProps,
} from "./AddPassengerModal.definitions";

const AddPassengerModal: React.FC<AddPassengerModalProps> = ({ onClose }) => {
  const [editMode, setEditMode] = useState(true); // Always start in edit mode for consistency
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { currentUser } = useUserContext();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(passengerSchema),
    mode: "all",
    defaultValues: {
      "First Name": "",
      "Last Name": "",
      Relationship: undefined,
      "Date of Birth": "",
      Gender: undefined,
      Street: "",
      City: "",
      State: "",
      Zip: "",
      Country: "United States", // Default value
      "Cell Phone": "",
      Email: "",
      Waiver: "No", // Default value
    },
  });

  const processDate = (date: string) => {
    const newDate =
      date.substring(5, 7) +
      "/" +
      date.substring(8, 10) +
      "/" +
      date.substring(0, 4);
    return newDate;
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    const areaCode = phoneNumber.slice(0, 3);
    const middleThree = phoneNumber.slice(3, 6);
    const lastThree = phoneNumber.slice(6);
    return `(${areaCode}) ${middleThree}-${lastThree}`;
  };

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      return createPassenger(
        {
          fields: {
            ...data,
            "Date of Birth": processDate(
              (data["Date of Birth"] as Date).toISOString(),
            ),
            Waiver: data.Waiver === "Yes" ? true : false,
            "Cell Phone": formatPhoneNumber(data["Cell Phone"]),
          },
        },
        currentUser?.["AirTable Record ID"] || "",
        await getToken(),
      );
    },
    onSuccess: () => {
      setErrorMessage("");
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["accompanyingPassengers"],
      });
    },
    onError: () => {
      setErrorMessage("Failed to add passenger. Please try again.");
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <Modal
      action={() => onClose()}
      header="Add Passenger"
      body={
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.editGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>First Name</label>
              <div className={styles.inputWrapper}>
                <Input
                  name="First Name"
                  register={register}
                  error={errors["First Name"]?.message}
                  placeholder="First Name"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Last Name</label>
              <div className={styles.inputWrapper}>
                <Input
                  name="Last Name"
                  register={register}
                  error={errors["Last Name"]?.message}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Relationship</label>
              <div className={styles.inputWrapper}>
                <Select
                  name="Relationship"
                  register={register}
                  placeholder="Select Relationship"
                  options={[
                    "Mother",
                    "Father",
                    "Step-mother",
                    "Step-father",
                    "Legal Guardian",
                    "Spouse",
                    "Family Member",
                    "Other Caregiver",
                  ]}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Date of Birth (YYYY-MM-DD)
              </label>
              <div className={styles.inputWrapper}>
                <Input
                  name="Date of Birth"
                  register={register}
                  error={errors["Date of Birth"]?.message}
                  type="date"
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Gender</label>
              <div className={styles.inputWrapper}>
                <Select
                  name="Gender"
                  register={register}
                  placeholder="Select Gender"
                  options={["Male", "Female"]}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Street Address</label>
              <div className={styles.inputWrapper}>
                <Input
                  name="Street"
                  register={register}
                  error={errors.Street?.message}
                  placeholder="Street Address"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>City</label>
              <div className={styles.inputWrapper}>
                <Input
                  name="City"
                  register={register}
                  error={errors.City?.message}
                  placeholder="City"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>State</label>
              <div className={styles.inputWrapper}>
                <Select
                  name="State"
                  register={register}
                  placeholder="Select Option"
                  options={[
                    "AK",
                    "AL",
                    "AR",
                    "AZ",
                    "CA",
                    "CO",
                    "CT",
                    "DC",
                    "DE",
                    "FL",
                    "GA",
                    "HI",
                    "IA",
                    "ID",
                    "IL",
                    "IN",
                    "KS",
                    "KY",
                    "LA",
                    "MA",
                    "MD",
                    "ME",
                    "MI",
                    "MN",
                    "MO",
                    "MP",
                    "MS",
                    "MT",
                    "NC",
                    "ND",
                    "NE",
                    "NH",
                    "NJ",
                    "NL",
                    "NM",
                    "NV",
                    "NY",
                    "OH",
                    "OK",
                    "OR",
                    "PA",
                    "PR",
                    "RI",
                    "SC",
                    "SD",
                    "TN",
                    "TX",
                    "UT",
                    "VA",
                    "VI",
                    "VT",
                    "WA",
                    "WI",
                    "WV",
                    "WY",
                  ]}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Zip Code</label>
              <div className={styles.inputWrapper}>
                <Input
                  name="Zip"
                  register={register}
                  error={errors.Zip?.message}
                  placeholder="Zip Code"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Country</label>
              <div className={styles.inputWrapper}>
                <Select
                  name="Country"
                  register={register}
                  placeholder="Country"
                  options={[
                    "Argentina",
                    "Australia",
                    "Azerbaijan",
                    "Bahamas",
                    "Belize",
                    "Brazil",
                    "Canada",
                    "Chile",
                    "China",
                    "Colombia",
                    "Croatia",
                    "Dominican Republic",
                    "Ecuador",
                    "El Salvador",
                    "Germany",
                    "Grenada",
                    "Guam",
                    "Guatemala",
                    "Guyana",
                    "Honduras",
                    "India",
                    "Israel",
                    "Jamaica",
                    "Kuwait",
                    "Mauritius",
                    "Mexico",
                    "Nicaragua",
                    "Paraguay",
                    "Peru",
                    "Philippines",
                    "Serbia",
                    "South Africa",
                    "Tajikistan",
                    "Trinidad and Tobago",
                    "Tunisia",
                    "Turkey",
                    "Uganda",
                    "Ukraine",
                    "United Kingdom",
                    "United States",
                  ]}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Cell Phone</label>
              <div className={styles.inputWrapper}>
                <Input
                  name="Cell Phone"
                  register={register}
                  error={errors["Cell Phone"]?.message}
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <div className={styles.inputWrapper}>
                <Input
                  name="Email"
                  register={register}
                  error={errors.Email?.message}
                  type="email"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className={styles.formGroupFull}>
              <label className={styles.formLabel}>Waiver Agreement</label>
              <div className={styles.inputWrapper}>
                <Select
                  name="Waiver"
                  register={register}
                  placeholder="Select Option"
                  options={["Yes", "No"]}
                />
              </div>
            </div>

            {errorMessage && (
              <div className={`${styles.formGroupFull} ${styles.errorMessage}`}>
                {errorMessage}
              </div>
            )}
          </form>
          <div className={styles.footer}>
            <Button type="submit" text="Submit" disabled={!isValid} />
          </div>
        </div>
      }
    />
  );
};

export default AddPassengerModal;
