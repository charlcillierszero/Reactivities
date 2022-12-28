import { format } from "date-fns";
import { Activity } from "../models/activity";

export const adjustActivityDate = (activity: Activity) =>
  (activity.date = new Date(activity.date));

export const formatDateToDisplay = (date: Date) =>
  format(date, "dd MMM yyyy h:mm aa");
