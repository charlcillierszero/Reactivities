import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import CreateNewActivityButton from "./CreateNewActivityButton";
import { ACTIVITIES, ERRORS, HOME, PROFILES } from "../router/paths";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const NavBar = () => {
  const {
    userStore: { user, logout },
  } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to={HOME} header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to={`/${ACTIVITIES}`} name="Activities" />
        <Menu.Item as={NavLink} to={`/${ERRORS}`} name="Errors" />
        <Menu.Item>
          <CreateNewActivityButton />
        </Menu.Item>
        <Menu.Item position="right">
          <Image
            src={user?.image || "/assets/user.png"}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top right" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/${PROFILES}/${user?.username}`}
                text="My Profile"
                icon="user"
              />
              <Dropdown.Item onClick={logout} text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
