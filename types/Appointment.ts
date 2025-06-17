import { Route } from "./Route";
import { User } from "./Users";

export interface Appointment {
  id: string;
  tourist: User;
  route: Route;
  groupSize: number;
  eventDate: string;
  eventTimeInit: string;
  eventTimeEnd: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentCreate {
  routeId: string;
  eventDate: string;
  eventTimeInit: string;
  eventTimeEnd: string;
  groupSize: number;
}
