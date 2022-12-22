import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityCreateForm from "../../features/activities/form/ActivityCreateForm";
import ActivityEditForm from "../../features/activities/form/ActivityEditForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import App from "../layout/App";
import {
  ACTIVITIES,
  CREATE_ACTIVITY,
  EDIT_ACTIVITY,
  ERRORS,
  HOME,
  NOT_FOUND,
  SERVER_ERROR,
} from "./paths";

export const routes: RouteObject[] = [
  {
    path: HOME,
    element: <App />,
    children: [
      { path: ACTIVITIES, element: <ActivityDashboard /> },
      { path: `${ACTIVITIES}/:id`, element: <ActivityDetails /> },
      { path: `${CREATE_ACTIVITY}`, element: <ActivityCreateForm /> },
      { path: `${EDIT_ACTIVITY}/:id`, element: <ActivityEditForm /> },
      { path: ERRORS, element: <TestErrors /> },
      { path: NOT_FOUND, element: <NotFound /> },
      { path: SERVER_ERROR, element: <ServerError /> },
      { path: "*", element: <Navigate replace to={`/${NOT_FOUND}`} /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
