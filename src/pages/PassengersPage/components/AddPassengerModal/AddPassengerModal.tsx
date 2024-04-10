import passengerSchema from './passengerSchema';
import Button from '../../../../components/Button/Button'; 
import { ButtonColor } from '../../../../components/Button/Button.definitions'; 
import Input from '../../../../components/Input/Input'; 
import Modal from '../../../../components/Modal/Modal'; 
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select from '../../../../components/Select/Select'; 
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup';
import type { FormData, AddPassengerModalProps } from './AddPassengerModal.definitions';





const AddPassengerModal: React.FC<AddPassengerModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(passengerSchema),
    mode: 'all', 
  });

  
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    
    const processedData = {
      ...data,
      Waiver: data.Waiver === 'Yes' ? true : false,
    };
    
    try {
      await axios.post('/passenger/', processedData);
      onClose(); 
      alert('Passenger added successfully!');
    } catch (error) {
      console.error('Failed to add passenger', error);
      alert('Failed to add passenger');
    }

    //alert(processedData['First Name'] + " " + processedData['Last Name'])

  };

  return (
    <Modal
      action={onClose}
      header="Add Passenger"
      body={
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name="First Name" register={register} error={errors['First Name']?.message} label="First Name" placeholder="First Name" />
          <Input name="Last Name" register={register} error={errors['Last Name']?.message} label="Last Name" placeholder="Last Name" />
          <Select name="Relationship" register={register} label="Relationship" placeholder="Select Relationship" options={['Mother', 'Father', 'Step-mother', 'Step-father', 'Legal Guardian', 'Spouse', 'Family Member', 'Other Caregiver']} />
          <Input name="Date of Birth" register={register} error={errors['Date of Birth']?.message} label="Date of Birth" placeholder="YYYY-MM-DD" type="date" />
          <Select name="Gender" register={register} label="Gender" placeholder="Select Gender" options={['Male', 'Female', 'Other']} />
          <Input name="Street" register={register} error={errors.Street?.message} label="Street" placeholder="Street Address" />
          <Input name="City" register={register} error={errors.City?.message} label="City" placeholder="City" />
          <Input name="State" register={register} error={errors.State?.message} label="State" placeholder="State" />
          <Input name="Zip" register={register} error={errors.Zip?.message} label="Zip Code" placeholder="Zip Code" />
          <Input name="Country" register={register} error={errors.Country?.message} label="Country" placeholder="Country" />
          <Input name="Cell Phone" register={register} error={errors['Cell Phone']?.message} label="Cell Phone" placeholder="(123) 456-7890" />
          <Input name="Email" register={register} error={errors.Email?.message} label="Email" placeholder="Email" type="email" />
          <Select name="Waiver" register={register} label="Waiver Agreement" placeholder="Select Option" options={['Yes', 'No']}/>
          <Button color={ButtonColor.Blue} text="Submit" disabled={!isValid} />
          
        </form>
      }
    />
  );
};

export default AddPassengerModal;
