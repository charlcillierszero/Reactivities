import { Activity } from "../models/activity";

export const adjustActivityDate = (activity: Activity) =>
  (activity.date = activity.date.split("T")[0]);
