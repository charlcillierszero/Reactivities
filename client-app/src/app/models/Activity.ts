export interface Activity {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  city: string;
  venue: string;
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
