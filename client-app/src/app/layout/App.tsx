import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/Activity";
import NavBar from "./NavBar";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => setActivities(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCreateOrEditActivity = (activity: Activity) => {
    let activitiesCopy = [...activities];
    const activityIndex = activitiesCopy.findIndex((a) => a.id === activity.id);
    console.log(activity, activityIndex);
    if (activityIndex >= 0) activitiesCopy[activityIndex] = activity;
    else {
      activity.id = uuid();
      activitiesCopy.push(activity);
    }
    setActivities(activitiesCopy);
  };

  const handleDeleteActivity = (id: string) => {
    const activitiesCopy = [...activities.filter((a) => a.id !== id)];
    setActivities(activitiesCopy);
  };

  return (
    <>
      <NavBar openCreateForm={() => setIsCreate(true)} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
