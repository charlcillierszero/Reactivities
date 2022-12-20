import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { ACTIVITIES, EDIT_ACTIVITY } from "../../../app/router/paths";
import { useStore } from "../../../app/stores/store";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { activity, fetchActivity, loadingInitial } = activityStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchActivity(id);
  }, [id, fetchActivity]);

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;
  if (!activity) return null;
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
            as={Link}
            to={`/${ACTIVITIES}/${EDIT_ACTIVITY}/${id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to={`/${ACTIVITIES}`}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDashboard);
