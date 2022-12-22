import { Link } from "react-router-dom";
import {
  Button,
  Header,
  Icon,
  Segment,
  SegmentInline,
} from "semantic-ui-react";
import { ACTIVITIES } from "../../app/router/paths";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere but could not find what you are looking
        for!
      </Header>
      <SegmentInline>
        <Button as={Link} to={`/${ACTIVITIES}`}>
          Return to activities page
        </Button>
      </SegmentInline>
    </Segment>
  );
};

export default NotFound;
