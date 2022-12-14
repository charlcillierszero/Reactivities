import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  activity: Activity | undefined;
  handleSelectActivity: (activity: Activity | undefined) => void;
  handleClearActivity: () => void;
  handleDeleteActivity: (id: string) => void;
  isCreate: boolean;
  handleSubmitCreateActivity: (activity: Activity) => void;
  handleCloseCreateActivity: () => void;
  isEditing: boolean;
  handleEditActivity: (activity: Activity) => void;
  handleSubmitEditActivity: (activity: Activity) => void;
  handleCloseEditActivity: () => void;
}

export default function ActivityDashboard({
  activities,
  activity,
  handleSelectActivity,
  handleClearActivity,
  handleDeleteActivity,
  isCreate,
  handleSubmitCreateActivity,
  handleCloseCreateActivity,
  isEditing,
  handleEditActivity,
  handleSubmitEditActivity,
  handleCloseEditActivity,
}: Props) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          setSelectedActivity={handleSelectActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {activity && !isEditing && (
          <ActivityDetails
            activity={activity}
            clearActivity={handleClearActivity}
            onEditClick={handleEditActivity}
          />
        )}
        {isCreate && (
          <ActivityForm
            activity={undefined}
            onSumbitClick={handleSubmitCreateActivity}
            onCancelClick={handleCloseCreateActivity}
            submitButtonContent={"Create"}
          />
        )}
        {isEditing && (
          <ActivityForm
            activity={activity}
            onSumbitClick={handleSubmitEditActivity}
            onCancelClick={handleCloseEditActivity}
            submitButtonContent={"Update"}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
