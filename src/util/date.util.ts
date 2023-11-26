export const getAge = (dateOfBirth: string) => {
  const today = new Date();

  // Convert dateOfBirth to Date object
  const birthDate = new Date(dateOfBirth);

  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();

  // Calculate month difference
  const m = today.getMonth() - birthDate.getMonth();

  // If today's month is less than the birth month, subtract 1 from age
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // If age is negative, return 0
  if (age < 0) {
    return 0;
  }

  // If age is NaN, return 0. This happens when dateOfBirth is not a valid date
  if (isNaN(age)) {
    return 0;
  }

  return age;
};
