import { makeAutoObservable } from "mobx";
import { v4 as uuid } from "uuid";
import services from "../api/services";
import { Activity } from "../models/activity";
import { adjustActivityDate } from "../utils/activityUtils";

export default class ActivityStore {
  activityRegistry: Map<string, Activity> = new Map<string, Activity>();
  activity: Activity | undefined;
  isSubmitting = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate(): Activity[] {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const { date } = activity;
        activities[date]
          ? activities[date].push(activity)
          : (activities[date] = [activity]);
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  addOrUpdateActivityToRegistry = (activity: Activity) => {
    adjustActivityDate(activity);
    this.activityRegistry.set(activity.id, activity);
  };
  deleteActivityFromRegistry = (id: string) => this.activityRegistry.delete(id);
  setActivity = (activity: Activity | undefined) => {
    if (activity) adjustActivityDate(activity);
    this.activity = activity;
  };
  setIsSubmitting = (isSubmitting: boolean) =>
    (this.isSubmitting = isSubmitting);
  setLoadingInitial = (loadingInitial: boolean) =>
    (this.loadingInitial = loadingInitial);

  fetchActivities = () => {
    this.setLoadingInitial(true);
    services.Activities.list()
      .then((activities) => {
        activities.forEach((activity) =>
          this.addOrUpdateActivityToRegistry(activity)
        );
      })
      .catch((err) => console.error(err))
      .finally(() => this.setLoadingInitial(false));
  };

  fetchActivity = (id: string) => {
    const activity = this.activityRegistry.get(id);
    if (activity) return this.setActivity(activity);
    this.setLoadingInitial(true);
    services.Activities.get(id)
      .then((activity) => this.setActivity(activity))
      .catch((error) => console.error(error))
      .finally(() => this.setLoadingInitial(false));
  };

  updateActivity = async (activity: Activity) => {
    this.setIsSubmitting(true);
    services.Activities.update(activity)
      .then(() => {
        this.addOrUpdateActivityToRegistry(activity);
        this.setActivity(activity);
      })
      .catch((error) => console.error(error))
      .finally(() => this.setIsSubmitting(false));
  };

  createActivity = async (activity: Activity) => {
    this.setIsSubmitting(true);
    activity.id = uuid();
    services.Activities.create(activity)
      .then(() => {
        this.addOrUpdateActivityToRegistry(activity);
        this.setActivity(activity);
      })
      .catch((error) => console.error(error))
      .finally(() => this.setIsSubmitting(false));
  };

  deleteActivity = (id: string) => {
    this.setIsSubmitting(true);
    services.Activities.delete(id)
      .then(() => this.deleteActivityFromRegistry(id))
      .catch((error) => console.error(error))
      .finally(() => {
        this.setIsSubmitting(false);
        this.setActivity(undefined);
      });
  };
}
