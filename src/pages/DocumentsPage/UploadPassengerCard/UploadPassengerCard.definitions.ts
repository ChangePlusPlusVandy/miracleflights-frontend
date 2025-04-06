import type { PassengerData } from "../../../interfaces/passenger.interface";

export interface UploadPassengerCardProps {
  passenger: PassengerData;
  onSendFile: (file: File, passengerId: string) => void;
}
