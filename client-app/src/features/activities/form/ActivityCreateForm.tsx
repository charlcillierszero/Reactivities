import { useStore } from "../../../app/stores/store";
import ActivityForm from "./ActivityForm";
import { v4 as uuid } from "uuid";
import services from "../../../app/api/services";
import { Activity } from "../../../app/models/Activity";
import { observer } from "mobx-react-lite";

const ActivityCreateForm = () => {
  const { activityStore } = useStore();
  const {
    addOrUpdateActivityToRegistry,
    setActivity,
    isCreate,
    setIsCreate,
    setIsSubmitting,
  } = activityStore;

  const handleCloseCreateActivity = () => setIsCreate(false);

  const handleSubmitCreateActivity = (activity: Activity) => {
    setIsSubmitting(true);
    activity.id = uuid();
    services.Activities.create(activity)
      .then(() => {
        addOrUpdateActivityToRegistry(activity);
        setActivity(activity);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsCreate(false);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      {isCreate && (
        <ActivityForm
          onSumbitClick={handleSubmitCreateActivity}
          onCancelClick={handleCloseCreateActivity}
          submitButtonContent={"Create"}
        />
      )}
    </>
  );
};

export default observer(ActivityCreateForm);
