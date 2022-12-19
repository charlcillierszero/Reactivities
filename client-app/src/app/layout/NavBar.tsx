import { Container, Menu } from "semantic-ui-react";
import CreateNewActivityButton from "../models/CreateNewActivityButton";

const NavBar = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <CreateNewActivityButton />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
