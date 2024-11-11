import styles from "./PassengerDetailsModal.module.css";
import Modal from "../../../../components/Modal/Modal";
import { ButtonColor } from "../../../../components/Button/Button.definitions";
import Button from "../../../../components/Button/Button";
import Icon from "../../../../components/CustomIcon/Icon";
import Select from "../../../../components/Select/Select";
import Input from "../../../../components/Input/Input";
import { COUNTRIES } from "../../../../util/constants.util";
import { updatePassenger } from "../../../../api/queries";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { PassengerDetailsModalProps } from "./PassengerDetailsModal.definitions";

const PassengerDetailsModal = ({
  passenger,
  onClose,
}: PassengerDetailsModalProps) => {
  const [editMode, setEditMode] = useState(false);
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const schema = yup.object().shape({
    Street: yup.string().required("Street is required"),
    Country: yup.string().required("Country is required"),
    Email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    Gender: yup.string().required("Gender is required"),
    DateOfBirth: yup.string().required("Date of Birth is required"),
    MilitaryService: yup.string().required("Military status is required"),
    // Notes: yup.string(),
    // Add other field validations as needed
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Street: passenger["Street"],
      Country: passenger["Country"],
      Email: passenger["Email"],
      Gender: passenger["Gender"],
      DateOfBirth: passenger["Date of Birth"],
      MilitaryService: passenger["Military Service"],
      // Notes: passenger["Notes"],
      // Add other fields as needed
    },
  });

  interface PassengerFormData {
    Street: string;
    Country: string;
    Email: string;
    DateOfBirth: string;
    MilitaryService: string;
    Gender: string;
    Notes?: string;
  }

  const { mutate } = useMutation({
    mutationFn: async (data: PassengerFormData) => {
      const token = await getToken();
      return updatePassenger(
        {
          ...data,
        },
        passenger.id,
        token,
      );
    },
    onSuccess: () => {
      setEditMode(false);
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["accompanyingPassengers"],
      });
    },
    onError: (error) => {
      console.error("passenger update failed: ", error);
    },
  });

  const onSubmit = async (formData: PassengerFormData) => {
    const apiData = {
      Street: formData.Street,
      Country: formData.Country,
      Email: formData.Email,
      DateOfBirth: formData.DateOfBirth,
      MilitaryService: formData.MilitaryService,
      Gender: formData.Gender,
      Notes: formData.Notes,
    };

    mutate(apiData);
  };

  return (
    <>
      <Modal
        body={
          <>
            <form
              onSubmit={handleSubmit((data) => {
                onSubmit(data);
              })}
            >
              <div className={`${styles.passengerRow} ${styles.marginBottom}`}>
                <div>
                  <span className={styles.passengerLabel}>Gender</span>{" "}
                  {!editMode ? (
                    <span className={styles.passengerText}>
                      {passenger["Gender"]}
                    </span>
                  ) : (
                    <Select
                      name="Gender"
                      register={register}
                      placeholder="Select Gender"
                      options={["Male", "Female"]}
                    />
                  )}
                </div>
                <div>
                  <span className={styles.passengerLabel}>DOB</span>{" "}
                  {!editMode ? (
                    <span className={styles.passengerText}>
                      {passenger["Date of Birth"].split("T")[0]}{" "}
                    </span>
                  ) : (
                    <Input
                      name="DateOfBirth"
                      register={register}
                      placeholder="YYYY-MM-DD"
                      type="date"
                    />
                  )}
                </div>
              </div>
              {/* make another passenger group for address where each line of the address is separated */}
              <div className={styles.passengerGroup}>
                <span className={styles.passengerLabel}>Address</span>{" "}
                {!editMode ? (
                  <>
                    <span className={styles.passengerText}>
                      {passenger["Street"]}
                    </span>
                    <span className={styles.passengerText}>
                      {passenger["Country"]}
                    </span>
                  </>
                ) : (
                  <>
                    <Input
                      name="Street"
                      register={register}
                      type="text"
                      placeholder="Street"
                      defaultValue={passenger["Street"]}
                      error={errors.Street?.message} // Display the error message
                    />
                    <Select
                      name="Country"
                      register={register}
                      label="Select Label"
                      placeholder="Select Placeholder"
                      options={COUNTRIES}
                    />
                  </>
                )}
              </div>
              <div className={styles.passengerGroup}>
                <span className={styles.passengerLabel}>Military</span>{" "}
                {!editMode ? (
                  <span className={styles.passengerText}>
                    {passenger["Military Service"]}
                  </span>
                ) : (
                  <Select
                    name="MilitaryService"
                    register={register}
                    placeholder="Select Status"
                    options={["Active", "Veteran", "Not applicable"]}
                  />
                )}
              </div>
              <div className={styles.passengerRow}>
                <div className={styles.passengerGroup}>
                  <span className={styles.passengerLabel}>
                    # of Flight Legs
                  </span>{" "}
                  <span className={styles.passengerText}>
                    {passenger["# of Flight Legs"]}
                  </span>
                </div>
                <div className={styles.passengerGroup}>
                  <span className={styles.passengerLabel}>
                    # of Booked Flight Requests
                  </span>{" "}
                  <span className={styles.passengerText}>
                    {passenger["# of Booked Flight Requests"]}
                  </span>
                </div>
              </div>
              {/* <div className={styles.passengerGroup}>
                <span className={styles.passengerLabel}>Notes</span>
                {!editMode ? (
                  <span className={styles.passengerText}>
                    {passenger["Notes"] || "Notes go here"}
                  </span>
                ) : (
                  <Input
                    name="Notes"
                    register={register}
                    type="text"
                    placeholder="Notes go here"
                    defaultValue={passenger["Notes"]}
                  />
                )}
              </div> */}
              <div className={styles.footer}>
                {!editMode && (
                  <div
                    className={styles.editButton}
                    onClick={() => {
                      setEditMode(!editMode);
                    }}
                  >
                    <Icon glyph="edit" />
                  </div>
                )}
                {editMode && (
                  <div className={styles.buttonOptions}>
                    <Button
                      onClick={() => {
                        reset(), setEditMode(false);
                      }}
                      text="Exit"
                      color={ButtonColor.Red}
                      type="button"
                    />
                    <Button text="Save" type="submit" />
                  </div>
                )}
              </div>
            </form>
          </>
        }
        header={passenger["Full Name"]}
        action={onClose}
      />
    </>
  );
};

export default PassengerDetailsModal;
