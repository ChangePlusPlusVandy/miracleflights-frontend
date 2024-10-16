import styles from "./PatientDetailsModal.module.css";
import Modal from "../../../../components/Modal/Modal";
import Icon from "../../../../components/CustomIcon/Icon";
import Input from "../../../../components/Input/Input";
import { ButtonColor } from "../../../../components/Button/Button.definitions";
import Button from "../../../../components/Button/Button";
import Select from "../../../../components/Select/Select";
import { COUNTRIES } from "../../../../util/constants.util";
import { updatePassenger } from "../../../../api/queries";
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

  const { mutate: updatePassengerMutate } = useMutation({
    mutationFn: async (data: PatientFormData) =>
      updatePassenger(data, patient["AirTable Record ID"], await getToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["passenger"],
      });
      queryClient.invalidateQueries({
        queryKey: ["accompanyingPassengers"],
      });
    },
  });

  interface PatientFormData {
    Street: string;
    Country: string;
    Email: string;
    Gender: string;
    DateOfBirth: string;
    MilitaryService: string;
    Notes?: string;
  }

  // Define the validation schema using Yup
  const schema = yup.object().shape({
    Email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    Street: yup.string().required("Street is required"),
    Country: yup.string().required("Country is required"),
    Gender: yup.string().required("Gender is required"),
    DateOfBirth: yup.string().required("Date of Birth is required"),
    MilitaryService: yup.string().required("Military status is required"),
    Notes: yup.string(),
    // Add other field validations as needed
  });

  // Initialize the form with default values and Yup validation schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Street: patient["Street"],
      Country: patient["Country"],
      Email: patient["Email"],
      Gender: patient["Gender"],
      DateOfBirth: patient["Date of Birth"],
      MilitaryService: patient["Military Service"],
      Notes: patient["Notes"],
      // Add other fields as needed
    },
  });

  // Handler for form submission
  const onSubmit = (data: PatientFormData) => {
    updatePassengerMutate(data);
    setEditMode(false);
  };

  useEffect(() => {
    console.log(patient["Military Service"]);
    reset({
      Street: patient["Street"],
      Country: patient["Country"],
      Email: patient["Email"],
      Gender: patient["Gender"],
      DateOfBirth: patient["Date of Birth"],
      MilitaryService: patient["Military Service"],
      Notes: patient["Notes"],
    });
  }, [patient, reset]);

  return (
    <>
      <Modal
        body={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={`${styles.patientRow} ${styles.marginBottom}`}>
                <div>
                  <span className={styles.patientLabel}>Gender</span>
                  {!editMode ? (
                    <div>
                      <span className={styles.patientText}>
                        {patient["Gender"]}
                      </span>
                    </div>
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
                  <span className={styles.patientLabel}>DOB</span>
                  {!editMode ? (
                    <div>
                      <span className={styles.patientText}>
                        {patient["Date of Birth"]}
                      </span>
                    </div>
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
              {/* make another patient group for address where each line of the address is separated */}

              <div className={styles.patientGroup}>
                <span className={styles.patientLabel}>Street</span>{" "}
                {!editMode && (
                  <>
                    <span className={styles.patientText}>
                      {patient["Street"]}
                    </span>
                    <span className={styles.patientText}>
                      {patient["Country"]}
                    </span>
                  </>
                )}
                {editMode && (
                  <>
                    <Input
                      name="Street"
                      register={register}
                      type="text"
                      placeholder="Street"
                      defaultValue={patient["Street"]}
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
              <div className={styles.patientGroup}>
                <span className={styles.patientLabel}>Email</span>{" "}
                {!editMode && (
                  <span className={styles.patientText}>{patient["Email"]}</span>
                )}
                {editMode && (
                  <Input
                    name="Email"
                    register={register}
                    type="text"
                    placeholder="Email"
                    defaultValue={patient["Email"]}
                    error={errors.Email?.message} // Display the error message
                  />
                )}
              </div>
              <div className={styles.patientGroup}>
                <span className={styles.patientLabel}>Military</span>
                {!editMode ? (
                  <span className={styles.patientText}>
                    {patient["Military Service"]}
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
              <div className={styles.patientRow}>
                <div className={styles.patientGroup}>
                  <span className={styles.patientLabel}># of Flight Legs</span>{" "}
                  <span className={styles.patientText}>
                    {patient["# of Flight Legs"]}
                  </span>
                </div>
                <div className={styles.patientGroup}>
                  <span className={styles.patientLabel}>
                    # of Booked Flight Requests
                  </span>{" "}
                  <span className={styles.patientText}>
                    {patient["# of Booked Flight Requests"]}
                  </span>
                </div>
              </div>
              <div className={styles.patientGroup}>
                <span className={styles.patientLabel}>Notes</span>
                {!editMode ? (
                  <span className={styles.patientText}>
                    {patient["Notes"] || "Notes go here"}
                  </span>
                ) : (
                  <Input
                    name="Notes"
                    register={register}
                    type="text"
                    placeholder="Notes go here"
                    defaultValue={patient["Notes"]}
                  />
                )}
              </div>
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
        header={patient["First Name"] + " " + patient["Last Name"]}
        action={onClose}
      />
    </>
  );
};

export default PatientDetailsModal;
