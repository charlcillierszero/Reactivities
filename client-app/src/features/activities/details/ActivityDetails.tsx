import { observer } from "mobx-react-lite";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { activity, setActivity, setIsCreate, isEditing, setIsEditing } =
    activityStore;

  const handleOnEditClick = (activity: Activity) => {
    setIsCreate(false);
    setIsEditing(true);
    setActivity(activity);
  };

  const handleOnCancelClick = () => {
    setIsCreate(false);
    setIsEditing(false);
    setActivity(undefined);
  };

  if (!activity || isEditing) return null;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => handleOnEditClick(activity)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={handleOnCancelClick}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDashboard);
