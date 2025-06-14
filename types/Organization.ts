import { File } from "./File";
export interface Organization {
  id: string;
  name: string;
  description: string;
  phone: string;
  address: string;
  timeOpenWeek: string | null;
  timeCloseWeek: string | null;
  timeOpenSaturday: string | null;
  timeCloseSaturday: string | null;
  timeOpenSunday: string | null;
  timeCloseSunday: string | null;
  daysWeekEnabled: string[] | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  image: File;
}

export interface OrganizationListResponse extends Array<Organization> {}