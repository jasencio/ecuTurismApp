export interface Organization {
  id: string;
  name: string;
  description: string;
  adminId: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationListResponse extends Array<Organization> {}