import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { PassengerDetailsModalProps } from "./PassengerDetailsModal.definitions";
import "./PassengerDetailsModal.css";

const PassengerDetailsModal = ({
  passenger,
  onClose,
}: PassengerDetailsModalProps) => {
  return (
    <div className="modal-bg">
      <div className="modal-container">
        <FontAwesomeIcon icon={faXmark} onClick={onClose} className="btn" />
        <div className="passenger-details">
          <p>
            <span>First Name:</span> {passenger.fields["First Name"]}
          </p>
          <p>
            <span>Last Name:</span> {passenger.fields["Last Name"]}
          </p>
          <p>
            <span>Email:</span> {passenger.fields["Email"]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetailsModal;
