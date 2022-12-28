import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { FormField, Label } from "semantic-ui-react";

const MyDateInput = (props: Partial<ReactDatePickerProps>) => {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default MyDateInput;
