import { Organization } from '@/types/Organization';
import { File } from "./File";

export enum Hardness {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export interface Route {
  id: string;
  organization: Organization;
  name: string | null;
  description: string | null;
  minutes: string | null;
  hardness: Hardness | null;
  distance: string | null;
  mainImage: File;
  isActive: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface RouteListResponse extends Array<Route> {} 