export type PatientFormType = {
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

export type PatientStatus =  "inactive" | "submitted" | "idle" | "typing" ;

export type InputFieldProps = {
  label: string;
  type?: string;
  required?: boolean;
  optional?: string;
  icon?: React.ReactNode;
  name: string;
  value: string;
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
  max?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

