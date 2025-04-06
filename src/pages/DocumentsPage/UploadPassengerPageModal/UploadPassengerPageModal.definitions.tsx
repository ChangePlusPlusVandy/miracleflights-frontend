import type { PassengerData } from "../../../interfaces/passenger.interface";

export interface UploadPassengerPageModalProps {
    isOpen: boolean;
    documentType: string;
    passengersData: PassengerData[];
}