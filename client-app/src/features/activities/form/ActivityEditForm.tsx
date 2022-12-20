import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityForm from "./ActivityForm";

const ActivityEditForm = () => {
  const { activityStore } = useStore();
  const { activity, fetchActivity, updateActivity, loadingInitial } =
    activityStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchActivity(id);
  }, [id, fetchActivity]);

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;
  return (
    <ActivityForm
      onSumbitClick={updateActivity}
      submitButtonContent={"Update"}
      selectedActivity={activity}
    />
  );
};

export default observer(ActivityEditForm);
