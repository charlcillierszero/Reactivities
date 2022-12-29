import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import ModalContainer from "../common/modals/ModalContainer";
import { HOME } from "../router/paths";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";

function App() {
  const location = useLocation();
  const {
    commonStore: { token, appLoaded, setAppLoaded },
    userStore: { getUser },
  } = useStore();

  useEffect(() => {
    if (token) getUser().finally(setAppLoaded);
    else setAppLoaded();
  }, [token, setAppLoaded, getUser]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ModalContainer />
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

export default observer(App);
