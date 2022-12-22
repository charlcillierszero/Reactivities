import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

const ServerError = () => {
  const { commonStore } = useStore();
  const { serverError } = commonStore;

  return (
    <Container>
      <Header as="h1" content="Server Error" />
      <Header sub as="h5" color="red" content={serverError?.message} />
      {serverError?.details && (
        <Segment>
          <Header as="h4" content="Stack trace" color="teal" />
          <code style={{ marginTop: "10px" }}>{serverError.details}</code>
        </Segment>
      )}
    </Container>
  );
};

export default observer(ServerError);
