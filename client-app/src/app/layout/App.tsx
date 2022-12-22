import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import { HOME } from "../router/paths";
import NavBar from "./NavBar";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
      {location.pathname === HOME ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
