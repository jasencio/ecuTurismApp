import { File } from "./File";
export interface Organization {
  id: string;
  name: string;
  description: string;
  adminId?: string;
  adminName?: string;
  adminEmail?: string;
  phone: string;
  address: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  image?: File;
}

export interface OrganizationListResponse extends Array<Organization> {}