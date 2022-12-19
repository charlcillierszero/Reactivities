import { observer } from "mobx-react-lite";
import services from "../../../app/api/services";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import ActivityForm from "./ActivityForm";

const ActivityEditForm = () => {
  const { activityStore } = useStore();
  const {
    addOrUpdateActivityToRegistry,
    setActivity,
    isEditing,
    setIsEditing,
    setIsSubmitting,
  } = activityStore;

  const handleCloseEditActivity = () => setIsEditing(false);

  const handleSubmitEditActivity = (activity: Activity) => {
    setIsSubmitting(true);
    services.Activities.update(activity)
      .then(() => {
        addOrUpdateActivityToRegistry(activity);
        setActivity(activity);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsEditing(false);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      {isEditing && (
        <ActivityForm
          onSumbitClick={handleSubmitEditActivity}
          onCancelClick={handleCloseEditActivity}
          submitButtonContent={"Update"}
        />
      )}
    </>
  );
};

export default observer(ActivityEditForm);
