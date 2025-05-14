export interface Event {
  id: string;
  title: string;
  description: string;
  type: "mega" | "dj-night";
  rules?: string[];
  registerInfo?: {
    fee: string;
    prizes: string[];
    date: string;
    contact: string[];
  };
  freeEntry?: boolean;
  venue: string;
  time: string;
  eventDate: string;
  qrCode?: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  image: string;
}
