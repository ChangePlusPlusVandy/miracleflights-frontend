
import AddPassengerModal from './AddPassengerModal'; 
import styles from "./AddPassengerModal.module.css"; 
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const PlusButton = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);


    return(
        <div>
      <div onClick={() => setIsModalOpen(true)}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      {isModalOpen && <AddPassengerModal onClose={() => setIsModalOpen(false)} />}
    </div>
    )
}

export default PlusButton; 