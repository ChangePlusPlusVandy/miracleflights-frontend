import styles from "./TreatmentInfo.module.css";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import { ButtonVariant } from "../../../../components/Button/Button.definitions";
import type { TreatmentInfoProps } from "./TreatmentInfo.definitions";

const TreatmentInfo = ({
  setStep,
  register,
  errors,
  watch,
}: TreatmentInfoProps) => {
  const FullNameOfTreatmentSiteWatch = watch("FullNameOfTreatmentSite");
  const FullNameOfPrimaryTreatmentSiteDoctorWatch = watch(
    "FullNameOfPrimaryTreatmentSiteDoctor",
  );
  const ScheduledMedicalAppointmentDateWatch = watch(
    "ScheduledMedicalAppointmentDate",
  );

  return (
    <div className={styles.treatmentInfoContainer}>
      <span
        onClick={() => setStep(2)}
        className={styles.goBack}
      >{`< Go back`}</span>
      <div className={styles.treatmentSelectorBlockHeader}>Request a Trip</div>
      <div className={styles.treatmentBlockSubtitle}>
        Select your top two airport preferences, trip dates, and accompanying
        companions.
      </div>
      <hr className={styles.subtitleDivider} />
      <div className={styles.requestsHeader}>Treatment Information</div>
      <div className={styles.inputGroup}>
        <Input
          name="FullNameOfTreatmentSite"
          label="Full name of treatment site"
          register={register}
          error={errors.FullNameOfTreatmentSite?.message}
        />
        <Input
          name="FullNameOfPrimaryTreatmentSiteDoctor"
          label="Full name of primary treatment site doctor"
          register={register}
          error={errors.FullNameOfPrimaryTreatmentSiteDoctor?.message}
        />
        <Input
          name="ScheduledMedicalAppointmentDate"
          label="Scheduled medical appointment date"
          register={register}
          error={errors.ScheduledMedicalAppointmentDate?.message}
          type="date"
        />
      </div>
      <div className={styles.continueContainer}>
        <Button
          variant={ButtonVariant.Continue}
          text="Continue"
          disabled={
            !FullNameOfTreatmentSiteWatch ||
            !FullNameOfPrimaryTreatmentSiteDoctorWatch ||
            !ScheduledMedicalAppointmentDateWatch
          }
          onClick={() => setStep(4)}
        />
      </div>
    </div>
  );
};

export default TreatmentInfo;
