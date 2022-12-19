import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import services from "../../../app/api/services";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";

const ActivityList = () => {
  const { activityStore } = useStore();
  const {
    activitiesByDate,
    deleteActivityFromRegistry,
    setActivity,
    setIsCreate,
    setIsEditing,
    isSubmitting,
    setIsSubmitting,
  } = activityStore;
  const [target, setTarget] = useState("");

  const handleViewActivity = (activity: Activity) => {
    setIsCreate(false);
    setIsEditing(false);
    setActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setTarget(id);
    setIsSubmitting(true);
    services.Activities.delete(id)
      .then(() => deleteActivityFromRegistry(id))
      .catch((error) => console.error(error))
      .finally(() => {
        setIsSubmitting(false);
        setActivity(undefined);
      });
  };

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as={"a"}>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => handleViewActivity(activity)}
                />
                <Button
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={() => handleDeleteActivity(activity.id)}
                  loading={isSubmitting && target === activity.id}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
