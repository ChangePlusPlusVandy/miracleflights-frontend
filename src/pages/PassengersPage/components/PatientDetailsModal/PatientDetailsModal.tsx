import styles from "./PatientDetailsModal.module.css";
import Modal from "../../../../components/Modal/Modal";
import Icon from "../../../../components/CustomIcon/Icon";
import Input from "../../../../components/Input/Input";
import { ButtonColor } from "../../../../components/Button/Button.definitions";
import Button from "../../../../components/Button/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { PatientDetailsModalProps } from "./PatientDetailsModal.definitions";

const PatientDetailsModal = ({
  patient,
  onClose,
}: PatientDetailsModalProps) => {
  const [editMode, setEditMode] = useState(false);

  interface PatientFormData {
    Address: string;
    Country: string;
    Email: string;
  }

  // Initialize the form with default values from the patient data
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      Address: patient["Street"],
      Country: patient["Country"],
      Email: patient["Email"],
      // Add other fields as needed
    },
  });
  // Handler for form submission
  const onSubmit = (data: PatientFormData) => {
    console.log("Form Data:", data);
    // Here you can later add the POST request to your backend
    setEditMode(false); // Exit edit mode after submission
  };

  return (
    <>
      <Modal
        body={
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={`${styles.patientRow} ${styles.marginBottom}`}>
                <div>
                  <span className={styles.patientLabel}>Gender</span>{" "}
                  <span className={styles.patientText}>
                    {patient["Gender"]}
                  </span>
                </div>
                <div>
                  <span className={styles.patientLabel}>DOB</span>{" "}
                  <span className={styles.patientText}>
                    {patient["Date of Birth"].split("T")[0]}{" "}
                  </span>
                </div>
              </div>
              {/* make another patient group for address where each line of the address is separated */}

              <div className={styles.patientGroup}>
                <span className={styles.patientLabel}>Address</span>{" "}
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
                      name="Address"
                      register={register}
                      type="text"
                      placeholder="Address"
                    />
                    <Input
                      name="Country"
                      register={register}
                      type="text"
                      placeholder="Country"
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
                  />
                )}
              </div>
              <div className={styles.patientGroup}>
                <span className={styles.patientLabel}>Military</span>{" "}
                <span className={styles.patientText}>
                  {patient["Military Service"]}
                </span>
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
                    {patient["# of Booked Flight Requests (Patient)"]}
                  </span>
                </div>
              </div>
              <div className={styles.patientGroup}>
                <span className={styles.patientLabel}>Notes</span>
                <span className={styles.patientText}>Notes go here</span>
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
                      onClick={() => reset()}
                      text="Exit"
                      color={ButtonColor.Red}
                    />
                    <Button text="Save" />
                  </div>
                )}
              </div>
            </form>
            {/* <span className={styles.patientLabel}>Joined Goes Here</span>{" "} */}
          </>
        }
        header={patient["Full Name"]}
        action={onClose}
      />
    </>
  );
};

export default PatientDetailsModal;
