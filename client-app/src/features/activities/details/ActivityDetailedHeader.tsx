import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { EDIT_ACTIVITY, PROFILES } from "../../../app/router/paths";
import { useStore } from "../../../app/stores/store";
import { formatDateToDisplay } from "../../../app/utils/activityUtils";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity;
}

const ActivityDetailedHeader = ({ activity }: Props) => {
  const {
    activityStore: { updateAttendance, isSubmitting, cancelActivity },
  } = useStore();
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {activity.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Cancelled"
          />
        )}
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{formatDateToDisplay(activity.date)}</p>
                <p>
                  Hosted by{" "}
                  <strong>
                    <Link to={`/${PROFILES}/${activity.host?.username}`}>
                      {activity.host?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <>
            <Button
              color={activity.isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={
                activity.isCancelled
                  ? "Re-activate Activity"
                  : "Cancel Activity"
              }
              onClick={cancelActivity}
            />
            <Button
              as={Link}
              to={`/${EDIT_ACTIVITY}/${activity.id}`}
              color="orange"
              floated="right"
              disabled={activity.isCancelled}
            >
              Manage Event
            </Button>
          </>
        ) : (
          <Button
            onClick={updateAttendance}
            loading={isSubmitting}
            color={activity.isGoing ? undefined : "teal"}
            disabled={!activity.isGoing && activity.isCancelled}
          >
            {activity.isGoing ? "Cancel attendance" : "Join Activity"}
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailedHeader);
