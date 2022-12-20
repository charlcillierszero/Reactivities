export interface Activity {
  id: string;
  title: string;
  date: string;
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
  date: "",
  city: "",
  venue: "",
});
