import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import services from "../api/services";
import { Activity } from "../models/Activity";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    services.Activities.list()
      .then((response) => {
        response.forEach(
          (activity) => (activity.date = activity.date.split("T")[0])
        );
        setActivities(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

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
    setSubmitting(true);
    activity.id = uuid();

    services.Activities.create(activity)
      .then(() => {
        const activitiesCopy = [...activities];
        activitiesCopy.push(activity);
        setActivities(activitiesCopy);
        setActivity(activity);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
        setIsCreate(false);
      });
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
    setSubmitting(true);

    services.Activities.update(activity)
      .then(() => {
        const activitiesCopy = [...activities];
        const activitiesIndex = activitiesCopy.findIndex(
          (a) => a.id === activity.id
        );
        activitiesCopy[activitiesIndex] = activity;
        setActivities(activitiesCopy);
        setActivity(activity);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
        setIsEditing(false);
      });
  };

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    setActivity(undefined);
    services.Activities.delete(id)
      .then(() => {
        const activitiesCopy = [...activities.filter((a) => a.id !== id)];
        setActivities(activitiesCopy);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading) return <LoadingComponent content="Loading app" />;

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
