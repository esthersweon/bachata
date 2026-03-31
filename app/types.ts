import { Movement } from "./glossary/types";

export type DanceEvent = {
  id: string;
  name: string;
  image: string;
  date: string;
  rsvp: string;
};

export type Status = {
  id: string;
  name: string;
  movements: Movement[];
};

export type List = {
  id: string;
  name: string;
  movements: Movement[];
};

export type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
