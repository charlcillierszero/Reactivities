import { Activity } from "../models/activity";
import requests from "./baseService";

const ActivitiesService = {
  list: () => requests.list<Activity>("/activities"),
  get: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) =>
    requests.post<Activity, void>("/activities", activity),
  update: (activity: Activity) =>
    requests.put<Activity, void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/activities/${id}`),
  attend: (id: string) => requests.postNoBody<void>(`/activities/${id}/attend`),
};

export default ActivitiesService;
