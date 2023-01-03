import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
  attendees: Profile[];
}

export class Activity implements Activity {
  constructor(init?: ActivityFormValues) {
    if (init) {
      this.title = init.title;
      this.date = init.date;
      this.description = init.description;
      this.category = init.category;
      this.city = init.city;
      this.venue = init.venue;
    }
  }
}

export class ActivityFormValues {
  id?: string;
  title: string = "";
  date: Date = new Date(Date.now());
  description: string = "";
  category: string = "";
  city: string = "";
  venue: string = "";

  constructor(init?: Activity) {
    if (init) {
      this.id = init.id;
      this.title = init.title;
      this.date = init.date;
      this.description = init.description;
      this.category = init.category;
      this.city = init.city;
      this.venue = init.venue;
    }
  }
}
