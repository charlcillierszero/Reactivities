import { useCallback, useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  isCreate: boolean;
  setIsCreate: (bool: boolean) => void;
  createOrEditActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({
  activities,
  isCreate,
  setIsCreate,
  createOrEditActivity,
  deleteActivity,
}: Props) {
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [isEditing, setIsEditing] = useState(false);

  const handleCloseEditing = useCallback(() => {
    setIsEditing(false);
  }, []);
  const handleClearActivity = useCallback(() => {
    handleCloseEditing();
    setSelectedActivity(undefined);
  }, [handleCloseEditing]);

  const handleCloseCreate = () => {
    setIsCreate(false);
  };
  const onSubmitClickEdit = (activity: Activity) => {
    handleClearActivity();
    createOrEditActivity(activity);
  };
  const onSubmitClickCreate = (activity: Activity) => {
    handleClearActivity();
    createOrEditActivity(activity);
  };
  const handleSetSelectedActivity = (activity: Activity | undefined) => {
    handleCloseEditing();
    setSelectedActivity(activity);
  };
  const handleIsUpdating = () => {
    setIsEditing(true);
    setIsCreate(false);
  };

  useEffect(() => {
    if (isCreate) {
      handleCloseEditing();
      handleClearActivity();
    }
  }, [isCreate, handleCloseEditing, handleClearActivity]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          setSelectedActivity={handleSetSelectedActivity}
          deleteActivity={deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !isEditing && (
          <ActivityDetails
            activity={selectedActivity}
            clearActivity={handleClearActivity}
            onEditClick={handleIsUpdating}
          />
        )}
        {isCreate && (
          <ActivityForm
            activity={undefined}
            onSumbitClick={onSubmitClickCreate}
            onCancelClick={handleCloseCreate}
            submitButtonContent={"Create"}
          />
        )}
        {isEditing && (
          <ActivityForm
            activity={selectedActivity}
            onSumbitClick={onSubmitClickEdit}
            onCancelClick={handleCloseEditing}
            submitButtonContent={"Update"}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
