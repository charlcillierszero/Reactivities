import { Link } from "react-router-dom";
import { Image, List } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { PROFILE } from "../../../app/router/paths";

interface Props {
  attendees: Profile[];
}

const ActivityListItemAttendee = ({ attendees }: Props) => {
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <List.Item
          key={attendee.username}
          as={Link}
          to={`/${PROFILE}/${attendee.username}`}
        >
          <Image
            size="mini"
            circular
            src={attendee.image || "/assets/user.png"}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListItemAttendee;
