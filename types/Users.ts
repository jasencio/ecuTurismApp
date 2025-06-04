export enum UserRole {
  ADMIN_SYSTEM = "ADMIN_SYSTEM",
  ADMIN_COMPANY = "ADMIN_COMPANY",
  TOURIST_GUIDE = "TOURIST_GUIDE",
  TOURIST = "TOURIST"
}

export const roleDisplayNames: Record<UserRole, string> = {
  [UserRole.ADMIN_SYSTEM]: "Administrador del sistema",
  [UserRole.ADMIN_COMPANY]: "Administrador de compañía",
  [UserRole.TOURIST_GUIDE]: "Guía turístico",
  [UserRole.TOURIST]: "Turista"
};

export interface Role {
  id: string;
  name: UserRole;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles?: Array<Role>;
}

export interface UserListResponse extends Array<User> {}
