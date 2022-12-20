import { Activity } from "../models/Activity";

export const adjustActivityDate = (activity: Activity) =>
  (activity.date = activity.date.split("T")[0]);
