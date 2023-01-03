import { format } from "date-fns";
import { makeAutoObservable } from "mobx";
import { v4 as uuid } from "uuid";
import ActivitiesService from "../api/activitiesService";
import { Activity, ActivityFormValues } from "../models/activity";
import { Profile } from "../models/profile";
import { adjustActivityDate } from "../utils/activityUtils";
import { store } from "./store";

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
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = format(activity.date, "dd MMM yyyy");
        activities[date]
          ? activities[date].push(activity)
          : (activities[date] = [activity]);
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  private cleanActivity = (activity: Activity): Activity => {
    const user = store.userStore.user;
    if (user) {
      activity.isGoing = activity.attendees?.some(
        (a) => a.username === user.username
      );
      activity.host = activity.attendees!.find((a) => a.isHost);
      activity.isHost = activity.host?.username === user.username;
    }
    adjustActivityDate(activity);
    return activity;
  };

  addOrUpdateActivityToRegistry = (activity: Activity) => {
    const cleanActivity = this.cleanActivity(activity);
    this.activityRegistry.set(cleanActivity.id, cleanActivity);
  };

  deleteActivityFromRegistry = (id: string) => this.activityRegistry.delete(id);

  setActivity = (activity: Activity | undefined) => {
    const safeActivity = activity ? this.cleanActivity(activity) : activity;
    this.activity = safeActivity;
  };

  setIsSubmitting = (isSubmitting: boolean) =>
    (this.isSubmitting = isSubmitting);

  setLoadingInitial = (loadingInitial: boolean) =>
    (this.loadingInitial = loadingInitial);

  fetchActivities = () => {
    this.setLoadingInitial(true);
    ActivitiesService.list()
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
    ActivitiesService.get(id)
      .then((activity) => this.setActivity(activity))
      .catch((error) => console.error(error))
      .finally(() => this.setLoadingInitial(false));
  };

  updateActivity = async (activityFormValues: ActivityFormValues) => {
    const activity = this.activity!;
    Object.assign(activity, activityFormValues);
    return ActivitiesService.update(activity)
      .then(() => {
        this.addOrUpdateActivityToRegistry(activity);
        this.setActivity(activity);
        return Promise.resolve(activity);
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  };

  createActivity = async (activityFormValues: ActivityFormValues) => {
    const user = store.userStore.user;
    const activity = new Activity(activityFormValues);

    const attendee = new Profile(user!);
    attendee.isHost = true;

    activity.id = uuid();
    activity.isCancelled = false;
    activity.isGoing = true;
    activity.isHost = true;
    activity.hostUsername = attendee.username;
    activity.host = attendee;
    activity.attendees = [attendee];

    return ActivitiesService.create(activity)
      .then(() => {
        this.addOrUpdateActivityToRegistry(activity);
        this.setActivity(activity);
        return Promise.resolve(activity);
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  };

  deleteActivity = (id: string) => {
    this.setIsSubmitting(true);
    ActivitiesService.delete(id)
      .then(() => this.deleteActivityFromRegistry(id))
      .catch((error) => console.error(error))
      .finally(() => {
        this.setIsSubmitting(false);
        this.setActivity(undefined);
      });
  };

  updateAttendance = async () => {
    this.setIsSubmitting(true);

    const user = store.userStore.user!;
    const activity = this.activity!;
    if (activity.isGoing) {
      activity.attendees = activity.attendees?.filter(
        (attendee) => attendee.username !== user.username
      );
      activity.isGoing = false;
    } else {
      const attendee = new Profile(user);
      activity.attendees?.push(attendee);
      activity.isGoing = true;
    }

    ActivitiesService.attend(activity.id)
      .then(() => {
        this.addOrUpdateActivityToRegistry(activity);
        this.setActivity(activity);
      })
      .catch((error) => console.error(error))
      .finally(() => this.setIsSubmitting(false));
  };

  cancelActivity = async () => {
    this.setIsSubmitting(true);
    const activity = this.activity!;
    activity.isCancelled = !activity.isCancelled;
    ActivitiesService.attend(activity.id)
      .then(() => {
        this.addOrUpdateActivityToRegistry(activity);
        this.setActivity(activity);
      })
      .catch((error) => console.error(error))
      .finally(() => this.setIsSubmitting(false));
  };
}
