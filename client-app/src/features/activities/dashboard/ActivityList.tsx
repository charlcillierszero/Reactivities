import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { ACTIVITIES } from "../../../app/router/paths";
import { useStore } from "../../../app/stores/store";

const ActivityList = () => {
  const { activityStore } = useStore();
  const { activitiesByDate, deleteActivity, isSubmitting } = activityStore;
  const [target, setTarget] = useState("");

  const handleDeleteActivity = (id: string) => {
    setTarget(id);
    deleteActivity(id);
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
                  as={Link}
                  to={`/${ACTIVITIES}/${activity.id}`}
                  floated="right"
                  content="View"
                  color="blue"
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
