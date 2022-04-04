import Input from "./Input";
import { useField } from "remix-validated-form";

type FormInputProps = {
  name: string;
  label: string;
  isRequired?: boolean;
};

const FormInput = ({ name, label, isRequired, ...rest }: FormInputProps) => {
  const { getInputProps, error, touched } = useField(name);
  return (
    <Input
      label={label}
      error={error}
      {...getInputProps({
        id: name,
        ...rest,
      })}
      valid={touched && !error}
    />
  );
};

export default FormInput;
