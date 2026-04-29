export type PatientForm = {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  language: string;
  nationality: string;
  emergency: string;
  religion: string;
};

export type PatientErrors = Partial<Record<keyof PatientForm, string>>;

export function validatePatient(data: PatientForm): PatientErrors {
  const errors: PatientErrors = {};
  const nameRelationRegex = /^[a-zA-Zก-๙\s\-()]+$/;

  if (!data.firstName) errors.firstName = "First name is required";
  if (!data.lastName) errors.lastName = "Last name is required";

  if (!data.dob) {
  errors.dob = "Date of birth is required";
} else {
  const today = new Date();
  const dob = new Date(data.dob);

  
  today.setHours(0, 0, 0, 0);
  dob.setHours(0, 0, 0, 0);

  if (dob > today) {
    errors.dob = "Please enter a valid date of birth (not in the future)";
  }
}
  if (!data.gender) errors.gender = "Gender is required";

  if (!data.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^[0-9]{9,10}$/.test(data.phone)) {
    errors.phone = "Phone must be 9–10 digits, numbers only";
  }

  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
  errors.email = "Enter a valid email (e.g. name@example.com)";
}

  if (!data.address) errors.address = "Address is required";
  if (!data.language) errors.language = "Language is required";
  if (!data.nationality) errors.nationality = "Nationality is required";
  
  if (data.emergency) {
  if (!nameRelationRegex.test(data.emergency)) {
    errors.emergency =
      "Use only letters (name and relationship, e.g. John - Father)";
  }
}

  return errors;
}