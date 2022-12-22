import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity, createEmptyActivity } from "../../../app/models/activity";
import { ACTIVITIES } from "../../../app/router/paths";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

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
  const { activityStore } = useStore();
  const { isSubmitting } = activityStore;
  const navigate = useNavigate();

  const [activity, setActivity] = useState(
    selectedActivity ? selectedActivity : createEmptyActivity()
  );
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleOnSubmitClick = (activity: Activity) => {
    if (!activity.id) activity.id = uuid();
    onSumbitClick(activity).then(() =>
      navigate(`/${ACTIVITIES}/${activity.id}`)
    );
  };

  return (
    <Segment clearing>
      <Form onSubmit={() => handleOnSubmitClick(activity)} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Date"
          type="date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content={submitButtonContent}
          loading={isSubmitting}
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
    </Segment>
  );
};

export default observer(ActivityForm);
