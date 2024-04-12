import passengerSchema from "./passengerSchema";
import styles from "./AddPassengerModal.module.css";
import Button from "../../../../components/Button/Button";
import { ButtonColor } from "../../../../components/Button/Button.definitions";
import Input from "../../../../components/Input/Input";
import Modal from "../../../../components/Modal/Modal";
import Select from "../../../../components/Select/Select";
import { useUserContext } from "../../../../context/User.context";
import { createPassenger } from "../../../../api/queries";
// eslint-disable-next-line import/no-duplicates
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@clerk/clerk-react";
// eslint-disable-next-line import/no-duplicates
import { useMutation } from "@tanstack/react-query";
// eslint-disable-next-line import/no-duplicates
import { useQueryClient } from "@tanstack/react-query";
// eslint-disable-next-line import/no-duplicates
import { useState } from "react";
import type {
  FormData,
  AddPassengerModalProps,
} from "./AddPassengerModal.definitions";

const AddPassengerModal: React.FC<AddPassengerModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(passengerSchema),
    mode: "all",
  });

  const { currentUser } = useUserContext();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");

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

  // mutation to create a new user
  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      console.log(
        JSON.stringify(
          {
            fields: {
              ...data,
              "Date of Birth": (data["Date of Birth"] as Date).toISOString(),
              Waiver: data.Waiver === "Yes" ? true : false,
            },
          },
          null,
          2,
        ),
      );
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
      console.log("passenger created successfully");
      setErrorMessage("");
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["accompanyingPassengers"],
      });
    },
    onError: () => {
      console.log("passenger creation failed");
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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.inputList}>
          <Input
            name="First Name"
            register={register}
            error={errors["First Name"]?.message}
            label="First Name"
            placeholder="First Name"
          />
          <Input
            name="Last Name"
            register={register}
            error={errors["Last Name"]?.message}
            label="Last Name"
            placeholder="Last Name"
          />
          <Select
            name="Relationship"
            register={register}
            label="Relationship"
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
          <Input
            name="Date of Birth"
            register={register}
            error={errors["Date of Birth"]?.message}
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            type="date"
          />
          <Select
            name="Gender"
            register={register}
            label="Gender"
            placeholder="Select Gender"
            options={["Male", "Female"]}
          />
          <Input
            name="Street"
            register={register}
            error={errors.Street?.message}
            label="Street"
            placeholder="Street Address"
          />
          <Input
            name="City"
            register={register}
            error={errors.City?.message}
            label="City"
            placeholder="City"
          />
          <Select
            name="State"
            register={register}
            label="State"
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

          <Input
            name="Zip"
            register={register}
            error={errors.Zip?.message}
            label="Zip Code"
            placeholder="Zip Code"
          />

          <Select
            name="Country"
            register={register}
            label="Country"
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
          <Input
            name="Cell Phone"
            register={register}
            error={errors["Cell Phone"]?.message}
            label="Cell Phone"
            placeholder="(123) 456-7890"
          />
          <Input
            name="Email"
            register={register}
            error={errors.Email?.message}
            label="Email"
            placeholder="Email"
            type="email"
          />
          <Select
            name="Waiver"
            register={register}
            label="Waiver Agreement"
            placeholder="Select Option"
            options={["Yes", "No"]}
          />
          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
          <Button
            color={ButtonColor.Blue}
            type="submit"
            text="submit"
            disabled={!isValid}
          />
        </form>
      }
    />
  );
};

export default AddPassengerModal;
