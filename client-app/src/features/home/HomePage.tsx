import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { ACTIVITIES } from "../../app/router/paths";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

const HomePage = () => {
  const {
    userStore: { isLoggedIn },
    modalStore: { openModal },
  } = useStore();

  const handleLogin = () => openModal(<LoginForm />);
  const handleRegister = () => openModal(<RegisterForm />);

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        <Header as="h2" inverted content="Welcome to Reactivities" />
        {isLoggedIn ? (
          <Button as={Link} to={`/${ACTIVITIES}`} size="huge" inverted>
            Go to Activities
          </Button>
        ) : (
          <>
            <Button onClick={handleLogin} size="huge" inverted>
              Login
            </Button>
            <Button onClick={handleRegister} size="huge" inverted>
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
