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
    City: yup.string().required("City is required"),
    State: yup.string().required("State is required"),
    Zip: yup.string().required("Zip code is required"),
    Country: yup.string().required("Country is required"),
    Email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    Gender: yup.string().required("Gender is required"),
    DateOfBirth: yup.string().required("Date of Birth is required"),
    MilitaryService: yup.string().required("Military status is required"),
    CellPhone: yup.string().required("Phone number is required"),
    Diagnoses: yup.string().required("Medical condition is required"),
    FirstName: yup.string().required("First name is required"),
    LastName: yup.string().required("Last name is required"),
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
      City: patient["City"],
      State: patient["State"],
      Zip: patient["Zip"],
      Country: patient["Country"],
      Email: patient["Email"],
      Gender: patient["Gender"],
      DateOfBirth: patient["Date of Birth"],
      MilitaryService: patient["Military Service"],
      CellPhone: patient["Cell Phone"],
      Diagnoses: patient["Diagnoses"].join(", "),
      FirstName: patient["First Name"],
      LastName: patient["Last Name"],
    },
  });

  interface PatientFormData {
    Street: string;
    City: string;
    State: string;
    Zip: string;
    Country: string;
    Relationship?: string;
    Email: string;
    Gender: string;
    DateOfBirth: string;
    MilitaryService: string;
    CellPhone: string;
    Diagnoses: string;
    FirstName: string;
    LastName: string;
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
      City: formData.City,
      State: formData.State,
      Zip: formData.Zip,
      Country: formData.Country,
      Relationship: formData.Relationship,
      Email: formData.Email,
      DateOfBirth: formData.DateOfBirth,
      MilitaryService: formData.MilitaryService,
      Gender: formData.Gender,
      CellPhone: formData.CellPhone,
      Diagnoses: formData.Diagnoses,
      FirstName: formData.FirstName,
      LastName: formData.LastName,
    };
    // console.log("Diagnoses", formData.Diagnoses);

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
                    {`${patient["Street"]}, ${patient["City"]}, ${patient["State"]} ${patient["Zip"]}`}
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
            <div className={styles.editGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>First Name</label>
                <div className={styles.inputWrapper}>
                  <Input
                    name="FirstName"
                    register={register}
                    defaultValue={patient["First Name"]}
                    type="text"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Last Name</label>
                <div className={styles.inputWrapper}>
                  <Input
                    name="LastName"
                    register={register}
                    defaultValue={patient["Last Name"]}
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>
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
                    error={errors.Email?.message}
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
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>City</label>
                <div className={styles.inputWrapper}>
                  <Input
                    name="City"
                    register={register}
                    defaultValue={patient["City"]}
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
                    defaultValue={patient["Zip"]}
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

              <div className={styles.formGroup}>
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
              <div className={styles.formGroupFull}>
                <label className={styles.formLabel}>Medical Condition</label>
                <div className={styles.inputWrapper}>
                  <Input
                    name="Diagnoses"
                    register={register}
                    defaultValue={patient["Diagnoses"].join(", ")}
                    type="text"
                    placeholder="Medical Condition"
                    // onInputChange={onMedicalConditionChange} // Add the custom onChange handler
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
