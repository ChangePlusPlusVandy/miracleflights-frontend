import styles from "./PatientDetailsModal.module.css";
import Modal from "../../../../components/Modal/Modal";
import Icon from "../../../../components/CustomIcon/Icon";
import Input from "../../../../components/Input/Input";
import { ButtonColor } from "../../../../components/Button/Button.definitions";
import Button from "../../../../components/Button/Button";
import Select from "../../../../components/Select/Select";
import { formatDate, getAge } from "../../../../util/date.util";
import { updatePatient } from "../../../../api/queries";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import type { PatientDetailsModalProps } from "./PatientDetailsModal.definitions";

const PatientDetailsModal = ({
  patient,
  onClose,
}: PatientDetailsModalProps) => {
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const schema = yup.object().shape({
    Street: yup.string().required("Street is required"),
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
      Street: patient["Street"],
      Email: patient["Email"],
      Gender: patient["Gender"],
      DateOfBirth: patient["Date of Birth"],
      MilitaryService: patient["Military Service"],
      CellPhone: patient["Cell Phone"],
    },
  });

  interface PatientFormData {
    Street: string;
    Relationship?: string;
    Email: string;
    Gender: string;
    DateOfBirth: string;
    MilitaryService: string;
    CellPhone: string;
  }

  const { mutate } = useMutation({
    mutationFn: async (data: PatientFormData) => {
      const token = await getToken();
      return updatePatient(
        {
          ...data,
        },
        patient["AirTable Record ID"],
        token,
      );
    },
    onSuccess: () => {
      setEditMode(false);
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["passenger"],
      });
      queryClient.invalidateQueries({
        queryKey: ["accompanyingPassengers"],
      });
    },
  });

  const onSubmit = async (formData: PatientFormData) => {
    const apiData = {
      Street: formData.Street,
      Relationship: formData.Relationship,
      Email: formData.Email,
      DateOfBirth: formData.DateOfBirth,
      MilitaryService: formData.MilitaryService,
      Gender: formData.Gender,
      CellPhone: formData.CellPhone,
    };

    mutate(apiData);
  };

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
                  <div className={styles.infoLabel}>Gender:</div>
                  <div className={styles.infoValue}>{patient["Gender"]}</div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Age:</div>
                  <div className={styles.infoValue}>
                    {getAge(patient["Date of Birth"])}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Date of Birth (DOB):</div>
                  <div className={styles.infoValue}>
                    {formatDate(patient["Date of Birth"])}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Phone Number:</div>
                  <div className={styles.infoValue}>
                    {patient["Cell Phone"]}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Email:</div>
                  <div className={styles.infoValue}>{patient["Email"]}</div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Address:</div>
                  <div className={styles.infoValue}>
                    {`${patient["Street"]}, ${patient["Country"]}`}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Military:</div>
                  <div className={styles.infoValue}>
                    {patient["Military Service"]}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>Number of Flight Legs:</div>
                  <div className={styles.infoValue}>
                    {patient["# of Flight Legs"]}
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>
                    Number of Booked Flight Requests:
                  </div>
                  <div className={styles.infoValue}>
                    {patient["# of Booked Flight Requests"]}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <div className={styles.editGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number</label>
                <div className={styles.inputWrapper}>
                  <Input
                    name="CellPhone"
                    register={register}
                    defaultValue={patient["Cell Phone"]}
                    type="tel"
                    placeholder="Phone Number"
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
                <label className={styles.formLabel}>Email:</label>
                <div className={styles.inputWrapper}>
                  <Input
                    name="Email"
                    register={register}
                    defaultValue={patient["Email"]}
                    type="email"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Address</label>
                <div className={styles.inputWrapper}>
                  <Input
                    name="Street"
                    register={register}
                    defaultValue={patient["Street"]}
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
          ? patient["Full Name"]
          : `Edit Information for ${patient["Full Name"]}`
      }
      action={onClose}
    />
  );
};

export default PatientDetailsModal;
