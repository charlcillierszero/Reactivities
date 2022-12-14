import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, Item, Label, List, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { PROFILES } from "../../../app/router/paths";

interface Props {
  activity: Activity;
}

const ActivityDetailedSidebar = ({ activity: { attendees } }: Props) => {
  if (!attendees) return null;

  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees.length} {attendees.length === 1 ? "Person" : "People"} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee) => (
            <Item key={attendee.username} style={{ position: "relative" }}>
              {attendee.isHost && (
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>
              )}
              <Image size="tiny" src={attendee.image || "/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <Link to={`/${PROFILES}/${attendee.username}`}>
                    {attendee.displayName}
                  </Link>
                </Item.Header>
                <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
};

export default observer(ActivityDetailedSidebar);
