import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
