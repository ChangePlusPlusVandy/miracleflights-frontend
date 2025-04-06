import styles from "./PassengerDetailsModal.module.css";
import Modal from "../../../../components/Modal/Modal";
import { ButtonColor } from "../../../../components/Button/Button.definitions";
import Button from "../../../../components/Button/Button";
import Icon from "../../../../components/CustomIcon/Icon";
import Select from "../../../../components/Select/Select";
import Input from "../../../../components/Input/Input";
import { getAge, formatDate } from "../../../../util/date.util";
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
    Relationship: yup.string(),
    Country: yup.string().required("Country is required"),
    Email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    Gender: yup.string().required("Gender is required"),
    DateOfBirth: yup.string().required("Date of Birth is required"),
    MilitaryService: yup.string().required("Military status is required"),
    CellPhone: yup.string().required("Phone number is required"),
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
      Relationship: passenger["Relationship"] || undefined,
      Country: passenger["Country"],
      Email: passenger["Email"],
      Gender: passenger["Gender"],
      DateOfBirth: passenger["Date of Birth"],
      MilitaryService: passenger["Military Service"],
      CellPhone: passenger["Cell Phone"],
    },
  });

  interface PassengerFormData {
    Street: string;
    Relationship?: string;
    Country: string;
    Email: string;
    DateOfBirth: string;
    MilitaryService: string;
    Gender: string;
    CellPhone: string;
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
      Relationship: formData.Relationship,
      Country: formData.Country,
      Email: formData.Email,
      DateOfBirth: formData.DateOfBirth,
      MilitaryService: formData.MilitaryService,
      Gender: formData.Gender,
      CellPhone: formData.CellPhone,
      Notes: formData.Notes,
    };

    mutate(apiData);
  };

  function calculateAge(dateString: any) {
    if (!dateString) return "";
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  return (
    <Modal
      body={
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          {!editMode ? (
            // View Mode
            <div className={styles.infoContainer}>
              <div className={styles.mainContent}>
                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>
                    Relationship to Patient:
                  </div>
                  <div className={styles.infoValue}>
                    {passenger["Relationship"]}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Gender:</div>
                  <div className={styles.infoValue}>{passenger["Gender"]}</div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Age:</div>
                  <div className={styles.infoValue}>
                    {getAge(passenger["Date of Birth"])}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Date of Birth (DOB):</div>
                  <div className={styles.infoValue}>
                    {formatDate(passenger["Date of Birth"])}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Phone Number:</div>
                  <div className={styles.infoValue}>
                    {passenger["Cell Phone"]}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Email:</div>
                  <div className={styles.infoValue}>{passenger["Email"]}</div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Address:</div>
                  <div className={styles.infoValue}>
                    {`${passenger["Street"]}, ${passenger["Country"]}`}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Military:</div>
                  <div className={styles.infoValue}>
                    {passenger["Military Service"]}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Number of Flight Legs:</div>
                  <div className={styles.infoValue}>
                    {passenger["# of Flight Legs"]}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>
                    Number of Booked Flight Requests:
                  </div>
                  <div className={styles.infoValue}>
                    {passenger["# of Booked Flight Requests"]}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className={styles.editGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Relationship to Patient:
                </label>
                <div className={styles.inputWrapper}>
                  <Input
                    name="Relationship"
                    register={register}
                    defaultValue={passenger["Relationship"]}
                    type="text"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number</label>
                <div className={styles.inputWrapper}>
                  <Input
                    name="CellPhone"
                    register={register}
                    defaultValue={passenger["Cell Phone"]}
                    type="tel"
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Gender:</label>
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
                <label className={styles.formLabel}>Military Status:</label>
                <div className={styles.inputWrapper}>
                  <Select
                    name="MilitaryService"
                    register={register}
                    placeholder="Select Status"
                    options={["Active", "Veteran", "Not Applicable"]}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Date of Birth (DOB):</label>
                <div className={styles.inputWrapper}>
                  <Input name="DateOfBirth" register={register} type="date" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email:</label>
                <div className={styles.inputWrapper}>
                  <Input
                    name="Email"
                    register={register}
                    defaultValue={passenger["Email"]}
                    type="email"
                  />
                </div>
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.formLabel}>Address</label>
                <div className={styles.inputWrapper}>
                  <Input
                    name="Street"
                    register={register}
                    defaultValue={passenger["Street"]}
                    type="text"
                    placeholder="Street Address"
                  />
                </div>
              </div>
            </div>
          )}

          <div className={styles.footer}>
            {!editMode ? (
              <div
                className={styles.editButton}
                onClick={() => {
                  setEditMode(true);
                }}
              >
                <Icon glyph="edit" />
              </div>
            ) : (
              <div className={styles.editActions}>
                <Button
                  onClick={() => {
                    reset();
                    setEditMode(false);
                  }}
                  text="Back"
                  color={ButtonColor.White}
                  type="button"
                />
                <Button text="Save" type="submit" />
              </div>
            )}
          </div>
        </form>
      }
      header={
        !editMode
          ? passenger["Full Name"]
          : `Edit Information for ${passenger["Full Name"]}`
      }
      action={onClose}
    />
  );
};

export default PassengerDetailsModal;
