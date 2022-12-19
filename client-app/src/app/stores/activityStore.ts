import { makeAutoObservable } from "mobx";
import { Activity } from "../models/Activity";

export default class ActivityStore {
  activities: Activity[] = [];
  activityRegistry: Map<string, Activity> = new Map<string, Activity>();
  activity: Activity | undefined;
  isCreate = false;
  isEditing = false;
  isSubmitting = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  addOrUpdateActivityToRegistry = (activity: Activity) =>
    this.activityRegistry.set(activity.id, activity);
  deleteActivityFromRegistry = (id: string) => this.activityRegistry.delete(id);
  setActivity = (activity: Activity | undefined) => (this.activity = activity);
  setIsCreate = (isCreate: boolean) => (this.isCreate = isCreate);
  setIsEditing = (isEditing: boolean) => (this.isEditing = isEditing);
  setIsSubmitting = (isSubmitting: boolean) =>
    (this.isSubmitting = isSubmitting);
  setLoadingInitial = (loadingInitial: boolean) =>
    (this.loadingInitial = loadingInitial);
}
