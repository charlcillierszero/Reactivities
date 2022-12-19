import { Button } from "semantic-ui-react";
import { useStore } from "../stores/store";

const CreateNewActivityButton = () => {
  const { activityStore } = useStore();
  const { setIsCreate, setIsEditing, setActivity } = activityStore;

  const handleOpenCreateForm = () => {
    setIsCreate(true);
    setIsEditing(false);
    setActivity(undefined);
  };

  return (
    <Button positive content="Create Activity" onClick={handleOpenCreateForm} />
  );
};

export default CreateNewActivityButton;
