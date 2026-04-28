export type SectionProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export type OptionType = {
  value: string;
  label: string;
};

export type SelectProps = {
  name: string;
  value?: string;
  onChange: (v: string) => void;
  options: OptionType[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
};

export type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  options: OptionType[];
  required?: boolean;
  optional?: string;
  error?: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
};