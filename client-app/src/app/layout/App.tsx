import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/Activity";
import NavBar from "./NavBar";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSelectActivity = (activity: Activity | undefined) => {
    setActivity(activity);
    setIsCreate(false);
    setIsEditing(false);
  };
  const handleClearActivity = () => {
    setActivity(undefined);
    setIsCreate(false);
    setIsEditing(false);
  };

  const handleCreateActivity = () => {
    setIsCreate(true);
    setIsEditing(false);
    setActivity(undefined);
  };
  const handleCloseCreateActivity = () => {
    setIsCreate(false);
  };
  const handleSubmitCreateActivity = (activity: Activity) => {
    const activitiesCopy = [...activities];
    activity.id = uuid();
    activitiesCopy.push(activity);

    setActivities(activitiesCopy);
    setIsCreate(false);
  };

  const handleEditActivity = (activity: Activity) => {
    setIsCreate(false);
    setIsEditing(true);
    setActivity(activity);
  };
  const handleCloseEditActivity = () => {
    setIsEditing(false);
  };
  const handleSubmitEditActivity = (activity: Activity) => {
    const activitiesCopy = [...activities];
    const activityIndex = activitiesCopy.findIndex((a) => a.id === activity.id);
    activitiesCopy[activityIndex] = activity;

    setActivities(activitiesCopy);
    setIsEditing(false);
  };

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => setActivities(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDeleteActivity = (id: string) => {
    const activitiesCopy = [...activities.filter((a) => a.id !== id)];
    setActivities(activitiesCopy);
  };

  return (
    <>
      <NavBar openCreateForm={handleCreateActivity} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          activity={activity}
          handleSelectActivity={handleSelectActivity}
          handleClearActivity={handleClearActivity}
          handleDeleteActivity={handleDeleteActivity}
          isCreate={isCreate}
          handleSubmitCreateActivity={handleSubmitCreateActivity}
          handleCloseCreateActivity={handleCloseCreateActivity}
          isEditing={isEditing}
          handleEditActivity={handleEditActivity}
          handleSubmitEditActivity={handleSubmitEditActivity}
          handleCloseEditActivity={handleCloseEditActivity}
        />
      </Container>
    </>
  );
}

export default App;
