import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { UserLoginFormValues } from "../../app/models/user";
import { useStore } from "../../app/stores/store";

const LoginForm = () => {
  const { userStore } = useStore();
  const { login } = userStore;

  const initialUserLogin = { email: "", password: "", error: null };

  const handleOnSubmit = (
    userLogin: UserLoginFormValues,
    formikHelpers: FormikHelpers<any>
  ) =>
    login(userLogin)
      .catch(() =>
        formikHelpers.setErrors({ error: "Invalid email or password" })
      )
      .finally(() => formikHelpers.setSubmitting(false));

  return (
    <Formik
      enableReinitialize
      initialValues={initialUserLogin}
      onSubmit={handleOnSubmit}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          />
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
