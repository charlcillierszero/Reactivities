import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername?: string;
  isCancelled?: boolean;
  isGoing?: boolean;
  isHost?: boolean;
  host?: Profile;
  attendees?: Profile[];
}

export const createEmptyActivity = (): Activity => ({
  id: "",
  title: "",
  category: "",
  description: "",
  date: new Date(Date.now()),
  city: "",
  venue: "",
});
