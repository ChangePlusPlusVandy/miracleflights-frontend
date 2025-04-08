// export default PassengerDetailsModal;
import styles from "./PassengerDetailsModal.module.css";
import Modal from "../../../../components/Modal/Modal";
import { ButtonColor } from "../../../../components/Button/Button.definitions";
import Button from "../../../../components/Button/Button";
import Icon from "../../../../components/CustomIcon/Icon";
import Select from "../../../../components/Select/Select";
import Input from "../../../../components/Input/Input";
import { getAge, formatDate } from "../../../../util/date.util";
// Import the new delete function
import { updatePassenger, deletePassenger } from "../../../../api/queries";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// Import useState
import { useState } from "react";
import type { PassengerDetailsModalProps } from "./PassengerDetailsModal.definitions";

const PassengerDetailsModal = ({
  passenger,
  onClose,
}: PassengerDetailsModalProps) => {
  const [editMode, setEditMode] = useState(false);
  // State for confirmation modal visibility
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  // --- Yup Schema and Form Hook (Unchanged) ---
  const schema = yup.object().shape({
    Street: yup.string().required("Street is required"),
    City: yup.string().required("City is required"),
    State: yup.string().required("State is required"),
    Zip: yup.string().required("Zip code is required"),
    Country: yup.string().required("Country is required"),
    Relationship: yup.string(),
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
      City: passenger["City"],
      State: passenger["State"],
      Zip: passenger["Zip"],
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
    City: string;
    State: string;
    Zip: string;
    Relationship?: string;
    Country: string;
    Email: string;
    DateOfBirth: string;
    MilitaryService: string;
    Gender: string;
    CellPhone: string;
    Notes?: string; // Assuming Notes might be part of the form data
  }

  // --- Update Mutation (Unchanged) ---
  const { mutate: mutateUpdate } = useMutation({
    mutationFn: async (data: PassengerFormData) => {
      const token = await getToken();
      if (!token) throw new Error("Not authenticated");
      return updatePassenger(
        {
          ...data,
          // Ensure Notes are included if applicable
        },
        passenger.id,
        token,
      );
    },
    onSuccess: () => {
      setEditMode(false);
      onClose(); // Close the main modal on successful update
      queryClient.invalidateQueries({
        queryKey: ["accompanyingPassengers"], // Ensure this key matches where you fetch the list
      });
    },
    onError: (error) => {
      console.error("Passenger update failed: ", error);
      // Add user feedback (e.g., toast notification)
    },
  });

  // --- NEW: Delete Mutation ---
  const { mutate: mutateDelete, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("Not authenticated");
      return deletePassenger(passenger.id, token);
    },
    onSuccess: () => {
      setShowDeleteConfirm(false); // Close confirmation modal
      onClose(); // Close the main details modal
      queryClient.invalidateQueries({
        queryKey: ["accompanyingPassengers"], // Invalidate cache to refresh the list
      });
      // Optional: Add success feedback (e.g., toast)
    },
    onError: (error) => {
      console.error("Passenger delete failed: ", error);
      setShowDeleteConfirm(false); // Close confirm modal even on error
      // Add user feedback (e.g., toast notification)
    },
  });

  const onSubmit = (formData: PassengerFormData) => {
    // Map form data for the update API call
    const apiData = {
      Street: formData.Street,
      Relationship: formData.Relationship,
      City: formData.City,
      State: formData.State,
      Zip: formData.Zip,
      Country: formData.Country,
      Email: formData.Email,
      DateOfBirth: formData.DateOfBirth,
      MilitaryService: formData.MilitaryService,
      Gender: formData.Gender,
      CellPhone: formData.CellPhone,
      // Notes: formData.Notes, // Include if needed
    };
    mutateUpdate(apiData);
  };

  // --- Age Calculation Function (Unchanged) ---
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

  // --- Handler for triggering delete confirmation ---
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  // --- Handler for confirming deletion ---
  const handleConfirmDelete = () => {
    mutateDelete(); // Execute the delete mutation
  };

  return (
    <>
      {/* Main Passenger Details Modal */}
      <Modal
        body={
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data as PassengerFormData); // Cast data type here
            })}
          >
            {!editMode ? (
              // --- View Mode (Content mostly unchanged) ---
              <div className={styles.infoContainer}>
                <div className={styles.mainContent}>
                  {/* ... (Keep all existing infoRow divs) ... */}
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
                    <div className={styles.infoValue}>
                      {passenger["Gender"]}
                    </div>
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
                    <div
                      className={styles.infoValue}
                    >{`${passenger["Street"]}, ${passenger["City"]}, ${passenger["Zip"]}, ${passenger["State"]}, ${passenger["Country"]}`}</div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>Military:</div>
                    <div className={styles.infoValue}>
                      {passenger["Military Service"]}
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>
                      Number of Flight Legs:
                    </div>
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
              // --- Edit Mode (Content unchanged) ---
              <div className={styles.editGrid}>
                {/* ... (Keep all existing formGroup divs for editing) ... */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Relationship to Patient:
                  </label>
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
                  <label className={styles.formLabel}>Phone Number:</label>
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
                  <label className={styles.formLabel}>
                    Date of Birth (DOB):
                  </label>
                  <div className={styles.inputWrapper}>
                    <Input
                      name="DateOfBirth"
                      register={register}
                      type="date"
                      defaultValue={passenger["Date of Birth"]}
                    />
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
                <div className={styles.formGroup}>
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
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>City</label>
                  <div className={styles.inputWrapper}>
                    <Input
                      name="City"
                      register={register}
                      defaultValue={passenger["City"]}
                      type="text"
                      placeholder="City"
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Zip</label>
                  <div className={styles.inputWrapper}>
                    <Input
                      name="Zip"
                      register={register}
                      error={errors.Zip?.message}
                      defaultValue={passenger["Zip"]}
                      type="text"
                      placeholder="Zip Code"
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>State</label>
                  <div className={styles.inputWrapper}>
                    <Select
                      name="State"
                      register={register}
                      placeholder="State"
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

                <div className={styles.formGroupFull}>
                  <label className={styles.formLabel}>Country</label>
                  <div className={styles.inputWrapper}>
                    <Select
                      name="Country"
                      register={register}
                      placeholder="Country"
                      // defaultValue={patient["Country"]}
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
              </div>
            )}

            {/* --- Footer --- */}
            <div className={styles.footer}>
              {/* Edit/Save Actions */}
              <div className={styles.footerActions}>
                {" "}
                {!editMode ? (
                  <div
                    className={styles.editButton}
                    onClick={() => {
                      reset(); // Reset form to default values when entering edit mode
                      setEditMode(true);
                    }}
                  >
                    <Icon glyph="edit" />
                  </div>
                ) : (
                  <div className={styles.footerContainer}>
                    <div className={styles.deleteButton}>
                      <Button
                        text="Delete"
                        onClick={handleDeleteClick}
                        // color={ButtonColor.Red} // Use a red color definition
                        // icon={<Icon glyph="delete" />} // Optional: Add a trash icon
                        // className={styles.deleteButton} // Add specific class for styling
                      />
                    </div>

                    <div className={styles.editActions}>
                      <Button
                        onClick={() => {
                          reset(); // Reset form changes
                          setEditMode(false); // Go back to view mode
                        }}
                        text="Back"
                        color={ButtonColor.White}
                        type="button"
                      />
                      <Button text="Save" type="submit" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        }
        header={
          !editMode
            ? passenger["Full Name"]
            : `Edit Information for ${passenger["Full Name"]}`
        }
        action={onClose} // This closes the main modal
      />

      {/* Confirmation Modal */}
      {showDeleteConfirm && (
        <Modal
          header="Confirm Deletion"
          body={
            <div>
              Are you sure you want to delete the companion{" "}
              <strong>{passenger["Full Name"]}</strong>? This action cannot be
              undone.
              <div className={styles.confirmActions}>
                <Button
                  text="No"
                  onClick={() => setShowDeleteConfirm(false)}
                  color={ButtonColor.White}
                  disabled={isDeleting} // Disable while delete is in progress
                />
                <Button
                  text="Yes, Delete"
                  onClick={handleConfirmDelete}
                  color={ButtonColor.Red} // Red button for confirmation
                  // isLoading={isDeleting} // Show loading state
                  disabled={isDeleting}
                />
              </div>
            </div>
          }
          action={() => setShowDeleteConfirm(false)} // Close confirmation modal on 'X' click
        />
      )}
    </>
  );
};

export default PassengerDetailsModal;
