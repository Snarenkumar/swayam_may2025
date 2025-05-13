export interface Event {
  id: string;
  name: string;
  no: number;
  description: string;
  rules: string[];
  registration_fee: number;
  prizes: {
    first: string;
    second: string;
  };
  date_time: string;
  coordinators: {
    name: string;
    phone: string;
  }[];
  minTeamMembers: number;
  maxTeamMembers: number;
  image: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  rules: string[];
  date: string;
  time: string;
  fee: string;
  prize1: string;
  prize2: string;
  image: string;
}
