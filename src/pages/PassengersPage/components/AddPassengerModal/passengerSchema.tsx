import * as Yup from 'yup';

const passengerSchema = Yup.object().shape({
  'First Name': Yup.string().required('First Name is required'),
  'Last Name': Yup.string().required('Last Name is required'),
  Relationship: Yup.string()
    .oneOf(
      [
        'Mother',
        'Father',
        'Step-mother',
        'Step-father',
        'Legal Guardian',
        'Spouse',
        'Family Member',
        'Other Caregiver',
      ],
      'Invalid Relationship'
    )
    .required('Relationship is required'),
  'Date of Birth': Yup.date().required('Date of Birth is required'),
  Diagnoses: Yup.array().of(Yup.string()), // Assuming an array of strings for Diagnoses
  Gender: Yup.string()
    .oneOf(['Male', 'Female', 'Other'], 'Invalid Gender')
    .required('Gender is required'),
  Street: Yup.string().required('Street is required'),
  City: Yup.string().required('City is required'),
  State: Yup.string().required('State is required'),
  Zip: Yup.string().required('Zip is required'),
  Country: Yup.string().required('Country is required'),
  'Cell Phone': Yup.string()
    .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Invalid Cell Phone number')
    .required('Cell Phone is required'),
  Email: Yup.string().email('Invalid Email').required('Email is required'),
  Waiver: Yup.string()
    .oneOf(['Yes', 'No'], 'Invalid Waiver selection')
    .required('Waiver selection is required'),
});

export default passengerSchema;
