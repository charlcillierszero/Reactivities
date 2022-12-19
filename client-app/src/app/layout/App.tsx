import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import services from "../api/services";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";

function App() {
  const { activityStore } = useStore();
  const { addOrUpdateActivityToRegistry, loadingInitial, setLoadingInitial } =
    activityStore;

  useEffect(() => {
    setLoadingInitial(true);
    services.Activities.list()
      .then((activities) => {
        activities.forEach((activity) => {
          activity.date = activity.date.split("T")[0];
          addOrUpdateActivityToRegistry(activity);
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingInitial(false));
  }, [setLoadingInitial, addOrUpdateActivityToRegistry]);

  if (loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
