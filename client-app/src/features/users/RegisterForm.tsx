import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { Button, Header } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { UserRegisterFormValues } from "../../app/models/user";
import { useStore } from "../../app/stores/store";
import ValidationError from "../errors/ValidationError";

interface UserRegisterWithError extends UserRegisterFormValues {
  error: string[] | null
}

const RegisterForm = () => {
  const { userStore } = useStore();
  const { register } = userStore;

  const initialUserRegister: UserRegisterWithError = {
    displayName: "",
    username: "",
    email: "",
    password: "",
    error: null,
  };

  const handleOnSubmit = (
    userRegister: UserRegisterFormValues,
    { setErrors, setSubmitting }: FormikHelpers<any>
  ) =>
    register(userRegister)
      .catch((error) => setErrors({ error }))
      .finally(() => setSubmitting(false));

  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialUserRegister}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Sign up to Reactivities"
            color="teal"
            textAlign="center"
          />
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextInput name="username" placeholder="Username" />
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <ValidationError errors={errors.error ? [errors.error].flat() : null} />}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
