import TextArea, { TextAreaProps } from "../shared/TextArea";
import { useField } from "remix-validated-form";

type FormInputProps = TextAreaProps & {
  isRequired?: boolean;
  name: string;
};

const TextAreaField = ({ name, isRequired, ...rest }: FormInputProps) => {
  const { getInputProps, error, touched } = useField(name);
  return (
    <TextArea
      error={error}
      {...getInputProps({
        id: name,
        ...rest,
      })}
      valid={touched && !error}
    />
  );
};

export default TextAreaField;
