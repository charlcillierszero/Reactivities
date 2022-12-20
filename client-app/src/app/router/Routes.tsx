import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityCreateForm from "../../features/activities/form/ActivityCreateForm";
import ActivityEditForm from "../../features/activities/form/ActivityEditForm";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import { ACTIVITIES, CREATE_ACTIVITY, EDIT_ACTIVITY, HOME } from "./paths";

export const routes: RouteObject[] = [
  { path: HOME, element: <HomePage /> },
  {
    path: `/${ACTIVITIES}`,
    element: <App />,
    children: [
      { path: "", element: <ActivityDashboard /> },
      { path: ":id", element: <ActivityDetails /> },
      { path: `${CREATE_ACTIVITY}`, element: <ActivityCreateForm /> },
      { path: `${EDIT_ACTIVITY}/:id`, element: <ActivityEditForm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
