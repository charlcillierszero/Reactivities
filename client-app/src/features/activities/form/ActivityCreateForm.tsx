import { useStore } from "../../../app/stores/store";
import ActivityForm from "./ActivityForm";

const ActivityCreateForm = () => {
  const { activityStore } = useStore();
  const { createActivity } = activityStore;

  return (
    <ActivityForm
      onSumbitClick={createActivity}
      submitButtonContent={"Create"}
    />
  );
};

export default ActivityCreateForm;
