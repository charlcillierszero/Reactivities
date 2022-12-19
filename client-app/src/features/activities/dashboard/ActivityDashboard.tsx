import { Grid } from "semantic-ui-react";
import ActivityDetails from "../details/ActivityDetails";
import ActivityCreateForm from "../form/ActivityCreateForm";
import ActivityEditForm from "../form/ActivityEditForm";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetails />
        <ActivityEditForm />
        <ActivityCreateForm />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
