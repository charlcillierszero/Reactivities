import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props {
  activity: Activity;
  clearActivity: () => void;
  onEditClick: (activity: Activity) => void;
}

export default function ActivityDashboard({
  activity,
  clearActivity,
  onEditClick,
}: Props) {
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
            onClick={() => onEditClick(activity)}
          />
          <Button basic color="grey" content="Cancel" onClick={clearActivity} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
