import type { PassengerData } from "../../../interfaces/passenger.interface";

export interface UploadPassengerPageModalProps {
    isOpen: boolean;
    passengersData: PassengerData[];
    onPassengerFileSubmit: (file: File, passengerId: string) => void;
    onBack: () => void;
}