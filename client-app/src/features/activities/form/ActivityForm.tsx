import { Form, Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import { Activity, createEmptyActivity } from "../../../app/models/activity";
import { ACTIVITIES } from "../../../app/router/paths";

interface Props {
  onSumbitClick: (activity: Activity) => Promise<void>;
  submitButtonContent: "Update" | "Create";
  selectedActivity?: Activity | undefined;
}

const ActivityForm = ({
  onSumbitClick,
  submitButtonContent,
  selectedActivity,
}: Props) => {
  const navigate = useNavigate();

  const activity = selectedActivity ? selectedActivity : createEmptyActivity();

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("The activity date is required").nullable(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  const handleOnSubmitClick = (
    activity: Activity,
    formikHelpers: FormikHelpers<Activity>
  ) =>
    onSumbitClick(activity)
      .then(() => navigate(`/${ACTIVITIES}/${activity.id}`))
      .finally(() => formikHelpers.setSubmitting(false));

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={activity}
        onSubmit={handleOnSubmitClick}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea name="description" placeholder="Description" rows={3} />
            <MySelectInput
              name="category"
              placeholder="Category"
              options={categoryOptions}
            />
            <MyDateInput
              name="date"
              placeholderText="Date"
              showTimeSelect
              timeCaption="time"
              dateFormat="d MMMM, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <MyTextInput name="city" placeholder="City" />
            <MyTextInput name="venue" placeholder="Venue" />
            <Button
              floated="right"
              positive
              type="submit"
              content={submitButtonContent}
              loading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              loading={isSubmitting}
              as={Link}
              to={`/${ACTIVITIES}/${activity.id ?? ""}`}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default ActivityForm;
