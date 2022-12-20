import { NavLink } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import CreateNewActivityButton from "./CreateNewActivityButton";
import { ACTIVITIES, HOME } from "../router/paths";

const NavBar = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to={`${HOME}`} header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to={`/${ACTIVITIES}`} name="Activities" />
        <Menu.Item>
          <CreateNewActivityButton />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
