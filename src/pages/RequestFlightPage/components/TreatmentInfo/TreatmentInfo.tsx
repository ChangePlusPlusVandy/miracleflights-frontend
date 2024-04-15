import styles from "./TreatmentInfo.module.css";
import Divider from "../../../../components/Divider/Divider";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
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
      <h4>Tell us about your treatment</h4>
      <Divider />
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
      <div className={styles.continueContainer}>
        <Button
          text="Continue >"
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
