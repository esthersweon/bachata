import { Movement } from "./glossary/types";

export type Event = {
  id: string;
  name: string;
  image: string;
  date: string;
  rsvp: string;
};

export type List = {
  id: string;
  name: string;
  movements: Movement[];
};
